import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CreateUserProfileRequest } from "../model/types";
import { createUserProfile, getUserProfile } from "./userApi";

export const userKeys = {
  profile: () => ["user", "profile"] as const,
};

export const useUserProfile = () =>
  useQuery({
    queryKey: userKeys.profile(),
    queryFn: getUserProfile,
  });

export const useCreateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: CreateUserProfileRequest) => createUserProfile(body),
    onSuccess: (data) => {
      queryClient.setQueryData(userKeys.profile(), data);
    },
  });
};
