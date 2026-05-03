import {
  createSystem,
  defaultConfig,
  defineConfig,
} from "@chakra-ui/react";

const config = defineConfig({
  globalCss: {
    "html, body": {
      bg: "bg",
      color: "fg",
      fontFamily: "body",
    },
  },
  theme: {
    tokens: {
      fonts: {
        heading: { value: "'Syne', sans-serif" },
        body: { value: "'Space Grotesk', sans-serif" },
      },
      colors: {
        brand: {
          DEFAULT: { value: "#C87941" },
          hover: { value: "#A85E28" },
          dark: { value: "#E09458" },
        },
        accent: {
          fridge: { value: "#C87941" },
          snacks: { value: "#5B6FE0" },
          coffee: { value: "#D94F3D" },
          admin: { value: "#3D9E5C" },
        },
        coffee: {
          50: { value: "#FDF0DC" },
          100: { value: "#FAE8CC" },
          200: { value: "#F5DDB0" },
          300: { value: "#E8C07A" },
          400: { value: "#C87941" },
          500: { value: "#A85E28" },
          600: { value: "#7A4A1E" },
          700: { value: "#4A2800" },
          800: { value: "#2D1200" },
          900: { value: "#1A0A00" },
        },
      },
      radii: {
        none: { value: "0px" },
        sm: { value: "2px" },
        md: { value: "4px" },
        lg: { value: "4px" },
        xl: { value: "4px" },
        "2xl": { value: "4px" },
        "3xl": { value: "4px" },
        full: { value: "9999px" },
      },
      shadows: {
        xs: { value: "2px 2px 0px var(--chakra-colors-border)" },
        sm: { value: "3px 3px 0px var(--chakra-colors-border)" },
        md: { value: "4px 4px 0px var(--chakra-colors-border)" },
        lg: { value: "6px 6px 0px var(--chakra-colors-border)" },
        xl: { value: "8px 8px 0px var(--chakra-colors-border)" },
      },
    },
    semanticTokens: {
      colors: {
        bg: {
          DEFAULT: {
            value: { base: "{colors.coffee.50}", _dark: "{colors.coffee.900}" },
          },
          subtle: {
            value: {
              base: "{colors.coffee.100}",
              _dark: "{colors.coffee.800}",
            },
          },
          muted: {
            value: {
              base: "{colors.coffee.200}",
              _dark: "{colors.coffee.700}",
            },
          },
        },
        fg: {
          DEFAULT: {
            value: { base: "{colors.coffee.900}", _dark: "{colors.coffee.50}" },
          },
          muted: {
            value: {
              base: "{colors.coffee.600}",
              _dark: "{colors.coffee.300}",
            },
          },
        },
        border: {
          DEFAULT: {
            value: { base: "{colors.coffee.900}", _dark: "{colors.coffee.50}" },
          },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
