import {
  Box,
  Button,
  Field,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { type FormEvent, useState } from "react";
import { useLogin } from "../api/queries";

interface LoginFormProps {
  onSuccess?: () => void;
}

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: login, isPending, error } = useLogin();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    login({ email, password }, { onSuccess });
  };

  return (
    <Box as="form" onSubmit={handleSubmit} w="full" maxW="sm">
      <Stack gap={4}>
        <Heading size="lg">Sign in</Heading>

        <Field.Root required>
          <Field.Label>Email</Field.Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </Field.Root>

        <Field.Root required>
          <Field.Label>Password</Field.Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </Field.Root>

        {error && (
          <Text color="red.500" fontSize="sm">
            {error instanceof Error ? error.message : "Login failed"}
          </Text>
        )}

        <Button type="submit" loading={isPending} w="full">
          Sign in
        </Button>
      </Stack>
    </Box>
  );
};
