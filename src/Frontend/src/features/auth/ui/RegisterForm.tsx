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
import { useRegister } from "../api/queries";

interface RegisterFormProps {
  onSuccess?: () => void;
}

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const { mutate: registerUser, isPending, error } = useRegister(username);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    registerUser({ email, password }, { onSuccess });
  };

  return (
    <Box as="form" onSubmit={handleSubmit} w="full" maxW="sm">
      <Stack gap={4}>
        <Heading size="lg">Create account</Heading>

        <Field.Root required>
          <Field.Label>Username</Field.Label>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="johndoe"
          />
        </Field.Root>

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
            {error instanceof Error ? error.message : "Registration failed"}
          </Text>
        )}

        <Button type="submit" loading={isPending} w="full">
          Create account
        </Button>
      </Stack>
    </Box>
  );
};
