using AuthService.Common;
using FastEndpoints;
using Infrastructure.Data.Contexts;
using Microsoft.EntityFrameworkCore;

namespace AuthService.Features.Auth.Commands.LogoutCommand;

public class LogoutEndpoint(AuthDbContext db) : EndpointWithoutRequest
{
    public override void Configure()
    {
        Post("/auth/logout");
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        if (HttpContext.Request.Cookies.TryGetValue("refresh_token", out var rawRefresh))
        {
            var hash = SecurityHelper.HashPassword(rawRefresh);
            await db.RefreshTokens
                .Where(t => t.TokenHash == hash)
                .ExecuteDeleteAsync(ct);
        }

        HttpContext.Response.Cookies.Delete("refresh_token");

        await Send.NoContentAsync(ct);
    }
}