using Scalar.Aspire;

var builder = DistributedApplication.CreateBuilder(args);

var postgres = builder.AddPostgres("db-postgres");
var db = postgres.AddDatabase("db");

var authService = builder.AddProject<Projects.AuthService>("auth-service")
    .WithReference(db);

var gateway = builder.AddProject<Projects.Gateway>("gateway")
    .WithReference(authService)
    .WithExternalHttpEndpoints();

await builder.Build().RunAsync();