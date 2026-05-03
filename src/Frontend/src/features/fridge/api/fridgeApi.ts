import { API_ENDPOINTS, axiosInstance } from "@/shared/api";
import type {
  CreateSnackRequest,
  SnackItem,
  UpdateStatusRequest,
} from "../model/types";

export const getSnacks = async (): Promise<SnackItem[]> => {
  const { data } = await axiosInstance.get<SnackItem[]>(
    API_ENDPOINTS.fridge.getAll,
  );
  return data;
};

export const createSnack = async (
  body: CreateSnackRequest,
): Promise<SnackItem> => {
  const { data } = await axiosInstance.post<SnackItem>(
    API_ENDPOINTS.fridge.create,
    body,
  );
  return data;
};

export const updateSnackStatus = async (
  id: string,
  body: UpdateStatusRequest,
): Promise<void> => {
  await axiosInstance.patch(API_ENDPOINTS.fridge.update(id), body);
};

export const deleteSnack = async (id: string): Promise<void> => {
  await axiosInstance.delete(API_ENDPOINTS.fridge.delete(id));
};
