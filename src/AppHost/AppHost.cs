using Projects;

var builder = DistributedApplication.CreateBuilder(args);

var postgres = builder.AddPostgres("db-postgres")
    .WithDataVolume("db-postgres-data");

var db = postgres.AddDatabase("db");

var migrationService = builder.AddProject<MigrationService>("migration-service")
    .WaitFor(db)
    .WithReference(db);

builder.AddProject<Gateway>("gateway")
    .WithExternalHttpEndpoints();

builder.Build().Run();