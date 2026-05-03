import {
  Avatar,
  Box,
  Button,
  Flex,
  Menu,
  Portal,
  Skeleton,
  Spacer,
  Text,
} from "@chakra-ui/react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router";
import { LuArrowLeft } from "react-icons/lu";
import { clearAccessToken } from "@/shared/api";
import { ROUTES } from "@/app/routes/routes";
import { useUserProfile } from "@/entities/user";
import { ColorModeButton } from "@/shared/ui/color-mode";

interface AppLayoutProps {
  children: ReactNode;
  subtitle?: string;
  backHref?: string;
}

export const AppLayout = ({ children, subtitle, backHref }: AppLayoutProps) => {
  const navigate = useNavigate();
  const { data: profile, isLoading } = useUserProfile();

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
          {backHref && (
            <Button
              variant="ghost"
              size="sm"
              px={2}
              mr={2}
              borderRadius="none"
              onClick={() => navigate(backHref)}
              aria-label="Back"
            >
              <LuArrowLeft />
            </Button>
          )}
          <Text
            fontFamily="heading"
            fontWeight="800"
            fontSize="xl"
            color="#AB886D"
            letterSpacing="-0.03em"
          >
            KANCL.IO{subtitle ? ` / ${subtitle}` : ""}
          </Text>

          <Spacer />

          <Flex align="center" gap={2}>
            <Menu.Root>
              <Menu.Trigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  px={2}
                  gap={2}
                  border="2px solid transparent"
                  borderRadius="none"
                  fontFamily="body"
                  transition="all 0.15s ease"
                  _hover={{
                    borderColor: "border",
                    bg: "bg.muted",
                    boxShadow: "xs",
                  }}
                >
                  {isLoading ? (
                    <Skeleton h="24px" w="24px" borderRadius="full" />
                  ) : (
                    <Avatar.Root size="xs" bg="#AB886D" color="fg">
                      <Avatar.Fallback>
                        {profile?.firstName?.charAt(0).toUpperCase() ?? "?"}
                      </Avatar.Fallback>
                    </Avatar.Root>
                  )}
                  {isLoading ? (
                    <Skeleton h="14px" w="60px" />
                  ) : (
                    <Text
                      fontSize="sm"
                      fontWeight="600"
                      color="fg"
                      fontFamily="body"
                    >
                      {profile
                        ? `${profile.firstName} ${profile.lastName}`
                        : "User"}
                    </Text>
                  )}
                </Button>
              </Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content
                    minW="200px"
                    p={0}
                    overflow="hidden"
                    border="2px solid"
                    borderColor="border"
                    borderRadius="md"
                    bg="bg"
                    boxShadow="md"
                  >
                    <Box
                      px={4}
                      py={3}
                      borderBottom="2px solid"
                      borderColor="border"
                      bg="bg.subtle"
                    >
                      <Text
                        fontSize="sm"
                        fontWeight="700"
                        fontFamily="body"
                        color="fg"
                      >
                        {profile
                          ? `${profile.firstName} ${profile.lastName}`
                          : "—"}
                      </Text>
                    </Box>
                    <Box p={1}>
                      <Menu.Item
                        value="logout"
                        color="#AB886D"
                        fontFamily="body"
                        fontWeight="600"
                        borderRadius="none"
                        _hover={{ bg: "bg.muted" }}
                        onClick={() => {
                          clearAccessToken();
                          navigate(ROUTES.LOGIN.path);
                        }}
                      >
                        Log out
                      </Menu.Item>
                    </Box>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>

            <Box w="2px" h="20px" bg="border" mx={1} />

            <ColorModeButton />
          </Flex>
        </Flex>
      </Box>

      <Box
        as="main"
        maxW="1200px"
        mx="auto"
        px={{ base: 4, md: 8 }}
        py={{ base: 8, md: 12 }}
      >
        {children}
      </Box>
    </Box>
  );
};
