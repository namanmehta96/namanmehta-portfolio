# Naman Mehta — Portfolio

Cinematic case-study portfolio. Dark, bold, motion-rich, in the spirit of olivierlarose.com / basement.studio — magazine-quality typography, scroll-driven animation, restrained color. Aesthetic archetype: **Cinematic Luxury** (ultra-frontend skill): grain, hairline rules, slow calm fades, generous editorial spacing.

**Audience:** recruiters and hiring managers for data / product / AI strategy roles in Europe. The site must impress in 3 seconds AND deliver substance in 60. **Content and clarity beat decoration — always.**

## Design system

### Palette (nothing else — no other colors, ever)

| Token | Hex | Use |
|---|---|---|
| `background` | `#0d1117` | Page background |
| `foreground` | `#e8e6d8` | Primary text |
| `accent` | `#d4a574` | Single warm amber accent — links, highlights, featured work |
| `muted` | `#a8adb8` | Secondary text |

- Tokens are defined in `src/app/globals.css` and exposed as Tailwind utilities: `bg-background`, `text-foreground`, `text-accent`, `text-muted`.
- **Never hardcode hex values in components.** Low-alpha variants of these four (e.g. `border-foreground/10`, `bg-accent/5`) are the only permitted derivations — use them for hairline rules and surfaces.

### Typography

- Fonts via `next/font` (see `src/app/layout.tsx`):
  - **Space Grotesk** 500/700 — headings. Tailwind: `font-heading` (`--font-space-grotesk`).
  - **Inter** 400/500 — body. Tailwind: `font-body` (`--font-inter`, default on `body`).
- Type scale:
  - Hero name: **8–12vw** (use `clamp()`)
  - Case-study titles: **5–8vw**
  - Body: **16–18px**, generous line-height (1.6–1.8)
- Tight tracking on display sizes (`tracking-tight`), small-caps labels may use wide tracking.

### Motion principles

- **Lenis** for smooth scroll (single root instance), **GSAP ScrollTrigger** for scroll reveals, **Framer Motion** for page transitions and hover micro-interactions.
- Eases: `power2.out` / `power3.out` only. Never bouncy, elastic, or busy. Motion must feel **expensive and calm**.
- Durations: hover/micro-interactions 150–300ms; scroll reveals 0.6–1.2s.
- Animate `transform` and `opacity` only — never width/height/top/left.
- Respect `prefers-reduced-motion` everywhere (CSS baseline in `globals.css`; use `gsap.matchMedia()` and Framer Motion's `useReducedMotion`).
- **Rule: every animation must serve the reading experience.** If it doesn't help someone read, understand, or navigate, cut it.

## Performance budget

- Lighthouse **90+** in every category
- **60fps** on all animation (transform/opacity, `will-change` only where needed, passive listeners)
- **LCP < 2s**, CLS < 0.1
- `next/image` for all images with explicit dimensions; lazy-load below the fold; `next/font` (self-hosted, swap) for zero font CLS
- Server Components by default; `"use client"` only at motion/interaction leaves (per vercel-react-best-practices); dynamic-import heavy client-only work

## Stack

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · GSAP + @gsap/react · Lenis. **No CMS** — all content lives in typed data files.

## File structure

```
src/
  app/            Routes: layout.tsx (fonts, providers), page.tsx (home),
                  work/[slug]/ (case studies — to be built)
  components/     (to be built) layout/, sections/, motion/, ui/
  data/           site.ts (identity, bio, experience, skills, achievements)
                  projects.ts (case studies + notes — discriminated union)
  lib/            (to be built) lenis provider, gsap setup, hooks
public/           Static assets
```

## Working rules

- All copy comes from `src/data/` — never inline content in components. `TODO: Naman to write` placeholders are Naman's to fill; don't invent case-study copy.
- The Amadeus entry is a `note`, not a case study: renders as a short quiet entry, **no page, no link** (NDA).
- Mobile-first; test at 375px before scaling up. 4.5:1 contrast minimum, 44px touch targets, visible focus rings, keyboard nav.
- One clear primary action per screen. No emoji as icons — inline SVG only.
