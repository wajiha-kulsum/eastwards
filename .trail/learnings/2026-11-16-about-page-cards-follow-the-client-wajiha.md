---
title: "About page cards follow the client's sketch, and every reveal has a fallback for no scripts and reduced motion"
author: Wajiha-kulsum
date: 2026-11-16
branch: about-contact-wide-lane
cost: { minutes: 9, tokens: 71956 }
id: l-f4069df8
scope: repo
status: active
src: agent
touches:
  - components/about/CapabilityStack.tsx
  - components/about/AboutPage.tsx
  - app/globals.css
---

## Decided
- The client sketched the reasons card: the logo's arrow as an outline, the heading, then the statement directly under it. Why Eastwards uses that card, and Our Approach uses a small version of the arrow beside each principle. On hover the outline fills blue and nudges forward.
- Every reveal sits on a wrapper and every hover on the inner card, so a card's entrance and its hover lift never fight.
- Motion, all off under reduced motion:
  - the hero photo settles from a slight zoom (CSS only, so it runs before scripts);
  - the headline and section headings rise word by word;
  - cards and rows arrive in a short stagger;
  - the Next Steps arrows fill and grow on hover.

## Watch out
- Below-the-fold reveals stay at opacity 0 until scripts run. A `<noscript>` style in the page forces them visible. Checked with JavaScript off: no element stayed hidden.
- Text Animate takes no `id`, so our copy adds one, so sections can be labelled by their heading.
- Screenshot clips over the browser protocol (CDP) take page coordinates, not viewport ones. Add scrollY, or the crops come out blank.

In the code: components/about/AboutPage.tsx (Heading, ArrowMark, CARD, noscript style), app/globals.css (.about-hero-settle), components/ui/text-animate.tsx (id prop).
