# Kancl.IO — Design System

## Aesthetic Direction

**Coffee × Neobrutalism.**

Neobrutalism: thick visible borders, hard offset shadows (no blur), flat fills, raw typographic hierarchy. Coffee: warm espresso blacks, caramel ambers, cream whites — not pastels, not gradients. The result feels like a handcrafted zine printed on cardstock, but for an office app.

Rules:
- Every surface has a visible border
- Shadows are hard offsets — `4px 4px 0px` — no blur, no spread
- No border radius above `4px` (sharp, intentional corners)
- No glassmorphism, no gradients, no frosted backgrounds
- Colors are flat and warm — never cold grays or purple/blue neutrals
- Bold typography leads; body text supports

---

## Typography

| Role | Font | Weight | Notes |
|------|------|--------|-------|
| Display / Logo | Syne | 800 | Headings, wordmark |
| Body / UI | Space Grotesk | 400 / 500 / 600 | Labels, body, inputs |

Google Fonts import (already in `index.html`):
```
Syne: 700, 800
Space Grotesk: 400, 500, 600
```

Chakra UI token:
```ts
fonts: {
  heading: "'Syne', sans-serif",
  body: "'Space Grotesk', sans-serif",
}
```

---

## Color Tokens

### Core palette

| Token | Light value | Dark value | Usage |
|-------|------------|-----------|-------|
| `bg` | `#FDF0DC` | `#1A0A00` | Page background |
| `bg.subtle` | `#FAE8CC` | `#2D1200` | Card fills, input backgrounds |
| `bg.muted` | `#F5DDB0` | `#3D1A00` | Hover fills, table stripes |
| `fg` | `#1A0A00` | `#FDF0DC` | Primary text |
| `fg.muted` | `#7A4A1E` | `#C4915A` | Secondary / helper text |
| `border` | `#1A0A00` | `#FDF0DC` | All borders (thick, always visible) |
| `brand` | `#C87941` | `#C87941` | Caramel — primary accent |
| `brand.hover` | `#A85E28` | `#E09458` | Brand hover state |

### Accent palette (feature card accents — same in both modes)

| Token | Value | Used for |
|-------|-------|----------|
| `accent.fridge` | `#C87941` | Shared Fridge card |
| `accent.snacks` | `#5B6FE0` | Snack Inventory card |
| `accent.coffee` | `#D94F3D` | Coffee Roulette card |
| `accent.admin` | `#3D9E5C` | Admin Dashboard card |

### Neobrutalism shadow color

| Token | Value | Notes |
|-------|-------|-------|
| `shadow.hard` | `#1A0A00` (light) / `#FDF0DC` (dark) | Shadow color for hard offset shadows |

---

## Shadow Tokens

Neobrutalism uses **offset box shadows with zero blur and zero spread**. The shadow color matches the border color.

| Token | Value | Usage |
|-------|-------|-------|
| `shadow.sm` | `2px 2px 0px {shadow.hard}` | Buttons, badges |
| `shadow.md` | `4px 4px 0px {shadow.hard}` | Cards, panels (default) |
| `shadow.lg` | `6px 6px 0px {shadow.hard}` | Cards on hover |
| `shadow.none` | `none` | Active/pressed state |

Hover interaction pattern for cards:
- Default: `4px 4px 0px`
- Hover: `6px 6px 0px` + `translate(-2px, -2px)`
- Active/pressed: `0px 0px 0px` + `translate(4px, 4px)`

---

## Border Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `border.width` | `2px` | Standard border |
| `border.width.thick` | `3px` | Cards, prominent panels |
| `border.radius` | `4px` | All corners (sharp) |
| `border.radius.none` | `0px` | Buttons, inputs — fully square |
| `border.color` | `{fg}` | Always matches foreground |

**Rule:** Every interactive element and container has `border: {border.width.thick} solid {border.color}`.

---

## Spacing Scale

Standard Chakra spacing scale applies. Key values used throughout:

| Name | Value | Usage |
|------|-------|-------|
| `space.1` | `4px` | Tight gaps (icon + label) |
| `space.2` | `8px` | Inline gaps |
| `space.4` | `16px` | Component padding |
| `space.6` | `24px` | Card padding |
| `space.8` | `32px` | Section gaps |
| `space.12` | `48px` | Page vertical rhythm |

---

## Component Specs

### Card

```
border: 3px solid {border.color}
border-radius: 4px
background: {bg.subtle}
box-shadow: 4px 4px 0px {shadow.hard}
padding: 24px

hover:
  box-shadow: 6px 6px 0px {shadow.hard}
  transform: translate(-2px, -2px)

active:
  box-shadow: 0px 0px 0px
  transform: translate(4px, 4px)
```

### Button (primary)

```
border: 2px solid {border.color}
border-radius: 0px
background: {brand}
color: {fg}                        ← dark text on caramel
box-shadow: 2px 2px 0px {shadow.hard}
font-weight: 600
font-family: Space Grotesk

hover:
  box-shadow: 4px 4px 0px {shadow.hard}
  transform: translate(-2px, -2px)

active:
  box-shadow: 0px 0px 0px
  transform: translate(2px, 2px)
```

### Button (ghost / nav)

```
border: 2px solid transparent
border-radius: 0px
background: transparent

hover:
  border-color: {border.color}
  background: {bg.muted}
  box-shadow: 2px 2px 0px {shadow.hard}
```

### Input

```
border: 2px solid {border.color}
border-radius: 0px
background: {bg.subtle}
font-family: Space Grotesk

focus:
  box-shadow: 4px 4px 0px {brand}
  outline: none
```

### Navbar

```
background: {bg}                   ← flat, no blur/frosted glass
border-bottom: 2px solid {border.color}
padding: 12px 32px
position: sticky
```

### Menu / Dropdown

```
border: 2px solid {border.color}
border-radius: 4px
background: {bg}
box-shadow: 4px 4px 0px {shadow.hard}
padding: 0

header section:
  border-bottom: 2px solid {border.color}
  padding: 12px 16px

item:
  padding: 8px 16px
  border-radius: 0px
  font-family: Space Grotesk

  hover:
    background: {bg.muted}
```

---

## Chakra UI v3 Custom System

Implement via `createSystem` in `src/shared/ui/theme.ts`:

```ts
import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
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
        },
        accent: {
          fridge: { value: "#C87941" },
          snacks: { value: "#5B6FE0" },
          coffee: { value: "#D94F3D" },
          admin: { value: "#3D9E5C" },
        },
      },
      radii: {
        sm: { value: "2px" },
        md: { value: "4px" },
        lg: { value: "4px" },
        xl: { value: "4px" },
        "2xl": { value: "4px" },
        full: { value: "9999px" },   // avatars only
      },
    },
    semanticTokens: {
      colors: {
        bg: {
          DEFAULT: { value: { base: "#FDF0DC", _dark: "#1A0A00" } },
          subtle: { value: { base: "#FAE8CC", _dark: "#2D1200" } },
          muted: { value: { base: "#F5DDB0", _dark: "#3D1A00" } },
        },
        fg: {
          DEFAULT: { value: { base: "#1A0A00", _dark: "#FDF0DC" } },
          muted: { value: { base: "#7A4A1E", _dark: "#C4915A" } },
        },
        border: {
          DEFAULT: { value: { base: "#1A0A00", _dark: "#FDF0DC" } },
        },
        shadow: {
          hard: { value: { base: "#1A0A00", _dark: "#FDF0DC" } },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
```

Then replace `defaultSystem` in `src/shared/ui/provider.tsx`:
```ts
import { system } from "./theme";
// ...
<ChakraProvider value={system}>
```

---

## Do's and Don'ts

| Do | Don't |
|----|-------|
| Use hard offset shadows | Use blurred/spread shadows |
| Use flat, warm fills | Use gradients or glassmorphism |
| Use thick visible borders everywhere | Use borderless or ghost-only surfaces |
| Use sharp corners (≤4px) | Use large border radius (xl, 2xl, full — except avatars) |
| Use `translate` on hover to simulate shadow movement | Use `scale` transforms |
| Keep accent colors bold and flat | Tint/lighten accent colors with opacity |
| Use Syne 800 for headings | Use Inter, Roboto, or system fonts |
