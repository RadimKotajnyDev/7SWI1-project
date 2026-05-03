using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using ServiceDefaults;
using Yarp.ReverseProxy.Transforms;

var builder = WebApplication.CreateBuilder(args);

builder.AddServiceDefaults();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

var key = "YourSuperSecretKeyGoesHere-MustBeLong"u8.ToArray();
const string issuer = "auth-service";
const string audience = "KanclIO";
builder.Services.AddAuthentication("Bearer")
    .AddJwtBearer("Bearer", options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidIssuers = [issuer],
            ValidAudiences = [audience]
        };
    });

builder.Services.AddAuthorization();

builder.Services.AddReverseProxy()
    .LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"))
    .AddServiceDiscoveryDestinationResolver()
    .AddTransforms(builderContext =>
    {
        builderContext.AddRequestTransform(transformContext =>
        {
            transformContext.ProxyRequest.Headers.Remove("X-User-Roles");
            transformContext.ProxyRequest.Headers.Remove("X-User-Id");

            var user = transformContext.HttpContext.User;

            if (user.Identity?.IsAuthenticated != true) return ValueTask.CompletedTask;

            var roles = user.FindAll(ClaimTypes.Role).Select(c => c.Value);
            var userId = user.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? user.Identity.Name;

            transformContext.ProxyRequest.Headers.Add("X-User-Roles", string.Join(",", roles));
            transformContext.ProxyRequest.Headers.Add("X-User-Id", userId ?? string.Empty);

            return ValueTask.CompletedTask;
        });
    });

var app = builder.Build();

app.UseCors("AllowAll");
app.UseAuthentication();
app.UseAuthorization();

app.MapReverseProxy();
await app.RunAsync();