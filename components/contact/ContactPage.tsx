"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, MapPin, Phone } from "lucide-react";
import DotHero from "@/components/DotHero";
import DotTerrain from "@/components/ui/DotTerrain";
import BlueprintGrid from "@/components/ui/BlueprintGrid";
import DirectChannels from "@/components/DirectChannels";
import PageShell from "@/components/ui/PageShell";
import { LocationPlan } from "@/components/contact/LocationPlan";
import { contact } from "@/lib/content";

/* Contact page: the shared dot hero up top, the pitch and the card row beside
   the form, the drafting grid carrying Direct Channels, and the dot range as
   the close. The form is the page's product: one consent block, optional
   fields marked as such, and a success/error state that says what happened. */

/* Shared form furniture: label + field styles in one place so the six
   fields can't drift apart. */
const LABEL_CLASS =
  "mb-1.5 block text-small font-medium tracking-tight text-ink";
const OPTIONAL_CLASS = "font-normal text-body";
const FIELD_CLASS =
  "rounded-xl border border-line-strong/70 bg-field px-3.5 text-small text-ink outline-none transition-colors placeholder:text-placeholder focus:border-primary focus:bg-card focus:ring-2 focus:ring-primary/20 aria-invalid:border-destructive aria-invalid:focus:border-destructive aria-invalid:focus:ring-destructive/20";
const ERROR_CLASS = "mt-1 text-small text-destructive";

type FieldName =
  | "firstName"
  | "lastName"
  | "email"
  | "requirement"
  | "message"
  | "smsConsent";
type FieldErrors = Partial<Record<FieldName, string>>;

/* The form validates here, not in the browser, so every message is written
   in the page's voice and sits next to the field that caused it. */
const REQUIRED_ORDER: readonly FieldName[] = [
  "firstName",
  "lastName",
  "email",
  "requirement",
  "message",
  "smsConsent",
];

function validate(formData: FormData): FieldErrors {
  const errors: FieldErrors = {};
  const value = (name: FieldName) => String(formData.get(name) ?? "").trim();

  if (!value("firstName")) errors.firstName = "Enter your first name.";
  if (!value("lastName")) errors.lastName = "Enter your last name.";

  const email = value("email");
  if (!email) errors.email = "Enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Enter a valid email address, like name@company.com.";

  if (!value("requirement")) errors.requirement = "Select what you need help with.";
  if (!value("message")) errors.message = "Tell us what you need help with.";
  if (!formData.get("smsConsent"))
    errors.smsConsent = "Confirm you agree to be contacted about this enquiry.";

  return errors;
}

export function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"success" | "error" | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});

  const clearError = (name: FieldName) =>
    setErrors((current) =>
      current[name] ? { ...current, [name]: undefined } : current
    );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const nextErrors = validate(formData);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      const first = REQUIRED_ORDER.find((name) => nextErrors[name]);
      if (first) formRef.current?.querySelector<HTMLElement>(`#${first}`)?.focus();
      return;
    }
    setErrors({});

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

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
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
            sits level with the form. The cards keep their own height instead
            of stretching to the form. */}
        <div className="flex flex-col pt-4 sm:pt-5">
          <p className="mb-4 text-small font-semibold tracking-[-0.04em] text-link">
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

          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            {/* Location card */}
            <article className="flex min-h-[150px] flex-col rounded-2xl bg-primary p-4 text-white sm:p-5">
              <MapPin
                size={30}
                strokeWidth={2}
                className="mb-3 text-white"
                aria-hidden="true"
              />

              <h2 className="mb-2 text-small font-semibold tracking-[-0.04em]">
                {contact.location.title}
              </h2>

              <address className="text-small not-italic text-white">
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
            <article className="min-h-[150px] rounded-2xl border border-line bg-surface p-4 sm:p-5">
              <Phone
                size={24}
                strokeWidth={2}
                className="mb-3 text-link"
                aria-hidden="true"
              />

              <h2 className="mb-2 text-small font-semibold tracking-[-0.04em] text-link">
                {contact.call.title}
              </h2>

              <div className="space-y-1 text-small text-body">
                {contact.call.phones.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="block rounded-sm transition-colors hover:text-link focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    {phone}
                  </a>
                ))}
              </div>
            </article>
          </div>

          <LocationPlan />
        </div>

        {/* Contact form */}
        <form
          ref={formRef}
          noValidate
          onSubmit={handleSubmit}
          aria-labelledby="contact-form-title"
          className="flex min-w-0 flex-col rounded-3xl border border-line bg-surface p-5 sm:p-6 lg:p-7"
        >
          <h2
            id="contact-form-title"
            className="text-lead font-semibold tracking-[-0.02em] text-ink"
          >
            Send us a message
          </h2>
          <p className="mb-5 mt-1 text-small text-body">
            Tell us what you need. We reply within one business day.
          </p>

          <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2 lg:grid-cols-1 lg:gap-y-5 xl:grid-cols-2">
            <div>
              <label htmlFor="firstName" className={LABEL_CLASS}>
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                autoComplete="given-name"
                required
                aria-invalid={errors.firstName ? true : undefined}
                aria-describedby={errors.firstName ? "firstName-error" : undefined}
                onChange={() => clearError("firstName")}
                className={`${FIELD_CLASS} h-12 w-full`}
              />
              {errors.firstName ? (
                <p id="firstName-error" className={ERROR_CLASS}>
                  {errors.firstName}
                </p>
              ) : null}
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
                required
                aria-invalid={errors.lastName ? true : undefined}
                aria-describedby={errors.lastName ? "lastName-error" : undefined}
                onChange={() => clearError("lastName")}
                className={`${FIELD_CLASS} h-12 w-full`}
              />
              {errors.lastName ? (
                <p id="lastName-error" className={ERROR_CLASS}>
                  {errors.lastName}
                </p>
              ) : null}
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
                placeholder="name@company.com"
                required
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={errors.email ? "email-error" : undefined}
                onChange={() => clearError("email")}
                className={`${FIELD_CLASS} h-12 w-full`}
              />
              {errors.email ? (
                <p id="email-error" className={ERROR_CLASS}>
                  {errors.email}
                </p>
              ) : null}
            </div>

            <div>
              <label htmlFor="company" className={LABEL_CLASS}>
                Company <span className={OPTIONAL_CLASS}>(optional)</span>
              </label>
              <input
                id="company"
                name="company"
                type="text"
                autoComplete="organization"
                className={`${FIELD_CLASS} h-12 w-full`}
              />
            </div>

            <div>
              <label htmlFor="jobTitle" className={LABEL_CLASS}>
                Job Title <span className={OPTIONAL_CLASS}>(optional)</span>
              </label>
              <input
                id="jobTitle"
                name="jobTitle"
                type="text"
                autoComplete="organization-title"
                className={`${FIELD_CLASS} h-12 w-full`}
              />
            </div>

            <div>
              <label htmlFor="phone" className={LABEL_CLASS}>
                Phone <span className={OPTIONAL_CLASS}>(optional)</span>
              </label>
              <div className="flex gap-2">
                <select
                  id="phoneCode"
                  name="phoneCode"
                  defaultValue="+65"
                  aria-label="Country code"
                  className={`${FIELD_CLASS} h-12 w-[120px] shrink-0`}
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
                  className={`${FIELD_CLASS} h-12 min-w-0 flex-1`}
                />
              </div>
            </div>

            <div className="sm:col-span-2 lg:col-span-1 xl:col-span-2">
              <label htmlFor="requirement" className={LABEL_CLASS}>
                Requirement
              </label>
              <div className="relative">
                <select
                  id="requirement"
                  name="requirement"
                  required
                  defaultValue=""
                  aria-invalid={errors.requirement ? true : undefined}
                  aria-describedby={errors.requirement ? "requirement-error" : undefined}
                  onChange={() => clearError("requirement")}
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
              {errors.requirement ? (
                <p id="requirement-error" className={ERROR_CLASS}>
                  {errors.requirement}
                </p>
              ) : null}
            </div>

            <div className="sm:col-span-2 lg:col-span-1 xl:col-span-2">
              <label htmlFor="message" className={LABEL_CLASS}>
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Tell us what you need help with."
                required
                aria-invalid={errors.message ? true : undefined}
                aria-describedby={errors.message ? "message-error" : undefined}
                onChange={() => clearError("message")}
                className={`${FIELD_CLASS} min-h-[140px] w-full resize-y py-3`}
              />
              {errors.message ? (
                <p id="message-error" className={ERROR_CLASS}>
                  {errors.message}
                </p>
              ) : null}
            </div>
          </div>

          <div className="mt-6 flex items-start gap-2.5">
            <input
              id="smsConsent"
              name="smsConsent"
              type="checkbox"
              required
              aria-invalid={errors.smsConsent ? true : undefined}
              aria-describedby={`smsConsent-note${
                errors.smsConsent ? " smsConsent-error" : ""
              }`}
              onChange={() => clearError("smsConsent")}
              className="mt-1 size-4 shrink-0 rounded-[4px] border border-line-strong bg-surface accent-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            />
            <div>
              <label htmlFor="smsConsent" className="block text-small text-body">
                I agree to be contacted about this enquiry by SMS, email or
                phone.
              </label>
              <p id="smsConsent-note" className="mt-1 text-small text-body">
                By providing a telephone number and submitting the form, you
                also accept our{" "}
                <Link
                  href="/privacy"
                  className="text-ink underline underline-offset-2 transition-colors hover:text-link"
                >
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link
                  href="/terms"
                  className="text-ink underline underline-offset-2 transition-colors hover:text-link"
                >
                  Terms of Use
                </Link>
                . Message frequency may vary. Message and data rates may apply.
                Reply STOP to opt out or HELP for more information.
              </p>
            </div>
          </div>
          {errors.smsConsent ? (
            <p id="smsConsent-error" className={ERROR_CLASS}>
              {errors.smsConsent}
            </p>
          ) : null}

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p role="status" aria-live="polite" className="max-w-[360px] text-small">
              {status === "success" ? (
                <span className="inline-flex items-center gap-1.5 text-ink">
                  <Check className="h-4 w-4 text-link" aria-hidden="true" />
                  Thank you! Your message has been sent.
                </span>
              ) : null}
              {status === "error" ? (
                <span className="text-destructive">
                  We couldn’t send your message. Please email{" "}
                  <a
                    href="mailto:info@eastwards.co"
                    className="underline underline-offset-2 transition-colors hover:text-link"
                  >
                    info@eastwards.co
                  </a>
                  .
                </span>
              ) : null}
            </p>

            <button
              type="submit"
              disabled={submitting}
              aria-busy={submitting}
              className="ml-auto inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-small font-semibold text-white transition-[filter] duration-200 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface active:brightness-95 disabled:cursor-not-allowed disabled:opacity-60 lg:min-h-[52px] lg:px-7"
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
