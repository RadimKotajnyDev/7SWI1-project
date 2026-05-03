export interface UserProfile {
  id: string;
  username: string;
  email: string;
  createdAt: string;
}

export interface CreateUserProfileRequest {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}
