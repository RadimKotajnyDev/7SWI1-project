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
          DEFAULT: { value: "#AB886D" },
          hover: { value: "#7A5F4B" },
          light: { value: "#C4A98E" },
        },
        accent: {
          fridge: { value: "#AB886D" },
          snacks: { value: "#4A6FA5" },
          coffee: { value: "#7A5F4B" },
          admin: { value: "#3D7A4A" },
        },
        palette: {
          white: { value: "#E4E0E1" },
          mist: { value: "#D6C0B3" },
          dust: { value: "#C5AA97" },
          tan: { value: "#AB886D" },
          umber: { value: "#7A5F4B" },
          bark: { value: "#5C4535" },
          espresso: { value: "#493628" },
          darkMist: { value: "#5C4535" },
          darkDust: { value: "#7A5F4B" },
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
            value: {
              base: "{colors.palette.white}",
              _dark: "{colors.palette.espresso}",
            },
          },
          subtle: {
            value: {
              base: "{colors.palette.mist}",
              _dark: "{colors.palette.darkMist}",
            },
          },
          muted: {
            value: {
              base: "{colors.palette.dust}",
              _dark: "{colors.palette.darkDust}",
            },
          },
        },
        fg: {
          DEFAULT: {
            value: {
              base: "{colors.palette.espresso}",
              _dark: "{colors.palette.white}",
            },
          },
          muted: {
            value: {
              base: "{colors.palette.umber}",
              _dark: "{colors.palette.mist}",
            },
          },
        },
        border: {
          DEFAULT: {
            value: {
              base: "{colors.palette.espresso}",
              _dark: "{colors.palette.white}",
            },
          },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
