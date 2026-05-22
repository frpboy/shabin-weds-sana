# 💍 Shabin & Sana | Premium Wedding Invitation Microsite

> An elegant, mobile-first digital wedding invitation microsite for **Muhammed Shabin & Sana Subair**, crafted with Next.js 16 App Router, React 19, Tailwind CSS (v4), and Framer Motion. Deployed on Vercel with a live Neon PostgreSQL RSVP backend.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ffrpboy%2Fshabin-weds-sana)
[![Live Site](https://img.shields.io/badge/Live%20Site-shabin--weds--sana.vercel.app-brightgreen)](https://shabin-weds-sana.vercel.app/)

---

## 🌟 Overview

Designed to evoke calm, emotional resonance, and high-fidelity aesthetics, this microsite serves as an immersive interactive invitation experience. Built specifically for seamless performance across modern and low-end mobile viewports (including WhatsApp and Instagram in-app browsers).

### ✨ Core Features

| Feature | Description |
|---|---|
| 📜 **Splash Calligraphy** | Elegant envelope intro with Surah Ar-Rum, Bismillah, and S&S monogram |
| ✨ **Parallax Hero** | Mouse-reactive ambient geometry with Cinzel & Cormorant Garamond typography |
| ⏳ **Live Countdown** | High-precision countdown to July 19, 2026 — shown in Hero and Countdown section |
| 🎨 **Mouse Trail** | Golden heart particle trail following cursor movement |
| 🗺️ **Venue & Navigation** | Google Maps embed + direct routing button |
| 🖼️ **Gallery** | Masonry photo grid with lightbox from local `/public/images/` |
| 💌 **Live RSVP** | Form → Neon PostgreSQL DB → Live Wishes Wall with real-time guest count |
| 🎵 **Ambient Audio** | Floating persistent music player |
| 📱 **Mobile PWA** | Theme-colored status bar, iOS home screen support, S&S favicon |
| 📊 **Analytics** | Microsoft Clarity (session recordings + heatmaps) |

---

## 🚀 Quickstart

### Prerequisites
- Node.js v20+
- npm

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/frpboy/shabin-weds-sana.git
   cd shabin-weds-sana
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables** — create a `.env` file:
   ```env
   DATABASE_URL=postgresql://...your-neon-connection-string...
   ```

4. **Initialize the database** — run this in the [Neon SQL Editor](https://console.neon.tech):
   ```sql
   CREATE TABLE IF NOT EXISTS rsvps (
     id SERIAL PRIMARY KEY,
     full_name VARCHAR(255) NOT NULL,
     attendance VARCHAR(50) NOT NULL,
     guest_count VARCHAR(50) DEFAULT '1',
     dietary_or_notes TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
   );
   ```

5. **Start development server**:
   ```bash
   npm run dev
   ```
   - Frontend → `http://localhost:5173`
- RSVP API → `http://localhost:3000/api/rsvp` (served by Next.js Route Handler)

6. **Production build**:
   ```bash
   npm run build
   ```

---

## 📂 Project Architecture

```
shabin-weds-sana/
├── app/
│   ├── page.tsx              # App Router home page
│   └── api/rsvp/route.ts     # RSVP API route handler (GET + POST) → Neon DB
├── public/
│   ├── favicon/favicon.svg   # S&S circular gold emblem
│   ├── images/               # All wedding photos (local WebP)
│   └── audio/ambient.mp3     # Background music
├── docs/                     # Full architectural documentation (12 docs + CHANGELOG)
└── src/
    ├── components/
    │   ├── sections/         # HeroContent, CountdownSection, RsvpSection, GallerySection…
    │   └── ui/               # Button, Card, SectionContainer, SectionTitle…
    ├── config/weddingData.ts # Single source of truth for names, dates, venue
    ├── content/              # Centralized UI copy
    ├── effects/              # MouseTrail (gold hearts), AmbientEffects
    ├── hooks/                # useCountdown, useReducedMotion
    ├── motion/               # VARIANTS, EASE, STAGGER tokens
    ├── providers/            # Music, Lenis, Modal, Theme providers
    ├── seo/                  # JSON-LD structured data
    └── styles/globals.css    # Tailwind v4 + themed scrollbar
```

---

## 🎨 Customization

Edit `src/config/weddingData.ts` to change all content:

```typescript
export const weddingData = {
  groom:   { fullName: "Muhammed Shabin", shortName: "Shabin" },
  bride:   { fullName: "Sana Subair",     shortName: "Sana"   },
  wedding: { date: "2026-07-19", day: "Sunday" },
  theme: {
    primary:   "#C7A97F",  // Champagne gold
    secondary: "#F8F4EE",  // Warm ivory
    accent:    "#2E4A3D",  // Deep emerald
    text:      "#1A1A1A",  // Matte black
  },
};
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 App Router + React 19 + TypeScript |
| Styling | Tailwind CSS v4 + PostCSS |
| Animation | Framer Motion |
| Smooth Scroll | Lenis |
| Icons | React Icons (Bi, Md) |
| Database | Neon PostgreSQL (serverless) |
| API | Vercel Serverless Functions |
| Analytics | Microsoft Clarity |
| Deployment | Vercel |

---

## 📦 NPM Scripts

| Script | Description |
|---|---|
| `npm run dev` | Starts Next.js dev server (app + API routes) |
| `npm run build` | TypeScript check + production bundle |
| `npm run start` | Run production server after build |
| `npm run optimize` | Compress images to WebP |

---

## 🌐 Deployment (Vercel)

1. Push to GitHub
2. Import into Vercel
3. Add `DATABASE_URL` environment variable in Vercel project settings
4. Deploy — `/api/rsvp` is automatically served from `app/api/rsvp/route.ts`

---

## 📄 License

Made with love & prayers. © 2026 Shabin & Sana. All rights reserved.
