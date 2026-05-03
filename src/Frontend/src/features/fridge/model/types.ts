export const SnackStatus = {
  InStock: 0,
  RunningLow: 1,
  OutOfStock: 2,
  Ordered: 3,
} as const;

export type SnackStatus = (typeof SnackStatus)[keyof typeof SnackStatus];

export interface SnackItem {
  id: string;
  name: string;
  fridgeLocation: string;
  status: SnackStatus;
}

export interface CreateSnackRequest {
  name: string;
  fridgeLocation: string;
}

export interface UpdateStatusRequest {
  status: SnackStatus;
}
