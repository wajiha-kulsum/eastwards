---
title: The About page has no borders and uses Craftwork motion components with a CSS fallback so the hero never stays hidden
author: Wajiha-kulsum
date: 2026-11-16
branch: about-contact-wide-lane
cost: { minutes: 10, tokens: 131897 }
id: l-257942b1
scope: repo
status: active
src: agent
touches:
  - components/ui/scroll-progress.tsx
  - components/ui/text-animate.tsx
  - components/ui/blur-fade.tsx
  - components/about/SmoothScroll.tsx
  - components/about/AboutPage.tsx
  - app/globals.css
---

## Decided
- No borders on About, at the client's request. There are no frame rails (the page uses its own `<main>`, not the shared framed page) and no section rules. Groups use spacing and a 4% ink tint over the page colour, which works in both themes because light mode's surface token is almost white.
- Smoothing comes from Craftwork's free Blank components: Scroll Progress (a blue reading line), Text Animate (the headline enters word by word) and Blur Fade (photos and the intro ease in). Eased wheel scrolling uses the installed Lenis, on this page only. All of it is off under reduced motion.

## Watch out
- Motion renders above-the-fold text hidden until scripts run. The `.reveal-fallback` CSS animation in the global stylesheet shows the hero after 1.4s regardless. Checked with JavaScript disabled in headless Chrome.
- Text Animate wrapped each space between words in its own inline-block, so wrapped headline lines started with a space. Our copy renders those spaces as plain text.
- The built-in preview pane pauses animation frames while it's hidden, so animations there look stuck at opacity 0. Verify motion in headless Chrome instead.

In the code: components/about/AboutPage.tsx (SECTION, TINT), components/about/SmoothScroll.tsx, components/ui/{scroll-progress,text-animate,blur-fade}.tsx, app/globals.css (.reveal-fallback).
