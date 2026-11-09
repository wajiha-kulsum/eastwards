"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import DotHero from "@/components/DotHero";
import DotTerrain from "@/components/ui/DotTerrain";
import BlueprintGrid from "@/components/ui/BlueprintGrid";
import DirectChannels from "@/components/DirectChannels";
import PageShell from "@/components/ui/PageShell";
import { contact } from "@/lib/content";

/* Contact page: the original hero design up top, the DotHero statement band
   with the dot lattice and the right-aligned lede, the pitch and the card
   row beside the form; the lower half keeps the drafting furniture, Direct
   Channels drawn as ruled rows on the dashed grid and the page closing into
   the dot-lattice range. Form furniture matches the original contact page. */

/* Shared form furniture: label + field styles in one place so the six
   fields can't drift apart. */
const LABEL_CLASS =
  "mb-1.5 block text-small font-medium tracking-tight text-ink";
const FIELD_CLASS =
  "w-full rounded-[12px] border border-transparent bg-[#ededed] dark:bg-[#1a1c20] px-3.5 text-small text-ink outline-none transition placeholder:text-[#6b6b6b] dark:placeholder:text-[#6d6d6d] focus:border-primary focus:bg-card focus:ring-2 focus:ring-primary/20";

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
      {/* Hero, grey dot field behind the heading */}
      <DotHero title={contact.title} lede={contact.subtitle} />

      {/* Contact information + form */}
      <section className="mt-9 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.06fr]">
        {/* Left column, mirrors the form's padding so the top row of copy
            sits level with the form's first field; flex + mt-auto keeps the
            card row and the Send button finishing on the same line */}
        <div className="flex flex-col pt-4 sm:pt-5">
          <p className="mb-4 text-small font-semibold tracking-[-0.04em] text-primary">
            / {contact.eyebrow} /
          </p>

          {/* Question and pitch in one text block, same size and weight
              throughout, one break after the first question mark */}
          <p className="relative mb-4 max-w-[600px] text-lead font-medium tracking-[-0.02em] text-ink">
            {contact.headline.split("?")[0]}?
            <br />
            <span className="text-body">
              {contact.headline.split("?").slice(1).join("?").trim()}
            </span>
          </p>

          <div className="flex-1 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            {/* Location card */}
            <article className="flex min-h-[150px] flex-col rounded-[20px] bg-primary p-4 text-white sm:p-5">
              <MapPin
                size={30}
                strokeWidth={2.7}
                fill="white"
                className="mb-3 text-primary"
                aria-hidden="true"
              />

              <h2 className="mb-2 text-small font-semibold tracking-[-0.04em]">
                {contact.location.title}
              </h2>

              <address className="text-small not-italic text-white/95">
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
            </article>

            {/* Phone card */}
            <article className="min-h-[150px] rounded-[20px] border border-line bg-surface p-4 sm:p-5">
              <Phone
                size={24}
                fill="#3971ff"
                className="mb-3 text-primary"
                aria-hidden="true"
              />

              <h2 className="mb-2 text-small font-semibold tracking-[-0.04em] text-primary">
                {contact.call.title}
              </h2>

              <div className="space-y-1 text-small text-body">
                {contact.call.phones.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="block transition hover:text-primary"
                  >
                    {phone}
                  </a>
                ))}
              </div>
            </article>
          </div>
        </div>

        {/* Contact form */}
        <form
          onSubmit={handleSubmit}
          className="flex min-w-0 flex-col rounded-[24px] border border-line bg-surface p-5 sm:p-6 lg:p-7"
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

            <div>
              <label htmlFor="jobTitle" className={LABEL_CLASS}>
                Job Title
              </label>
              <input
                id="jobTitle"
                name="jobTitle"
                type="text"
                autoComplete="organization-title"
                placeholder="Job Title"
                className={`${FIELD_CLASS} h-12`}
              />
            </div>

            <div>
              <label htmlFor="phone" className={LABEL_CLASS}>
                Phone
              </label>
              <div className="flex gap-2">
                <select
                  id="phoneCode"
                  name="phoneCode"
                  defaultValue="+65"
                  aria-label="Country code"
                  className={`${FIELD_CLASS} h-12 w-[104px] shrink-0`}
                >
                  {contact.form.phoneCodes.map(({ country, code }) => (
                    <option key={code} value={code}>
                      {country} {code}
                    </option>
                  ))}
                </select>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="9123 4567"
                  className={`${FIELD_CLASS} h-12 min-w-0`}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="requirement" className={LABEL_CLASS}>
                Requirement
              </label>
              <div className="relative">
                <select
                  id="requirement"
                  name="requirement"
                  required
                  defaultValue=""
                  className={`${FIELD_CLASS} h-12 w-full appearance-none pr-10`}
                >
                  <option value="" disabled>
                    Select your requirement
                  </option>
                  {contact.form.requirements.map((requirement) => (
                    <option key={requirement} value={requirement}>
                      {requirement}
                    </option>
                  ))}
                </select>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink"
                >
                  <path
                    d="M5.5 8l4.5 4.5L14.5 8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
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

          <div className="mt-5 flex items-start gap-2.5">
            <input
              id="smsConsent"
              name="smsConsent"
              type="checkbox"
              required
              className="mt-1 size-4 shrink-0 rounded-[4px] border border-line-strong bg-surface accent-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            />
            <label htmlFor="smsConsent" className="text-small text-body">
              By providing a telephone number and submitting the form, you are
              consenting to be contacted by SMS text message and agreeing to
              our{" "}
              <Link
                href="/privacy"
                className="text-ink transition-colors hover:text-primary"
              >
                Privacy Policy
              </Link>
              . Message frequency may vary. Message and data rates may apply.
              Reply STOP to opt out of further messaging. Reply HELP for more
              information.
            </label>
          </div>

          <p className="mt-3 text-small text-body">
            I agree to the{" "}
            <Link
              href="/privacy"
              className="text-ink transition-colors hover:text-primary"
            >
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link
              href="/terms"
              className="text-ink transition-colors hover:text-primary"
            >
              Terms of Use
            </Link>
            .
          </p>

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
      </section>

      {/* Direct lines in the drafting table's row variant, over the same
          dashed grid the lower band always carried. */}
      <section className="relative mt-16 sm:mt-20">
        <BlueprintGrid />

        <div className="relative z-10">
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
