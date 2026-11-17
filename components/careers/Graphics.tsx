/* Line drawings for the careers page, all inline SVG on the site's tokens so
   they follow the theme. Solid strokes only (no dashes or dots), with one
   brand-blue accent each. Decorative: every one is aria-hidden. */

/* Deterministic 0..1 noise from a cell's position: same picture on the
   server and in the browser, so nothing shifts on hydration. */
const noise = (a: number, b: number) => (((a * 73856093) ^ (b * 19349663)) >>> 0) % 1000 / 1000;

/* Hero tile chart: columns of rounded tiles rising left to right, a growth
   curve built from the same tile language as the homepage hero art. Mostly
   quiet greys, with brand-blue tiles near the crest of each column. Flat
   fills, no outlines; tiles light up under the cursor (globals.css .tile). */
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
        // the brighter crest tiles pulse, like live activity
        tiles.push({ ...base, tone: v < 0.2 ? "fill-primary tile-pulse" : "fill-primary", opacity: 0.2 + v * 1.6 });
      } else if (v < 0.5) {
        tiles.push({ ...base, tone: "fill-[color-mix(in_oklab,var(--color-ink)_3%,var(--color-page))]" });
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
          opacity={t.opacity}
          className={`tile ${t.tone.includes("tile-pulse") ? "" : "tile-in "}${t.tone}`}
          style={{ animationDelay: `${t.delay}ms` }}
        />
      ))}
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
