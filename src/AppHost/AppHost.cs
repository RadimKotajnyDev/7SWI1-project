using Projects;

var builder = DistributedApplication.CreateBuilder(args);

var postgres = builder.AddPostgres("db-postgres")
    .WithDataVolume("db-postgres-data")
    .WithPgWeb();

var db = postgres.AddDatabase("db");

var migrationWorker = builder.AddProject<MigrationService>("migration-service")
    .WithReference(db)
    .WaitForStart(db);

var authService = builder.AddProject<AuthService>("auth-service")
    .WithReference(db)
    .WaitForCompletion(migrationWorker);

var userService = builder.AddProject<UserService>("user-service")
    .WithReference(db)
    .WaitForCompletion(migrationWorker);

var gateway = builder.AddProject<Gateway>("gateway")
    .WithReference(authService)
    .WithReference(userService)
    .WithExternalHttpEndpoints();

var frontend = builder.AddJavaScriptApp("frontend", "../Frontend", "dev")
    .WithReference(gateway)
    .WithEnvironment("VITE_GATEWAY_URL", gateway.GetEndpoint("http"))
    .WithHttpEndpoint(port: 3173, name: "http")
    .WithExternalHttpEndpoints();

await builder.Build().RunAsync();