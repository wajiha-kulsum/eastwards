"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BlurFade } from "@/components/ui/blur-fade";
import { about } from "@/lib/about";

/* "Comprehensive Digital Solutions" as a flat, scroll-driven walkthrough.

   From 1024 (and with motion allowed) the section pins while the page
   scrolls through every specialisation, one at a time, in three columns:
   the current layer with its specialisations on the left (the one in view
   lit, the others dimmed), the progress line with the layer names in the
   middle, and the photo of the lit specialisation on the right. The client
   asked for headings and statements only, so there are no counters or
   numbers.

   Below 1024, or with reduced motion, each layer is a heading over a grid
   of photo cards, no pinning. Only one of the two is displayed, so
   assistive tech reads the content once. */

const { layers } = about.capabilities;

// Every specialisation in reading order, with the layer it belongs to
const STEPS = layers.flatMap((layer, layerIndex) => layer.items.map((item, itemIndex) => ({ ...item, layerIndex, itemIndex })));
const COUNT = STEPS.length;

// Each specialisation gets this much scroll while pinned
const STEP_SVH = 55;

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

  const active = Math.min(COUNT - 1, Math.floor(progress * COUNT));
  const step = STEPS[active];
  const layer = layers[step.layerIndex];

  // Scroll the page to a specialisation's stretch of the runway
  const jumpTo = (index: number) => {
    const el = runway.current;
    if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    const top = el.getBoundingClientRect().top + window.scrollY + ((index + 0.4) / COUNT) * total;
    window.scrollTo({ top, behavior: "smooth" });
  };
  const firstStepOf = (layerIndex: number) => STEPS.findIndex((s) => s.layerIndex === layerIndex);

  return (
    <div ref={runway} className="relative" style={{ height: `calc(${COUNT} * ${STEP_SVH}svh + 100svh)` }}>
      <div className="sticky top-[72px] grid h-[calc(100svh-72px)] grid-cols-[minmax(0,1fr)_auto_minmax(0,1.15fr)] items-center gap-10 px-6 lg:px-12 xl:gap-14 xl:px-16">
        {/* Left: the current layer, its specialisations, the one in view lit */}
        <div className="min-w-0 max-w-[600px]">
          <h3
            key={layer.id}
            className="focus-in text-balance font-display text-lead font-bold leading-[1.1] tracking-[-0.02em] text-white"
          >
            {layer.title}
          </h3>
          <ul key={`${layer.id}-items`} className="mt-7 space-y-1">
            {layer.items.map((item, i) => {
              const index = firstStepOf(step.layerIndex) + i;
              const current = index === active;
              return (
                <li key={item.title} className="focus-in" style={{ animationDelay: `${80 + i * 70}ms` }}>
                  <button
                    type="button"
                    onClick={() => jumpTo(index)}
                    aria-current={current ? "true" : undefined}
                    className="group relative block w-full cursor-pointer rounded-lg py-3.5 pl-5 pr-3 text-left transition-colors duration-300 hover:bg-white/[0.04] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    {/* the marker of the specialisation in view */}
                    <span
                      aria-hidden="true"
                      className={`absolute bottom-3.5 left-0 top-3.5 w-0.5 rounded-full transition-colors duration-300 ${
                        current ? "bg-primary" : "bg-white/12"
                      }`}
                    />
                    <span
                      className={`block text-small font-semibold transition-colors duration-300 ${
                        current ? "text-white" : "text-white/65 group-hover:text-white/85"
                      }`}
                    >
                      {item.title}
                    </span>
                    <span
                      className={`mt-1 block text-small leading-[1.55] transition-colors duration-300 ${
                        // dimmed, but still above 4.5:1 on the band so every statement stays readable
                        current ? "text-white/75" : "text-white/50"
                      }`}
                    >
                      {item.body}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Middle: the progress line and the layer names */}
        <nav aria-label="Capability layers" className="relative self-center">
          <span aria-hidden="true" className="absolute bottom-5 left-[5px] top-5 w-px bg-white/15" />
          <span
            aria-hidden="true"
            className="absolute left-[5px] top-5 w-px bg-primary transition-[height] duration-300 ease-out"
            style={{ height: `calc((100% - 2.5rem) * ${Math.min(1, (active + 0.5) / COUNT)})` }}
          />
          <ol className="relative space-y-6">
            {layers.map((item, index) => {
              const current = index === step.layerIndex;
              const done = index < step.layerIndex;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => jumpTo(firstStepOf(index))}
                    aria-current={current ? "step" : undefined}
                    className="group flex min-h-10 w-full cursor-pointer items-center gap-4 whitespace-nowrap rounded-sm text-left text-small transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                  >
                    <span
                      aria-hidden="true"
                      className={`h-[11px] w-[11px] shrink-0 rounded-full transition-[background-color,box-shadow] duration-300 ${
                        // filled dots, no outlines: lit for the layer in view, blue-grey once passed, faint ahead
                        current
                          ? "bg-primary shadow-[0_0_0_5px_rgb(40_104_255/0.18)]"
                          : done
                            ? "bg-primary/50"
                            : "bg-white/25"
                      }`}
                    />
                    <span className={`transition-colors duration-300 ${current ? "font-semibold text-white" : "text-white/45 group-hover:text-white/80"}`}>
                      {item.short}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>

        {/* Right: the photo of the specialisation in view, crossfading */}
        <div
          aria-hidden="true"
          className="relative ml-auto h-[min(620px,calc(100svh-72px-6rem))] w-full max-w-[880px] overflow-hidden rounded-2xl bg-white/5"
        >
          {STEPS.map((item, index) => (
            <Image
              key={item.title}
              src={item.image.src}
              alt=""
              fill
              sizes="(min-width: 2000px) 880px, 48vw"
              className={`object-cover transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
                index === active ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
              }`}
            />
          ))}
          <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/65 to-transparent" />
          <p key={step.title} className="focus-in absolute inset-x-6 bottom-5 text-balance text-small font-semibold text-white">
            {step.title}
          </p>
        </div>
      </div>
    </div>
  );
}

/* Phones and reduced motion: each layer as a heading over photo cards,
   photo on top on phones, photo beside the text from 640 so the
   titles keep a readable width */
function LayerList() {
  return (
    <div className="space-y-14 px-6 pb-16 lg:px-12 xl:px-16">
      {layers.map((layer) => (
        <section key={layer.id} aria-labelledby={`${layer.id}-heading`}>
          <h3
            id={`${layer.id}-heading`}
            className="text-balance font-display text-lead font-bold leading-[1.15] tracking-[-0.02em] text-white"
          >
            {layer.title}
          </h3>
          <ul className="mt-6 grid gap-4">
            {layer.items.map((item, i) => (
              <li key={item.title}>
                <BlurFade
                  inView
                  delay={i * 0.08}
                  className="overflow-hidden rounded-2xl bg-white/[0.05] sm:grid sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:items-center"
                >
                <div className="relative aspect-[3/2] bg-white/5 sm:aspect-[4/3] sm:h-full">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes="(min-width: 640px) 40vw, calc(100vw - 48px)"
                    className="object-cover"
                  />
                </div>
                <div className="p-5 sm:p-7">
                  <h4 className="text-balance text-small font-semibold text-white">{item.title}</h4>
                  <p className="mt-1.5 text-pretty text-small leading-[1.6] text-white/65">{item.body}</p>
                </div>
                </BlurFade>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
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
