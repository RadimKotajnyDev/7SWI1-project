# Agent Instructions: Kancl.IO Frontend

## Project Context
You are an expert frontend developer building "Kancl.IO", a practical and fun office management application.
The backend is built in .NET and resides in a separate repository. Your focus is strictly on the frontend implementation.

## Tech Stack
*   **Package Manager:** Bun
*   **Linter/Formatter:** Biome
*   **Build Tool:** Vite
*   **Framework:** React
*   **UI Library:** ChakraUI
*   **Routing:** Tanstack Router

## Architecture: Feature-Sliced Design (FSD)
Strictly adhere to the FSD methodology. Organize the `src` directory into the following layers:
1.  **app:** App-wide settings, styles, and providers.
2.  **pages:** Routing components built from widgets, features, and entities.
3.  **widgets:** Compositional blocks grouping features and entities.
4.  **features:** User interactions and business value (e.g., AuthForm, ScanQR).
5.  **entities:** Business entities (e.g., User, FridgeItem, Snack).
6.  **shared:** Reusable UI components, API instances, and utilities.

## MCP Tooling Constraints
*   **UI Components:** You MUST use the ChakraUI MCP to look up, design, and implement user interface components. Rely on it for accurate ChakraUI syntax and best practices.
*   **File Management:** You MUST use the Jetbrains MCP for all file system operations (creating, reading, updating, and deleting files).

## Coding Standards
*   Use TypeScript strictly.
*   Enforce Biome for formatting and linting.
*   Do not comment code. Ensure the code is readable and self-explanatory through naming conventions.

## Feature Implementation Guide

### 1. Infrastructure (Priority: Critical)
Implement a robust authentication flow.
*   **Registration:** If the user lacks an account, register and establish the session, then issue a `POST /userProfile` to create the profile.
*   **Login:** Returns a JWT and sets a refresh token in secure HttpOnly cookies. After successful login, fetch `GET /userProfile`.
*   **Interceptor:** Configure an API client (e.g., Axios or native fetch) to intercept `401 Unauthorized` responses. On `401`, automatically call the refresh endpoint to obtain a new JWT and set the new refresh token in cookies, then retry the failed request.

### 2. Admin Dashboard (Priority: Critical)
*   Build views under `pages/admin`.
*   Implement role management features.
*   Display basic system statistics and metrics.

### 3. Shared Fridge (Priority: High)
*   Create a feature to generate QR codes for individual fridge items.
*   Implement a scanning interface (or handle scanned input) to display the item owner's details.
*   Store items logically in `entities/fridge-item`.

### 4. Snack Inventory and Wishlist (Priority: High)
*   Implement standard CRUD operations for the fridge inventory.
*   Create a "Wishlist" feature for users to request items to be bought.

### 5. Coffee Roulette (Priority: Low - Fun Feature)
*   Implement a randomized selection algorithm.
*   **Modes:**
    *   Select a random user to clean the coffee machine.
    *   Select a random pair of users for a "Coffee Break".
*   Keep the UI playful and engaging.

### 6. Dopamine Reward System (Priority: Low - Fun Feature)
*   Integrate an XP system tied to user actions.
*   Implement user levels and an achievement showcase.
*   Hide "Easter eggs" throughout the UI that grant bonus XP when discovered.