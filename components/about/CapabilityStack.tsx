"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { about, type Layer } from "@/lib/about";

/* "Comprehensive Digital Solutions" as a vertical, scroll-driven stack.

   From 1024 (and with motion allowed) the section pins while the page
   scrolls through the five layers. Left: the layer index with a progress
   line. Middle: the active layer, its title coming into focus. Right: an
   isometric stack where each layer's photo drops in as a plate on top of
   the ones before, which settle underneath and dim. The stack is the page's
   one idea: Eastwards' capabilities build on each other like the layers of
   an IT architecture.

   Below 1024, or with reduced motion, the same layers are cards that stack
   with sticky offsets as the page scrolls: same order, same photos, no
   pinning. Only one of the two is displayed, so assistive tech reads the
   content once. */

const { layers, layer: LAYER, of: OF } = about.capabilities;
const COUNT = layers.length;
const pad = (n: number) => String(n).padStart(2, "0");

// Each layer gets this much scroll while pinned
const STEP_SVH = 85;
// Height between plates in the stack, in px along the stack's Z axis
const GAP = 64;
// How far above the stack a plate waits before it drops into place
const DROP = 260;

/* One layer's plate. Plates keep their own height in the stack (layer 1 at
   the bottom), so the stack visibly grows as you scroll: a plate drops in
   from above when its layer is reached, and the plates under it go grey. */
function Plate({ layer, index, active }: { layer: Layer; index: number; active: number }) {
  const placed = index <= active;
  const current = index === active;
  const z = index * GAP + (placed ? 0 : DROP);

  return (
    <div
      className="absolute inset-[15%] transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [transform-style:preserve-3d] motion-reduce:transition-none"
      style={{ transform: `translateZ(${z}px)`, opacity: placed ? 1 : 0 }}
    >
      {/* the plate's edge: a slightly larger slab just below the face */}
      <div className="absolute -inset-[3px] rounded-[20px] bg-white/10 [transform:translateZ(-8px)]" />
      <div
        className={`relative h-full w-full overflow-hidden rounded-[18px] border bg-[var(--color-band)] transition-[border-color,box-shadow] duration-500 ${
          current ? "border-primary/80 shadow-[0_30px_60px_-20px_rgb(40_104_255/0.5)]" : "border-white/20"
        }`}
      >
        <Image
          src={layer.image.src}
          alt=""
          fill
          sizes="460px"
          className={`object-cover transition-[filter] duration-700 ${current ? "" : "grayscale"}`}
        />
        <span
          className={`absolute inset-0 transition-colors duration-700 ${current ? "bg-transparent" : "bg-[var(--color-band)]/55"}`}
        />
        {/* the layer's number, printed on the plate */}
        <span
          className={`absolute left-3 top-3 rounded-md px-2 py-0.5 text-small font-semibold tabular-nums transition-colors duration-500 ${
            current ? "bg-primary text-white" : "bg-white/10 text-white/70"
          }`}
        >
          {pad(index + 1)}
        </span>
      </div>
    </div>
  );
}

function PinnedStack() {
  const runway = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = runway.current;
      if (!el) return;
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const seen = Math.min(total, Math.max(0, -el.getBoundingClientRect().top));
      setProgress(seen / total);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const position = progress * COUNT;
  const active = Math.min(COUNT - 1, Math.floor(position));
  const layer = layers[active];

  // The index buttons scroll the page to the middle of a layer's stretch
  const jumpTo = (index: number) => {
    const el = runway.current;
    if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    const top = el.getBoundingClientRect().top + window.scrollY + ((index + 0.35) / COUNT) * total;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div ref={runway} className="relative" style={{ height: `calc(${COUNT} * ${STEP_SVH}svh + 100svh)` }}>
      <div className="sticky top-[72px] grid h-[calc(100svh-72px)] grid-cols-[180px_minmax(0,1fr)_minmax(0,1.05fr)] items-center gap-10 px-16 xl:grid-cols-[200px_minmax(0,1fr)_minmax(0,1.1fr)] xl:gap-14 xl:px-24">
        {/* Layer index: a vertical progress rail with jump links */}
        <nav aria-label="Capability layers" className="relative self-center">
          <span aria-hidden="true" className="absolute bottom-2 left-[5px] top-2 w-px bg-white/15" />
          <span
            aria-hidden="true"
            className="absolute left-[5px] top-2 w-px origin-top bg-primary transition-[height] duration-300 ease-out"
            style={{ height: `calc((100% - 1rem) * ${Math.min(1, position / COUNT)})` }}
          />
          <ol className="relative space-y-1">
            {layers.map((item, index) => {
              const current = index === active;
              const done = index < active;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => jumpTo(index)}
                    aria-current={current ? "step" : undefined}
                    className="group flex min-h-10 w-full items-center gap-4 rounded-sm text-left text-small transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                  >
                    <span
                      aria-hidden="true"
                      className={`h-[11px] w-[11px] shrink-0 rounded-full border transition-colors duration-300 ${
                        current ? "border-primary bg-primary" : done ? "border-primary bg-[var(--color-band)]" : "border-white/30 bg-[var(--color-band)]"
                      }`}
                    />
                    <span className={`tabular-nums ${current ? "text-white/70" : "text-white/35"}`}>{pad(index + 1)}</span>
                    <span
                      className={`transition-colors duration-300 ${current ? "font-semibold text-white" : "text-white/45 group-hover:text-white/80"}`}
                    >
                      {item.short}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>

        {/* The active layer */}
        <div aria-live="polite" className="min-w-0">
          <p className="text-small tabular-nums text-white/50">
            {LAYER} {pad(active + 1)} {OF} {pad(COUNT)}
          </p>
          <h3
            key={layer.id}
            className="focus-in mt-4 text-balance font-display text-title font-bold leading-[1.05] tracking-[-0.03em] text-white"
          >
            {layer.title}
          </h3>
          <ul key={`${layer.id}-items`} className="mt-8 space-y-6 border-t border-white/10 pt-8">
            {layer.items.map((item, i) => (
              <li key={item.title} className="focus-in" style={{ animationDelay: `${120 + i * 90}ms` }}>
                <p className="text-small font-semibold text-white">{item.title}</p>
                <p className="mt-1 text-small leading-[1.6] text-white/60">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Isometric stack of photo plates */}
        <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-[600px] [perspective:2200px]">
          <div className="absolute inset-0 [transform-style:preserve-3d] [transform:rotateX(56deg)_rotateZ(-45deg)]">
            {/* the stack sinks as it grows, so the top plate stays in the middle */}
            <div
              className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [transform-style:preserve-3d] motion-reduce:transition-none"
              style={{ transform: `translateZ(${-(active * GAP) / 2 - GAP}px)` }}
            >
              {layers.map((item, index) => (
                <Plate key={item.id} layer={item} index={index} active={active} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Phones and reduced motion: the layers as cards stacking on scroll */
function CardStack() {
  return (
    <ol className="space-y-5 px-6 pb-16 sm:px-10">
      {layers.map((item, index) => (
        <li
          key={item.id}
          className="sticky overflow-hidden rounded-3xl border border-white/10 bg-[var(--color-band)] shadow-[0_-12px_30px_-12px_rgb(0_0_0/0.6)]"
          style={{ top: `calc(76px + ${index * 14}px)` }}
        >
          <div className="relative aspect-[16/9] bg-white/5">
            <Image
              src={item.image.src}
              alt={item.image.alt}
              fill
              sizes="(min-width: 640px) 80vw, calc(100vw - 48px)"
              className="object-cover"
            />
            <span className="absolute left-4 top-4 rounded-lg bg-[var(--color-band)]/85 px-2.5 py-1 text-small font-medium tabular-nums text-white">
              {LAYER} {pad(index + 1)} {OF} {pad(COUNT)}
            </span>
          </div>
          <div className="p-5 sm:p-7">
            <h3 className="font-display text-lead font-bold tracking-[-0.02em] text-white">{item.title}</h3>
            <ul className="mt-5 space-y-4 border-t border-white/10 pt-5">
              {item.items.map((point) => (
                <li key={point.title}>
                  <p className="text-small font-semibold text-white">{point.title}</p>
                  <p className="mt-0.5 text-small leading-[1.6] text-white/60">{point.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function CapabilityStack() {
  return (
    <>
      <div className="hidden lg:block lg:motion-reduce:hidden">
        <PinnedStack />
      </div>
      <div className="lg:hidden lg:motion-reduce:block">
        <CardStack />
      </div>
    </>
  );
}
