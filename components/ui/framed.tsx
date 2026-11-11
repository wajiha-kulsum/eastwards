/* The framed page, shared by /careers and /responsibility (the
   attio.com/careers manner on the site's tokens): content sits between
   hairline rails, sections are split by a rule, headings are two-tone (an
   ink lead, then grey), and grids get hatched gutters or a faint square grid
   behind their drawings. */

// Side padding inside the rails, and a full section with its top rule
export const PAD = "px-6 sm:px-10 lg:px-16 xl:px-24";
export const SECTION = `border-t border-line ${PAD} py-16 sm:py-24`;

export const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
export const BODY = "text-small leading-[1.7] text-body";

// Small rounded tag: the page label in the hero, numbers on grid cells
export const CHIP = "inline-flex items-center rounded-lg border border-line-strong bg-card px-3 py-1 text-small font-medium text-ink";

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

/* The page frame: the site lane, then the railed column inside it */
export function FramedPage({ children }: { children: React.ReactNode }) {
  return (
    <main id="main" className="flex-1 bg-page text-ink">
      <div className="mx-auto max-w-[1720px] px-6 pt-3 sm:px-10 lg:px-[5.35%]">
        <div className="border-x border-line">{children}</div>
      </div>
    </main>
  );
}
