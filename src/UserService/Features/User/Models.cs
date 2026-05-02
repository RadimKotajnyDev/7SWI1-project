namespace UserService.Features.User;

public record UserProfileDto(Guid Id, string FirstName, string LastName, DateTime? DateOfBirth);

public record CreateProfileRequest(string FirstName, string LastName, DateTime DateOfBirth);

public record UpdateProfileRequest(string FirstName, string LastName, DateTime DateOfBirth);