using System.Security.Claims;
using FastEndpoints;
using Infrastructure.Data.Contexts;
using Infrastructure.Entities.Auth;
using Microsoft.EntityFrameworkCore;

namespace UserService.Features.User.Queries.Read;

public class ReadUserEndpoint(UserDbContext db) : Endpoint<EmptyRequest, UserProfileDto>
{
    public override void Configure()
    {
        Get("/user/profile");
        Roles(nameof(IdentityRole.User));
    }

    public override async Task HandleAsync(EmptyRequest request, CancellationToken ct)
    {
        var identityId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var user = await db.Users.SingleOrDefaultAsync(u => u.IdentityId == identityId, ct);

        if (user is null) await Send.NotFoundAsync(ct);
        else await Send.OkAsync(new UserProfileDto(user.Id, user.FirstName, user.LastName, user.DateOfBirth), ct);
    }
}