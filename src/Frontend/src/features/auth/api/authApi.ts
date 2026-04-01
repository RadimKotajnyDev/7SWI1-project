import { API_ENDPOINTS, axiosInstance } from "@/shared/api";
import type { AuthResponse, LoginRequest, RegisterRequest } from "../model/types";

export const login = async (body: LoginRequest): Promise<AuthResponse> => {
  const { data } = await axiosInstance.post<AuthResponse>(
    API_ENDPOINTS.auth.login,
    body,
  );
  return data;
};

export const register = async (
  body: RegisterRequest,
): Promise<AuthResponse> => {
  const { data } = await axiosInstance.post<AuthResponse>(
    API_ENDPOINTS.auth.register,
    body,
  );
  return data;
};
