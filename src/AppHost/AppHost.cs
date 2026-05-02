using Projects;

var builder = DistributedApplication.CreateBuilder(args);

var postgres = builder.AddPostgres("db-postgres");
var db = postgres.AddDatabase("db");

var authService = builder.AddProject<AuthService>("auth-service")
    .WithReference(db)
    .WaitFor(db);

var gateway = builder.AddProject<Gateway>("gateway")
    .WithReference(authService)
    .WithExternalHttpEndpoints();

await builder.Build().RunAsync();