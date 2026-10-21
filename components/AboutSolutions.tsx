"use client";

import { useEffect, useRef, useState } from "react";
import { about } from "@/lib/content";

/* Screen two as a scroll carousel: the heading and the milestone rail stay
   pinned while scrolling advances the active phase - one service area dot
   at a time, the three-item list crossfading with the house fade-in.
   The runway is one scroll station per transition. Below lg the carousel
   is dropped and every group renders statically so no copy is hidden. */

function ListRows({ items }: { items: readonly { title: string; body: string }[] }) {
  return (
    <ul className="mt-6 flex flex-col gap-3 text-small tracking-[-0.01em] lg:mt-4 lg:ml-[45.4%]">
      {items.map((item) => (
        <li key={item.title}>
          <span className="font-semibold text-ink">{item.title}</span>
          <br />
          <span className="text-body">{item.body}</span>
        </li>
      ))}
    </ul>
  );
}

function Rail({ active }: { active: number }) {
  return (
    <ol className="relative grid grid-cols-1 gap-y-7 sm:grid-cols-2 lg:grid-cols-5 lg:gap-y-0">
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-[11.5px] hidden h-px bg-line-strong lg:block"
      />
      {about.solutions.groups.map((group, index) => (
        <li key={group.title} className="relative pt-[30px]">
          <span
            aria-hidden="true"
            className={`absolute left-0 top-0 h-[23px] w-[23px] rounded-full ${
              index === active ? "bg-primary ring-[7px] ring-primary/40" : "bg-[#7e7e7e]"
            }`}
          />
          <p className="text-lead tracking-[-0.02em] text-ink lg:max-w-[12.4vw]">
            {group.title}
          </p>
        </li>
      ))}
    </ol>
  );
}

export default function AboutSolutions() {
  const runwayRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = runwayRef.current;
      if (!el) return;
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const seen = Math.min(total, Math.max(0, -el.getBoundingClientRect().top));
      setPhase(Math.min(about.solutions.groups.length - 1, Math.floor((seen / total) * (about.solutions.groups.length - 0.001))));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const group = about.solutions.groups[phase];

  return (
    <div ref={runwayRef} className="relative lg:h-[300svh]">
      <div className="lg:hidden">
        <section>
          <h2 className="font-display text-title font-semibold tracking-[-0.02em] text-ink">
            {about.solutions.title}
          </h2>
          <div className="mt-8 flex flex-col gap-10">
            {about.solutions.groups.map((g) => (
              <ListRows key={g.title} items={g.items} />
            ))}
          </div>
        </section>
        <div className="mt-16 sm:mt-20">
          <Rail active={0} />
        </div>
      </div>

      <div className="sticky top-0 hidden lg:flex h-[100svh] flex-col justify-center gap-y-14">
        <section>
          <h2 className="font-display text-title font-semibold tracking-[-0.02em] text-ink lg:max-w-[38vw]">
            {about.solutions.title}
          </h2>
          <div key={phase} className="animate-[fade-in_250ms_ease-out]">
            <ListRows items={group.items} />
          </div>
        </section>
        <section>
          <div key={phase} className="animate-[fade-in_250ms_ease-out]">
            <Rail active={phase} />
          </div>
        </section>
      </div>
    </div>
  );
}
