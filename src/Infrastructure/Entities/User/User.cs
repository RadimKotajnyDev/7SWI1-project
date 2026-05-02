namespace Infrastructure.Entities.User;

public sealed class User
{
    public Guid Id { get; init; } = Guid.CreateVersion7();

    public Guid IdentityId { get; init; }

    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public DateTime? DateOfBirth { get; set; }
    public DateTime CreatedAt { get; init; } = DateTime.UtcNow;
}