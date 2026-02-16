using ServiceDefaults;

var builder = WebApplication.CreateBuilder(args);

// Add service discovery and YARP
builder.AddServiceDefaults(); 
builder.Services.AddReverseProxy()
    .LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"));

var app = builder.Build();

app.MapReverseProxy();
app.Run();