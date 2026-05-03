# Under Armour Clone - Detailed Project Structure & File Documentation

This document provides an exhaustive, file-by-file breakdown of the `src` directory to help developers understand the exact purpose of every file in the project.

## `src/app/` (Next.js 14 App Router)
- `layout.js`: The Root Layout. Sets up HTML/body tags, global contexts, and Next.js providers.
- `not-found.js`: Custom 404 page for the App Router.
- `page.js`: The main entry point (Home Page) for the App Router.
- `ReactQueryProvider.js`: Client component wrapping the app in `@tanstack/react-query` provider.
- `cart/page.js`: App Router entry point for the shopping cart page.
- `category/[category]/page.js`: Dynamic route for category pages (e.g., Men, Women).
- `product/[...item]/page.js`: Dynamic catch-all route for the Product Detail Page.

## `src/pages/` (Next.js Pages Router - Legacy/Coexisting)
- `_app.js`: Custom App component for legacy pages router.
- `_document.js`: Custom Document component for injecting styles and scripts.
- `index.jsx`: Legacy home page (if App Router `page.js` is not active).
- `404.jsx`: Legacy 404 page.
- `api/hello.js`: Sample API endpoint.
- `c/[category].js`: Legacy category page entry point.
- `c/ua-category.module.css`: Styles for the legacy category page.
- `cart/index.js`: Legacy cart page.
- `cart/ua-cart.styles.module.css`: Styles for the legacy cart page.
- `p/[...item].jsx`: Legacy product detail page.
- `p/ua-product.styles.module.css`: Styles for the legacy product page.

## `src/components/` (Shared UI Components)
### 404
- `404.component.jsx` & `.module.css`: The UI component representing a missing page.
### Back Shadow
- `back-shadow.component.jsx`: Reusable dark overlay for modals and menus.
### Buttons
- `action-button/`: Primary CTA buttons used across the app (e.g., Add to Cart, Checkout).
- `popup-close-button/`: Reusable close button for popups/modals.
- `slider-button/`: Left/Right arrow buttons for carousels.
- `slider-navigation-dots/`: Pagination dots for image sliders.
- `x-button/`: A generic X-shaped close button.
### Miscellaneous UI
- `divider/`: Visual separator component.
- `footer/`: The global footer component with brand links and language selection.
- `logo/logo.jsx`: SVG component for the primary Under Armour logo.
- `svgs/svgs.component.jsx`: Collection of inline SVG icons used across the site.
- `warning/`: A warning banner component for alerts.
### Modals & Overlays
- `added-to-bag/`: Notification modal when an item is added to the cart.
- `auth-modal/`: Registration and Login overlay.
- `bag-modal/`: The mini-cart drawer overlay.
- `cat-nav/`: Mobile navigation drawer for categories.
- `confirm-action/`: Generic confirmation dialog (e.g., deleting an item).
- `loading/`: Global loading spinner modal.
### Navigation
- `navbar/navbar.component.jsx` & `.module.css`: Main navigation header.
- `sidebar/ham-sidebar/`: Hamburger menu sidebar for mobile. Includes `subCategory.component.jsx` for nested links.
- `sidebar/search-sidebar/`: Search interface overlay/sidebar.
### Product Elements
- `product-add-to-bag/`, `product-carousel/`, `product-characteristics/`, `product-extendable-text/`, `product-flame-img/`, `product-header/`, `product-img-modal/`, `product-mics/`, `product-new-tag/`, `product-recommended/`, `product-review-img-modal/`, `product-reviews-section/`, `product-specs/`: Modular UI pieces that construct the full Product Detail Page (PDP).
- `product-teaser/type_1/` & `type_2/`: Different variations of product cards used in grids and sliders.
### Promo Slots (Landing Page Variants)
- `slot/variant_1/` through `variant_6/`: Various modular promotional banners and hero sections. Some split into `desktop` and `mobile` implementations.
### Portals
- `confirm-action-portal/`: React portal mounting the confirm action dialog to the `<body>`.
- `product-img-modal-portal/`: React portal for expanding product images fullscreen.

## `src/imports/` (Feature-Sliced Domains)
### Auth
- `api/auth.api.js`: API integration for authentication endpoints.
- `hooks/useAuth.hook.js`: Custom hook managing authentication lifecycle and state.
- `login/Loginview.jsx`: UI and logic for the login form.
- `signup/SignupView.jsx`: UI and logic for the signup form.
- `auth-modal.module.css`: Styles scoped to authentication modals.
### Cart
- `ui/pages/CartPage.jsx` & `.module.css`: Feature-level logic and composition for the shopping cart.
### Category
- `ui/pages/CategoryPage.jsx` & `.module.css`: Feature-level logic, product fetching, and composition for category listings.
### Home
- `ui/pages/HomePage.jsx`: Composed view for the index page.
- `ui/components/variant_1` through `variant_6`: Domain-specific duplicates or enhanced versions of the promotional slots, managing complex interactions or data fetching for the homepage.
### Product
- Re-exports and domain-specific compositions of the PDP components, specifically wired to state and data-fetching hooks.

## `src/zustand/` (Global State)
- `useAuthStore.js`: Zustand store for user authentication state (token, user details).
- `useBagStore.js`: Zustand store for shopping cart contents, total, and modal visibility.
- `useCoreStore.js`: Zustand store for global app state (e.g., language, currency).
- `useLoadingStore.js`: Zustand store for global loading indicator state.
- `useNavBarStore.js`: Zustand store for navigation bar interactions and dropdowns.
- `useProductStore.js`: Zustand store caching the current product details.
- `useSideBarStore.js`: Zustand store for mobile sidebar visibility and active tabs.

## `src/context/` & `src/shared/context/` (Legacy State)
- `bag.context.jsx`, `essential.context.jsx`, `loading.context.jsx`, `nav.context.jsx`, `product.context.jsx`, `review-img.context.jsx`, `sideBar.context.jsx`: React Context providers. Currently being phased out in favor of Zustand stores.

## `src/hooks/` & `src/shared/hooks/` (Custom Hooks)
- `useImageSlider.hook.js`: Logic for swiping and navigating image carousels.
- `useIsSSRSkipped.hook.js`: Prevents hydration errors by forcing specific client-side rendering.
- `useNextImageOnHover.hook.js`: Preloads or switches product images on hover.
- `usePagination.hook.jsx`: Manages current page and offset for paginated lists (like reviews).
- `usePopUpEffect.hook.js`: Manages body scroll-locking when modals are open.
- `useBackgroundTask.hook.js`: Utility for background polling or deferred tasks.

## `src/lib/` & `src/helper/` & `src/shared/utils/`
- `route-observer.js`: Tracks Next.js route changes for analytics.
- `server-helpers.js`: Helper functions for `getServerSideProps` or server components.
- `swiper.jsx`: Integration wrapper around the Swiper.js library.
- `helper.js`: Utility functions (e.g., price formatting, date formatting).
- `api/request.js`: Configured Axios instance with interceptors for auth headers and error handling.
- `data/data.js` / `server-data/server-data.js`: Mock data, static constants, or mock server responses for development.

## `src/styles/`
- `globals.css`: The root stylesheet. Configures Tailwind base layers, typography (Neue Plak), and global resets.