"use client";

import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { contact, footer } from "@/lib/content";

/* The footer's closing call to action. The homepage already ends on
   HomeContactCta right above the footer, so the row stays out of the way
   there; every other page gets one last way into an enquiry. */
export function FooterCta() {
  const pathname = usePathname();
  // home ends on its own CTA; careers speaks to candidates, not clients
  if (pathname === "/" || pathname === "/careers") return null;

  const email = contact.form.inbox;

  // On the contact page the visitor is already at the form
  if (pathname === "/contact") {
    const { title, before, after } = footer.ctaContact;
    return (
      <div className="mb-12 border-b border-white/10 pb-12 lg:mb-14 lg:pb-14">
        <p className="max-w-[22ch] text-balance text-lead font-semibold tracking-[-0.02em] text-white">
          {title}
        </p>
        <p className="mt-3 max-w-[60ch] text-pretty text-white/70">
          {before}{" "}
          <a
            href={`mailto:${email}`}
            className="rounded-sm font-medium text-white underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {email}
          </a>
          {after}
        </p>
      </div>
    );
  }

  return (
    <div className="mb-12 grid gap-6 border-b border-white/10 pb-12 lg:mb-14 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-12 lg:pb-14">
      <div>
        <p className="max-w-[22ch] text-balance text-lead font-semibold tracking-[-0.02em] text-white">
          {footer.cta.title}
        </p>
        <p className="mt-3 max-w-[60ch] text-pretty text-white/70">{footer.cta.body}</p>
      </div>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <PrimaryButton
          href="/contact"
          className="min-h-11 gap-2 px-6 text-small focus-visible:ring-offset-band lg:min-h-[52px] lg:px-7"
        >
          {footer.cta.button}
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </PrimaryButton>
        <a
          href={`mailto:${email}`}
          className="inline-flex min-h-11 items-center rounded-sm font-medium text-white underline-offset-4 transition-colors hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {email}
        </a>
      </div>
    </div>
  );
}
