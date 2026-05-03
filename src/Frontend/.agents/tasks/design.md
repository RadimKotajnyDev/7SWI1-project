# Kancl.IO — Design System

## Aesthetic Direction

**Coffee × Neobrutalism.**

Neobrutalism: thick visible borders, hard offset shadows (no blur), flat fills, raw typographic hierarchy. Coffee: warm espresso browns, coffee crema tones, wood grain — not orange, not amber, not red. Think the surface of a wooden café counter, a shot of espresso in natural light, crema on bark. The result feels like a handcrafted zine printed on cardstock, but for an office app.

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

### Core palette — 4 anchor colors

| Color | Hex | Name |
|-------|-----|------|
| Lightest | `#E4E0E1` | Warm gray mist |
| Light | `#D6C0B3` | Latte beige |
| Medium | `#AB886D` | Warm tan |
| Dark | `#493628` | Dark chocolate espresso |

Intermediates derived from anchors: `#C5AA97` (light muted), `#7A5F4B` (dark muted), `#5C4535` (near-dark).

### Semantic tokens

| Token | Light value | Dark value | Usage |
|-------|------------|-----------|-------|
| `bg` | `#E4E0E1` | `#493628` | Page background |
| `bg.subtle` | `#D6C0B3` | `#5C4535` | Card fills, input backgrounds |
| `bg.muted` | `#C5AA97` | `#7A5F4B` | Hover fills |
| `fg` | `#493628` | `#E4E0E1` | Primary text |
| `fg.muted` | `#7A5F4B` | `#D6C0B3` | Secondary / helper text |
| `border` | `#493628` | `#E4E0E1` | All borders (thick, always visible) |
| `brand` | `#AB886D` | `#AB886D` | Warm tan — primary accent |
| `brand.hover` | `#7A5F4B` | `#C4A98E` | Brand hover state |

### Accent palette (feature card accents — same in both modes)

| Token | Value | Used for |
|-------|-------|----------|
| `accent.fridge` | `#AB886D` | Shared Fridge card (tan) |
| `accent.snacks` | `#4A6FA5` | Snack Inventory card (muted steel blue) |
| `accent.coffee` | `#7A5F4B` | Coffee Roulette card (umber) |
| `accent.admin` | `#3D7A4A` | Admin Dashboard card (forest green) |

### Neobrutalism shadow color

| Token | Value | Notes |
|-------|-------|-------|
| `shadow.hard` | `#493628` (light) / `#E4E0E1` (dark) | Shadow color for hard offset shadows |

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
          DEFAULT: { value: "#8C5A3C" },
          hover: { value: "#8C5A3C" },
          light: { value: "#A87850" },
        },
        accent: {
          fridge: { value: "#8C5A3C" },
          snacks: { value: "#4A6FA5" },
          coffee: { value: "#C08552" },
          admin: { value: "#3D7A4A" },
        },
      },
      radii: {
        sm: { value: "2px" },
        md: { value: "4px" },
        lg: { value: "4px" },
        xl: { value: "4px" },
        "2xl": { value: "4px" },
        full: { value: "9999px" },
      },
    },
    semanticTokens: {
      colors: {
        bg: {
          DEFAULT: { value: { base: "#FFF8F0", _dark: "#4B2E2B" } },
          subtle: { value: { base: "#F2E1D0", _dark: "#5B3930" } },
          muted: { value: { base: "#E6CAB1", _dark: "#6C4434" } },
        },
        fg: {
          DEFAULT: { value: { base: "#4B2E2B", _dark: "#FFF8F0" } },
          muted: { value: { base: "#8C5A3C", _dark: "#C08552" } },
        },
        border: {
          DEFAULT: { value: { base: "#4B2E2B", _dark: "#FFF8F0" } },
        },
        shadow: {
          hard: { value: { base: "#4B2E2B", _dark: "#FFF8F0" } },
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
