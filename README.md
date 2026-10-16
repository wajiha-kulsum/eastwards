# Eastwards Consulting — Website

Marketing site for Eastwards Consulting, built from the approved Paper design
(`eastwards` file) and connected to it via the Paper MCP server.

## Stack

- **Next.js 16** (App Router, Turbopack) + **TypeScript**
- **Tailwind CSS v4** — design tokens live in `app/globals.css` (`@theme`)
- **Framer Motion** (`motion`) — scroll reveal animations (`components/ui/Reveal.tsx`)
- **GSAP** — flowing border + glow effect on all pill buttons (`components/ui/PillButton.tsx`)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

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
