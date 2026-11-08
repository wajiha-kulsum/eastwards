"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import DotTerrain from "@/components/ui/DotTerrain";
import BlueprintGrid from "@/components/ui/BlueprintGrid";
import DirectChannels from "@/components/DirectChannels";
import PageShell from "@/components/ui/PageShell";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { contact } from "@/lib/content";

/* Drafting-sheet contact page, after the Craftwork "Design has no ceiling"
   reference: centred hero on a dashed column grid, the form and direct
   lines laid out as ruled bands, and the page closing into a dot-lattice
   mountain range that runs past the bottom edge. Structure and motion are
   the reference's; every colour, size and radius is an Eastwards token. */

/* Shared form furniture: label + field styles in one place so the six
   fields can't drift apart. Field surfaces are the drafting sheet's
   hairlines, not the old filled boxes. */
const LABEL_CLASS =
  "mb-1.5 block text-small font-medium tracking-tight text-ink";
const FIELD_CLASS =
  "w-full rounded-[12px] border border-line-strong bg-surface px-3.5 text-small text-ink outline-none transition placeholder:text-[#6b6b6b] dark:placeholder:text-[#6d6d6d] focus:border-primary focus:ring-2 focus:ring-primary/20";

export function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    // Do not show a success message until the backend confirms.
    try {
      setSubmitting(true);

      const response = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formData.entries())),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Unable to send your message.");
      }

      setStatus("Thank you! Your message has been sent.");
      form.reset();
    } catch {
      setStatus(
        "We couldn't send your message. Please email info@eastwards.co."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <PageShell pb="pb-0">
      {/* Hero: centred type on the drafting grid, a dashed rule under the
          nav the way the reference sheet is ruled. */}
      <section className="relative pt-12 pb-14 sm:pt-16 sm:pb-20">
        <BlueprintGrid rule />

        <div className="relative z-10 flex flex-col items-center text-center">
          <SectionLabel>{contact.eyebrow}</SectionLabel>

          <h1 className="mt-4 font-display text-display font-bold uppercase leading-none tracking-[-0.03em] text-ink">
            {contact.title}
          </h1>

          <p className="mt-6 max-w-[600px] text-small text-body">
            {contact.subtitle}
          </p>
        </div>
      </section>

      {/* Contact information + form + direct lines, all on one grid so the
          dashed columns run unbroken behind them. */}
      <section className="relative">
        <BlueprintGrid rule />

        <div className="relative z-10 pt-10 sm:pt-14">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.06fr] lg:gap-14">
            {/* Left rail: the question, then location and phone as ruled
                rows instead of floating cards. */}
            <div className="flex min-w-0 flex-col">
              <p className="max-w-[600px] text-lead font-medium tracking-[-0.02em] text-ink">
                {contact.headline.split("?")[0]}?
                <br />
                <span className="text-body">
                  {contact.headline.split("?").slice(1).join("?").trim()}
                </span>
              </p>

              <div className="mt-8 border-t border-dashed border-line-strong sm:mt-10">
                <div className="grid grid-cols-1 gap-6 py-5 sm:grid-cols-2 sm:gap-8">
                  <div>
                    <h2 className="flex items-center gap-2 text-small font-semibold tracking-[-0.04em] text-primary">
                      <MapPin size={18} strokeWidth={2.4} aria-hidden="true" />
                      {contact.location.title}
                    </h2>

                    <address className="mt-2 space-y-0.5 text-small not-italic text-body">
                      {[
                        contact.location.headquarters,
                        contact.location.company,
                        contact.location.building,
                        contact.location.postalCode,
                      ].map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </address>
                  </div>

                  <div>
                    <h2 className="flex items-center gap-2 text-small font-semibold tracking-[-0.04em] text-primary">
                      <Phone size={18} strokeWidth={2.4} aria-hidden="true" />
                      {contact.call.title}
                    </h2>

                    <div className="mt-2 space-y-1 text-small">
                      {contact.call.phones.map((phone) => (
                        <a
                          key={phone}
                          href={`tel:${phone.replace(/\s/g, "")}`}
                          className="block w-fit text-ink transition-colors hover:text-primary"
                        >
                          {phone}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* The form, a hairline sheet on the grid. */}
            <form
              onSubmit={handleSubmit}
              className="flex min-w-0 flex-col rounded-[20px] border border-line-strong bg-surface p-5 sm:p-6 lg:p-8"
            >
              <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2 lg:gap-y-5">
                <div>
                  <label htmlFor="firstName" className={LABEL_CLASS}>
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    placeholder="John"
                    required
                    className={`${FIELD_CLASS} h-12`}
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className={LABEL_CLASS}>
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    placeholder="Doe"
                    required
                    className={`${FIELD_CLASS} h-12`}
                  />
                </div>

                <div>
                  <label htmlFor="email" className={LABEL_CLASS}>
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="yourmail@gmail.com"
                    required
                    className={`${FIELD_CLASS} h-12`}
                  />
                </div>

                <div>
                  <label htmlFor="company" className={LABEL_CLASS}>
                    Company
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    placeholder="Company Name"
                    className={`${FIELD_CLASS} h-12`}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="message" className={LABEL_CLASS}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Your Message Here"
                    required
                    className={`${FIELD_CLASS} min-h-[140px] resize-y py-3`}
                  />
                </div>
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <p
                  role="status"
                  aria-live="polite"
                  className="max-w-[320px] text-small text-body"
                >
                  {status}
                </p>

                <button
                  type="submit"
                  disabled={submitting}
                  className="ml-auto inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-small font-semibold text-white transition hover:bg-[#1555ed] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2868ff] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? "Sending..." : contact.form.submitText}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </button>
              </div>
            </form>
          </div>

          <DirectChannels variant="rows" />
        </div>
      </section>

      {/* The page closes into the range; its base runs past the edge, so the
          page never shows a floor. Full-bleed inside the lane. */}
      <section className="relative mt-16 sm:mt-20">
        <div className="relative left-1/2 w-screen -translate-x-1/2">
          <DotTerrain />
        </div>
      </section>
    </PageShell>
  );
}
