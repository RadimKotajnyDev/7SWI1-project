using FastEndpoints;
using Infrastructure.Data.Contexts;
using Infrastructure.Entities.Auth;

namespace SharedFridgeService.Features.SharedFridge.Commands.Update;

public class UpdateEndpoint(SharedFridgeDbContext db) : Endpoint<UpdateStatusRequest, EmptyResponse>
{
    public override void Configure()
    {
        Patch("/fridge/snacks/{id}");
        Roles(nameof(IdentityRole.User));
    }

    public override async Task HandleAsync(UpdateStatusRequest req, CancellationToken ct)
    {
        var id = Route<Guid>("id");
        var item = await db.SnackItems.FindAsync(id, ct);

        if (item is null)
        {
            await Send.NotFoundAsync(ct);
            return;
        }

        item.Status = req.Status;
        item.UpdatedAt = DateTime.UtcNow;

        await db.SaveChangesAsync(ct);
        await Send.OkAsync(ct);
    }
}