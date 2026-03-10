# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun run dev          # Start dev server on port 3000
bun run build        # tsc -b && vite build
bun run lint         # biome lint .
bun run lint:fix     # biome check --write . (auto-fix)
bun run format       # biome format . --write
bun run chakra:add   # Add Chakra UI component snippets to src/shared/ui
```

## Architecture

This project uses **Feature-Sliced Design (FSD)**. Layers are strictly ordered — lower layers cannot import from higher ones:

```
app/      ← application init, providers, global styles
pages/    ← page components (composed from widgets/features)
widgets/  ← large self-contained UI blocks
features/ ← user interactions (actions, forms)
entities/ ← business domain objects
shared/   ← reusable primitives with no business logic
```

## Key Conventions

**Path aliases** (defined in `tsconfig.app.json` + `vite.config.ts`):
- `@/*` → `src/*`
- `@/shared/*` → `src/shared/*`

**Linting/Formatting**: Biome (not ESLint/Prettier) is the primary tool. Double quotes, 2-space indent, 80-char line width.

**Chakra UI v3**: All UI components use Chakra UI v3. Full LLM-friendly docs are available at `.ai/chakraui/llms-full.txt` — consult this file for component APIs.

**Theme**: Custom tokens are defined in `src/shared/config/theme.ts`. Semantic tokens: `primary`, `secondary`, `background`, `foreground`, `surface`, `card` (each has light/dark variants). Color palette: plum, slate, crimson, peach.

**Color mode**: Handled via `next-themes` + Chakra. Use `useColorMode` and `useColorModeValue` from `src/shared/ui/color-mode.tsx`.

**Providers**: Wrap new providers in `src/shared/ui/provider.tsx` (currently wraps `ChakraProvider` + `ColorModeProvider`).

## Chakra UI Component Snippets

When adding Chakra UI components (toaster, tooltip, etc.), use `bun run chakra:add` to output snippets into `src/shared/ui/`. Do not write these manually.
