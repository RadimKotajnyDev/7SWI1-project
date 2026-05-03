import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setAccessToken } from "@/shared/api";
import { userKeys } from "@/entities/user";
import { createUserProfile } from "@/entities/user/api/userApi";
import { login, register } from "./authApi";
import type { LoginRequest, RegisterRequest } from "../model/types";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: LoginRequest) => login(body),
    onSuccess: async ({ accessToken }) => {
      setAccessToken(accessToken);
      await queryClient.invalidateQueries({ queryKey: userKeys.profile() });
    },
  });
};

interface RegisterProfileData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

export const useRegister = (profileData: RegisterProfileData) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: RegisterRequest) => register(body),
    onSuccess: async ({ accessToken }) => {
      setAccessToken(accessToken);
      const profile = await createUserProfile(profileData);
      queryClient.setQueryData(userKeys.profile(), profile);
    },
  });
};
