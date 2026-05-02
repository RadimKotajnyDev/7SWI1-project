using System.Security.Claims;
using AuthService.Common;
using AuthService.Features.Auth.Models;
using AuthService.Features.Auth.Services;
using FastEndpoints;
using FastEndpoints.Security;
using Infrastructure.Data.Contexts;
using Infrastructure.Entities.Auth;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Shared.Auth;

namespace AuthService.Features.Auth.Commands.RegisterCommand;

public class RegisterEndpoint(AuthDbContext db, IOptions<JwtConfiguration> config)
    : Endpoint<RegisterRequest, TokenResponse>
{
    public override void Configure()
    {
        Post("/auth/register");
    }

    public override async Task HandleAsync(RegisterRequest req, CancellationToken ct)
    {
        if (await db.Identities.AnyAsync(i => i.Email == req.Email, ct))
        {
            await Send.ErrorsAsync(409, ct);
            return;
        }

        var identity = new Identity
        {
            Email = req.Email,
            PasswordHash = SecurityHelper.HashPassword(req.Password),
            Roles = [IdentityRole.User],
            CreatedAt = DateTime.UtcNow,
            LastLoginAt = DateTime.UtcNow
        };

        db.Identities.Add(identity);
        await db.SaveChangesAsync(ct);

        var tokenResponse = await CreateTokenWith<AuthTokenService>(
            identity.Id.ToString(),
            privileges =>
            {
                privileges.Roles.Add(nameof(IdentityRole.User));
                privileges.Claims.Add(new Claim(ClaimTypes.Email, identity.Email));
                privileges.Claims.Add(new Claim("iss", config.Value.Issuer));
                privileges.Claims.Add(new Claim("aud", config.Value.Audience));
            });

        await Send.OkAsync(tokenResponse, ct);
    }
}