---
title: "The About page is set as an editorial page with no icon tiles, small blue labels or stock-handshake photos, because the client found those generic and AI-looki…"
author: Wajiha-kulsum
date: 2026-11-16
branch: about-contact-wide-lane
cost: { minutes: 12, tokens: 104920 }
id: l-6822571e
scope: repo
status: active
src: agent
touches:
  - components/about/AboutPage.tsx
  - lib/about.ts
---

## Decided
- The client said the icons "look a lot AI" and that another reviewer scored the page 6. The page now uses no icon tiles at all. Lists are plain headings and statements, and the only graphic mark is the logo's own arrow (in the hero button and the next-step links).
- Section names (Mission, Our Foundation, Our promise) sit in a side column as plain ink text, not as small blue labels above headings.
- Each section has its own layout, so the page doesn't read as one card kit repeated:
  - the intro as a large statement with the detail beside it;
  - mission and foundation as rows (name, statement, detail);
  - the promise as three large phrases;
  - Why Eastwards as a mosaic of five reasons around one photo;
  - Our Approach as a photo beside a list;
  - Next Steps as full-width links.
- The "Headquartered in Singapore" glass tag on the hero photo was removed at the client's request.
- References studied on Craftwork: Crusoe (lead: the photo hero, then a large statement with the detail beside it) and Evidi (a consultancy: candid people photos and themes set as type).

## Tried and ruled out
- Tinted rounded-square icon tiles beside every point, and a row of section-link pills under the intro: both read as template or AI-made.
- A handshake stock photo for Our Approach: replaced with a candid whiteboard session.

## Watch out
- Large statements split hyphenated words ("outcome-" / "driven"). The page keeps them whole with a no-wrap span helper.
- What would still lift the page most is real content the document doesn't have: photos of the actual Eastwards team, client results or case studies.

In the code: components/about/AboutPage.tsx (H2, ROW_NAME, STATEMENT, TILE_TITLE, keepHyphenated, LogoArrow), lib/about.ts (no icon keys, approach image about-approach.jpg).
