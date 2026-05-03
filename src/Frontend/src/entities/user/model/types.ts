export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string | null;
}

export interface CreateUserProfileRequest {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}
