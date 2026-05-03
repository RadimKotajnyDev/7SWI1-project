import { Navigate } from "react-router";
import type { ReactNode } from "react";
import { getAccessToken } from "@/shared/api";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  if (!getAccessToken()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};
