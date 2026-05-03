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

var sharedFridgeService = builder.AddProject<SharedFridgeService>("shared-fridge-service")
    .WithReference(db)
    .WaitForCompletion(migrationWorker);

var gateway = builder.AddProject<Gateway>("gateway")
    .WithReference(authService)
    .WithReference(userService)
    .WithReference(sharedFridgeService)
    .WithExternalHttpEndpoints();

var frontend = builder.AddViteApp("frontend", "../Frontend", "dev")
    .WithBun()
    .WithReference(gateway)
    .WithEnvironment("VITE_GATEWAY_URL", gateway.GetEndpoint("http"))
    .WithExternalHttpEndpoints();

await builder.Build().RunAsync();