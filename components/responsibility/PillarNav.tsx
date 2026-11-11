"use client";

import { useEffect, useRef, useState } from "react";

/* Sticky pillar bar: once the visitor is past the overview it stays under
   the site header and marks the pillar being read, so it is always clear
   where they are and the other pillars are one tap away. It lives in the
   wrapper around the pillar sections, so it unsticks after the last one. */

type Item = { id: string; label: string };

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export function PillarNav({ items, label }: { items: readonly Item[]; label: string }) {
  const [active, setActive] = useState(items[0]?.id);
  const rail = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const visible = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) visible.set(entry.target.id, entry.isIntersecting);
        const first = items.find((item) => visible.get(item.id));
        if (first) setActive(first.id);
      },
      // a reading band across the upper middle of the viewport
      { rootMargin: "-30% 0px -60% 0px" }
    );
    for (const item of items) {
      const section = document.getElementById(item.id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, [items]);

  // On narrow screens the bar scrolls sideways: keep the current pillar in
  // view by scrolling the bar only, never the page
  useEffect(() => {
    const list = rail.current;
    const current = list?.querySelector<HTMLElement>('[aria-current="location"]');
    if (!list || !current) return;
    const left = current.offsetLeft - (list.clientWidth - current.offsetWidth) / 2;
    list.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }, [active]);

  return (
    <nav
      aria-label={label}
      className="sticky top-[60px] z-30 border-y border-line bg-page/90 backdrop-blur-sm sm:top-[68px] lg:top-[72px] print:hidden"
    >
      <ol ref={rail} className="flex gap-2 overflow-x-auto px-6 py-3 [scrollbar-width:none] sm:px-10 lg:px-16 xl:px-24 [&::-webkit-scrollbar]:hidden">
        {items.map((item, index) => {
          const current = item.id === active;
          return (
            <li key={item.id} className="shrink-0">
              <a
                href={`#${item.id}`}
                aria-current={current ? "location" : undefined}
                className={`inline-flex min-h-10 items-center gap-2 rounded-lg border px-3 text-small font-medium transition-colors ${FOCUS} ${
                  current ? "border-primary bg-primary text-white" : "border-line-strong bg-card text-ink hover:border-ink"
                }`}
              >
                <span className={`tabular-nums ${current ? "text-white/80" : "text-link"}`}>{String(index + 1).padStart(2, "0")}</span>
                {item.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
