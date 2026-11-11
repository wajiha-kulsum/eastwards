/* Line drawings for the responsibility page, in the careers drawings' rules
   (components/careers/Graphics.tsx): inline SVG on the site's tokens, solid
   strokes only, one brand-blue accent each, decorative and aria-hidden. */

/* Hero: four overlapping circles, one per pillar, meeting at a blue centre:
   four pillars, one mindset. Labels sit outside each circle. */
export function PillarsFigure({ labels, className = "" }: { labels: readonly string[]; className?: string }) {
  const r = 92;
  const offset = 58;
  const centres = [
    { cx: 240 - offset, cy: 200 - offset, lx: 240 - offset - 64, ly: 200 - offset - r - 18, anchor: "start" },
    { cx: 240 + offset, cy: 200 - offset, lx: 240 + offset + 64, ly: 200 - offset - r - 18, anchor: "end" },
    { cx: 240 - offset, cy: 200 + offset, lx: 240 - offset - 64, ly: 200 + offset + r + 30, anchor: "start" },
    { cx: 240 + offset, cy: 200 + offset, lx: 240 + offset + 64, ly: 200 + offset + r + 30, anchor: "end" },
  ] as const;

  return (
    <svg viewBox="0 0 480 400" fill="none" aria-hidden="true" className={className}>
      {centres.map((c, i) => (
        <g key={i}>
          <circle cx={c.cx} cy={c.cy} r={r} strokeWidth={1.25} className="fill-primary/[0.04] stroke-line-strong" />
          <circle cx={c.cx} cy={c.cy} r={3} className="fill-line-strong" />
          {labels[i] ? (
            <text
              x={c.lx}
              y={c.ly}
              textAnchor={c.anchor}
              className="fill-body font-sans text-[15px] font-medium"
            >
              <tspan className="fill-link">0{i + 1}</tspan> {labels[i]}
            </text>
          ) : null}
        </g>
      ))}
      {/* where all four overlap */}
      <circle cx={240} cy={200} r={22} strokeWidth={1.25} className="fill-card stroke-primary" />
      <circle cx={240} cy={200} r={6} className="fill-primary" />
    </svg>
  );
}
