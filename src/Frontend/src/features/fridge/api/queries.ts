import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createSnack,
  deleteSnack,
  getSnacks,
  updateSnackStatus,
} from "./fridgeApi";
import type {
  CreateSnackRequest,
  UpdateStatusRequest,
} from "../model/types";

export const fridgeKeys = {
  all: ["fridge"] as const,
  snacks: () => [...fridgeKeys.all, "snacks"] as const,
};

export const useSnacks = () => {
  return useQuery({
    queryKey: fridgeKeys.snacks(),
    queryFn: getSnacks,
  });
};

export const useCreateSnack = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: CreateSnackRequest) => createSnack(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: fridgeKeys.snacks() });
    },
  });
};

export const useUpdateSnackStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: UpdateStatusRequest }) =>
      updateSnackStatus(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: fridgeKeys.snacks() });
    },
  });
};

export const useDeleteSnack = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteSnack(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: fridgeKeys.snacks() });
    },
  });
};
