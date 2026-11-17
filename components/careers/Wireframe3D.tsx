"use client";

import { useEffect, useRef } from "react";
import type { CareersIcon } from "@/lib/careers";

/* Line-drawn 3D models for the reasons to join (after the client's
   reference: monochrome isometric wireframes). Each is a small mesh of 3D
   line segments, turned slowly about its vertical axis and projected to SVG
   every frame; segments on the far side are drawn fainter for depth, one
   part is brand blue. Hovering spins it faster. It pauses off screen, and
   the server renders the first frame, so without scripts or with reduced
   motion the model is simply there, still. No 3D library needed. */

type V = [number, number, number];
type Seg = [V, V];
type Mesh = { lines: Seg[]; accent: Seg[] };

function box([x, y, z]: V, [w, h, d]: V): Seg[] {
  const p = (a: number, b: number, c: number): V => [x + a * w, y + b * h, z + c * d];
  const c = [p(0, 0, 0), p(1, 0, 0), p(1, 0, 1), p(0, 0, 1), p(0, 1, 0), p(1, 1, 0), p(1, 1, 1), p(0, 1, 1)];
  const e = [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]];
  return e.map(([a, b]) => [c[a], c[b]]);
}

// a circle of radius r at height y, in the horizontal plane, or in a vertical plane turned by `turn`
function ring(r: number, y: number, vertical = false, turn = 0, n = 40): Seg[] {
  const pts: V[] = [];
  for (let i = 0; i <= n; i++) {
    const a = (i / n) * Math.PI * 2;
    if (vertical) {
      const h = Math.cos(a) * r;
      pts.push([h * Math.cos(turn), y + Math.sin(a) * r, h * Math.sin(turn)]);
    } else {
      pts.push([Math.cos(a) * r, y, Math.sin(a) * r]);
    }
  }
  return pts.slice(1).map((pt, i) => [pts[i], pt]);
}

const MESHES: Record<CareersIcon, Mesh> = {
  // a chip: slab, raised blue core, four pins on each side
  cpu: (() => {
    const lines = box([-1, -0.2, -1], [2, 0.4, 2]);
    for (const t of [-0.6, -0.2, 0.2, 0.6]) {
      lines.push([[t, 0, 1], [t, 0, 1.35]], [[t, 0, -1], [t, 0, -1.35]], [[1, 0, t], [1.35, 0, t]], [[-1, 0, t], [-1.35, 0, t]]);
    }
    return { lines, accent: box([-0.45, 0.2, -0.45], [0.9, 0.4, 0.9]) };
  })(),
  // a cluster of towers rising toward the back corner; the tallest in blue
  graduation: (() => {
    const lines: Seg[] = [];
    let accent: Seg[] = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const h = 0.45 + (i + j) * 0.38;
        const bar = box([-0.95 + i * 0.68, -1, -0.95 + j * 0.68], [0.5, h, 0.5]);
        if (i === 2 && j === 2) accent = bar;
        else lines.push(...bar);
      }
    }
    return { lines, accent };
  })(),
  // a globe: latitudes and meridians, with a blue orbit ring
  globe: (() => {
    const lines: Seg[] = [];
    for (const y of [-0.8, -0.45, 0, 0.45, 0.8]) lines.push(...ring(Math.sqrt(1 - y * y), y));
    for (let k = 0; k < 6; k++) lines.push(...ring(1, 0, true, (k * Math.PI) / 6));
    return { lines, accent: ring(1.38, 0.1, false, 0, 56) };
  })(),
  // a target of stacked rings; a blue arrow lands in the centre
  target: (() => {
    const lines = [...ring(1.2, -0.3), ...ring(0.9, -0.15), ...ring(0.6, 0), ...ring(0.3, 0.15)];
    lines.push([[0, -0.3, 1.2], [0, -0.15, 0.9]], [[0, -0.3, -1.2], [0, -0.15, -0.9]], [[1.2, -0.3, 0], [0.9, -0.15, 0]], [[-1.2, -0.3, 0], [-0.9, -0.15, 0]]);
    return {
      lines,
      accent: [
        [[0, 0.15, 0], [0.55, 1.15, 0.55]],
        [[0, 0.15, 0], [0.12, 0.42, 0.02]],
        [[0, 0.15, 0], [0.02, 0.42, 0.12]],
      ],
    };
  })(),
};

const TILT = (-32 * Math.PI) / 180; // looking down on the model
const SCALE = 58;

function frame(mesh: Mesh, theta: number) {
  const ct = Math.cos(theta), st = Math.sin(theta), cp = Math.cos(TILT), sp = Math.sin(TILT);
  const proj = ([x, y, z]: V) => {
    const x1 = x * ct + z * st;
    const z1 = -x * st + z * ct;
    return { x: 100 + x1 * SCALE, y: 104 - (y * cp - z1 * sp) * SCALE, z: y * sp + z1 * cp };
  };
  const seg = ([a, b]: Seg) => {
    const p = proj(a), q = proj(b);
    return { d: `M${p.x.toFixed(1)} ${p.y.toFixed(1)}L${q.x.toFixed(1)} ${q.y.toFixed(1)}`, z: p.z + q.z };
  };
  let back = "", front = "", accent = "";
  for (const s of mesh.lines) {
    const { d, z } = seg(s);
    if (z < 0) back += d;
    else front += d;
  }
  for (const s of mesh.accent) accent += seg(s).d;
  return { back, front, accent };
}

const START = 0.6;

export function Wireframe3D({ shape, className = "" }: { shape: CareersIcon; className?: string }) {
  const svg = useRef<SVGSVGElement>(null);
  const backRef = useRef<SVGPathElement>(null);
  const frontRef = useRef<SVGPathElement>(null);
  const accentRef = useRef<SVGPathElement>(null);
  const fast = useRef(false);
  const mesh = MESHES[shape];
  const first = frame(mesh, START);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let theta = START, last = 0, raf = 0, visible = false;
    const tick = (t: number) => {
      const dt = last ? Math.min(0.05, (t - last) / 1000) : 0;
      last = t;
      theta += dt * (fast.current ? 1.6 : 0.35);
      const f = frame(mesh, theta);
      backRef.current?.setAttribute("d", f.back);
      frontRef.current?.setAttribute("d", f.front);
      accentRef.current?.setAttribute("d", f.accent);
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      last = 0;
      if (visible) raf = requestAnimationFrame(tick);
    });
    if (svg.current) io.observe(svg.current);
    // spin faster while the card it sits in is hovered
    const card = svg.current?.closest(".group");
    const on = () => (fast.current = true);
    const off = () => (fast.current = false);
    card?.addEventListener("pointerenter", on);
    card?.addEventListener("pointerleave", off);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      card?.removeEventListener("pointerenter", on);
      card?.removeEventListener("pointerleave", off);
    };
  }, [mesh]);

  return (
    <svg ref={svg} viewBox="0 0 200 200" fill="none" aria-hidden="true" className={className} strokeLinecap="round">
      <path ref={backRef} d={first.back} className="stroke-body" strokeWidth={1} opacity={0.35} />
      <path ref={frontRef} d={first.front} className="stroke-ink" strokeWidth={1.1} opacity={0.75} />
      <path ref={accentRef} d={first.accent} className="stroke-primary" strokeWidth={1.6} />
    </svg>
  );
}
