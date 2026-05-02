using Infrastructure.Data.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace Infrastructure;

public static class Extensions
{
    extension(IServiceCollection services)
    {
        public IServiceCollection AddInfrastructure(IConfiguration configuration)
        {
            var cs = configuration.GetConnectionString("db");

            services.AddDbContext<InfrastructureDbContext>(options =>
            {
                options.UseNpgsql(cs,
                    npgsqlOptions => npgsqlOptions.MigrationsAssembly("Infrastructure"));
            });

            services.AddHealthChecks()
                .AddDbContextCheck<InfrastructureDbContext>(
                    name: "postgres-db",
                    failureStatus: HealthStatus.Unhealthy,
                    tags: ["db", "ready", "postgres"]);

            return services;
        }

        public IServiceCollection AddAuth(IConfiguration configuration)
        {
            var cs = configuration.GetConnectionString("db");

            services.AddDbContext<AuthDbContext>(options => { options.UseNpgsql(cs); });

            services.AddHealthChecks()
                .AddDbContextCheck<AuthDbContext>(
                    name: "postgres-auth-db",
                    failureStatus: HealthStatus.Unhealthy,
                    tags: ["db", "ready", "postgres", "auth"]
                );

            return services;
        }

        public IServiceCollection AddUser(IConfiguration configuration)
        {
            var cs = configuration.GetConnectionString("db");

            services.AddDbContext<UserDbContext>(options => { options.UseNpgsql(cs); });

            services.AddHealthChecks()
                .AddDbContextCheck<UserDbContext>(
                    name: "postgres-user-db",
                    failureStatus: HealthStatus.Unhealthy,
                    tags: ["db", "ready", "postgres", "user"]
                );

            return services;
        }

        public IServiceCollection AddSharedFridge(IConfiguration configuration)
        {
            var cs = configuration.GetConnectionString("db");

            services.AddDbContext<SharedFridgeDbContext>(options => { options.UseNpgsql(cs); });

            services.AddHealthChecks()
                .AddDbContextCheck<SharedFridgeDbContext>(
                    name: "postgres-shared-fridge-db",
                    failureStatus: HealthStatus.Unhealthy,
                    tags: ["db", "ready", "postgres", "shared-fridge"]
                );

            return services;
        }
    }
}