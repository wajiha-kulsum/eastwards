---
title: The pinned capabilities scroll must keep its text column wide so the five-point layer fits a 1280x720 screen
author: Wajiha-kulsum
date: 2026-11-16
branch: about-contact-wide-lane
cost: { minutes: 17, tokens: 349347 }
id: l-e53c299f
scope: repo
status: active
src: agent
touches:
  - app/page.tsx
  - app/services/page.tsx
  - components/BlogShowcase.tsx
  - components/Footer.tsx
  - components/Hero.tsx
  - components/HomeContactCta.tsx
  - components/about/AboutPage.tsx
  - components/about/CapabilityStack.tsx
  - components/careers/CareersPage.tsx
  - components/contact/ContactPage.tsx
---

## Decided
- The pinned scroll's tallest layer ("Why Organizations Choose Eastwards", five points) must fit the 648px pinned height on a 1280x720 screen. After the polish it measures 630px, which leaves almost no room.
- The text and photo columns stay equal width (`minmax(0,1fr) auto minmax(0,1fr)`). Each point's number sits inline before its title, not in its own column, so the descriptions use the full column width.
- Rows use `py-2` and descriptions use `leading-[1.5]`. The photo fills the height with `h-[min(620px,calc(100svh-72px-6rem))]`.

## Tried and ruled out
- A narrower 5fr/6fr text/photo split: the text wrapped more and the five-point layer grew to 719px, overflowing the screen.
- Numbers in a separate 2rem column: that still overflowed, at 691px.

## Watch out
- Measure after the page has hydrated. Scrolling right after navigation leaves the layer stuck on 01, so every reading comes back the same. Wait about 1.5s after each scroll before reading heights.
- Screens shorter than 720px weren't checked and may cut off the five-point layer.

In the code: components/about/CapabilityStack.tsx (PinnedLayers sticky grid, the items list and the photo box).
