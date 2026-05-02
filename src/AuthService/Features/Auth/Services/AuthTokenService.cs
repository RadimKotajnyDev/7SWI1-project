using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using AuthService.Common;
using FastEndpoints;
using FastEndpoints.Security;
using Infrastructure.Data.Contexts;
using Infrastructure.Entities.Auth;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Shared.Auth;

namespace AuthService.Features.Auth.Services;

public class AuthTokenService : RefreshTokenService<TokenRequest, TokenResponse>
{
    private readonly AuthDbContext _db;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IOptions<JwtConfiguration> _config;

    public AuthTokenService(
        IOptions<JwtConfiguration> config,
        AuthDbContext db,
        IHttpContextAccessor httpContextAccessor)
    {
        _db = db;
        _httpContextAccessor = httpContextAccessor;
        _config = config;

        Setup(o =>
        {
            o.TokenSigningKey = config.Value.SigningKey;
            o.AccessTokenValidity = TimeSpan.FromMinutes(config.Value.AccessExpirationInMinutes);
            o.RefreshTokenValidity = TimeSpan.FromDays(config.Value.RefreshExpirationInDays);

            o.Endpoint("/auth/refresh", ep =>
            {
                ep.Summary(s => s.Summary = "Refresh JWT token pair.");
                ep.AllowAnonymous();
            });
        });
    }

    public override async Task RefreshRequestValidationAsync(TokenRequest req)
    {
        var http = _httpContextAccessor.HttpContext!;

        if (!http.Request.Cookies.TryGetValue("refresh_token", out var rawRefresh)
            || string.IsNullOrWhiteSpace(rawRefresh))
        {
            AddError("Missing refresh token cookie.");
            return;
        }

        var hash = HashToken(rawRefresh);

        var token = await _db.RefreshTokens
            .SingleOrDefaultAsync(t => t.TokenHash == hash);

        if (token is null || token.ExpiresAt <= DateTime.UtcNow)
        {
            AddError("Refresh token is invalid or expired.");
            return;
        }

        req.UserId = token.UserId.ToString();
    }

    public override async Task SetRenewalPrivilegesAsync(TokenRequest request, UserPrivileges privileges)
    {
        var userId = Guid.Parse(request.UserId);

        var identity = await _db.Identities
            .AsNoTracking()
            .SingleOrDefaultAsync(u => u.Id == userId);

        if (identity is null)
        {
            AddError("User no longer exists.");
            return;
        }

        privileges.Roles.AddRange(identity.Roles.Select(r => r.ToString()));

        privileges.Claims.Add(new Claim(ClaimTypes.NameIdentifier, identity.Id.ToString()));
        privileges.Claims.Add(new Claim(ClaimTypes.Email, identity.Email));

        privileges.Claims.Add(new Claim("iss", _config.Value.Issuer));
        privileges.Claims.Add(new Claim("aud", _config.Value.Audience));
    }

    public override async Task PersistTokenAsync(TokenResponse response)
    {
        var ctx = _httpContextAccessor.HttpContext!;
        var userId = Guid.Parse(response.UserId);

        var rawRefresh = response.RefreshToken;
        var hash = HashToken(rawRefresh);

        var token = await _db.RefreshTokens.SingleOrDefaultAsync(t => t.UserId == userId);

        if (token is null)
        {
            token = new RefreshToken
            {
                UserId = userId,
                TokenHash = hash,
                ExpiresAt = response.RefreshExpiry,
                CreatedByIp = ctx.Connection.RemoteIpAddress?.ToString()
            };
            _db.RefreshTokens.Add(token);
        }
        else
        {
            token.TokenHash = hash;
            token.ExpiresAt = response.RefreshExpiry;
            token.CreatedAt = DateTime.UtcNow;
            token.CreatedByIp = ctx.Connection.RemoteIpAddress?.ToString();
        }

        await _db.SaveChangesAsync();

        ctx.Response.Cookies.Append(
            "refresh_token",
            rawRefresh,
            new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = response.RefreshExpiry
            });

        response.RefreshToken = "cookie-stored";
    }

    private static string HashToken(string token)
    {
        var bytes = Encoding.UTF8.GetBytes(token);
        var hash = SHA256.HashData(bytes);
        return Convert.ToHexString(hash);
    }
}