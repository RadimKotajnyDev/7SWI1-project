import {
  Box,
  Flex,
  Grid,
  Heading,
  Icon,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router";
import {
  LuCoffee,
  LuLayoutDashboard,
  LuPackage,
  LuQrCode,
} from "react-icons/lu";
import type { IconType } from "react-icons";
import { useUserProfile } from "@/entities/user";
import { AppLayout } from "@/widgets/app-layout";

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
    accentColor: "#AB886D",
  },
  {
    label: "Snack Inventory",
    description: "Browse snacks, manage the wishlist",
    icon: LuPackage,
    href: "/snacks",
    accentColor: "#4A6FA5",
  },
  {
    label: "Coffee Roulette",
    description: "Who cleans the machine today?",
    icon: LuCoffee,
    href: "/coffee",
    accentColor: "#AB886D",
  },
  {
    label: "Admin Dashboard",
    description: "Roles, stats, system controls",
    icon: LuLayoutDashboard,
    href: "/admin",
    accentColor: "#3D7A4A",
  },
];

export const HomePage = () => {
  const { data: profile, isLoading } = useUserProfile();

  return (
    <AppLayout>
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
              Hey, {profile?.firstName ?? "there"}!
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
    </AppLayout>
  );
};
