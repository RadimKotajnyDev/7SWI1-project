using Infrastructure.Entities.User;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data.Contexts;

public class UserDbContext(DbContextOptions<UserDbContext> options) : DbContext(options)
{
    public DbSet<User> Users => Set<User>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfigurationsFromAssembly(
            typeof(UserDbContext).Assembly,
            type => type.Namespace != null &&
                    type.Namespace.EndsWith($".Configuration.{Schemas.User}", StringComparison.OrdinalIgnoreCase)
        );

        modelBuilder.HasDefaultSchema(Schemas.User);
    }
}