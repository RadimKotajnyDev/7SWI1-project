import { createBrowserRouter, Navigate } from "react-router";
import { LoginPage } from "@/pages/login";
import { RegisterPage } from "@/pages/register";

export const router = createBrowserRouter([
  {
    index: true,
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);
