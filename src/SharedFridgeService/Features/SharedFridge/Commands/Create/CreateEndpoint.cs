using System.Security.Claims;
using FastEndpoints;
using Infrastructure.Data.Contexts;
using Infrastructure.Entities.Auth;
using Infrastructure.Entities.SharedFridge;

namespace SharedFridgeService.Features.SharedFridge.Commands.Create;

public class CreateEndpoint(SharedFridgeDbContext db) : Endpoint<CreateSnackRequest, EmptyResponse>
{
    public override void Configure()
    {
        Post("/fridge/snacks");
        Roles(nameof(IdentityRole.User));
    }

    public override async Task HandleAsync(CreateSnackRequest req, CancellationToken ct)
    {
        var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
        
        if (string.IsNullOrEmpty(userIdString)) 
        {
            await Send.UnauthorizedAsync(ct);
            return;
        }

        var item = new SnackItem 
        { 
            Name = req.Name, 
            FridgeLocation = req.FridgeLocation,
            AddedBy = Guid.Parse(userIdString)
        };

        db.SnackItems.Add(item);
        await db.SaveChangesAsync(ct);
        await Send.OkAsync(ct);
    }
}