using System.Security.Claims;
using FastEndpoints;
using Infrastructure.Data.Contexts;
using Infrastructure.Entities.Auth;

namespace UserService.Features.User.Commands.Create;

public class CreateEndpoint(UserDbContext db) : Endpoint<CreateProfileRequest>
{
    public override void Configure()
    {
        Post("/user/profile");
        Roles(nameof(IdentityRole.User));
    }

    public override async Task HandleAsync(CreateProfileRequest req, CancellationToken ct)
    {
        var identityId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        var user = new Infrastructure.Entities.User.User
        {
            IdentityId = identityId,
            FirstName = req.FirstName,
            LastName = req.LastName,
            DateOfBirth = req.DateOfBirth
        };

        db.Users.Add(user);
        await db.SaveChangesAsync(ct);
        await Send.CreatedAtAsync("/user/profile", null, user, cancellation: ct);
    }
}