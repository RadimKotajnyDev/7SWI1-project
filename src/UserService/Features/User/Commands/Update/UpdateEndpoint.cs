using System.Security.Claims;
using FastEndpoints;
using Infrastructure.Data.Contexts;
using Microsoft.EntityFrameworkCore;

namespace UserService.Features.User.Commands.Update;

public class UpdateEndpoint(UserDbContext db) : Endpoint<UpdateProfileRequest>
{
    public override void Configure()
    {
        Put("/user/profile");
    }

    public override async Task HandleAsync(UpdateProfileRequest req, CancellationToken ct)
    {
        var identityId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var user = await db.Users.SingleOrDefaultAsync(u => u.IdentityId == identityId, ct);

        if (user is null)
        {
            await Send.NotFoundAsync(ct);
            return;
        }

        user.FirstName = req.FirstName;
        user.LastName = req.LastName;
        user.DateOfBirth = req.DateOfBirth;

        await db.SaveChangesAsync(ct);
        await Send.NoContentAsync(ct);
    }
}