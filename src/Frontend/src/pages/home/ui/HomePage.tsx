import {
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Icon,
  Menu,
  Skeleton,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { clearAccessToken } from "@/shared/api";
import { ROUTES } from "@/app/routes/routes";
import {
  LuCoffee,
  LuLayoutDashboard,
  LuPackage,
  LuQrCode,
} from "react-icons/lu";
import type { IconType } from "react-icons";
import { useUserProfile } from "@/entities/user";
import { ColorModeButton } from "@/shared/ui/color-mode";

interface FeatureCardProps {
  label: string;
  description: string;
  icon: IconType;
  href: string;
  accentColor: string;
}

const FeatureCard = ({
  label,
  description,
  icon,
  href,
  accentColor,
}: FeatureCardProps) => {
  const navigate = useNavigate();

  return (
    <Box
      bg="bg.subtle"
      border="3px solid"
      borderColor="border"
      borderRadius="md"
      p={6}
      cursor="pointer"
      transition="all 0.15s ease"
      boxShadow="md"
      onClick={() => navigate(href)}
      _hover={{
        boxShadow: "6px 6px 0px var(--chakra-colors-border)",
        transform: "translate(-2px, -2px)",
      }}
      _active={{
        boxShadow: "none",
        transform: "translate(4px, 4px)",
      }}
    >
      <Stack gap={4}>
        <Flex
          w="44px"
          h="44px"
          border="2px solid"
          borderColor="border"
          align="center"
          justify="center"
          bg="bg"
        >
          <Icon as={icon} boxSize={5} color={accentColor} />
        </Flex>
        <Stack gap={1}>
          <Text
            fontSize="md"
            fontWeight="700"
            color="fg"
            fontFamily="heading"
            letterSpacing="-0.01em"
          >
            {label}
          </Text>
          <Text fontSize="sm" color="fg.muted" fontFamily="body">
            {description}
          </Text>
        </Stack>
      </Stack>
    </Box>
  );
};

const FEATURE_CARDS: FeatureCardProps[] = [
  {
    label: "Shared Fridge",
    description: "Scan QR codes, track what's inside",
    icon: LuQrCode,
    href: "/fridge",
    accentColor: "#C87941",
  },
  {
    label: "Snack Inventory",
    description: "Browse snacks, manage the wishlist",
    icon: LuPackage,
    href: "/snacks",
    accentColor: "#5B6FE0",
  },
  {
    label: "Coffee Roulette",
    description: "Who cleans the machine today?",
    icon: LuCoffee,
    href: "/coffee",
    accentColor: "#D94F3D",
  },
  {
    label: "Admin Dashboard",
    description: "Roles, stats, system controls",
    icon: LuLayoutDashboard,
    href: "/admin",
    accentColor: "#3D9E5C",
  },
];

export const HomePage = () => {
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
          <Text
            fontFamily="heading"
            fontWeight="800"
            fontSize="xl"
            color="#C87941"
            letterSpacing="-0.03em"
          >
            KANCL.IO
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
                    <Avatar.Root size="xs" bg="#C87941" color="fg">
                      <Avatar.Fallback>
                        {profile?.username?.charAt(0).toUpperCase() ?? "?"}
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
                      {profile?.username ?? "User"}
                    </Text>
                  )}
                </Button>
              </Menu.Trigger>
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
                    {profile?.username ?? "—"}
                  </Text>
                  <Text
                    fontSize="xs"
                    color="fg.muted"
                    fontFamily="body"
                  >
                    {profile?.email ?? "—"}
                  </Text>
                </Box>
                <Box p={1}>
                  <Menu.Item
                    value="logout"
                    color="#D94F3D"
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
            </Menu.Root>

            <Box
              w="2px"
              h="20px"
              bg="border"
              mx={1}
            />

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
        <Stack gap={10}>
          <Stack gap={2}>
            {isLoading ? (
              <Skeleton h="56px" w="320px" />
            ) : (
              <Heading
                as="h1"
                fontSize={{ base: "4xl", md: "6xl" }}
                fontFamily="heading"
                fontWeight="800"
                color="fg"
                letterSpacing="-0.04em"
                lineHeight="1"
              >
                Hey, {profile?.username ?? "there"}!
              </Heading>
            )}
            <Text
              fontSize={{ base: "sm", md: "md" }}
              color="fg.muted"
              fontFamily="body"
              fontWeight="500"
            >
              What are we doing at the office today?
            </Text>
          </Stack>

          <Grid
            templateColumns={{
              base: "1fr",
              sm: "repeat(2, 1fr)",
              lg: "repeat(4, 1fr)",
            }}
            gap={4}
          >
            {FEATURE_CARDS.map((card) => (
              <FeatureCard key={card.href} {...card} />
            ))}
          </Grid>
        </Stack>
      </Box>
    </Box>
  );
};
