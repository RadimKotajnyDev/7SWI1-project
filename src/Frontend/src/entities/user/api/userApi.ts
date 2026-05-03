import { API_ENDPOINTS, axiosInstance } from "@/shared/api";
import type {
  CreateUserProfileRequest,
  UserProfile,
} from "../model/types";

export const getUserProfile = async (): Promise<UserProfile> => {
  const { data } = await axiosInstance.get<UserProfile>(
    API_ENDPOINTS.userProfile.get,
  );
  return data;
};

export const createUserProfile = async (
  body: CreateUserProfileRequest,
): Promise<UserProfile> => {
  const { data } = await axiosInstance.post<UserProfile>(
    API_ENDPOINTS.userProfile.create,
    body,
  );
  return data;
};
