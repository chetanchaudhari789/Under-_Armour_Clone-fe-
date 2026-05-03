# Under Armour Clone Frontend - Project Documentation

## 1. Overview
The "next-ua-clone" is a fully-featured e-commerce frontend web application built as an Under Armour clone. It leverages Next.js (React) to provide server-side rendering (SSR), static site generation (SSG), and seamless client-side routing.

## 2. Tech Stack
- **Framework:** Next.js 14 (App Router & Pages Router architecture)
- **Library:** React 18
- **State Management:** Zustand
- **Styling:** CSS Modules, Tailwind CSS, PostCSS, and Autoprefixer
- **Data Fetching:** Axios, React Query (`@tanstack/react-query`)
- **UI Components:** React Icons, React Loader Spinner, Swiper, React Star Ratings, React Hot Toast
- **Utilities:** date-fns, js-cookie

## 3. Project Structure

The source code is primarily housed within the `src/` directory.

### `src/app/`
The Next.js 14 App Router directory containing layout and routing structure.
- `layout.js`, `page.js`: Root layout and home page structure.
- `not-found.js`: Global 404 handler.
- `ReactQueryProvider.js`: Wrapper for setting up TanStack Query Client.
- Features folders like `cart/`, `category/`, and `product/` mapping to specific routes.

### `src/pages/`
The legacy Pages Router, primarily containing API routes and specialized routes (`_app.js`, `_document.js`, `404.jsx`).

### `src/components/`
Reusable UI components used across multiple pages and views:
- `button/`: Various button types (Action, X-Button, Slider).
- `modals/`: Global modals (Bag, Nav, Auth, Loading, Confirm Action).
- `navbar/` & `sidebar/`: Navigation and sidebar components.
- `product/`: Common product components (cards, recommended).
- `portals/`: React portals for overlay rendering.

### `src/imports/`
This folder follows a feature-sliced design, encapsulating UI components, hooks, and logic specific to primary domains:
- `auth/`: Authentication UI and logic (Login, Signup modals).
- `cart/`: Cart page features and UI elements.
- `category/`: Category listing views and styling.
- `home/`: Home page variants and structural components.
- `product/`: Product detail page components (carousel, teasers, specs, reviews).

### `src/shared/`
Shared utilities, contexts, hooks, and global layouts.
- `context/`: Legacy React context implementations.
- `hooks/`: Custom React hooks (`useImageSlider`, `usePagination`, `usePopUpEffect`).
- `utils/`: Helpers and API request functions.

### `src/zustand/`
Global state management stores:
- `useAuthStore.js`: Authentication state.
- `useBagStore.js`: Shopping cart / bag state.
- `useCoreStore.js`: Core app-level state.
- `useLoadingStore.js`: Global loading indicator state.
- `useNavBarStore.js`: Navbar hovering and sub-menu state.
- `useProductStore.js`: Product-related data.
- `useSideBarStore.js`: Sidebar visibility state.

### `public/`
Static assets, including extensive images structured by product ID, fonts (`NeuePlak`), and SVG icons.

## 4. State Management (Zustand Migration)
The project utilizes Zustand for streamlined, hook-based global state. This removes the boilerplate associated with React Context providers and improves render performance. Stores map out explicit domains, such as bag functionality (`useBagStore`), authentication (`useAuthStore`), and UI layout state (`useSideBarStore`).

## 5. Styling Architecture
Styling is managed via a hybrid approach:
- **CSS Modules:** Each component typically has a corresponding `.module.css` file to guarantee scoped styling and prevent class collisions.
- **Tailwind CSS:** Integrated for rapid utility-class application and overall layout scaffolding (configured via `tailwind.config.js` and `postcss.config.js`).
- **Global CSS:** `src/styles/globals.css` introduces the base Tailwind directives and sets up custom fonts (`NeuePlak`).

## 6. Scripts & Commands
- `npm run dev`: Starts the Next.js development server.
- `npm run build`: Compiles and builds the Next.js application for production.
- `npm run start`: Starts a Next.js production server.
- `npm run lint`: Runs ESLint to catch syntax and styling issues.

## 7. Recent Architectural Changes
- Overhauled Next.js structure merging both App Router and Pages Router functionality.
- Transitioned global state from Context API into Zustand stores for performance and simplicity.
- Implemented Tailwind CSS alongside PostCSS to augment CSS modules.