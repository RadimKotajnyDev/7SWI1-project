using AuthService.Features.Auth.Services;
using FastEndpoints;
using FastEndpoints.Security;
using FastEndpoints.Swagger;
using Infrastructure;
using Scalar.AspNetCore;
using ServiceDefaults;
using Shared.Auth;

var builder = WebApplication.CreateBuilder(args);

builder.AddServiceDefaults();

builder.Services.AddAuth(builder.Configuration);

builder.Services.Configure<JwtConfiguration>(builder.Configuration.GetSection("JWT"));
var jwtSettings = builder.Configuration.GetSection("JWT").Get<JwtConfiguration>();
var signingKey = jwtSettings?.SigningKey ?? throw new InvalidOperationException("JWT Signing Key is missing!");

builder.Services.AddScoped<AuthTokenService>();
builder.Services.AddHeaderAuthentication();

builder.Services.AddAuthenticationJwtBearer(s => s.SigningKey = signingKey);
builder.Services.AddAuthorization();

builder.Services.AddFastEndpoints();
builder.Services.SwaggerDocument(o =>
{
    o.DocumentSettings = s =>
    {
        s.DocumentName = "v1";
        s.Title = "Auth Service";
    };
});

builder.Services.AddHttpContextAccessor();

var app = builder.Build();

app.MapDefaultEndpoints();

if (app.Environment.IsDevelopment())
{
    app.UseSwaggerGen(o => o.Path = "/openapi/{documentName}.json");

    app.MapScalarApiReference();
}

app.UseAuthentication();
app.UseAuthorization();

app.UseFastEndpoints(c => { c.Endpoints.RoutePrefix = "api"; });

await app.RunAsync();