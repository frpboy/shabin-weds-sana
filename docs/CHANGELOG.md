# Changelog

All notable changes to this project are documented here.

---

## v2.1.0 — 2026-05-20 | Cross-Project Theme Identity Migration (Sanu-Weds-Bijeesh → Shabin-Weds-Sana)

### 🎯 Scope / Constraint Compliance
- Applied a **full visual identity migration** from donor project `E:\K4NN4N\Sanu-Weds-Bijeesh` into this repo.
- Preserved requested non-negotiables:
  - **No layout rebuild**
  - **No section/content/text changes**
  - **No photo replacements**
  - **No route or data-flow changes**

### 🎨 Global Design Token Migration
- Updated core theme palette from warm-ivory/emerald to donor-inspired cinematic luxury profile.
- Files updated:
  - `src/styles/globals.css` (`@theme` variables)
  - `src/theme/tokens.ts`
  - `src/config/wedding/branding.ts`
  - `tailwind.config.js`
- New token direction:
  - `primary`: `#D4AF37` (gold)
  - `secondary`: `#080506` (dark cinematic base)
  - `accent`: `#F5E9D2` (high-contrast warm highlight for headings on dark)
  - `text`: `#F6F1E8` (warm off-white body text)
- Glass tokens rebalanced to donor behavior:
  - `GLASS_BG`: `rgba(255,255,255,0.06)`
  - `GLASS_BORDER`: `rgba(212,175,55,0.28)`

### 🔤 Typography System Migration
- Migrated font family stack to donor style while preserving existing typographic hierarchy usage in components.
- Updated Google Fonts load in `index.html`:
  - Added/kept: `Cinzel`
  - Replaced script family with: `Great Vibes`
  - Replaced body sans with: `Montserrat`
- Updated token/tailwind aliases:
  - `font-cinzel` → `Cinzel`
  - `font-cormorant` mapping now points to `Great Vibes`
  - `font-poppins` / `font-inter` mappings now point to `Montserrat`
- Result: existing JSX class usage remains intact, but rendered type identity now matches donor theme.

### 🌌 Global Surface + Atmosphere Treatment
- `src/styles/globals.css`:
  - Replaced flat ivory page base with **layered cinematic dark gradient** background.
  - Improved legibility settings (`text-rendering: optimizeLegibility`).
  - Preserved smooth scrolling and low-performance fallbacks.
- Scrollbar system restyled to donor-like gold-on-dark behavior:
  - Dark translucent track
  - Gold thumb with stronger hover intensity
  - Matching Firefox scrollbar color profile

### 🧊 Shared Component Visual Migration (No Structural Changes)
- `src/components/ui/cards/Card.tsx`
  - `glass` variant now uses darker translucent surface, stronger gold border, and deeper luxury shadow.
  - `default` variant shifted to dark glass-like card surface with matching border language.
- `src/components/ui/buttons/Button.tsx`
  - `solid` variant now donor gold CTA with black text + gold glow shadow.
  - `outline` variant tuned for high-contrast gold stroke/hover-fill.
  - `glass` variant moved to white-tint glass + gold edge treatment.
- These changes propagate automatically across all sections using shared UI primitives.

### ✨ Ambient Effects Color Harmonization
- `src/effects/AmbientGlow.tsx`
  - Updated drifting glow gradients to donor-aligned gold + deep maroon atmospheric mix.
  - Kept existing motion model and durations; changed only chromatic composition.

### ✅ Verification
- Build verification executed after migration:
  - Command: `npm run build`
  - Result: **PASS**
  - TypeScript + Vite production build completed successfully with generated assets.

### 📌 Notes
- This release intentionally modifies **visual identity layer only**.
- All functional behavior, section order, copy, photos, and core layout composition remain unchanged by design.

---

## v2.0.0 — 2026-05-17 | Full RSVP Backend + Polish Sprint

### 🗄️ Live RSVP Backend (Neon PostgreSQL)
- **API GET support added** to `/api/rsvp.ts` — now fetches all submitted RSVPs from Neon DB ordered by `created_at DESC`
- **Local dev API server** (`server.mjs`) created — mirrors Vercel serverless function exactly, connects to real Neon DB on port `3001`
- **Vite proxy** configured in `vite.config.ts` to forward `/api/*` to `localhost:3001` during local development
- **`concurrently`** added as dev dependency; `npm run dev` now starts both Vite frontend and API server simultaneously
- Database schema: `rsvps` table with `full_name`, `attendance`, `guest_count`, `dietary_or_notes`, `created_at`

### 💌 RSVP Section — Full Redesign
- **3-column grid layout**: RSVP Form | Guest Counter | Live Wishes Wall
- All three cards now use the **site's warm theme palette** (`bg-secondary/70 backdrop-blur border border-primary/25`) — no longer dark/charcoal
- **Column 1 — Form**: Name input, Joyfully Accepts / Regretfully Declines toggle, animated guest stepper, blessing textarea, gold submit button with loading state
- **Column 2 — Guest Counter**: Bismillah ornament, attending count + total guests pulled live from Neon DB
- **Column 3 — Live Wishes Wall**: Scrollable list of all RSVPs fetched from DB, animated `AnimatePresence` entries, attending/unable badge, quote + author
- **Mobile layout**: Stacks as form → counter → wishes (one per row)
- Success state: Checkmark + "Shukran!" confirmation with "Submit Another" option

### 🔖 Favicon & PWA
- Created `/public/favicon/favicon.svg` — circular S&S emblem in champagne gold on warm cream
- Added `<link rel="icon">`, `<link rel="shortcut icon">`, `<link rel="apple-touch-icon">` in `index.html`
- **Mobile browser chrome theming**: `theme-color: #141412` (deep charcoal) for Android Chrome, Samsung Internet, Edge
- iOS: `apple-mobile-web-app-capable`, `apple-mobile-web-app-status-bar-style: black-translucent`
- Windows: `msapplication-TileColor`, `msapplication-navbutton-color: #C7A97F`
- `apple-mobile-web-app-title: "Shabin & Sana"` for iOS home screen

### 📊 Analytics
- **Microsoft Clarity** integrated (`wsl77zfey5`) — session recordings, heatmaps, scroll depth, dead click detection

### 🎨 Scrollbar Theming
- Custom webkit scrollbar: `6px` width, gold `#C7A97F` thumb, cream `#F0EBE2` track, hover darkens to `#a88a61`
- Firefox: `scrollbar-color` + `scrollbar-width: thin`
- Applied globally to page scroll and Wishes Wall inner scroll

### 🌙 InvitationMessage — Bismillah Ornament
- Added animated Bismillah Arabic calligraphy (`﷽`) above the section title to fill blank visual gap between Hero and Invitation

### ⚡ SectionContainer — Padding
- Reduced mobile vertical padding from `py-16` to `py-12` to tighten spacing

### 📝 Documentation
- Updated `README.md` with full feature list, local dev setup, SQL schema, npm scripts table, architecture diagram
- Updated `CHANGELOG.md` (this file)
- Updated all 12 `docs/` files to reflect current architecture

---

## v1.2.0 — Senior Architecture Refinement & Ambient Effects

- **Motion System** (`src/motion/`): Consolidated all animation constants, easing, variants, and stagger tokens
- **UI Component Layer** (`src/components/ui/`): Unified `buttons/`, `cards/`, `inputs/`, `layout/`, `overlays/`
- **SEO Module** (`src/seo/`): Schema.org `Event`/`Wedding` JSON-LD structured data injected via layout
- **Ambient Effects** (`src/effects/`): RAF-optimized Gold Dust Cursor, floating SVG ornaments, breathing glow orbs, parallax layers
- **Smart Audio**: Music auto-pauses on tab switch / window blur, resumes on focus

---

## v1.1.0 — Enterprise Architecture & RSVP Integration

- **Providers** (`src/providers/`): `ThemeProvider`, `LenisProvider`, `MusicProvider`, `ModalProvider`
- **`useCountdown` hook**: Shared countdown logic — eliminates duplicate timer calculations
- **Content Module** (`src/content/`): All UI copy centralized for maintainability
- **RSVP API v1**: Vercel serverless POST endpoint with Neon PostgreSQL, loading states, error handling
- **Social Sharing**: WhatsApp + Instagram share buttons with personalized URLs (`?guest=Name`)
- **OpenGraph & Twitter cards**: Full social preview metadata

---

## v1.0.0 — Production Readiness & UI Refinements

- **Single-page architecture**: Continuous `#F8F4EE` backdrop across all sections
- **Hero Countdown**: Timer embedded directly below wedding date in Hero
- **Venue Card**: Google Maps iframe + navigation button in unified card
- **Google Calendar**: "Add to Google Calendar" button in Countdown section
- **Gallery**: Masonry grid with lightbox from local `/public/images/` WebP files

---

## v0.1.0 — Initial Project Initialization

- Initial project structure, documentation, design system, and base architecture
