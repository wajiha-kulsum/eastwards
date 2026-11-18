/* The framed page, shared by /careers and /responsibility (the
   attio.com/careers manner on the site's tokens): content sits between
   hairline rails, sections are split by a rule, headings are two-tone (an
   ink lead, then grey), and grids get hatched gutters or a faint square grid
   behind their drawings. */

// Side padding inside the rails (24px, so content sits 48px from the edge
// like every other page), and a full section with its top rule
export const PAD = "px-6";
export const SECTION = `${PAD} py-16 sm:py-24`;

// No borders on these pages (the client asked for them gone, as on About):
// groups sit on a faint surface, 4% ink over the page, so it works in both themes
export const TINT = "bg-[color-mix(in_oklab,var(--color-ink)_4%,var(--color-page))]";
export const TINT_HOVER = "hover:bg-[color-mix(in_oklab,var(--color-ink)_8%,var(--color-page))]";

export const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
export const BODY = "text-small leading-[1.7] text-body";

// Small rounded tag: the page label in the hero, numbers on grid cells
export const CHIP = "inline-flex items-center rounded-lg bg-[color-mix(in_oklab,var(--color-ink)_6%,var(--color-page))] px-3 py-1 text-small font-medium text-ink";

// Diagonal hatching for the gutters beside a grid
export const HATCH = "bg-[repeating-linear-gradient(135deg,var(--color-line)_0_1px,transparent_1px_9px)]";

// Faint square grid behind an illustration, fading at the edges
export const GRID_BG =
  "bg-[linear-gradient(var(--color-line)_1px,transparent_1px),linear-gradient(90deg,var(--color-line)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(closest-side,black_55%,transparent)]";

/* Section heading: the lead in ink, the rest in grey, one sentence flow */
export function TwoTone({
  id,
  lead,
  rest,
  as: Tag = "h2",
}: {
  id?: string;
  lead: string;
  rest?: string;
  as?: "h2" | "p";
}) {
  return (
    <Tag id={id} className="max-w-[34ch] text-balance text-lead font-semibold leading-[1.2] tracking-[-0.02em] text-ink">
      {lead}
      {rest ? <span className="text-body"> {rest}</span> : null}
    </Tag>
  );
}

/* The page frame: the site lane with the rails 24px from the edge, then the
   railed column inside it. Phones
   drop the rails and their gutter, so content keeps the full width and
   lines up with the footer at 24px. */
export function FramedPage({ children }: { children: React.ReactNode }) {
  return (
    <main id="main" className="flex-1 bg-page text-ink">
      {/* without scripts, nothing waits on an entrance animation */}
      <noscript>
        <style>{`[data-slot="blur-fade"]{opacity:1!important;filter:none!important;transform:none!important}[data-slot=\"scroll-reveal\"] span{opacity:1!important}`}</style>
      </noscript>
      <div className="mx-auto max-w-[2000px] sm:px-6">
        <div>{children}</div>
      </div>
    </main>
  );
}
