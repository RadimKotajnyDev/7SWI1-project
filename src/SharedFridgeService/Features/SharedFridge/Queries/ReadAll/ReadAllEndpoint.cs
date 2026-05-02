using FastEndpoints;
using Infrastructure.Data.Contexts;
using Infrastructure.Entities.Auth;
using Microsoft.EntityFrameworkCore;

namespace SharedFridgeService.Features.SharedFridge.Queries.ReadAll;

public class GetAllSnacksEndpoint(SharedFridgeDbContext db) : EndpointWithoutRequest<List<SnackDto>>
{
    public override void Configure()
    {
        Get("/fridge/snacks");
        Roles(nameof(IdentityRole.User));
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        var items = await db.SnackItems.ToListAsync(ct);
        await Send.OkAsync(items.Select(x => new SnackDto(x.Id, x.Name, x.FridgeLocation, x.Status)).ToList(), ct);
    }
}