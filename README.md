# Naman Mehta — Portfolio

Personal case-study portfolio: data, product and AI strategy work. Dark, cinematic, content-first.

## Stack

- Next.js 15 (App Router, React 19, TypeScript)
- Tailwind CSS v4
- framer-motion 12 + GSAP 3 (ScrollTrigger) for motion
- Lenis for smooth scrolling

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (all routes statically generated)
npm run lint
```

## Structure

```
src/
  app/                 # routes: / , /about , /work/[slug]
  components/
    layout/            # Header, Footer
    motion/            # Reveal (GSAP), PageTransition (framer-motion)
    sections/          # Hero, WorkList, Timeline, SkillsGrid, ...
    ui/                # MagneticButton
  data/
    site.ts            # site-wide copy (bio, experience, skills, contact)
    projects.ts        # case studies and project notes
  lib/                 # LenisProvider (Lenis + GSAP ticker wiring)
```

All copy lives in `src/data/` — components render it verbatim. Design tokens (colors, fonts) are defined in `src/app/globals.css`.
