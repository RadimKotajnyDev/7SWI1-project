import {
  Box,
  Flex,
  Heading,
  IconButton,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { LuArrowLeft } from "react-icons/lu";
import { SnackListTable, useSnacks } from "@/features/fridge";
import { ROUTES } from "@/app/routes/routes";

export const FridgePage = () => {
  const navigate = useNavigate();
  const { data: snacks, isLoading, error } = useSnacks();

  return (
    <Box minH="100vh" bg="bg">
      <Box
        as="nav"
        position="sticky"
        top={0}
        zIndex={100}
        bg="bg"
        borderBottom="2px solid"
        borderColor="border"
        px={{ base: 4, md: 8 }}
        py={3}
      >
        <Flex align="center" maxW="1200px" mx="auto">
          <IconButton
            variant="ghost"
            size="sm"
            onClick={() => navigate(ROUTES.HOME.path)}
            aria-label="Back to home"
          >
            <LuArrowLeft />
          </IconButton>
          <Text
            fontFamily="heading"
            fontWeight="800"
            fontSize="xl"
            color="#AB886D"
            letterSpacing="-0.03em"
            ml={2}
          >
            KANCL.IO / FRIDGE
          </Text>
          <Spacer />
        </Flex>
      </Box>

      <Box
        as="main"
        maxW="1200px"
        mx="auto"
        px={{ base: 4, md: 8 }}
        py={{ base: 8, md: 12 }}
      >
        <Stack gap={8}>
          <Stack gap={2}>
            <Heading
              as="h1"
              fontSize={{ base: "3xl", md: "5xl" }}
              fontFamily="heading"
              fontWeight="800"
              color="fg"
              letterSpacing="-0.04em"
              lineHeight="1"
            >
              Shared Fridge
            </Heading>
            <Text
              fontSize={{ base: "sm", md: "md" }}
              color="fg.muted"
              fontFamily="body"
              fontWeight="500"
            >
              Browse what's currently in the office fridge.
            </Text>
          </Stack>

          <Box
            bg="bg.subtle"
            border="3px solid"
            borderColor="border"
            borderRadius="md"
            overflow="hidden"
            boxShadow="md"
          >
            {isLoading ? (
              <Box p={8}>
                <Text>Loading snacks...</Text>
              </Box>
            ) : error ? (
              <Box p={8}>
                <Text color="red.500">Failed to load snacks.</Text>
              </Box>
            ) : snacks && snacks.length > 0 ? (
              <SnackListTable snacks={snacks} />
            ) : (
              <Box p={8} textAlign="center">
                <Text color="fg.muted">The fridge is empty! 🧊</Text>
              </Box>
            )}
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};
