using System.Security.Claims;
using FastEndpoints;
using Infrastructure.Data.Contexts;
using Microsoft.EntityFrameworkCore;

namespace UserService.Features.User.Commands.Delete;

public class DeleteEndpoint(UserDbContext db) : EndpointWithoutRequest
{
    public override void Configure()
    {
        Delete("/user/profile");
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        var identityId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var deleted = await db.Users.Where(u => u.IdentityId == identityId).ExecuteDeleteAsync(ct);

        if (deleted == 0) await Send.NotFoundAsync(ct);
        else await Send.NoContentAsync(ct);
    }
}