import type { CareersIcon } from "@/lib/careers";

/* Line drawings for the careers page, all inline SVG on the site's tokens so
   they follow the theme. Solid strokes only (no dashes or dots), with one
   brand-blue accent each. Decorative: every one is aria-hidden. */

/* Deterministic 0..1 noise from a cell's position: same picture on the
   server and in the browser, so nothing shifts on hydration. */
const noise = (a: number, b: number) => (((a * 73856093) ^ (b * 19349663)) >>> 0) % 1000 / 1000;

/* Hero tile chart: columns of rounded tiles rising left to right, a growth
   curve built from the same tile language as the homepage hero art. Mostly
   quiet greys, with brand-blue tiles near the crest of each column. */
export function TileChart({ className = "" }: { className?: string }) {
  const cols = 28;
  const rows = 18;
  const tile = 20;
  const pitch = 25;
  const width = cols * pitch - (pitch - tile);
  const height = rows * pitch - (pitch - tile);

  const tiles: { x: number; y: number; tone: string; opacity?: number; delay: number }[] = [];
  for (let c = 0; c < cols; c++) {
    const curve = rows * Math.pow((c + 1) / cols, 1.7);
    const jitter = noise(c, 99) > 0.6 ? 1 : 0;
    const columnHeight = Math.max(1, Math.min(rows, Math.round(curve) + jitter));
    for (let r = 0; r < columnHeight; r++) {
      const v = noise(c, r);
      const crest = r >= columnHeight - 2;
      if (!crest && v > 0.93) continue; // a few gaps keep it organic
      const base = { x: c * pitch, y: height - tile - r * pitch, delay: c * 28 + r * 6 };
      if (crest && v < 0.42) {
        tiles.push({ ...base, tone: "fill-primary", opacity: 0.2 + v * 1.6 });
      } else if (v < 0.5) {
        tiles.push({ ...base, tone: "fill-surface stroke-line" });
      } else if (v < 0.82) {
        tiles.push({ ...base, tone: "fill-line" });
      } else {
        tiles.push({ ...base, tone: "fill-line-strong" });
      }
    }
  }

  return (
    <svg viewBox={`0 0 ${width} ${height}`} aria-hidden="true" className={className}>
      {tiles.map((t) => (
        <rect
          key={`${t.x}-${t.y}`}
          x={t.x}
          y={t.y}
          width={tile}
          height={tile}
          rx={5}
          strokeWidth={1}
          opacity={t.opacity}
          className={`tile-in ${t.tone}`}
          style={{ animationDelay: `${t.delay}ms` }}
        />
      ))}
    </svg>
  );
}

/* Faint square grid behind an illustration, fading at the edges */
export const GRID_BG =
  "bg-[linear-gradient(var(--color-line)_1px,transparent_1px),linear-gradient(90deg,var(--color-line)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(closest-side,black_55%,transparent)]";

/* One small drawing per reason to join */
export function ReasonArt({ icon }: { icon: CareersIcon }) {
  const line = "stroke-body";
  return (
    <svg viewBox="0 0 96 96" fill="none" aria-hidden="true" className="h-20 w-20" strokeWidth={1.25} strokeLinecap="round" strokeLinejoin="round">
      {icon === "cpu" ? (
        // a chip: frame, core, pins on every side
        <>
          <rect x="26" y="26" width="44" height="44" rx="4" className={line} />
          <rect x="38" y="38" width="20" height="20" rx="2" className={line} />
          {[34, 44, 52, 62].map((p) => (
            <g key={p} className={line}>
              <path d={`M${p} 26V16`} />
              <path d={`M${p} 70v10`} />
              <path d={`M26 ${p}H16`} />
              <path d={`M70 ${p}h10`} />
            </g>
          ))}
          <circle cx="48" cy="48" r="3.5" className="fill-primary" stroke="none" />
        </>
      ) : icon === "graduation" ? (
        // rising steps: experience handed on
        <>
          <path d="M18 74h60" className={line} />
          <rect x="22" y="58" width="16" height="16" rx="2" className={line} />
          <rect x="40" y="44" width="16" height="30" rx="2" className={line} />
          <rect x="58" y="28" width="16" height="46" rx="2" className={line} />
          <path d="M24 48l18-14 16 8 18-16" className={line} />
          <circle cx="76" cy="26" r="3.5" className="fill-primary" stroke="none" />
        </>
      ) : icon === "globe" ? (
        // a globe with one point marked: local roots, global reach
        <>
          <circle cx="48" cy="48" r="28" className={line} />
          <ellipse cx="48" cy="48" rx="12" ry="28" className={line} />
          <path d="M20 48h56M24 34h48M24 62h48" className={line} />
          <circle cx="58" cy="58" r="3.5" className="fill-primary" stroke="none" />
          <circle cx="58" cy="58" r="7" className="stroke-primary" />
        </>
      ) : (
        // a target: ownership, aim, outcome
        <>
          <circle cx="48" cy="48" r="28" className={line} />
          <circle cx="48" cy="48" r="17" className={line} />
          <path d="M48 12v14M48 70v14M12 48h14M70 48h14" className={line} />
          <circle cx="48" cy="48" r="4" className="fill-primary" stroke="none" />
        </>
      )}
    </svg>
  );
}

/* Job alerts: a paper plane on a gentle climb, its path drawn behind it */
export function PaperPlane({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 200" fill="none" aria-hidden="true" className={className} strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round">
      {/* flight path, from a blue start point up to the tail */}
      <path d="M22 182C70 182 112 168 150 136" className="stroke-line-strong" />
      <circle cx="22" cy="182" r="4" className="fill-primary" />
      {/* upper wing, lower wing, then the centre fold */}
      <path d="M298 22L106 92L176 114Z" className="fill-card stroke-ink" />
      <path d="M298 22L176 114L196 170Z" className="fill-surface stroke-ink" />
      <path d="M176 114L160 150L196 170" className="fill-line stroke-ink" />
    </svg>
  );
}
