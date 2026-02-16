using Infrastructure.Data.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace Infrastructure;

public static class Extensions
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        var cs = configuration.GetConnectionString("db");

        services.AddDbContext<InfrastructureDbContext>(options => { options.UseNpgsql(cs); });

        services.AddHealthChecks()
            .AddDbContextCheck<InfrastructureDbContext>(
                name: "postgres-db",
                failureStatus: HealthStatus.Unhealthy,
                tags: ["db", "ready", "postgres"]);

        return services;
    }
}