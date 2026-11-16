---
title: "Text on fixed white or dark surfaces must use a colour that does not flip with the theme, and anchor links already have a site-wide scroll offset"
author: Wajiha-kulsum
date: 2026-11-16
branch: about-contact-wide-lane
cost: { minutes: 17, tokens: 104687 }
id: l-459536ee
scope: repo
status: active
src: agent
touches:
  - lib/about.ts
  - components/about/AboutPage.tsx
  - components/about/CapabilityStack.tsx
  - app/globals.css
---

## Decided
- A white button on a photo (the About hero "Contact Us" pill) uses `text-band` for its label, not `text-ink`. `ink` flips to a light colour in dark mode, so the label disappeared on the white pill. `band` stays dark in both themes.
- In-page anchor links (the About "On this page" links to #mission, #capabilities, #why, #approach, #next) rely on the site-wide `scroll-padding-top` in the global stylesheet (76/84/88px by breakpoint). Sections carry no `scroll-mt-*` of their own.

## Tried and ruled out
- `scroll-mt-[72px]` on each section: it stacked on the global scroll padding and landed every link 160px down instead of just under the header.

## Watch out
- Check any new surface with a fixed colour (white pills on photos, the dark capabilities band) in both themes. The default dark theme hides `text-ink` bugs that light mode shows fine.
- At 768-1023px the About hero photo is 3:2, too short for the 88px display headline. The headline steps down to the title size there.

In the code: components/about/AboutPage.tsx (hero Link className, the h1's md:text-title, sections without scroll-mt), app/globals.css (scroll-padding-top).
