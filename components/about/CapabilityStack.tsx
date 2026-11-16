"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { about } from "@/lib/about";

/* "Comprehensive Digital Solutions" as a flat, scroll-driven walkthrough.

   From 1024 (and with motion allowed) the section pins while the page
   scrolls through the five layers, in three columns: the active layer's
   text on the left, the progress line with the layer index in the middle,
   and the layer's photo on the right, crossfading as the layer changes.
   Everything stays 2D: the client asked for a plain, professional layout
   instead of the earlier isometric photo stack.

   Below 1024, or with reduced motion, the same layers are a plain list of
   cards: photo, then text, no pinning or stacking. Only one of the two is
   displayed, so assistive tech reads the content once. */

const { layers, layer: LAYER, of: OF } = about.capabilities;
const COUNT = layers.length;
const pad = (n: number) => String(n).padStart(2, "0");

// Each layer gets this much scroll while pinned
const STEP_SVH = 85;

function PinnedLayers() {
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
      <div className="sticky top-[72px] grid h-[calc(100svh-72px)] grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-10 px-6 lg:px-12 xl:gap-14 xl:px-16">
        {/* Left: the active layer */}
        <div aria-live="polite" className="min-w-0 max-w-[640px]">
          <p className="flex items-center gap-3 text-small tabular-nums text-white/45">
            <span className="h-px w-8 bg-primary" aria-hidden="true" />
            <span>
              {LAYER} <span className="font-semibold text-white">{pad(active + 1)}</span> {OF} {pad(COUNT)}
            </span>
          </p>
          <h3
            key={layer.id}
            className="focus-in mt-4 text-balance font-display text-lead font-bold leading-[1.1] tracking-[-0.02em] text-white"
          >
            {layer.title}
          </h3>
          <ol key={`${layer.id}-items`} className="mt-5 border-t border-white/10">
            {layer.items.map((item, i) => (
              // py-2 and leading-[1.5] keep the five-point layer inside a 1280x720 screen
              <li key={item.title} className="focus-in border-b border-white/10 py-2" style={{ animationDelay: `${80 + i * 70}ms` }}>
                <p className="text-small font-semibold text-white">
                  <span className="mr-3 font-normal tabular-nums text-primary">{pad(i + 1)}</span>
                  {item.title}
                </p>
                <p className="mt-0.5 text-small leading-[1.5] text-white/60">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Middle: the progress line and the layer index */}
        <nav aria-label="Capability layers" className="relative self-center">
          <span aria-hidden="true" className="absolute bottom-5 left-[5px] top-5 w-px bg-white/15" />
          <span
            aria-hidden="true"
            className="absolute left-[5px] top-5 w-px bg-primary transition-[height] duration-300 ease-out"
            style={{ height: `calc((100% - 2.5rem) * ${Math.min(1, position / COUNT)})` }}
          />
          <ol className="relative space-y-4">
            {layers.map((item, index) => {
              const current = index === active;
              const done = index < active;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => jumpTo(index)}
                    aria-current={current ? "step" : undefined}
                    className="group flex min-h-10 w-full items-center gap-4 whitespace-nowrap rounded-sm text-left text-small transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                  >
                    <span
                      aria-hidden="true"
                      className={`h-[11px] w-[11px] shrink-0 rounded-full border transition-[background-color,border-color,box-shadow] duration-300 ${
                        current
                          ? "border-primary bg-primary shadow-[0_0_0_5px_rgb(40_104_255/0.18)]"
                          : done
                            ? "border-primary bg-[var(--color-band)]"
                            : "border-white/30 bg-[var(--color-band)]"
                      }`}
                    />
                    <span className={`tabular-nums ${current ? "text-white/70" : "text-white/35"}`}>{pad(index + 1)}</span>
                    <span className={`transition-colors duration-300 ${current ? "font-semibold text-white" : "text-white/45 group-hover:text-white/80"}`}>
                      {item.short}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>

        {/* Right: the layer's photo, filling the pinned height and
            crossfading (with a slow settle) between layers */}
        <div
          aria-hidden="true"
          className="relative ml-auto h-[min(620px,calc(100svh-72px-6rem))] w-full max-w-[860px] overflow-hidden rounded-2xl border border-white/10 bg-white/5"
        >
          {layers.map((item, index) => (
            <Image
              key={item.id}
              src={item.image.src}
              alt=""
              fill
              sizes="(min-width: 2000px) 860px, 45vw"
              className={`object-cover transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
                index === active ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
              }`}
            />
          ))}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent" />
          <p className="absolute bottom-5 left-6 flex items-baseline gap-3 text-small text-white">
            <span className="tabular-nums text-white/60">{pad(active + 1)}</span>
            <span key={layer.id} className="focus-in font-semibold">
              {layer.short}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

/* Phones and reduced motion: the layers as a plain list of cards */
function LayerList() {
  return (
    <ol className="mx-auto max-w-[720px] space-y-4 px-6 pb-16 lg:px-0">
      {layers.map((item, index) => (
        <li key={item.id} className="overflow-hidden rounded-2xl border border-white/10 bg-[var(--color-band)]">
          <div className="relative aspect-[2/1] bg-white/5">
            <Image
              src={item.image.src}
              alt={item.image.alt}
              fill
              sizes="(min-width: 640px) 80vw, calc(100vw - 48px)"
              className="object-cover"
            />
          </div>
          <div className="p-5 sm:p-7">
            <p className="text-small tabular-nums text-white/50">
              {LAYER} {pad(index + 1)} {OF} {pad(COUNT)}
            </p>
            <h3 className="mt-2 text-balance font-display text-lead font-bold leading-[1.15] tracking-[-0.02em] text-white">{item.title}</h3>
            <ul className="mt-4 space-y-3.5 border-t border-white/10 pt-4">
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
        <PinnedLayers />
      </div>
      <div className="lg:hidden lg:motion-reduce:block">
        <LayerList />
      </div>
    </>
  );
}
