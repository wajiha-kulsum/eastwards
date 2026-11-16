---
title: "The About capabilities scroll walks through each specialisation with its own photo, with no counters or numbers"
author: Wajiha-kulsum
date: 2026-11-16
branch: about-contact-wide-lane
cost: { minutes: 8, tokens: 126312 }
id: l-c4063d32
scope: repo
status: active
replaces: l-e53c299f
src: agent
touches:
  - lib/about.ts
  - components/about/CapabilityStack.tsx
  - components/about/AboutPage.tsx
---

## Decided
- The client asked for headings and statements only: no "Layer 01 of 05" counter, no 01/02 numbers on points, and no numbers on the progress line (only the layer names).
- The scroll covers just the three service layers (Engineering, Security, Delivery). "Why Organizations Choose Eastwards" and "Our Approach" are separate sections below the dark band, each with a photo and icon points.
- The scroll steps through all nine specialisations, one at a time. The one in view is lit in its layer's list, and the photo on the right is that specialisation's own photo. Clicking a specialisation or a layer name jumps there.
- Hero: the team photo comes first, with the headline and the logo's blue arrow (a link to Contact) set on it. The intro paragraph sits below the photo.

## Tried and ruled out
- Reusing photos from other pages (the home insights, the services cards) for the specialisations: most are abstract renders or already used elsewhere. The nine new free-licence Unsplash photos are credited in the data file.
- An Unsplash "data center" result that was really a museum hallway, and one that was an electrical-cabinet factory: replaced with a real server-rack photo.

## Watch out
- Each layer has at most three points now, so the 1280x720 height limit from the five-point layer no longer binds. Recheck it if a layer grows.

In the code: lib/about.ts (capabilities.layers[].items[].image, why, approach, hero.action), components/about/CapabilityStack.tsx (STEPS, STEP_SVH = 55), components/about/AboutPage.tsx (hero overlay, Point).
