"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { blog } from "@/lib/content";
import { SECTION_LANE } from "@/components/ui/lane";
import { ChevronLeft, ChevronRight } from "@/components/ui/icons";

const posts = blog.posts;

/* Inactive-tile width falloff, measured from the reference layout:
   the tile right after the active one is widest, then it decays to slivers. */
const growFor = (distance: number) => {
  if (distance === 0) return 64;
  if (distance === 1) return 15.3;
  if (distance === 2) return 7.7;
  return 1.14;
};

export default function BlogShowcase() {
  const count = posts.length;
  // unbounded index, arrows wrap infinitely in both directions
  const [cursor, setCursor] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const activeIndex = ((cursor % count) + count) % count;
  const activePost = posts[activeIndex];

  return (
    <section className={SECTION_LANE}>
      {/* light bordered panel, palette matched to the reference */}
      <div className="rounded-[24px] border border-line bg-card px-5 py-8 sm:px-8 md:px-[31px] lg:py-[44px]">
        {/* Heading: dark line + muted line, controls right */}
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <h2 className="text-lead font-semibold tracking-[-0.02em] text-ink">
            <span className="block">{blog.heading}</span>
            <span className="block text-small text-body">{blog.subtext}</span>
          </h2>

          {/* manual paging controls */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              aria-label="Previous article"
              onClick={() => setCursor((i) => i - 1)}
              className="grid h-9 w-9 place-items-center rounded-[10px] bg-[#eceefb] text-primary transition-colors hover:bg-[#dfe3fa] dark:bg-[#232733] dark:hover:bg-[#2a3040]"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next article"
              onClick={() => setCursor((i) => i + 1)}
              className="grid h-9 w-9 place-items-center rounded-[10px] bg-[#eceefb] text-primary transition-colors hover:bg-[#dfe3fa] dark:bg-[#232733] dark:hover:bg-[#2a3040]"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Accordion gallery: active tile dominates, widths stagger away from
            it. Swipe advances on touch (the flex row reads the gesture, a
            horizontal drag past 40px wins over vertical page scroll). */}
        <div
          className="mt-10 flex h-[190px] gap-2 sm:h-[260px] lg:h-[370px]"
          aria-label="Featured blog articles"
          onTouchStart={(e) => {
            touchStart.current = {
              x: e.touches[0].clientX,
              y: e.touches[0].clientY,
            };
          }}
          onTouchEnd={(e) => {
            const start = touchStart.current;
            if (!start) return;
            touchStart.current = null;
            const dx = e.changedTouches[0].clientX - start.x;
            const dy = e.changedTouches[0].clientY - start.y;
            if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
              setCursor((i) => i + (dx < 0 ? 1 : -1));
            }
          }}
        >
          {posts.map((post, index) => {
            const isActive = index === activeIndex;
            const distance = Math.abs(index - activeIndex);

            // tiny horizontal expand on hover for inactive tiles
            let grow = growFor(distance);
            if (hoveredIndex === index && !isActive) grow += 0.5;

            return (
              <button
                key={post.id}
                type="button"
                onClick={() => setCursor(isActive ? cursor + 1 : index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                aria-label={`Feature article: ${post.title}`}
                aria-pressed={isActive}
                style={{ flexGrow: grow }}
                className={[
                  "group relative min-w-0 basis-0 overflow-hidden rounded-lg text-left",
                  "min-w-[44px] lg:min-w-0",
                  // flex-grow longhand: the flex shorthand never interpolates on WebKit
                  "transition-[flex-grow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                  !isActive ? "opacity-95 hover:opacity-100" : "",
                ].join(" ")}
              >
                {/* real asset over the gradient fallback */}
                <div
                  className={[
                    "absolute inset-0 bg-gradient-to-br",
                    post.accent,
                    "transition-transform duration-700 ease-out",
                    isActive ? "scale-100" : "scale-105",
                  ].join(" ")}
                  style={
                    post.image
                      ? {
                          backgroundImage: `url("${post.image}")`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }
                      : undefined
                  }
                />

                {/* subtle hover lift */}
                <div className="absolute inset-0 bg-black/5 transition-colors duration-300 group-hover:bg-black/0" />
              </button>
            );
          })}
        </div>

        {/* Featured article details + CTA */}
        <div className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <p
            key={activePost.id}
            className="max-w-[640px] animate-[fade-in_250ms_ease-out] text-small"
            aria-live="polite"
          >
            <span className="font-semibold text-ink">
              {activePost.title}
            </span>{" "}
            <span className="text-body">{activePost.description} …</span>
          </p>

          <Link
            href={activePost.href}
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 self-start rounded-lg border border-line bg-card px-5 text-small font-medium text-primary transition-colors duration-200 hover:border-primary/40 hover:bg-primary/5"
          >
            Read More
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
