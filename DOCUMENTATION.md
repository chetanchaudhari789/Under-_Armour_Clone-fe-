# Under Armour Clone - Detailed Project Documentation

This document provides a comprehensive, file-by-file and directory-by-directory breakdown of the **Under Armour Clone** frontend application.

---

## 1. Project Overview & Architecture

**Project Name:** `next-ua-clone`
**Description:** A fully-featured e-commerce frontend clone of the Under Armour web experience.
**Tech Stack:**
- **Framework:** Next.js 14.0.3 (Hybrid architecture: App Router & Pages Router)
- **Library:** React 18
- **State Management:** Zustand 5.0.12 (Migrated from legacy Context API)
- **Styling:** CSS Modules, Tailwind CSS 3.4, PostCSS
- **Data Fetching:** Axios, `@tanstack/react-query` (v5)
- **UI & Components:** React Icons, React Loader Spinner, Swiper, React Star Ratings, React Hot Toast
- **Utilities:** `date-fns` for time formatting, `js-cookie` for cookie management.

The architecture employs a **Feature-Sliced Design (FSD)** variation, primarily seen in the `src/imports` and `src/components` directories, encapsulating styles, UI, and logic by domain (e.g., auth, product, cart).

---

## 2. Directory Structure Deep-Dive

### Root Directory (`/`)
- **Configuration Files:**
  - `package.json` / `package-lock.json` / `pnpm-lock.yaml`: Dependency declarations and build scripts (`dev`, `build`, `start`, `lint`, `sandbox`).
  - `next.config.js`: Next.js core configurations, API routing rewrites, and image domain setups.
  - `tailwind.config.js` & `postcss.config.js`: Configuration for Tailwind utilities and PostCSS plugins (Autoprefixer).
  - `.eslintrc.json`: ESLint configuration extending `next/core-web-vitals`.
  - `jsconfig.json`: Path resolution configuration (enabling absolute imports).
- **Documentation:**
  - `README.md`: Basic introduction and startup instructions.
  - `DOCUMENTATION.md`: This comprehensive file.

### Public Assets (`/public`)
Static assets served directly at the root URL.
- **`/fonts`**: Contains the custom `NeuePlak` font family (`Bold`, `Regular`, `ExtendedXBlack`, etc.) critical to the Under Armour brand aesthetic.
- **`/imgs`**: E-commerce assets.
  - SVG logos for payment providers (`visa`, `paypal`, `mastercard`, `klarna`).
  - Brand SVGs (`menulogo`, `underarmourfooterlogo`).
  - Product image folders (e.g., `10001/`, `10002/`, `10003/`) and `index/` containing `.webp` and `.jpg` imagery.
- **`/videos`**: Promotional and product teaser videos (e.g., `10001/dt-teaser-video.mp4`).

---

## 3. Source Code (`/src`)

The `/src` folder contains all application logic, components, and routing.

### 3.1 Next.js App Router (`src/app`)
The modern Next.js 14 routing paradigm.
- **`layout.js`**: The Root Layout wrapping the entire application. Initializes global font styles, providers, and HTML structure.
- **`page.js`**: The index/home page component rendered at `/`.
- **`not-found.js`**: Global 404 fallback page for the App Router.
- **`ReactQueryProvider.js`**: A client-side wrapper to instantiate and provide the TanStack `QueryClient` to the component tree.
- **Feature Routes**:
  - `cart/`: Shopping cart page and checkout flow layout.
  - `category/`: Category listing pages (e.g., Men, Women, Shoes).
  - `product/`: Product detail pages (PDP) mapped to specific product IDs.

### 3.2 Next.js Pages Router (`src/pages`)
Legacy Next.js routing, coexisting with the App Router.
- **`_app.js`**: Custom app wrapper for Pages Router (legacy layouts and global CSS imports).
- **`_document.js`**: Custom document structure for injecting fonts and meta tags.
- **`404.jsx`**: Custom 404 error page.
- **`index.jsx`**: Potential legacy entry point (often superseded by App Router if conflicts are resolved).
- **`api/`**: Backend-for-Frontend (BFF) API routes for proxying requests or handling server-side logic securely.
- **Dynamic Routes**:
  - `c/` (Categories).
  - `cart/`.
  - `p/` (Products).

### 3.3 Reusable Components (`src/components`)
Dumb/Presentational components and global UI elements.
- **`404/`**: UI specific to the "Not Found" page.
- **`button/`**: Reusable button variants (primary action, close/X, sliders).
- **`modals/`**: Portaled UI overlays. Includes `Bag` (mini-cart), `Nav` (mobile navigation), `Auth` (login/register).
- **`navbar/` & `sidebar/`**: Global site navigation elements, responsive headers, and category sidebars.
- **`product/`**: Reusable product cards used in grids and recommendation carousels.
- **`portals/`**: Utilities for mounting components outside the standard DOM hierarchy (e.g., for modals).
- **`svgs/`**: Reusable raw SVG components.

### 3.4 Feature Domains (`src/imports`)
Encapsulated domain logic and complex UI compositions.
- **`auth/`**: Registration forms, login flows, and authentication state hooks.
- **`cart/`**: Order summary, cart item listings, promo code inputs, and checkout logic.
- **`category/`**: Filtering logic, product grids, and sorting mechanisms for category views.
- **`home/`**: Hero banners, promotional teasers, and curated product carousels for the landing page.
- **`product/`**: Product Detail Page (PDP) specific components: image galleries, size selectors, spec accordions, and customer reviews.

### 3.5 Global State Management (`src/zustand`)
Zustand stores driving global interactivity without prop-drilling or Context re-render issues.
- **`useAuthStore.js`**: Manages user session, token storage, and authentication status.
- **`useBagStore.js`**: Manages cart items, quantities, subtotal calculations, and mini-cart visibility.
- **`useCoreStore.js`**: High-level application state (e.g., user preferences).
- **`useLoadingStore.js`**: Controls global loading overlays and spinners.
- **`useNavBarStore.js`**: Handles complex dropdown states, hover intents, and active menus.
- **`useProductStore.js`**: Caches and manages the active product being viewed.
- **`useSideBarStore.js`**: Toggles the mobile/category sidebar state.

### 3.6 Legacy Contexts (`src/context` & `src/shared/context`)
*Note: Being actively migrated to Zustand.* Contains legacy React Context providers (e.g., `bag.context.jsx`, `nav.context.jsx`). These are retained for backwards compatibility with older components not yet refactored.

### 3.7 Custom Hooks (`src/hooks` & `src/shared/hooks`)
- **`useImageSlider.hook.js`**: Logic for swipeable/draggable image carousels.
- **`usePagination.hook.jsx`**: Handles pagination logic for reviews and product grids.
- **`usePopUpEffect.hook.js`**: Manages scroll locking and focus trapping for modals.
- **`useIsSSRSkipped.hook.js`**: Utility to avoid hydration mismatches by ensuring client-side rendering for specific dynamic components.

### 3.8 Utilities & Lib (`src/lib`, `src/helper`, `src/utils`)
- **`route-observer.js`**: Tracks route changes for analytics or navigation history.
- **`server-helpers.js`**: Utilities utilized specifically inside server components or `getServerSideProps`.
- **`helper.js` & `data.js`**: Static data dictionaries and pure functions for data transformation (e.g., currency formatting).

### 3.9 Styles (`src/styles`)
- **`globals.css`**: The core stylesheet importing Tailwind bases, components, and utilities. It also defines custom font-face declarations (NeuePlak) and base CSS variables.

---

## 4. Development & Contribution Guidelines

### State Management
- Prefer **Zustand** (`src/zustand`) for all new global state. Avoid adding to the legacy Contexts.
- Keep stores atomic and focused on single domains.

### Styling
- Use **Tailwind CSS** for layout, spacing, and typography to maintain consistency.
- Use **CSS Modules** (`[name].module.css`) for complex, component-specific animations or legacy styles that don't map cleanly to Tailwind utilities.

### Component Architecture
- Place purely presentational components in `src/components`.
- Place domain-specific, logic-heavy components in `src/imports/[domain]`.
- Ensure all new API requests utilize `@tanstack/react-query` for robust caching and loading states.

---
*Documentation Generated automatically on branch `feature/comprehensive-docs`.*
