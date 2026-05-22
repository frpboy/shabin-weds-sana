# Technical Requirements Document

## Architecture & Stack
- **Framework**: Next.js 16 App Router + React 19
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Routing**: React Router
- **Scrolling**: Lenis (optional smooth scroll)
- **Icons**: React Icons
- **Deployment**: Vercel

## Animation Approach
- Use fade-up, slow parallax, blur reveals, smooth opacity transitions, and elegant stagger.
- Avoid bouncing animations, flashy neon effects, and startup landing page behavior.
- Wedding sites should feel calm and emotional.

## Responsive Strategy
- **Mobile-first approach**
- Optimize for:
  - WhatsApp & Instagram browser
  - Samsung midrange phones
  - Poor network
  - One-hand scrolling

## Image Optimization Rules
- Ensure images are compressed (WebP/AVIF where possible).
- Use proper loading attributes (`loading="lazy"`).
- Keep file sizes small for fast loading on poor networks.

## Reusable Component Structure
- Maintain components in `src/components/` split into `common/`, `sections/`, and `ui/`.
- Strict naming conventions: PascalCase for components, camelCase for functions/hooks.
