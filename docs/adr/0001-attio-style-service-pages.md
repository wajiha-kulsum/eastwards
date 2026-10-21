# ADR-0001: Attio-derived layout discipline for the services surface

Date: 2026-10-21 · Status: Accepted

## Context

The service pages under `/services/[slug]` (18+ slugs, all rendering through one
component, `components/services/ServicePage.tsx`) wrapped every content block in a
single large `rounded-[23px]` gray container and set almost all copy at one size
(`text-small`) with tight line-height. The result was dense, boxy and carried raw
hex color literals drifting off the approved design tokens.

The user asked for the minimal, clean language of attio.com applied to the whole
services surface, pixel-disciplined to the site's existing tokens.

## Decision

Rebuild the service-page renderer on the layout rules documented in
`docs/attio-ui-study.md`:

- Sections separated by whitespace + hairline top borders (`border-t border-line`),
  never boxed mega-containers.
- Continuing blocks (same kind, no heading) merge into the previous section.
- Cards are individual bordered tiles (`rounded-2xl`, border-only, hover darkens the
  border); panels are two-column groups with statement-size titles.
- One accent (`text-primary`) only where it carries intent; token-only colors.
- One closing contact CTA row before BlogShowcase.
- Brand tokens and the approved Paper design (DotHero, BlogShowcase) unchanged.
  Scope limited to the services surface: service pages + the navbar services
  dropdown.

## Consequences

- All slugs update from one file; content in `lib/content.ts` is untouched.
- Eyebrow labels are intentionally scarce (only the CTA row carries one) to keep
  pages calm.
- New service content is added as blocks in `lib/content.ts`; rendering follows
  automatically. Any new section kind should follow the hairline/section system
  rather than reintroducing boxed containers.

## Amendment (2026-10-21, later the same day)

A reference mock widened the services look; the renderer was re-passed:

- `cards` render as the mock's **hairline grid** — outer rectangle, internal 1px
  dividers, square corners, boxed micro chips (new `--text-label: 11px` token) —
  superseding the `rounded-2xl` tiles above.
- The closing contact CTA row moved **into the hero**: `ServiceHero`
  (full-bleed fading dot field, centered title, existing lede, one CTA)
  replaces DotHero + the CTA row on all service pages, removing the duplicate
  contact intent. Contact/About/Partners still use DotHero.
- Everything else (tokens, content, hairline sections) stands.
