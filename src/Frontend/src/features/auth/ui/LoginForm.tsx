import {
  Box,
  Button,
  Field,
  Heading,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { type FormEvent, useState } from "react";
import { Link as RouterLink } from "react-router";
import { useLogin } from "../api/queries";

interface LoginFormProps {
  onSuccess?: () => void;
}

const INPUT_STYLES = {
  border: "2px solid",
  borderColor: "border",
  borderRadius: "none",
  bg: "bg",
  fontFamily: "body",
  _focusVisible: {
    boxShadow: "4px 4px 0px #AB886D",
    borderColor: "#AB886D",
    outline: "none",
  },
} as const;

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: login, isPending, error } = useLogin();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    login({ email, password }, { onSuccess });
  };

  return (
    <Box as="form" onSubmit={handleSubmit} w="full">
      <Stack gap={6}>
        <Heading
          fontFamily="heading"
          fontWeight="800"
          fontSize="2xl"
          color="fg"
          letterSpacing="-0.02em"
        >
          Sign in
        </Heading>

        <Stack gap={4}>
          <Field.Root required>
            <Field.Label fontWeight="600" color="fg" fontFamily="body">
              Email
            </Field.Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              {...INPUT_STYLES}
            />
          </Field.Root>

          <Field.Root required>
            <Field.Label fontWeight="600" color="fg" fontFamily="body">
              Password
            </Field.Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              {...INPUT_STYLES}
            />
          </Field.Root>
        </Stack>

        {error && (
          <Box border="2px solid" borderColor="#9B3520" p={3}>
            <Text color="#9B3520" fontSize="sm" fontWeight="600">
              {error instanceof Error ? error.message : "Login failed"}
            </Text>
          </Box>
        )}

        <Button
          type="submit"
          loading={isPending}
          w="full"
          bg="#AB886D"
          color="fg"
          border="2px solid"
          borderColor="border"
          borderRadius="none"
          fontWeight="700"
          fontFamily="body"
          boxShadow="xs"
          transition="all 0.15s ease"
          _hover={{
            bg: "#AB886D",
            boxShadow: "3px 3px 0px var(--chakra-colors-border)",
            transform: "translate(-2px, -2px)",
          }}
          _active={{
            boxShadow: "none",
            transform: "translate(2px, 2px)",
          }}
        >
          Sign in
        </Button>

        <Text fontSize="sm" textAlign="center" color="fg.muted" fontFamily="body">
          No account?{" "}
          <Link
            asChild
            fontWeight="700"
            color="fg"
            textDecoration="underline"
            textUnderlineOffset="3px"
          >
            <RouterLink to="/register">Register</RouterLink>
          </Link>
        </Text>
      </Stack>
    </Box>
  );
};
