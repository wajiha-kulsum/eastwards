"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/* "On this page": the section list as anchor links. From 1024 it sits sticky
   beside the document and marks the section being read; below that it folds
   into a disclosure above the document, closing once a section is picked. */

type Item = { id: string; label: string };

const LINK =
  "block rounded-lg px-3 py-2 text-small leading-snug transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export function LegalToc({ items, title }: { items: readonly Item[]; title: string }) {
  const [active, setActive] = useState(items[0]?.id);
  const details = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const visible = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) visible.set(entry.target.id, entry.isIntersecting);
        const first = items.find((item) => visible.get(item.id));
        if (first) setActive(first.id);
      },
      // a reading band across the upper middle of the viewport
      { rootMargin: "-20% 0px -65% 0px" }
    );
    for (const item of items) {
      const section = document.getElementById(item.id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, [items]);

  const closeDisclosure = () => {
    if (details.current) details.current.open = false;
  };

  return (
    <nav aria-label={title} className="print:hidden lg:sticky lg:top-28">
      <details ref={details} className="group rounded-2xl border border-line bg-card lg:hidden">
        <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 rounded-2xl px-4 text-small font-semibold text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary [&::-webkit-details-marker]:hidden">
          {title}
          <ChevronDown
            className="h-4 w-4 shrink-0 text-body transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
            aria-hidden="true"
          />
        </summary>
        <div className="border-t border-line p-2">
          <TocList items={items} active={active} onPick={closeDisclosure} />
        </div>
      </details>

      <div className="hidden lg:block">
        <p className="px-3 text-small font-semibold text-ink">{title}</p>
        <div className="mt-3 border-l border-line pl-2">
          <TocList items={items} active={active} />
        </div>
      </div>
    </nav>
  );
}

function TocList({ items, active, onPick }: { items: readonly Item[]; active?: string; onPick?: () => void }) {
  return (
    <ol className="space-y-0.5">
      {items.map((item) => {
        const current = item.id === active;
        return (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={onPick}
              aria-current={current ? "location" : undefined}
              className={`${LINK} ${current ? "bg-surface font-medium text-link" : "text-body hover:text-ink"}`}
            >
              {item.label}
            </a>
          </li>
        );
      })}
    </ol>
  );
}
