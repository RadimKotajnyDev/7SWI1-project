using Infrastructure.Entities.Auth;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data.Contexts;

public class AuthDbContext(DbContextOptions<AuthDbContext> options) : DbContext(options)
{
    public DbSet<Identity> Identities => Set<Identity>();
    public DbSet<RefreshToken> RefreshTokens => Set<RefreshToken>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfigurationsFromAssembly(
            typeof(AuthDbContext).Assembly,
            type => type.Namespace != null &&
                    type.Namespace.EndsWith($".Configuration.{Schemas.Auth}", StringComparison.OrdinalIgnoreCase)
        );
    }
}