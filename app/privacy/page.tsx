import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "Eastwards Consulting Pte Ltd Privacy Policy.",
  path: "/privacy",
});

/* Placeholder page: the company's real policy text is not written yet.
   Swap the notice for the document when it exists; the links from the
   contact form consent and the footer point here. */
export default function PrivacyPage() {
  return (
    <main
      id="main"
      className="grid min-h-[calc(100svh-60px)] place-items-center bg-page text-ink sm:min-h-[calc(100svh-68px)] lg:min-h-[calc(100svh-72px)]"
    >
      <div className="flex flex-col items-center gap-6 px-6 text-center">
        <svg
          viewBox="0 0 32 32"
          className="h-10 w-10"
          aria-hidden="true"
          fill="none"
        >
          <path d="M8 3L29 16L8 29V3Z" fill="#2868FF" />
        </svg>
        <p className="text-small font-semibold tracking-[-0.04em] text-primary">
          / Privacy Policy /
        </p>
        <h1 className="font-display text-title font-bold tracking-[-0.02em] text-ink">
          This document is being prepared.
        </h1>
        <p className="max-w-[560px] text-small text-body">
          The full Privacy Policy is not published yet. For privacy questions
          in the meantime, email{" "}
          <a
            href="mailto:info@eastwards.co"
            className="text-ink transition-colors hover:text-primary"
          >
            info@eastwards.co
          </a>
          .
        </p>
        <Link
          href="/"
          className="inline-flex h-11 items-center rounded-full bg-primary px-7 text-small font-semibold text-white transition hover:brightness-110"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
