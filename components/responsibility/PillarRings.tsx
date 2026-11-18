"use client";

import { useEffect, useRef } from "react";

/* The four CSR pillars as four interlocking rings, drawn in the site's
   line-drawn 3D (like the Careers models) but finer: each ring is a narrow
   ribbon of three hoops, every segment fades with its depth, the ring that
   turns to the front takes the brand blue and its pillar's name, and the
   model leans toward the cursor. Plain SVG projected every frame, no 3D
   library. It pauses off screen; the server renders the first frame, which
   is what reduced motion and no-script visitors see. */

type V = [number, number, number];

const RINGS: { label: string; c: V }[] = [
  { label: "Environment", c: [-0.45, 0.24, -0.45] },
  { label: "Digital access", c: [0.45, 0.08, -0.45] },
  { label: "Ethical AI", c: [0.45, -0.08, 0.45] },
  { label: "Inclusion", c: [-0.45, -0.24, 0.45] },
];
const R = 0.82;
const N = 72;
// two hoops per ring, the edges of a thin flat band; the first one carries the accent
const BAND: [number, number][] = [
  [0, 0],
  [0.045, -0.02],
];
const DEPTH_OPACITY = [0.18, 0.42, 0.85]; // back, middle, front
const SIZE = 400;
const CX = 200;
const CY = 178;
const SCALE = 112;
const BASE_TILT = (-58 * Math.PI) / 180;
const START = 0.5;

function project(theta: number, tilt: number) {
  const ct = Math.cos(theta), st = Math.sin(theta), cp = Math.cos(tilt), sp = Math.sin(tilt);
  return ([x, y, z]: V) => {
    const x1 = x * ct + z * st;
    const z1 = -x * st + z * ct;
    return { x: CX + x1 * SCALE, y: CY - (y * cp - z1 * sp) * SCALE, z: y * sp + z1 * cp };
  };
}

function frame(theta: number, tilt: number) {
  const proj = project(theta, tilt);
  const mids = RINGS.map(({ c }) => proj(c));
  const nearest = Math.max(...mids.map((m) => m.z));
  return RINGS.map(({ c }, k) => {
    const bins = ["", "", ""];
    let whole = "";
    for (const [dr, dy] of BAND) {
      let prev = null as ReturnType<typeof proj> | null;
      for (let i = 0; i <= N; i++) {
        const a = (i / N) * Math.PI * 2;
        const p = proj([c[0] + Math.cos(a) * (R + dr), c[1] + dy, c[2] + Math.sin(a) * (R + dr)]);
        if (prev) {
          const d = `M${prev.x.toFixed(1)} ${prev.y.toFixed(1)}L${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
          const z = (prev.z + p.z) / 2;
          bins[z < -0.45 ? 0 : z < 0.45 ? 1 : 2] += d;
          if (dr === 0) whole += d;
        }
        prev = p;
      }
    }
    // 1 for the ring nearest the viewer, fading out as another overtakes it,
    // so one ring at a time carries the blue
    const front = Math.min(1, Math.max(0, 1 - (nearest - mids[k].z) / 0.35));
    // the label sits just past the ring's outer edge, on the side facing away from the centre
    const len = Math.hypot(c[0], c[2]) || 1;
    const edge = proj([c[0] + (c[0] / len) * (R + 0.2), c[1], c[2] + (c[2] / len) * (R + 0.2)]);
    return { bins, whole, front, lx: edge.x, ly: edge.y };
  });
}

export function PillarRings({ className = "" }: { className?: string }) {
  const svg = useRef<SVGSVGElement>(null);
  const first = frame(START, BASE_TILT);

  useEffect(() => {
    const root = svg.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const paths = (name: string) => Array.from(root.querySelectorAll<SVGPathElement>(`[data-${name}]`));
    const bins = paths("bin");
    const accents = paths("accent");
    const labels = Array.from(root.querySelectorAll<SVGTextElement>("[data-label]"));

    let theta = START, last = 0, raf = 0;
    // pointer lean, eased toward its target every frame
    const lean = { x: 0, y: 0, tx: 0, ty: 0 };
    const tick = (t: number) => {
      const dt = last ? Math.min(0.05, (t - last) / 1000) : 0;
      last = t;
      theta += dt * 0.22;
      lean.x += (lean.tx - lean.x) * Math.min(1, dt * 4);
      lean.y += (lean.ty - lean.y) * Math.min(1, dt * 4);
      const f = frame(theta + lean.x * 0.5, BASE_TILT + lean.y * 0.16);
      f.forEach((ring, i) => {
        ring.bins.forEach((d, b) => bins[i * 3 + b].setAttribute("d", d));
        accents[i].setAttribute("d", ring.whole);
        accents[i].style.opacity = String(ring.front);
        labels[i].setAttribute("x", ring.lx.toFixed(1));
        labels[i].setAttribute("y", ring.ly.toFixed(1));
        labels[i].style.fillOpacity = String(0.5 + ring.front * 0.5);
      });
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf);
      last = 0;
      if (entry.isIntersecting) raf = requestAnimationFrame(tick);
    });
    io.observe(root);
    const band = root.closest("section") ?? root;
    const move = (e: PointerEvent) => {
      const r = root.getBoundingClientRect();
      lean.tx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / r.width));
      lean.ty = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / r.height));
    };
    const leave = () => ((lean.tx = 0), (lean.ty = 0));
    band.addEventListener("pointermove", move as EventListener);
    band.addEventListener("pointerleave", leave);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      band.removeEventListener("pointermove", move as EventListener);
      band.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <svg
      ref={svg}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      fill="none"
      aria-hidden="true"
      className={className}
      overflow="visible"
      strokeLinecap="round"
    >
      <defs>
        <radialGradient id="pillar-rings-shadow">
          <stop offset="0" stopColor="var(--color-ink)" stopOpacity="0.1" />
          <stop offset="1" stopColor="var(--color-ink)" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* a soft contact shadow grounds the model */}
      <ellipse cx={CX} cy={CY + 128} rx={160} ry={20} fill="url(#pillar-rings-shadow)" />
      {first.map((ring, i) => (
        <g key={RINGS[i].label}>
          {ring.bins.map((d, b) => (
            <path key={b} data-bin d={d} className="stroke-ink" strokeWidth={b === 2 ? 1.25 : 1} opacity={DEPTH_OPACITY[b]} />
          ))}
          <path data-accent d={ring.whole} className="stroke-primary" strokeWidth={2.2} style={{ opacity: ring.front }} />
        </g>
      ))}
      <circle cx={CX} cy={CY} r={3.5} className="fill-primary" />
      {first.map((ring, i) => (
        <text
          key={RINGS[i].label}
          data-label
          x={ring.lx.toFixed(1)}
          y={ring.ly.toFixed(1)}
          textAnchor="middle"
          dominantBaseline="middle"
          // a halo in the band's tint keeps the name clear of the lines behind it
          className="fill-ink stroke-[color-mix(in_oklab,var(--color-ink)_4%,var(--color-page))] text-[14px] font-semibold tracking-[-0.01em] [paint-order:stroke]"
          strokeWidth={6}
          strokeLinejoin="round"
          style={{ fillOpacity: 0.5 + ring.front * 0.5 }}
        >
          {RINGS[i].label}
        </text>
      ))}
    </svg>
  );
}
