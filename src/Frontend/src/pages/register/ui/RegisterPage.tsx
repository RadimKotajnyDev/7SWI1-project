import { Center } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { RegisterForm } from "@/features/auth";

export const RegisterPage = () => {
  const navigate = useNavigate();

  return (
    <Center minH="100vh" px={4}>
      <RegisterForm onSuccess={() => navigate("/")} />
    </Center>
  );
};
