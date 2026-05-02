namespace Infrastructure.Data.Contexts;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

public class InfrastructureDbContextFactory : IDesignTimeDbContextFactory<InfrastructureDbContext>
{
    public InfrastructureDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<InfrastructureDbContext>();
        optionsBuilder.UseNpgsql("Host=localhost;Database=dummy;Username=postgres;Password=password");

        return new InfrastructureDbContext(optionsBuilder.Options);
    }
}