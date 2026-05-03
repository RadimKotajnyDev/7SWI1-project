using FastEndpoints;
using Infrastructure.Data.Contexts;
using Infrastructure.Entities.Auth;
using Microsoft.EntityFrameworkCore;

namespace SharedFridgeService.Features.SharedFridge.Commands.Delete;

public class DeleteEndpoint(SharedFridgeDbContext db) : EndpointWithoutRequest
{
    public override void Configure()
    {
        Delete("/fridge/snacks/{id}");
        Roles(nameof(IdentityRole.User));
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        var id = Route<Guid>("id");
        var deleted = await db.SnackItems.Where(s => s.Id == id).ExecuteDeleteAsync(ct);

        if (deleted == 0) await Send.NotFoundAsync(ct);
        else await Send.NoContentAsync(ct);
    }
}