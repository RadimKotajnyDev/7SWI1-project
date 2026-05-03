using Infrastructure.Entities.Auth;
using Infrastructure.Entities.SharedFridge;
using Infrastructure.Entities.User;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data.Contexts;

public class InfrastructureDbContext(DbContextOptions<InfrastructureDbContext> options) : DbContext(options)
{
    public DbSet<Identity> Identities => Set<Identity>();
    public DbSet<RefreshToken> RefreshTokens => Set<RefreshToken>();
    public DbSet<User> Users => Set<User>();
    public DbSet<SnackItem> SnackItems => Set<SnackItem>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(InfrastructureDbContext).Assembly);
    }
}