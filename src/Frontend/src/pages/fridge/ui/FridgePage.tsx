import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { LuArrowLeft, LuPlus } from "react-icons/lu";
import {
  AddSnackDialog,
  SnackListTable,
  useCreateSnack,
  useDeleteSnack,
  useSnacks,
  useUpdateSnackStatus,
  type SnackStatus,
} from "@/features/fridge";
import { ROUTES } from "@/app/routes/routes";

export const FridgePage = () => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: snacks, isLoading, error } = useSnacks();
  const { mutate: createSnack, isPending: isCreating } = useCreateSnack();
  const {
    mutate: updateStatus,
    isPending: isUpdating,
    variables: updateVars,
  } = useUpdateSnackStatus();
  const {
    mutate: deleteSnack,
    isPending: isDeleting,
    variables: deleteVars,
  } = useDeleteSnack();

  const pendingId =
    (isUpdating && updateVars?.id) ||
    (isDeleting && typeof deleteVars === "string" && deleteVars) ||
    null;

  const handleUpdateStatus = (id: string, status: SnackStatus) => {
    updateStatus({ id, body: { status } });
  };

  const handleDelete = (id: string) => {
    deleteSnack(id);
  };

  const handleAddSnack = (name: string, fridgeLocation: string) => {
    createSnack(
      { name, fridgeLocation },
      { onSuccess: () => setIsDialogOpen(false) },
    );
  };

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
          <Flex align="flex-end" justify="space-between" gap={4}>
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
            <Button
              onClick={() => setIsDialogOpen(true)}
              bg="#AB886D"
              color="fg"
              border="2px solid"
              borderColor="border"
              borderRadius="none"
              fontWeight="700"
              fontFamily="body"
              boxShadow="xs"
              flexShrink={0}
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
              <LuPlus />
              Add Snack
            </Button>
          </Flex>

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
              <SnackListTable
                snacks={snacks}
                onUpdateStatus={handleUpdateStatus}
                onDelete={handleDelete}
                pendingId={pendingId}
              />
            ) : (
              <Box p={8} textAlign="center">
                <Text color="fg.muted">The fridge is empty! 🧊</Text>
              </Box>
            )}
          </Box>
        </Stack>
      </Box>

      <AddSnackDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleAddSnack}
        isPending={isCreating}
      />
    </Box>
  );
};
