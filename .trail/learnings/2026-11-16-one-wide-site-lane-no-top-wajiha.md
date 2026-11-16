---
title: "One wide site lane, no top labels, About copy only from the client's document, flat 2D capability scroll"
author: Wajiha-kulsum
date: 2026-11-16
branch: main
cost: { minutes: 5, tokens: 35987 }
id: l-30342be1
scope: repo
status: active
replaces: l-9f8a0c9b
src: agent
touches:
  - components/about/CapabilityStack.tsx
  - components/ui/lane.ts
  - components/ui/PageShell.tsx
  - components/ui/framed.tsx
  - lib/about.ts
  - components/contact/ContactPage.tsx
  - lib/content.ts
---

## Decided
- One lane on every page: 24px side padding on phones, 48px from 640 (in line with the header logo), up to 2000px. The client wants very little side margin and wide text site-wide, like the Contact page.
- No small label above a page's main heading (the client removed "About Us", "Contact Us", "Careers", "Responsibility").
- About copy comes only from the client's About document (2026-11-16), nothing invented. Lost hyphens restored; dashes become a title/body split or a colon (client wants no dashes).
- The About "Comprehensive Digital Solutions" scroll is flat 2D: text left, progress line in the middle, the layer's photo right, crossfading. The client rejected the isometric 3D photo stack and the sticky card stacking as not professional; phones get a plain card list.

## Watch out
- The pinned layers must fit a 1280x720 screen. The five-point "Why Organizations Choose Eastwards" layer is the tallest: lead-size title and py-2.5 rows keep it inside.

In the code: components/ui/lane.ts, components/ui/PageShell.tsx, components/ui/framed.tsx, components/about/CapabilityStack.tsx, lib/about.ts, components/contact/ContactPage.tsx, lib/content.ts.
