using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.DependencyInjection;

namespace Shared.Auth;

public static class HeaderAuthExtensions
{
    public static AuthenticationBuilder AddHeaderAuthentication(this IServiceCollection services)
    {
        return services.AddAuthentication("HeaderScheme")
            .AddScheme<AuthenticationSchemeOptions, HeaderAuthHandler>("HeaderScheme", null);
    }
}