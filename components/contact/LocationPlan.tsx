import { ArrowUpRight } from "lucide-react";
import { contact } from "@/lib/content";

/* The one illustration on the contact page: a schematic site plan for the
   Singapore office, drawn in the page's own drafting language (dot lattice,
   hairline streets, block outlines, one blue "you are here" dot). Desktop
   only; on phones the form comes first, so the plan would only push it down. */

const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${contact.location.building}, Singapore`,
)}`;

export function LocationPlan() {
  return (
    <figure className="mt-6 hidden lg:block">
      <div className="relative aspect-[16/7] overflow-hidden rounded-2xl border border-line bg-surface">
        <div
          aria-hidden="true"
          className="dot-field pointer-events-none absolute inset-0 opacity-15"
        />
        <svg
          aria-hidden="true"
          viewBox="0 0 640 280"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          {/* River along the lower edge. */}
          <path
            d="M-20 246 C 120 228, 240 268, 380 238 S 570 212, 660 234 L 660 300 L -20 300 Z"
            fill="var(--color-link)"
            fillOpacity="0.07"
          />

          {/* Streets: two solid through-roads, one dashed lane. */}
          <path
            d="M-20 178 C 120 158, 250 196, 400 166 S 580 142, 660 154"
            fill="none"
            stroke="var(--color-line-strong)"
            strokeWidth="1.5"
          />
          <path
            d="M196 -20 L 286 300"
            fill="none"
            stroke="var(--color-line-strong)"
            strokeWidth="1.5"
          />
          <path
            d="M520 -20 L 452 300"
            fill="none"
            stroke="var(--color-line-strong)"
            strokeWidth="1.5"
            strokeDasharray="6 6"
          />

          {/* City blocks; the filled one is Chinatown Point. */}
          <rect
            x="92"
            y="92"
            width="72"
            height="52"
            rx="2"
            fill="var(--color-page)"
            stroke="var(--color-line-strong)"
            strokeWidth="1.5"
          />
          <rect
            x="300"
            y="74"
            width="128"
            height="86"
            rx="2"
            fill="var(--color-link)"
            fillOpacity="0.08"
            stroke="var(--color-line-strong)"
            strokeWidth="1.5"
          />
          <rect
            x="466"
            y="94"
            width="82"
            height="56"
            rx="2"
            fill="var(--color-page)"
            stroke="var(--color-line-strong)"
            strokeWidth="1.5"
          />

          {/* "You are here": the site's own dot, two rings out. */}
          <circle
            cx="364"
            cy="117"
            r="30"
            fill="none"
            stroke="var(--color-link)"
            strokeOpacity="0.22"
          />
          <circle
            cx="364"
            cy="117"
            r="16"
            fill="none"
            stroke="var(--color-link)"
            strokeOpacity="0.45"
          />
          <circle cx="364" cy="117" r="5" fill="var(--color-link)" />
        </svg>
      </div>

      <figcaption className="mt-3 flex items-center justify-between gap-4">
        <p className="text-small text-body">
          {contact.location.building}, Singapore
        </p>
        <a
          href={MAPS_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-10 items-center gap-1.5 text-small font-semibold text-link transition-opacity duration-200 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Get directions
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </figcaption>
    </figure>
  );
}
