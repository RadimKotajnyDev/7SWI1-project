export interface UserProfile {
  id: string;
  username: string;
  email: string;
  createdAt: string;
}

export interface CreateUserProfileRequest {
  username: string;
}
