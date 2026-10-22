"use client";

import { useEffect, useRef, useState } from "react";
import { about } from "@/lib/content";

/* Screen two as a scroll carousel: the heading and the milestone rail stay
   pinned while scrolling advances the active phase - one service area dot
   at a time, the three-item list crossfading with the house fade-in.
   The runway is one scroll station per transition. Below lg the same
   advance runs as a conveyor rail (dot by dot upward) beside the active
   group instead of the desktop's horizontal bottom rail. */

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

/* The mobile timeline as a conveyor: dots ride up through the display
   line (screen middle, where the group copy is centered) as you scroll;
   the dot nearest the line is current, the next one sits below it faded.
   One translate moves the whole strip; each dot fades by its distance
   from the line. 25svh pitch spaces five stations over the runway. */
function TimeRail({ progress }: { progress: number }) {
  const focus = progress * (about.solutions.groups.length - 1);
  return (
    <div aria-hidden="true" className="absolute bottom-3 left-6 top-3 w-[23px]">
      <span
        className="absolute bottom-[20svh] left-[11px] top-[24svh] w-px bg-line-strong"
      />
      <div
        style={{
          transform: `translate3d(0, calc(50svh - 12px - ${focus * 25}svh), 0)`,
        }}
      >
        {about.solutions.groups.map((group, index) => (
          <span
            key={group.title}
            className={`absolute left-0 h-[23px] w-[23px] rounded-full ${
              index === Math.round(focus)
                ? "bg-primary ring-[7px] ring-primary/40"
                : "bg-[#7e7e7e]"
            }`}
            style={{
              top: `${index * 25}svh`,
              opacity: Math.max(0, 1 - Math.abs(index - focus) * 0.55),
            }}
          />
        ))}
      </div>
    </div>
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
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = runwayRef.current;
      if (!el) return;
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const seen = Math.min(total, Math.max(0, -el.getBoundingClientRect().top));
      setProgress(Math.min(1, Math.max(0, seen / total)));
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

  const current = Math.round(progress * (about.solutions.groups.length - 1));
  const group = about.solutions.groups[current];

  return (
    <div ref={runwayRef} className="relative h-[300svh]">
      {/* Mobile: pinned screen; heading top, the conveyor rail rides the
          left edge, and the active group's copy sits centered on its
          display line, crossfading as the next dot arrives. */}
      <div className="sticky top-0 h-[100svh] overflow-hidden lg:hidden">
        <section className="absolute left-6 right-6 top-16">
          <h2 className="font-display text-title font-semibold tracking-[-0.02em] text-ink">
            {about.solutions.title}
          </h2>
        </section>
        <div
          key={current}
          className="absolute left-6 right-6 top-1/2 -translate-y-1/2 animate-[fade-in_250ms_ease-out] pl-16"
        >
          <p className="text-lead font-medium tracking-[-0.02em] text-ink">
            {group.title}
          </p>
          <ListRows items={group.items} />
        </div>
        <TimeRail progress={progress} />
      </div>

      <div className="sticky top-0 hidden lg:flex h-[100svh] flex-col justify-center gap-y-14">
        <section>
          <h2 className="font-display text-title font-semibold tracking-[-0.02em] text-ink lg:max-w-[38vw]">
            {about.solutions.title}
          </h2>
          <div key={current} className="animate-[fade-in_250ms_ease-out]">
            <ListRows items={group.items} />
          </div>
        </section>
        <section>
          <div key={current} className="animate-[fade-in_250ms_ease-out]">
            <Rail active={current} />
          </div>
        </section>
      </div>
    </div>
  );
}
