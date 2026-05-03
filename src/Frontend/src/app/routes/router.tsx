import { createBrowserRouter, Navigate } from "react-router";
import { LoginPage } from "@/pages/login";
import { RegisterPage } from "@/pages/register";
import { ROUTES } from "./routes";

export const router = createBrowserRouter([
  {
    index: true,
    element: <Navigate to={ROUTES.LOGIN.path} replace />,
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
    element: <Navigate to={ROUTES.LOGIN.path} replace />,
  },
]);
