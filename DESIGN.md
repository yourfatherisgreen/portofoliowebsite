# Website Styling Rules & Code Structure

This document outlines the styling guidelines, code structure, and architectural decisions for this portfolio website. AI agents and developers should refer to this document before executing tasks or making modifications.

## Technology Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (v4 architecture with CSS variable theming)
- **UI Components:** shadcn/ui (customized)
- **Animations:** GSAP (GreenSock) for complex UI interactions, Tailwind transitions for simple hover effects.
- **Icons:** `react-icons`

## Code Structure

- `/app`: Contains the Next.js App Router structure.
  - `page.tsx`: The main entry point (One-page portfolio structure).
  - `layout.tsx`: Root layout defining fonts (`Geist`, `Geist_Mono`) and basic HTML structure.
  - `globals.css`: Core CSS file containing Tailwind imports, root variables (using `oklch` color space), and base layer styles.
  - `/components`: Contains all React components used across the site.
    - Components are modular, functional, and heavily rely on Tailwind for styling.
    - Complex components (e.g., `MobileNav.tsx`, `AboutMe.tsx`) handle their own state and animation logic.
- `/public`: Static assets (images, SVGs).
- `tailwind.config.js`: Tailwind CSS configuration (minimal, as v4 handles most via CSS imports).
- `components.json`: shadcn/ui configuration.

## Styling Rules & Guidelines

### 1. Theming and Colors
- The project uses a dark/light mode system driven by CSS variables in `globals.css`.
- Colors are defined using the `oklch` format to ensure perceptual uniformity.
- **Do not hardcode generic colors** (e.g., `bg-red-500`) unless necessary. Always prefer semantic CSS variables (e.g., `bg-primary`, `text-muted-foreground`) or specific design tokens (`bg-slate-900`).
- Accent colors often include vibrant purples and teals (e.g., `#6C63FF`, `#00C9A7`) to create a premium, dynamic feel.

### 2. Layout and Spacing
- Use Tailwind utility classes for all spacing (`m-4`, `p-6`, `gap-4`).
- Maintain a responsive design. Use standard Tailwind breakpoints (`sm:`, `md:`, `lg:`, `xl:`).
- For the main sections, use `min-h-screen` to ensure full viewport height coverage.
- The navigation features a split design: a standard `Navbar` for large screens (`lg:block`) and a complex `StaggeredMenu` for mobile/tablet (`lg:hidden`).

### 3. Typography
- The site uses `Geist` (Sans) and `Geist_Mono` via Next.js Font Optimization.
- Use tracking and leading utilities (`tracking-widest`, `leading-relaxed`) to enhance readability and premium feel.
- Uppercase text with wide tracking is often used for section labels or small headings.

### 4. Animations and Interactions
- **Micro-interactions:** Use standard Tailwind transitions (`transition-all duration-300 ease-in-out`) for hover effects (scale, translate, color change, shadow).
- **Complex Animations:** GSAP is used for orchestrated animations (e.g., the staggered mobile menu opening sequence). When adding complex, timeline-based animations, use `gsap` within a `useLayoutEffect` or `useEffect` hook.
- **Scroll Animations:** Components like `AboutMe` and `Skills` use scroll-driven reveal animations (often via Intersection Observer).

### 5. Component Development
- **File Naming:** PascalCase for component files (e.g., `SpotlightCard.tsx`).
- **Structure:** Use functional components with hooks.
- **"use client":** Add the `'use client'` directive at the top of components that require state, interactivity, or browser APIs (like GSAP or window event listeners).
- **Styling isolation:** Avoid writing custom CSS in `globals.css` if it can be achieved with Tailwind. If a component requires highly specific structural CSS (like the `StaggeredMenu`), use inline `<style>` tags or Tailwind's arbitrary values, but keep it isolated.

### 6. Contact Section (`Contact.tsx`)
- Two-column layout: left mobile-style profile card + right message form.
- Profile card features: profile photo, name, role badge, location, email, and social media links (GitHub, LinkedIn, Instagram, TikTok).
- Message form features: floating label inputs (name, email), textarea (message), gradient send button.
- Uses `Intersection Observer`–based `Reveal` components for scroll-driven staggered animations.
- Spotlight mouse-tracking glow effect on the form card.
- Glassmorphism cards with gradient border pseudo-elements.
- Social links have per-brand color tinting on hover.
- Fully responsive: stacks vertically on mobile, side-by-side on `lg+`.

## Execution Checklist for AI Agents
1. **Understand Context:** Review `page.tsx` to see where a component fits into the overall page layout.
2. **Follow Aesthetics:** Ensure any new UI matches the premium, glassmorphism, and dark-themed aesthetics.
3. **Responsive Check:** Always implement mobile, tablet, and desktop views simultaneously using Tailwind breakpoints.
4. **Animation Integrity:** Do not break existing GSAP timelines. If modifying an animated component, ensure the ref targets and GSAP context are correctly managed.
5. **Types:** Use TypeScript interfaces for component props to maintain type safety.
