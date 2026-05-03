# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the Application

**Start the full stack (recommended):**
```bash
dotnet run --project src/AppHost/AppHost.csproj
```
The .NET Aspire AppHost orchestrates PostgreSQL, MigrationService, all microservices, the Gateway, and the Frontend. Check the Aspire dashboard for service URLs.

**Frontend only:**
```bash
cd src/Frontend
bun run dev       # Vite dev server on port 3000
bun run build     # TypeScript compile + Vite build
bun run preview   # Preview production build
```

**Frontend code quality:**
```bash
bun run lint        # Biome linter
bun run lint:fix    # Auto-fix linting issues
bun run format      # Biome formatter
bun run test        # Vitest unit tests
bun run test:watch  # Tests in watch mode
```

**Backend build:**
```bash
dotnet build
```

## Architecture Overview

This is a microservices application with a React SPA frontend.

### Backend (.NET 10 / ASP.NET Core)

- **AppHost** — .NET Aspire orchestrator. Controls startup order: PostgreSQL → MigrationService → microservices → Gateway → Frontend.
- **Gateway** — YARP reverse proxy. Validates JWT Bearer tokens and injects `X-User-Id` and `X-User-Roles` headers before forwarding to downstream services. Route prefixes:
  - `/api/auth/*` → AuthService
  - `/api/user/*` → UserService
  - `/api/fridge/*` → SharedFridgeService
- **AuthService** — Login, register, logout, token refresh, JWT issuance.
- **UserService** — User profile CRUD.
- **SharedFridgeService** — Snack item management.
- **MigrationService** — Worker that runs all EF Core migrations at startup before services start.
- **Infrastructure** — Shared EF Core entities (`Identity`, `User`, `SnackItem`) and separate DbContexts per service (`AuthDbContext`, `UserDbContext`, `SharedFridgeDbContext`). Migrations live here.
- **Shared** — `HeaderAuth` scheme (reads gateway-injected headers for downstream auth), JWT config helpers.
- **ServiceDefaults** — Aspire integration, OpenTelemetry, Serilog setup applied to all services.

All backend services use **FastEndpoints** (not MVC controllers). Endpoint classes live in `Features/` folders within each service.

### Frontend (React 19 / TypeScript / Vite)

Feature-Sliced Design structure under `src/Frontend/src/`:
- `app/` — Router, providers, global setup
- `pages/` — Route-level page components
- `features/` — Business feature modules
- `entities/` — Domain entities
- `widgets/` — Composite UI blocks
- `shared/` — API client, utilities, UI primitives

Key libraries: **Chakra UI** (components), **TanStack React Query** (server state), **Axios** (HTTP), **React Router 7** (routing).

The Vite dev server proxies `/api/*` to the Gateway. The Axios instance reads JWT from `localStorage` via `tokenStorage.ts`.

### Authentication Flow

1. Frontend POSTs credentials to `/api/auth/login` → Gateway → AuthService
2. AuthService returns JWT + refresh token
3. Frontend stores JWT in `localStorage`
4. Subsequent requests include `Authorization: Bearer <token>`
5. Gateway validates JWT, strips it, and injects `X-User-Id` / `X-User-Roles` headers
6. Downstream services authenticate via `HeaderAuth` scheme (no JWT re-validation)

### Database

PostgreSQL with EF Core. Each microservice has its own `DbContext` scoped to its schema. All migrations are defined in the `Infrastructure` project and applied by `MigrationService` at startup.

## Code Style

**Backend:** Standard C# conventions. FastEndpoints pattern — one class per endpoint.

**Frontend:** Biome enforces 80-char line width, 2-space indent, double quotes. Run `npm run lint:fix` before committing.
