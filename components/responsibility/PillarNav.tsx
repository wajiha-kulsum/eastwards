"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

/* Sticky pillar bar: once the visitor is past the overview it stays under
   the site header and marks the pillar being read, so it is always clear
   where they are and the other pillars are one tap away. It lives in the
   wrapper around the pillar sections, so it unsticks after the last one. */

type Item = { id: string; label: string };

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

/* An optional action sits at the right end of the bar, so a page can keep its
   main call to action in reach the whole way down (hidden on phones, where
   the bar needs its width for the links). */
export function PillarNav({
  items,
  label,
  action,
}: {
  items: readonly Item[];
  label: string;
  action?: { label: string; href: string };
}) {
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
      className="sticky top-[60px] z-30 flex items-center bg-page/90 backdrop-blur-sm sm:top-[68px] lg:top-[72px] print:hidden"
    >
      <ol ref={rail} className="flex min-w-0 flex-1 gap-2 overflow-x-auto px-6 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((item) => {
          const current = item.id === active;
          return (
            <li key={item.id} className="shrink-0">
              <a
                href={`#${item.id}`}
                aria-current={current ? "location" : undefined}
                className={`inline-flex min-h-10 items-center gap-2 rounded-lg px-3 text-small font-medium transition-colors ${FOCUS} ${
                  current ? "bg-primary text-white" : "bg-[color-mix(in_oklab,var(--color-ink)_5%,var(--color-page))] text-ink hover:bg-[color-mix(in_oklab,var(--color-ink)_10%,var(--color-page))]"
                }`}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ol>
      {action ? (
        <a
          href={action.href}
          className={`group mr-6 hidden min-h-10 shrink-0 items-center gap-1.5 rounded-lg bg-primary px-4 text-small font-semibold text-white transition-[filter,transform] duration-200 hover:brightness-110 active:scale-[0.97] sm:inline-flex ${FOCUS}`}
        >
          {action.label}
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </a>
      ) : null}
    </nav>
  );
}
