using Projects;

var builder = DistributedApplication.CreateBuilder(args);

builder.AddProject<Gateway>("gateway")
    .WithExternalHttpEndpoints();

builder.Build().Run();