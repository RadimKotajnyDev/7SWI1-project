namespace Infrastructure.Entities.Auth;

public sealed class Identity
{
    public Guid Id { get; init; } = Guid.CreateVersion7();
    public required string Email { get; init; }
    public required string PasswordHash { get; init; }
    public DateTime CreatedAt { get; init; } = DateTime.UtcNow;
    public DateTime? LastLoginAt { get; set; }
    public RefreshToken? RefreshToken { get; set; }
    public List<IdentityRole> Roles { get; set; } = [];
}