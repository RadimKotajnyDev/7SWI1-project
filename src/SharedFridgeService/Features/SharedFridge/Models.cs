using Infrastructure.Entities.SharedFridge;

namespace SharedFridgeService.Features.SharedFridge;

public record SnackDto(Guid Id, string Name, string FridgeLocation, SnackStatus Status);

public record CreateSnackRequest(string Name, string FridgeLocation);

public record UpdateStatusRequest(SnackStatus Status);