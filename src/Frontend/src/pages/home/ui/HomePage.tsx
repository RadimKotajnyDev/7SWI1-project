import {
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Icon,
  Menu,
  Separator,
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
import {
  ColorModeButton,
  useColorModeValue,
} from "@/shared/ui/color-mode";

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
  const cardBg = useColorModeValue("#FFFAF5", "#1E1E2E");
  const borderColor = useColorModeValue("#E8D5BB", "#2A2A3E");
  const textColor = useColorModeValue("#2D1B00", "#F5E6D0");
  const subtextColor = useColorModeValue("#8B6347", "#9A8A7A");

  return (
    <Box
      display="block"
      bg={cardBg}
      border="2px solid"
      borderColor={borderColor}
      borderRadius="2xl"
      p={6}
      cursor="pointer"
      transition="all 0.2s ease"
      onClick={() => navigate(href)}
      _hover={{
        borderColor: accentColor,
        transform: "translateY(-4px)",
        boxShadow: `0 12px 32px -8px ${accentColor}44`,
      }}
      _active={{ transform: "translateY(-1px)" }}
    >
      <Stack gap={4}>
        <Box
          w="48px"
          h="48px"
          borderRadius="xl"
          bg={`${accentColor}22`}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Icon as={icon} boxSize={6} color={accentColor} />
        </Box>
        <Stack gap={1}>
          <Text
            fontSize="lg"
            fontWeight="600"
            color={textColor}
            fontFamily="'Space Grotesk', sans-serif"
          >
            {label}
          </Text>
          <Text
            fontSize="sm"
            color={subtextColor}
            fontFamily="'Space Grotesk', sans-serif"
          >
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
    accentColor: "#6B8CFF",
  },
  {
    label: "Coffee Roulette",
    description: "Who cleans the machine today?",
    icon: LuCoffee,
    href: "/coffee",
    accentColor: "#E05D5D",
  },
  {
    label: "Admin Dashboard",
    description: "Roles, stats, system controls",
    icon: LuLayoutDashboard,
    href: "/admin",
    accentColor: "#5DC87A",
  },
];

export const HomePage = () => {
  const navigate = useNavigate();
  const { data: profile, isLoading } = useUserProfile();

  const pageBg = useColorModeValue("#FDF6ED", "#13131F");
  const navBg = useColorModeValue(
    "rgba(253,246,237,0.85)",
    "rgba(19,19,31,0.85)",
  );
  const borderColor = useColorModeValue("#E8D5BB", "#2A2A3E");
  const headingColor = useColorModeValue("#2D1B00", "#F5E6D0");
  const subtitleColor = useColorModeValue("#8B6347", "#9A8A7A");
  const avatarBg = useColorModeValue("#C87941", "#6F3B00");

  return (
    <Box minH="100vh" bg={pageBg}>
      <Box
        as="nav"
        position="sticky"
        top={0}
        zIndex={100}
        bg={navBg}
        backdropFilter="blur(12px)"
        borderBottom="1px solid"
        borderColor={borderColor}
        px={{ base: 4, md: 8 }}
        py={3}
      >
        <Flex align="center" maxW="1200px" mx="auto">
          <Heading
            as="span"
            fontSize="2xl"
            fontFamily="'Syne', sans-serif"
            fontWeight="800"
            bgGradient="to-r"
            gradientFrom="#C87941"
            gradientTo="#E05D5D"
            bgClip="text"
            color="transparent"
            letterSpacing="-0.02em"
          >
            Kancl.IO
          </Heading>

          <Spacer />

          <Flex align="center" gap={3}>
            <Menu.Root>
              <Menu.Trigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  px={2}
                  gap={2}
                  fontFamily="'Space Grotesk', sans-serif"
                >
                  {isLoading ? (
                    <Skeleton
                      h="24px"
                      w="24px"
                      borderRadius="full"
                    />
                  ) : (
                    <Avatar.Root size="xs" bg={avatarBg} color="white">
                      <Avatar.Fallback>
                        {profile?.username?.charAt(0).toUpperCase() ?? "?"}
                      </Avatar.Fallback>
                    </Avatar.Root>
                  )}
                  {isLoading ? (
                    <Skeleton h="14px" w="60px" borderRadius="sm" />
                  ) : (
                    <Text
                      fontSize="sm"
                      fontWeight="600"
                      fontFamily="'Space Grotesk', sans-serif"
                    >
                      {profile?.username ?? "User"}
                    </Text>
                  )}
                </Button>
              </Menu.Trigger>
              <Menu.Content minW="200px" p={0} overflow="hidden">
                <Box
                  px={4}
                  py={3}
                  borderBottom="1px solid"
                  borderColor={borderColor}
                >
                  <Text
                    fontSize="sm"
                    fontWeight="700"
                    fontFamily="'Space Grotesk', sans-serif"
                  >
                    {profile?.username ?? "—"}
                  </Text>
                  <Text
                    fontSize="xs"
                    opacity={0.6}
                    fontFamily="'Space Grotesk', sans-serif"
                  >
                    {profile?.email ?? "—"}
                  </Text>
                </Box>
                <Box p={1}>
                  <Menu.Item
                    value="logout"
                    color="red.500"
                    fontFamily="'Space Grotesk', sans-serif"
                    borderRadius="md"
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

            <Separator
              orientation="vertical"
              h="20px"
              borderColor={borderColor}
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
              <Skeleton h="48px" w="300px" borderRadius="lg" />
            ) : (
              <Heading
                as="h1"
                fontSize={{ base: "3xl", md: "5xl" }}
                fontFamily="'Syne', sans-serif"
                fontWeight="800"
                color={headingColor}
                letterSpacing="-0.03em"
                lineHeight="1.1"
              >
                Hey, {profile?.username}!
              </Heading>
            )}
            <Text
              fontSize={{ base: "md", md: "lg" }}
              color={subtitleColor}
              fontFamily="'Space Grotesk', sans-serif"
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
