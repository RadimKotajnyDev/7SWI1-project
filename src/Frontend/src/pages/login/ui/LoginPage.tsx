import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { LoginForm } from "@/features/auth";
import { ROUTES } from "@/app/routes/routes";

export const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <Box minH="100vh" bg="bg">
      <Box
        h="6px"
        bg="#C87941"
        borderBottom="2px solid"
        borderColor="border"
      />

      <Flex
        minH="calc(100vh - 8px)"
        align="center"
        justify="center"
        px={4}
        py={12}
      >
        <Stack w="full" maxW="420px" gap={8}>
          <Stack gap={1}>
            <Text
              fontFamily="heading"
              fontWeight="800"
              fontSize="5xl"
              color="fg"
              letterSpacing="-0.04em"
              lineHeight="1"
            >
              KANCL.IO
            </Text>
            <Text color="fg.muted" fontSize="sm" fontWeight="500" fontFamily="body">
              Office management, made fun.
            </Text>
          </Stack>

          <Box
            bg="bg.subtle"
            border="3px solid"
            borderColor="border"
            boxShadow="lg"
            p={8}
          >
            <LoginForm onSuccess={() => navigate(ROUTES.HOME.path)} />
          </Box>
        </Stack>
      </Flex>
    </Box>
  );
};
