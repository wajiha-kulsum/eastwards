---
title: "The site has no borders anywhere, enforced by one global rule instead of editing every border class"
author: Wajiha-kulsum
date: 2026-11-17
branch: main
cost: { minutes: 32, tokens: 749902 }
id: l-979a4e1f
scope: repo
status: active
src: agent
touches:
  - components/about/AboutPage.tsx
  - eslint.config.mjs
  - app/globals.css
  - app/page.tsx
  - components/BlogShowcase.tsx
  - components/Hero.tsx
  - components/HomeContactCta.tsx
  - components/about/CapabilityStack.tsx
  - components/about/SmoothScroll.tsx
  - components/ui/blur-fade.tsx
---

## Decided
- The client wants no borders or outlines on any page. A rule in the global stylesheet sets border-width to 0 on every element and clears 1px rings. Border classes left in components are now inert. Groups use spacing and a 4% ink tint instead (TINT and TINT_HOVER in the shared frame helper).
- Exceptions:
  - loading spinners (`.animate-spin`), whose border is the spinner itself;
  - 2px focus rings, so keyboard focus still shows.
- Things that relied on a border were reworked:
  - form errors show a red glow (`aria-invalid`);
  - the About walkthrough dots are solid fills;
  - legal tables use striped rows.

## Tried and ruled out
- Editing each border class by hand: about 200 classes across 22 files, and a missed one shows up as a stray line.

## Watch out
- A new border utility will silently do nothing. Use a tint, spacing or a 2px ring instead.
- Form fields have no outline now. Their grey fill (`bg-field`) is what marks them, so keep that fill.

In the code: app/globals.css (the "No borders anywhere" block), components/ui/framed.tsx (TINT, TINT_HOVER, noscript reveal style), components/ui/form-styles.ts.
