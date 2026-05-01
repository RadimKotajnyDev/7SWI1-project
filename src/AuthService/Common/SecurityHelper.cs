using System.Security.Cryptography;
using System.Text;

namespace AuthService.Common;

public static class SecurityHelper
{
    public static string HashPassword(string password)
    {
        var bytes = Encoding.UTF8.GetBytes(password);
        var hash = SHA256.HashData(bytes);
        return Convert.ToHexString(hash);
    }
}