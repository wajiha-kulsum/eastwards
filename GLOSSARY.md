# Glossary

This file is the canon for Eastwards terminology. Engineering skills read it before
exploring the codebase and use these names as-is; don't invent synonyms for them.
Updated lazily when terms or decisions actually get resolved.

## Site anatomy

- **Lane** — the shared horizontal rail every page body sits in:
  `max-w-[1720px] px-6 sm:px-10 lg:px-[5.35%]` (homepage width; rendered explicitly
  in each page component).
- **Dot field / DotHero** — the dot-matrix lattice + 10px-pitch grid hero shared by
  Contact, Partners, About and the service pages (`components/ui/DotField.tsx`,
  `components/DotHero.tsx`). Its geometry is locked; breaking changes to it are
  breaking changes for all sub-pages.
- **TextBlur chip** — the TextBlur-wrapped text treatment inside DotHero
  (`components/ui/TextBlur.tsx`).
- **Blog showcase** — the accordion-gallery "Related Blogs" panel rendered under
  multiple pages (`components/BlogShowcase.tsx`), outside the lane div.

## Services surface

- **Services surface** — all routes under `/services` (the `[slug]` pages) plus the
  navbar's Services dropdown panel. See ADR-0001 and `docs/attio-ui-study.md`.
- **Service page** — a content page for one service, rendered by
  `components/services/ServicePage.tsx` from a `ServicePageContent` record in
  `lib/content.ts`. Content and rendering are strictly separated.
- **Service block** — one content unit on a service page. Kinds: `lead`
  (statement paragraph), `prose`, `bullets`, `cards` (hairline grid cells with
  boxed number chips), `panels` (grouped lists).
- **Section (grouped blocks)** — one hairline-ruled `<section>` on a service page.
  Consecutive blocks of the same kind without a heading merge into the previous
  section (`intoSections` in ServicePage.tsx); `cards`/`panels` always open a new
  one.
- **Service hero** — the centered, full-bleed dotted statement band of every
  service page (`components/services/ServiceHero.tsx`); carries the page's
  single Contact Us CTA. Reuses DotHero's exported `DotMark` + `useDotSnap`.
- **Label chip** — the boxed micro eyebrow (hairline border, uppercase
  `text-label` type) used on card grid cells; the one sanctioned micro label.

## Design system

- **Token scale** — exactly four sizes the site uses, fixed pixels on every
  page: display 88 / title 60 / lead 35 / small 18 (one smaller step per size
  below 768px), defined in `app/globals.css` under `@theme`. Class names:
  `text-display`, `text-title`, `text-lead`, `text-small` (note: `text-body`
  is the gray color, not a size — colors and sizes share the namespace).
  Chips render at `text-small`; `text-copy` (25) and `text-label` (11) were
  retired — reading copy is `text-small`, statements are `text-lead`.
- **Brand tokens** — colors from the approved Paper design, retuned to the
  two-color text system: `primary #2868ff` (accents, links, numbers),
  `ink`/`statement` `#1e1e1e` (black text), `body`/`faint`/`subtle`
  `#7e7e7e` (grey text), plus `surface #fafafa`, `line #eeeeee`,
  `line-strong #d9d9d9`, plus the surface tokens `page` (page/chip
  background; dark `#0f0f0f`) and `card` (white cards/panels; dark
  `#1a1c20`). In the `.dark` block these rebind to the dark palette,
  curated via `components/ui/ThemeToggle.tsx` (persisted as `theme` in
  localStorage; bootstrap script in layout.tsx). Components must not
  carry raw hex literals except inside locked-geometry components
  (DotField/DotHero) and `nav-services-panel` CSS in globals.css.
- **Tab icon** — `app/icon.svg`: the blue eastwards triangle on a blank
  canvas (the old Next.js `favicon.ico` was removed); home-screen
  bookmarks use `app/apple-icon.svg`.
- **Mobile browser chrome** — `viewport.themeColor` (light `#ffffff`,
  dark `#0f0f0f`) + `colorScheme` in `app/layout.tsx`, so the address bar
  follows the active theme; input autofill is dark-corrected in
  `app/globals.css`.
- **Paper design** — the approved design source for the site's look (the canvas
  file referenced in `app/globals.css` comments).
