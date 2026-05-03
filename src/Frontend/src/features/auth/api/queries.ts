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

export const useRegister = (username: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: RegisterRequest) => register(body),
    onSuccess: async ({ accessToken }) => {
      setAccessToken(accessToken);
      const profile = await createUserProfile({ username });
      queryClient.setQueryData(userKeys.profile(), profile);
    },
  });
};
