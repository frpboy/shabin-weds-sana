# 08 — Deployment Guide (Vercel)

## Pre-flight Checklist

- [ ] `DATABASE_URL` set in Vercel Environment Variables (Production + Preview)
- [ ] Neon `rsvps` table initialized (see `docs/05_SCHEMA.md`)
- [ ] All images in `public/images/` are `.webp` (run `npm run optimize`)
- [ ] `npm run build` passes with zero TypeScript errors
- [ ] OG image URL updated in `index.html` to match Vercel deployment URL
- [ ] Microsoft Clarity project ID in `index.html` is correct (`wsl77zfey5`)
- [ ] Favicon SVG renders correctly at `https://shabin-weds-sana.vercel.app/favicon/favicon.svg`

## Local → Production Flow

```bash
# 1. Start full local stack (frontend + API server with real Neon DB)
npm run dev

# 2. Test RSVP form — submits to Neon, loads real wishes

# 3. Build & verify
npm run build

# 4. Push to GitHub — Vercel auto-deploys
git push origin main
```

## Vercel Project Settings

| Setting | Value |
|---|---|
| Framework Preset | Next.js |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |
| Node.js Version | 20.x |

### Serverless Functions
`/app/api/rsvp/route.ts` is automatically detected and deployed as a Vercel Serverless Function, served at `/api/rsvp`.
No additional configuration needed.

## Environment Variables (Vercel Dashboard)

| Variable | Environment | Value |
|---|---|---|
| `DATABASE_URL` | Production, Preview | Neon connection string |

## PWA / Mobile

- `theme-color: #141412` — colors Android Chrome toolbar charcoal
- `apple-mobile-web-app-capable` — enables iOS full-screen when added to home screen
- `apple-mobile-web-app-title: "Shabin & Sana"` — iOS home screen label
- Favicon: `/public/favicon/favicon.svg` (S&S circular gold emblem)

## Analytics

Microsoft Clarity (`wsl77zfey5`) embedded in `<head>` — starts tracking automatically after deploy.
Dashboard: https://clarity.microsoft.com
