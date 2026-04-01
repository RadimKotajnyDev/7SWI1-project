import { Center } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { LoginForm } from "@/features/auth";

export const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <Center minH="100vh" px={4}>
      <LoginForm onSuccess={() => navigate("/")} />
    </Center>
  );
};
