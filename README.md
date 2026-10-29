# Eastwards Consulting — Website

Marketing site for Eastwards Consulting, built from the approved Paper design
(`eastwards` file) and connected to it via the Paper MCP server.

## Stack

- **Next.js 16** (App Router, Turbopack) + **TypeScript**
- **Tailwind CSS v4** — design tokens live in `app/globals.css` (`@theme`)
- **Framer Motion** (`motion`) — scroll reveal animations (`components/ui/Reveal.tsx`)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

Production deploys via Vercel. The repeatable path:

```bash
bash scripts/vercel-deploy-wizard.sh
```

Four stages: authenticate the Vercel CLI with GitHub → link the project → `--prod` deploy (the live URL is written to `.env` as `VERCEL_PRODUCTION_URL`) → connect `wajiha-kulsum/eastwards` in the dashboard so every `git push` ships automatically.

## House rules

- Four fixed type sizes — `display 88 / title 60 / lead 35 / small 18` — plus token-only colors in components; canon in `GLOSSARY.md`
- Dark mode: `components/ui/ThemeToggle.tsx` flips `.dark` on `<html>`; the bootstrap script in `app/layout.tsx` applies it before first paint
- Services content is data in `lib/content.ts`; the hairline block renderer applies it (rationale in `docs/attio-ui-study.md`)
- New pages take their metadata from `pageMetadata()` in `lib/seo.ts` — one `openGraph` per page (the layout's is replaced, not merged), then `npm run seo:check <url>` after a deploy

## Project structure

```
app/
  layout.tsx        # fonts (Instrument Sans + Inter Display), metadata & shared Footer
  globals.css       # design tokens: colors, fonts, radii
  page.tsx          # assembles the sections
components/
  Navbar.tsx        # nav (desktop links + mobile menu) + login pill
  Hero.tsx          # two-tone headline over the blue tile artwork
  Features.tsx      # intro + auto-scrolling service marquee
  CoreValues.tsx    # two-tone statement + value pillars
  BlogShowcase.tsx  # Stripe-style accordion gallery + featured article
  Footer.tsx        # link columns + gradient wordmark
  ui/               # PillButton (subtle flow drift), PrimaryButton, SectionLabel, Reveal, icons
lib/
  content.ts        # single source of truth for all page content —
                    # swap for API/CMS fetches when the backend lands;
                    # components won't need to change
public/images/      # real assets exported from the Paper design file
```

## Editing content

- **What it says** → `lib/content.ts`
- **How big it is** → breakpoint classes in the components (`text-4xl md:text-6xl xl:text-[90px]`)
- **Colors / fonts / radii** → `@theme` in `app/globals.css`

## Design source of truth

The Paper design file is the reference for layout, colors, and copy. The Paper
MCP server is configured globally (`~/.config/opencode/opencode.jsonc`) so
agents can read/verify against the live design.
