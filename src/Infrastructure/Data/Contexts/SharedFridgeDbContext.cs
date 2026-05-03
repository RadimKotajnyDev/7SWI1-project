using Infrastructure.Entities.SharedFridge;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data.Contexts;

public class SharedFridgeDbContext(DbContextOptions<SharedFridgeDbContext> options) : DbContext(options)
{
    public DbSet<SnackItem> SnackItems => Set<SnackItem>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfigurationsFromAssembly(
            typeof(AuthDbContext).Assembly,
            type => type.Namespace != null &&
                    type.Namespace.EndsWith($".Configuration.{Schemas.SharedFridge}", StringComparison.OrdinalIgnoreCase)
        );
    }
}