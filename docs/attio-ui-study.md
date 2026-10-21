# Attio UI study → Eastwards services pages

Study of attio.com's marketing surface (home page + section patterns, retrieved
2026-10-21) broken down into what makes it feel minimal and clean, mapped onto the
Eastwards token system. This document is the build spec for the services surface
(`/services/[slug]` pages + the navbar services dropdown).

## 1. The system behind Attio's "minimal"

Attio's calm comes from disciplined repetition, not exotic components:

| Layer | What Attio does | Why it reads clean |
|---|---|---|
| Container | One narrow centered container, generous side padding | Everything aligns to the same rail |
| Separation | Huge vertical whitespace between sections; 1px hairlines; almost no boxes | Whitespace + hairline carries hierarchy instead of borders/shadows |
| Type | One sans family. Big bold H1 (tight tracking), muted gray body, small eyebrows | Two or three sizes, used consistently — no mid-page size drift |
| Body copy | Small type but `line-height ≈ 1.6` and capped measure (~640–700px) | Density reads as air, not as a wall |
| Color | Near-monochrome (white bg, black ink, gray body); one accent only where it means something | The eye always knows what is clickable vs static |
| Cards | Thin border, small radius, tiny type, **no shadows** | Elevation is never faked |
| Footers/CTAs | Flat rows/columns, tiny gray type, hairline top | Nothing shouts at the end of the page |

## 2. Component anatomy (how each is placed and built)

- **Nav** — 3–4 small text links + one solid pill CTA. Flat, hairline-free, ~64–72px tall.
- **Hero** — left-aligned H1 + one muted sentence + small CTA cluster. Never more.
- **Section pattern** — eyebrow → 2-line statement heading (tight tracking) → muted
  body. Sections repeat this anatomy; alternating text/product-mock rows get generous
  vertical gaps.
- **Numbered index** — `01 Build pipeline …` doubles as a page TOC.
- **Feature rows** — text block beside a bordered, rounded product-mock panel. The
  *panel* is the only "heavy" visual on the page.
- **Stats** — giant numeral + tiny gray caption in a plain row. No cards.
- **Testimonial** — one quote, one attribution, centered, no box.
- **Content cards** — thin border, small radius (12–16px), small type, date/label +
  title. Hover changes are subtle (border/underline), never lifts.
- **CTA close** — statement heading + one primary button, hairline above.
- **Footer** — tall flat column lists, tiny gray text, hairline top.

Notable *restraint* patterns worth copying: eyebrows are scarce (reserved for the
few big statement sections), color appears only as the accent, and content cards
never wrap in bigger boxes.

## 3. Token translation (Attio → Eastwards)

| Attio pattern | Eastwards token (from the approved Paper design) |
|---|---|
| White page bg | `bg-white` |
| Black ink headlines | `--color-ink` `#3c3f44` |
| Gray body copy | `--color-body` `#757575` |
| Card hairline | `--color-line` `#eeeeee`, hover `--color-line-strong` `#d9d9d9` |
| Accent / links / numbers | `--color-primary` `#2868ff` |
| Big statement text | `--color-statement` `#4b4b4b` |
| Statement heading size | `text-title` / `text-lead` from the 5-step scale |
| Body copy size | `text-small` (18px cap) — paired with `leading-[1.6]` and `max-w-[720px]` |
| Card radius | `rounded-2xl` (16px) |

## 4. What changed on the services surface

Implemented in `components/services/ServicePage.tsx` (all 18+ slugs render through
it) and `components/Navbar.tsx` (services dropdown), content untouched:

1. **Tokens only** — raw literals (`#7a7a7a`, `#292929`, `#2869ff`, `#757575`,
   `#fafafa`) replaced with `text-body` / `text-ink` / `text-primary` / `bg-surface`.
2. **Box system removed** — the one-giant-`rounded-[23px]` gray container per block is
   gone. Sections separate with whitespace + hairline top borders
   (`border-t border-line`).
3. **Section grouping** — continuing blocks (same kind, no heading) merge into the
   previous section, so copy flows as one document instead of staircase sections.
4. **Cards** — the reference mock's hairline grid: outer hairline rectangle,
   internal 1px dividers, square corners, no card backgrounds, and boxed micro
   chips carrying the blue index numbers (`01…`). (Originally shipped as
   `rounded-2xl` border tiles; the mock pass superseded them.)
5. **Panels** — hairline-separated two-column groups with statement-size group
   titles (`text-copy`) instead of the mega-box.
6. **Prose/bullets** — `leading-[1.6]`, `max-w-[720px]`, proper measure; unified
   heading style (`text-lead`, `tracking-[-0.02em]`, ink).
7. **Hero + CTA** — the mock pass centered the hero: `ServiceHero` with a
   full-bleed dot field fading at the edges, `/ Services /` eyebrow, uppercase
   Inter Display Bold title + lattice-snapped blue mark, existing lede text, and
   the page's single "Contact Us" `PrimaryButton` (the earlier closing CTA row
   was retired to avoid a duplicate contact intent).

DotHero and BlogShowcase are locked to the approved Paper design and were not
altered beyond what their existing code already does.

## 5. Rules to keep (do / don't)

- **Do** add new service content as blocks in `lib/content.ts`; rendering follows
  automatically.
- **Do** keep one accent (`text-primary`) for intent-carrying marks only — numbers,
  links, the CTA label, bullet dots.
- **Don't** reintroduce boxed mega-containers or shadows on cards. Card surfaces
  are hairline grid cells (square corners, 1px dividers, no fill).
- **Boxed eyebrow chips are the mock's one sanctioned micro label** — built from
  `--text-label`, used on card cells; don't grow them onto every prose/bullets
  section heading.
- **Don't** put raw hex colors in components; use the tokens (colors live only in
  `app/globals.css` and locked geometry like DotField/DotHero/ServiceHero's
  reused lattice pieces).
