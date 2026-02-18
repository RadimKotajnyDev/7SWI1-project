using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data.Contexts;

public class InfrastructureDbContext(DbContextOptions<InfrastructureDbContext> options) : DbContext(options)
{
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(InfrastructureDbContext).Assembly);
    }
}