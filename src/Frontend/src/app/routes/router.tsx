import { createBrowserRouter, Navigate } from "react-router";
import { LoginPage } from "@/pages/login";
import { RegisterPage } from "@/pages/register";
import { HomePage } from "@/pages/home";
import { FridgePage } from "@/pages/fridge";
import { ProtectedRoute } from "@/shared/ui/protected-route";
import { ROUTES } from "./routes";

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME.path,
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.FRIDGE.path,
    element: (
      <ProtectedRoute>
        <FridgePage />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.LOGIN.path,
    element: <LoginPage />,
  },
  {
    path: ROUTES.REGISTER.path,
    element: <RegisterPage />,
  },
  {
    path: "*",
    element: <Navigate to={ROUTES.HOME.path} replace />,
  },
]);
