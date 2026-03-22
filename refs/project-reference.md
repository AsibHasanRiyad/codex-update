# 2 Creative Project Reference

This document is a codebase reference for faster onboarding and AI-assisted development.
It summarizes each important text/code file in the repository, what it does, and what to watch for.

## 1) Project Overview

- Stack: `React 19` + `Vite` + `React Router` + `Tailwind CSS v4`
- Animation/UI: `GSAP`, `Framer Motion`, `Lenis`, `Swiper`, `Three.js`, `OGL`, `Cobe`
- App shape: one shared layout (`Navbar` + page `Outlet` + `Footer`) with 4 pages:
  - `/` Home
  - `/about-us` About
  - `/services/:slug` Services Details
  - `/contact` Contact

## 2) Root Files

### `package.json`
- Defines scripts: `dev`, `build`, `lint`, `preview`.
- Contains runtime dependencies for animation-heavy UI and routing.
- Dev dependencies include Vite + ESLint + React plugins.

### `package-lock.json`
- NPM lockfile pinning dependency tree.

### `vite.config.js`
- Vite config with `@vitejs/plugin-react` and `@tailwindcss/vite` plugins.

### `eslint.config.js`
- ESLint flat config for JS/React hooks/react-refresh rules.
- Includes custom ignore patterns and rule tuning for unused vars.

### `index.html`
- App HTML shell containing `<div id="root"></div>`.
- Loads `src/main.jsx`.

### `vercel.json`
- SPA rewrite config so route refreshes resolve to `/`.
- Contains deployment metadata for Vercel.

### `.gitignore`
- Ignores `node_modules`, `dist`, and common local/env files.

### `README.md`
- Project intro and usage instructions.

### `.github/workflows/main.yml`
- CI/CD workflow to build and deploy.
- Note: this workflow currently includes sensitive deployment details directly in file content and should be migrated to secrets.

## 3) App Bootstrap

### `src/main.jsx`
- Registers GSAP plugins (`ScrollTrigger`, `SplitText`).
- Mounts React app and provides router via `<RouterProvider router={router} />`.

### `src/index.css`
- Imports Tailwind.
- Defines theme variables (`--color-primary`, `--color-strong`, `--color-muted`).
- Contains commented-out experimental animation/theme blocks.

### `src/lib/utils.jsx`
- Exports `cn(...inputs)` utility (`clsx` + `tailwind-merge`) for class merging.

## 4) Routing and Page Composition

### `src/routes/routes.jsx`
- Defines browser router with `MainLayout` wrapper.
- Child routes: Home, About, Services Details, Contact.
- Includes simple `errorElement` fallback.

### `src/pages/Home.jsx`
- Composes homepage sections in order:
  - `Hero`
  - `BeamCircle`
  - `HomeVideo`
  - `DevelopmentProject`
  - `Stats`
  - `FactsSection`
  - `ClientFeedback`

### `src/pages/About.page.jsx`
- About page wrapper using:
  - `PageHeader`
  - `AboutHero`
  - `CompanyHistory`

### `src/pages/ServicesDetails.page.jsx`
- Services details page using:
  - `PageHeader`
  - `ServicesImage`
  - `OurProcess`
  - `Images`
  - `ClientFeedback`

### `src/pages/Contact.page.jsx`
- Contact information + contact form UI.
- Uses `TextMaskReveal`, Framer Motion, and Lucide icons.
- Current submission behavior is local UI state only (no backend/API integration).

## 5) Providers and Hooks

### `src/provider/SmoothScrollProvider.jsx`
- Wraps app with `ReactLenis` smooth scrolling.
- Configures lerp/easing/duration behavior.

### `src/provider/ScrollToHashElement.jsx`
- Handles route hash scrolling with Lenis offset.
- Scrolls to top when no hash is present.

### `src/hooks/TextMaskReveal.jsx`
- Reusable text reveal animation component.
- Supports line or word splitting, stagger delays, in-view triggering.

## 6) Constants and Data

### `src/constants/index.js`
- Exports `navLinks` used for menu rendering.
- Services menu includes child links for specific service slugs.

### `src/data/index.js`
- Exports `developmentProjects` array used by project carousel/cards.
- Data includes image URL, title, short description, full description, site link.

## 7) Layout Components

### `src/components/layout/MainLayout.jsx`
- Global page shell:
  - `SmoothScrollProvider`
  - `ScrollToHashElement`
  - `Navbar`
  - `Suspense` around `<Outlet />` with `Preloader2` fallback
  - `Footer`
- Registers GSAP plugins.
- Note: `preloaderDone` state exists but is currently unused.

### `src/components/layout/Footer.jsx`
- Large branded footer with video background and multi-column link/info layout.
- Uses social icons and CTA content.

### `src/components/layout/header/Navbar.jsx`
- Top fixed navbar with hide-on-scroll animation.
- Controls menu overlay state (`NavbarContent`).
- Uses logos and social icon links.

### `src/components/layout/header/NavbarContent.jsx`
- Fullscreen/mobile menu panel with animated reveal.
- Renders nav links and expandable service items.
- Includes background FX and email input.

### `src/components/layout/header/HamburgerIcon.jsx`
- Animated hamburger icon component for opening nav panel.

### `src/components/layout/header/CrossIcon.jsx`
- Animated close icon for nav panel.

### `src/components/layout/header/EmailInput.jsx`
- Small email capture input/button used in nav overlay.

## 8) Home Components

### `src/components/home/Hero.component.jsx`
- Main hero section with animated headline and CTA messaging.
- Uses `ColorBends` background and `TextMaskReveal`.

### `src/components/home/HeroMarquee.component.jsx`
- Infinite marquee-style section.

### `src/components/home/HomeVideo.component.jsx`
- Scroll-driven GSAP section combining text/video transitions.
- Complex multi-ref timeline choreography.

### `src/components/home/DevelopmentProject.component.jsx`
- Swiper-based project showcase section.
- Uses `developmentProjects` data and card component.

### `src/components/home/DevelopmentProjectCard.component.jsx`
- Single project card with hover animation behavior.

### `src/components/home/Stats.section.jsx`
- Animated metric cards and title pin/stagger effects.

### `src/components/home/FactsSection.jsx`
- Horizontal GSAP-pinned card scroll section with service facts.

### `src/components/home/DevCardSection.jsx`
- Developer specialization cards section (multiple role categories).

### `src/components/home/DevCards.jsx`
- Individual developer card component with hover styling.

### `src/components/home/testimonial/Testimonial.jsx`
- Testimonial section combining cards, marquee, globe, and animated dots.

### `src/components/home/testimonial/Marquee.jsx`
- Reusable marquee utility for horizontal/vertical scrolling content.

### `src/components/home/testimonial/Globe.jsx`
- `cobe`-powered animated globe canvas.

### `src/components/home/testimonial/AnimateDots.jsx`
- Decorative animated SVG dot pattern.

## 9) About Components

### `src/components/about/AboutHero.jsx`
- About intro with animated headline, company story copy, and image/parallax details.

### `src/components/about/CompanyHistory.jsx`
- Timeline wrapper section with scroll-pin behavior and supporting visual layout.

### `src/components/about/CompanyTimeline.jsx`
- Timeline content dataset and wrapper for timeline rendering.
- Provides year-wise milestones.

### `src/components/about/Timeline.jsx`
- Visual timeline renderer with animated line fill and responsive behavior.

## 10) Services Components

### `src/components/services/ServicesImage.jsx`
- Hero/feature image block with parallax motion effect.

### `src/components/services/OurProcess.jsx`
- Service process section.
- Contains `processData` describing each step and associated bullet items.

### `src/components/services/ProcessCard.jsx`
- Card view for one process step with animation/visual accents.

### `src/components/services/Images.jsx`
- Animated image/card gallery with stagger effects.

## 11) Shared and UI Components

### `src/components/shared/PageHeader.jsx`
- Reusable page header section for non-home pages.
- Currently contains static title/body content.

### `src/components/ui/ColorBends.jsx`
- Advanced Three.js shader background effect.
- Supports configurable colors and motion parameters.

### `src/components/ui/LightRays.jsx`
- OGL-powered light rays visual effect component.

### `src/components/ui/LightRays.css`
- Styling wrapper for LightRays canvas container.

### `src/components/ui/GlassButton.jsx`
- Highly styled glassmorphism button with variant support.

### `src/components/ui/BeamCircle.jsx`
- Orbiting icon animation around central element (service-themed icons).

## 12) Preloader Components

### `src/components/Preloader/Preloader.jsx`
- Main intro preloader using GSAP/SplitText/timeline + image reveal + progress.

### `src/components/Preloader/Preloader2.jsx`
- Simpler fallback preloader used in `Suspense`.

### `src/components/Preloader/Preloader.css`
- Styling for preloader overlays, progress bar, and responsive adjustments.

## 13) Asset Notes

- `src/assets/` contains logos, imagery, and videos used by sections and preloaders.
- Notable heavy assets:
  - `src/assets/video/newOutput.mp4`
  - `src/assets/video/card_bg.mp4`
  - `src/assets/footer.mp4`
- Loader images in `src/assets/loader/` are consumed by preloader flows.

## 14) Architecture Notes

- Design is animation-first and section-based.
- Data flow is mostly static constants/data arrays, not API-driven.
- Global state libraries are not used; local hook state dominates.
- Lenis smooth scroll + GSAP ScrollTrigger are used together across sections.

## 15) Improvement Backlog (Observed)

1. Move deployment credentials and sensitive workflow values into secure CI secrets.
2. Remove unused imports/states and stale eslint-disable comments where no longer needed.
3. Make `PageHeader` fully prop-driven for per-page titles/subtitles.
4. Add backend integration or service endpoint for `Contact` form submissions.
5. Consider splitting very complex GSAP sections (`HomeVideo`, preloader flows) into smaller reusable animation hooks.

## 16) Suggested Usage of This `refs` Folder

- Keep this file updated when adding/removing components or routes.
- Add additional docs over time (optional):
  - `refs/animations.md` for GSAP/Framer motion patterns
  - `refs/routing.md` for route and slug behavior
  - `refs/deployment.md` for CI/CD and environment guidance
