"use client";

import { useState } from "react";
import Link from "next/link";
import { blog } from "@/lib/content";
import { ChevronLeft, ChevronRight } from "@/components/ui/icons";

const posts = blog.posts;

/* Inactive-tile width falloff, measured from the reference layout:
   the tile right after the active one is widest, then it decays to slivers. */
const growFor = (distance: number) => {
  if (distance === 0) return 62.8;
  if (distance === 1) return 15.3;
  if (distance === 2) return 7.7;
  return 1.14;
};

export default function BlogShowcase() {
  const count = posts.length;
  // unbounded index, arrows wrap infinitely in both directions
  const [cursor, setCursor] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const activeIndex = ((cursor % count) + count) % count;
  const activePost = posts[activeIndex];

  return (
    <section className="mx-auto mt-14 max-w-[1720px] px-6 sm:px-10 md:mt-16 lg:px-[5.35%]">
      {/* light bordered panel, palette matched to the reference */}
      <div className="rounded-[24px] border border-[#e8e9f4] bg-[#fcfcfe] px-5 py-10 sm:px-8 md:px-[31px] lg:py-[54px]">
        {/* Heading: dark line + muted line, controls right */}
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <h2 className="text-[24px] font-semibold leading-[1.32] tracking-[-0.8px] text-neutral-900 sm:text-[28px]">
            <span className="block">{blog.heading}</span>
            <span className="block text-body">{blog.subtext}</span>
          </h2>

          {/* manual paging controls */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              aria-label="Previous article"
              onClick={() => setCursor((i) => i - 1)}
              className="grid h-9 w-9 place-items-center rounded-[10px] bg-[#eceefb] text-primary transition-colors hover:bg-[#dfe3fa]"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next article"
              onClick={() => setCursor((i) => i + 1)}
              className="grid h-9 w-9 place-items-center rounded-[10px] bg-[#eceefb] text-primary transition-colors hover:bg-[#dfe3fa]"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Accordion gallery: active tile dominates, widths stagger away from it */}
        <div
          className="mt-10 flex h-[220px] gap-2 sm:h-[300px] lg:h-[430px]"
          aria-label="Featured blog articles"
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
                onClick={() => setCursor(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                aria-label={`Feature article: ${post.title}`}
                aria-pressed={isActive}
                style={{ flexGrow: grow }}
                className={[
                  "group relative min-w-0 basis-0 overflow-hidden rounded-lg text-left",
                  "transition-[flex] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
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
            className="max-w-[640px] animate-[fade-in_250ms_ease-out] text-[15px] leading-[1.5] sm:text-[17px]"
            aria-live="polite"
          >
            <span className="font-semibold text-neutral-900">
              {activePost.title}
            </span>{" "}
            <span className="text-[#5d6b8a]">{activePost.description} …</span>
          </p>

          <Link
            href={activePost.href}
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 self-start rounded-lg border border-[#e8e9f4] bg-white px-5 text-[15px] font-medium text-primary transition-colors duration-200 hover:border-primary/40 hover:bg-primary/5"
          >
            Read More
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
