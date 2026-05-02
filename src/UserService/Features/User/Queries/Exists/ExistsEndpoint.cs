using System.Security.Claims;
using FastEndpoints;
using Infrastructure.Data.Contexts;
using Infrastructure.Entities.Auth;
using Microsoft.EntityFrameworkCore;

namespace UserService.Features.User.Queries.Exists;

public class ExistsEndpoint(UserDbContext db) : EndpointWithoutRequest<ExistsResponse>
{
    public override void Configure()
    {
        Get("/user/exists");
        Roles(nameof(IdentityRole.User));
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        var identityIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (string.IsNullOrEmpty(identityIdString) || !Guid.TryParse(identityIdString, out var identityId))
        {
            await Send.UnauthorizedAsync(ct);
            return;
        }

        var exists = await db.Users
            .AnyAsync(u => u.IdentityId == identityId, ct);

        await Send.OkAsync(new ExistsResponse(exists), ct);
    }
}