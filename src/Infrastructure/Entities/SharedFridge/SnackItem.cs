namespace Infrastructure.Entities.SharedFridge;

public sealed class SnackItem
{
    public Guid Id { get; init; } = Guid.CreateVersion7();
    public required string Name { get; init; }
    public required string FridgeLocation { get; init; } // e.g., "Main Kitchen", "Office"
    public SnackStatus Status { get; set; } = SnackStatus.InStock;
    public Guid AddedBy { get; set; }
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}