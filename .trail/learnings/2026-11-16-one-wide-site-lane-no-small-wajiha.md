---
title: "One wide site lane, no small labels over page headings, and About copy only from the client's document"
author: Wajiha-kulsum
date: 2026-11-16
branch: main
cost: { minutes: 34, tokens: 271831 }
id: l-9f8a0c9b
scope: repo
status: active
src: agent
touches:
  - lib/content.ts
  - components/Navbar.tsx
  - app/globals.css
  - components/Footer.tsx
  - components/about/AboutPage.tsx
  - components/contact/ContactPage.tsx
  - components/responsibility/ResponsibilityPage.tsx
  - lib/about.ts
  - lib/responsibility.ts
---

## Decided
- Every page uses one lane: 24px side padding on phones, 48px from 640 (in line with the header logo), up to 2000px wide. The client asked for very little side margin and wide text across the whole site, matching the Contact page. Don't reintroduce the old 1720px lane with 5.35% side padding on any page.
- No small label above a page's main heading (the "About Us", "Contact Us", "Careers", "Responsibility" chips and eyebrows were removed on the client's request).
- About page copy comes only from the client's About document (supplied 2026-11-16). Nothing invented or rephrased: the old "Nobody builds alone" hero and the short service blurbs were replaced. Hyphens lost in the document's paste are restored; spaced dashes become a title/body split or a colon (client wants no dashes).
- The About hero is "landscape": heading and text across the full width, team photo as a wide banner below.
- Contact page details beside the form: website and the two inboxes from the document. The Office/address row there was removed on request; the address stays in the headquarters band.

## Watch out
- With the narrower side padding, the About page's tilted 3D photo stack poked 26px past the right edge at 1280px; it is now 88% wide and its runway clips sideways.
- The pinned capability layers must fit a 1280x720 screen: the five-point "Why Organizations Choose Eastwards" layer is the tallest. Keep the lead-size title and the 1.35fr text column.

In the code: components/ui/lane.ts (LANE, SECTION_LANE), components/ui/PageShell.tsx, components/ui/framed.tsx (FramedPage rails at sm:px-6, PAD = px-6), components/about/CapabilityStack.tsx, lib/about.ts, components/contact/ContactPage.tsx, lib/content.ts (contact.ways, footer.cta.hideOn includes /about).
