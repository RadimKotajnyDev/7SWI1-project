import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        plum: {
          100: { value: "#e0d1eb" },
          200: { value: "#c6aedb" },
          300: { value: "#aa86c9" },
          400: { value: "#9165b6" },
          500: { value: "#7847a1" },
          600: { value: "#623686" },
          700: { value: "#512b70" },
          800: { value: "#432E54" },
          900: { value: "#2c1c3a" },
        },
        slate: {
          100: { value: "#dfddf0" },
          200: { value: "#c5c1e5" },
          300: { value: "#a59fda" },
          400: { value: "#8880cc" },
          500: { value: "#6b62bd" },
          600: { value: "#574e9e" },
          700: { value: "#4B4376" },
          800: { value: "#3a335d" },
          900: { value: "#282343" },
        },
        crimson: {
          100: { value: "#f8dbdf" },
          200: { value: "#f2b9c3" },
          300: { value: "#ea8d9e" },
          400: { value: "#e1667b" },
          500: { value: "#d0445f" },
          600: { value: "#AE445A" },
          700: { value: "#8d3145" },
          800: { value: "#722a3a" },
          900: { value: "#5f2533" },
        },
        peach: {
          100: { value: "#faebea" },
          200: { value: "#E8BCB9" },
          300: { value: "#dd9c97" },
          400: { value: "#d17c75" },
          500: { value: "#c45b53" },
          600: { value: "#9c453e" },
          700: { value: "#7c352f" },
          800: { value: "#652f2a" },
          900: { value: "#542925" },
        },
      },
    },
    semanticTokens: {
      colors: {
        primary: { value: "{colors.crimson.600}" },
        secondary: { value: "{colors.slate.700}" },
        background: {
          value: {
            _light: "{colors.peach.100}",
            _dark: "{colors.plum.900}",
          },
        },
        foreground: {
          value: {
            _light: "{colors.plum.900}",
            _dark: "{colors.peach.100}",
          },
        },
        surface: {
          value: {
            _light: "{colors.white}",
            _dark: "{colors.plum.800}",
          },
        },
        card: {
          value: {
            _light: "{colors.peach.200}",
            _dark: "{colors.slate.800}",
          },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
