using System.Security.Claims;
using System.Text.Encodings.Web;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace Shared.Auth;

public class HeaderAuthHandler : AuthenticationHandler<AuthenticationSchemeOptions>
{
    public HeaderAuthHandler(
        IOptionsMonitor<AuthenticationSchemeOptions> options,
        ILoggerFactory logger,
        UrlEncoder encoder,
        ISystemClock clock) : base(options, logger, encoder, clock)
    {
    }

    protected override Task<AuthenticateResult> HandleAuthenticateAsync()
    {
        if (!Request.Headers.TryGetValue("X-User-Id", out var userId))
        {
            Logger.LogWarning("Missing X-User-Id header.");
            return Task.FromResult(AuthenticateResult.NoResult());
        }
        
        Logger.LogInformation("Authenticating user with id: {UserId}", userId);

        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, userId.ToString())
        };

        if (Request.Headers.TryGetValue("X-User-Roles", out var roles))
        {
            Logger.LogInformation("User has roles: {Roles}", roles);
            var roleList = roles.ToString().Split(',', StringSplitOptions.RemoveEmptyEntries);
            foreach (var role in roleList)
            {
                claims.Add(new Claim(ClaimTypes.Role, role.Trim()));
            }
        }

        var identity = new ClaimsIdentity(claims, "HeaderScheme");
        var principal = new ClaimsPrincipal(identity);
        var ticket = new AuthenticationTicket(principal, "HeaderScheme");

        return Task.FromResult(AuthenticateResult.Success(ticket));
    }
}