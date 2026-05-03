using System.Security.Claims;
using AuthService.Common;
using AuthService.Features.Auth.Models;
using AuthService.Features.Auth.Services;
using FastEndpoints;
using FastEndpoints.Security;
using Infrastructure.Data.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Shared.Auth;

namespace AuthService.Features.Auth.Commands.LoginCommand;

public class LoginEndpoint(AuthDbContext db, IOptions<JwtConfiguration> config) : Endpoint<LoginRequest, TokenResponse>
{
    public override void Configure()
    {
        Post("/auth/login");
        AllowAnonymous();
    }

    public override async Task HandleAsync(LoginRequest req, CancellationToken ct)
    {
        var passwordHash = SecurityHelper.HashPassword(req.Password);

        var identity = await db.Identities
            .SingleOrDefaultAsync(i => i.Email == req.Email && i.PasswordHash == passwordHash, ct);

        if (identity is null)
        {
            await Send.UnauthorizedAsync(ct);
            return;
        }

        identity.LastLoginAt = DateTime.UtcNow;
        await db.SaveChangesAsync(ct);

        var response = await CreateTokenWith<AuthTokenService>(
            identity.Id.ToString(),
            privileges =>
            {
                privileges.Roles.AddRange(identity.Roles.Select(r => r.ToString()));
                privileges.Claims.Add(new Claim(ClaimTypes.Email, identity.Email));
                privileges.Claims.Add(new Claim("iss", config.Value.Issuer));
                privileges.Claims.Add(new Claim("aud", config.Value.Audience));
            });

        await Send.OkAsync(response, ct);
    }
}