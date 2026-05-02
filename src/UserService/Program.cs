using FastEndpoints;
using FastEndpoints.Swagger;
using Infrastructure;
using Scalar.AspNetCore;
using ServiceDefaults;
using Shared.Auth;

var builder = WebApplication.CreateBuilder(args);

builder.AddServiceDefaults();

builder.Services.AddUser(builder.Configuration);

builder.Services.AddHeaderAuthentication();

builder.Services.AddAuthorization();

builder.Services.AddFastEndpoints();
builder.Services.SwaggerDocument(o =>
{
    o.DocumentSettings = s =>
    {
        s.DocumentName = "v1";
        s.Title = "User Service";
    };
});

builder.Services.AddHttpContextAccessor();

var app = builder.Build();

app.MapDefaultEndpoints();

if (app.Environment.IsDevelopment())
{
    app.UseSwaggerGen(o => o.Path =
        "/openapi/{documentName}.json");

    app.MapScalarApiReference();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.UseFastEndpoints(c => { c.Endpoints.RoutePrefix = "api"; });

await app.RunAsync();