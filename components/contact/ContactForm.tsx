"use client";

import { Suspense, useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import {
  ERROR_CLASS,
  FIELD_CLASS,
  FORM_LINK_CLASS as LINK_CLASS,
  LABEL_CLASS,
  OPTIONAL_CLASS,
} from "@/components/ui/form-styles";
import { contact } from "@/lib/content";
import { PhoneField } from "@/components/ui/PhoneField";
import { formatPhone, PHONE_INVALID } from "@/lib/phone";
import { isEmail } from "@/lib/validation";

/* The contact form: one consent block, optional fields marked as such, inline
   errors written in the page's voice, and an outcome that says what happened.
   A failed send hands the visitor a pre-filled email instead of a dead end. */

const copy = contact.form;
const inbox = contact.form.inbox;

type FieldName = "firstName" | "lastName" | "email" | "phone" | "requirement" | "message" | "smsConsent";
type FieldErrors = Partial<Record<FieldName, string>>;

/* The form validates here, not in the browser, so every message is written
   in the page's voice and sits next to the field that caused it. The API
   checks the same rules and answers with field codes. */
const REQUIRED_ORDER: readonly FieldName[] = ["firstName", "lastName", "email", "phone", "requirement", "message", "smsConsent"];

const MESSAGES: Record<FieldName, string> = {
  firstName: "Enter your first name.",
  lastName: "Enter your last name.",
  email: "Enter your email address.",
  // optional, so only ever "not a real number"
  phone: PHONE_INVALID,
  requirement: "Select what you need help with.",
  message: "Tell us what you need help with.",
  smsConsent: "Confirm you agree to be contacted about this enquiry.",
};
const EMAIL_INVALID = "Enter a valid email address, like name@company.com.";

function validate(formData: FormData): FieldErrors {
  const errors: FieldErrors = {};
  const value = (name: FieldName) => String(formData.get(name) ?? "").trim();

  if (!value("firstName")) errors.firstName = MESSAGES.firstName;
  if (!value("lastName")) errors.lastName = MESSAGES.lastName;

  const email = value("email");
  if (!email) errors.email = MESSAGES.email;
  else if (!isEmail(email)) errors.email = EMAIL_INVALID;

  const phone = value("phone");
  if (phone && !formatPhone(phone)) errors.phone = MESSAGES.phone;

  if (!value("requirement")) errors.requirement = MESSAGES.requirement;
  if (!value("message")) errors.message = MESSAGES.message;
  if (!formData.get("smsConsent")) errors.smsConsent = MESSAGES.smsConsent;

  return errors;
}

// When sending fails, the visitor's own mail app gets the message instead
function mailtoFor(data: FormData) {
  const value = (name: string) => String(data.get(name) ?? "").trim();
  const phone = value("phone") && (formatPhone(value("phone")) ?? value("phone"));
  const details = [
    ["Name", `${value("firstName")} ${value("lastName")}`.trim()],
    ["Email", value("email")],
    ["Company", value("company")],
    ["Job Title", value("jobTitle")],
    ["Phone", phone],
    ["Requirement", value("requirement")],
  ]
    .filter(([, v]) => v)
    .map(([label, v]) => `${label}: ${v}`);
  const body = [value("message").slice(0, 1500), "", ...details].join("\n");
  const subject = [copy.failed.subject, value("company")].filter(Boolean).join(": ");
  return `mailto:${inbox}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/* Menu links such as /contact?requirement=Data%20%26%20AI arrive with the
   requirement chosen. Reading the URL makes this part client-only, so it sits
   in its own Suspense boundary and the form itself stays prerendered. */
function RequirementFromUrl({ onPick }: { onPick: (requirement: string) => void }) {
  const wanted = useSearchParams().get("requirement");
  useEffect(() => {
    if (wanted && (copy.requirements as readonly string[]).includes(wanted)) onPick(wanted);
  }, [wanted, onPick]);
  return null;
}

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const requirementRef = useRef<HTMLSelectElement>(null);
  const sentHeading = useRef<HTMLHeadingElement>(null);
  const restarted = useRef(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [fallback, setFallback] = useState("");
  const [sentTo, setSentTo] = useState("");

  useEffect(() => {
    if (sentTo) sentHeading.current?.focus();
    else if (restarted.current) formRef.current?.querySelector<HTMLElement>("#firstName")?.focus();
  }, [sentTo]);

  const clearError = useCallback(
    (name: FieldName) => setErrors((current) => (current[name] ? { ...current, [name]: undefined } : current)),
    []
  );
  // the select stays uncontrolled (as upstream built it), so the URL value is
  // written to the element itself
  const pickRequirement = useCallback(
    (requirement: string) => {
      if (requirementRef.current) requirementRef.current.value = requirement;
      clearError("requirement");
    },
    [clearError]
  );

  const focusFirst = (found: FieldErrors) => {
    const first = REQUIRED_ORDER.find((name) => found[name]);
    if (first) formRef.current?.querySelector<HTMLElement>(`#${first}`)?.focus();
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setFallback("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const nextErrors = validate(formData);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      focusFirst(nextErrors);
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

      if (response.ok) {
        setSentTo(String(formData.get("email")));
        return;
      }

      // The server checks the same rules, show what it rejected
      const result = await response.json().catch(() => null);
      const rejected: FieldErrors = {};
      for (const name of REQUIRED_ORDER) {
        const code = result?.errors?.[name];
        if (code) rejected[name] = name === "email" && code === "invalid" ? EMAIL_INVALID : MESSAGES[name];
      }
      if (Object.keys(rejected).length > 0) {
        setErrors(rejected);
        focusFirst(rejected);
      } else {
        setFallback(mailtoFor(formData));
      }
    } catch {
      setFallback(mailtoFor(formData));
    } finally {
      setSubmitting(false);
    }
  }

  function startOver() {
    restarted.current = true;
    setErrors({});
    setFallback("");
    setSentTo("");
  }

  if (sentTo) {
    return (
      <div className="flex animate-[fade-in_250ms_ease-out] flex-col items-start rounded-3xl border border-line bg-surface p-5 motion-reduce:animate-none sm:p-6 xl:h-full xl:justify-center lg:p-7">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-primary text-white">
          <Check className="h-5 w-5" aria-hidden="true" />
        </span>
        <h3 ref={sentHeading} tabIndex={-1} className="mt-5 text-lead font-semibold tracking-[-0.02em] text-ink focus:outline-none">
          {copy.sent.title}
        </h3>
        <p className="mt-2 max-w-[480px] text-pretty text-small text-body">
          {copy.sent.before} <span className="font-medium text-ink">{sentTo}</span> {copy.sent.after}
        </p>
        <button
          type="button"
          onClick={startOver}
          className="mt-6 inline-flex min-h-11 items-center rounded-full border border-line-strong bg-card px-6 text-small font-semibold text-ink transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {copy.sent.again}
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={handleSubmit}
      aria-labelledby="contact-heading"
      className="flex min-w-0 flex-col rounded-3xl border border-line bg-surface p-5 sm:p-6 xl:h-full lg:p-7"
    >
      <h3 className="text-small font-semibold text-ink">{copy.start.title}</h3>
      <p className="mt-1 text-pretty text-small text-body">{copy.start.body}</p>
      <p className="mb-5 mt-4 text-small text-body">
        {copy.routing.text}{" "}
        <a href={copy.routing.href} className={LINK_CLASS}>
          {copy.routing.link}
        </a>
      </p>

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
            maxLength={80}
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
            maxLength={80}
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
            Work Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="name@company.com"
            maxLength={254}
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
          <input id="company" name="company" type="text" autoComplete="organization" maxLength={160} className={`${FIELD_CLASS} h-12 w-full`} />
        </div>

        <div>
          <label htmlFor="jobTitle" className={LABEL_CLASS}>
            Job Title <span className={OPTIONAL_CLASS}>(optional)</span>
          </label>
          <input id="jobTitle" name="jobTitle" type="text" autoComplete="organization-title" maxLength={120} className={`${FIELD_CLASS} h-12 w-full`} />
        </div>

        <div>
          <label htmlFor="phone" className={LABEL_CLASS}>
            Phone <span className={OPTIONAL_CLASS}>(optional)</span>
          </label>
          <PhoneField
            id="phone"
            name="phone"
            invalid={Boolean(errors.phone)}
            describedBy={errors.phone ? "phone-error" : undefined}
            onChange={() => clearError("phone")}
          />
          {errors.phone ? (
            <p id="phone-error" className={ERROR_CLASS}>
              {errors.phone}
            </p>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="requirement" className={LABEL_CLASS}>
            Service Interest
          </label>
          <div className="relative">
            <select
              ref={requirementRef}
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
                Select a service
              </option>
              {copy.requirements.map((requirement) => (
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
              <path d="M5.5 8l4.5 4.5L14.5 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <Suspense fallback={null}>
            <RequirementFromUrl onPick={pickRequirement} />
          </Suspense>
          {errors.requirement ? (
            <p id="requirement-error" className={ERROR_CLASS}>
              {errors.requirement}
            </p>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className={LABEL_CLASS}>
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Tell us what you need help with."
            maxLength={5000}
            required
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? "message-error" : undefined}
            onChange={() => clearError("message")}
            className={`${FIELD_CLASS} min-h-[120px] w-full resize-y py-3`}
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
          aria-describedby={`smsConsent-note${errors.smsConsent ? " smsConsent-error" : ""}`}
          onChange={() => clearError("smsConsent")}
          className="mt-0.5 size-5 shrink-0 rounded-[4px] border border-line-strong bg-surface accent-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        />
        <div>
          <label htmlFor="smsConsent" className="block text-small text-body">
            I agree to be contacted about this enquiry by SMS, email or phone.
          </label>
          <p id="smsConsent-note" className="mt-1 text-small text-body">
            By providing a telephone number and submitting the form, you also accept our{" "}
            <Link href="/privacy" className={LINK_CLASS}>
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href="/terms" className={LINK_CLASS}>
              Terms of Use
            </Link>
            . Message frequency may vary. Message and data rates may apply. Reply STOP to opt out or HELP for more
            information.
          </p>
        </div>
      </div>
      {errors.smsConsent ? (
        <p id="smsConsent-error" className={ERROR_CLASS}>
          {errors.smsConsent}
        </p>
      ) : null}

      {fallback ? (
        <p role="alert" className="mt-5 rounded-xl bg-destructive/10 px-4 py-3 text-small font-medium text-destructive">
          {copy.failed.text}{" "}
          <a href={fallback} className="rounded-sm underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
            {copy.failed.link}
          </a>
          .
        </p>
      ) : null}

      <div className="mt-5 flex xl:mt-auto xl:pt-5">
        <button
          type="submit"
          aria-disabled={submitting || undefined}
          className="inline-flex w-full min-h-12 items-center justify-center gap-2 rounded-full sm:ml-auto sm:w-auto sm:min-h-11 bg-primary px-6 py-2.5 text-small font-semibold text-white transition-[filter] duration-200 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface active:brightness-95 aria-disabled:cursor-progress lg:min-h-[52px] lg:px-7"
        >
          {submitting ? (
            <span aria-hidden="true" className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white motion-reduce:animate-none" />
          ) : null}
          {submitting ? copy.sending : copy.submitText}
          {submitting ? null : <ArrowUpRight size={14} aria-hidden="true" />}
        </button>
      </div>

      {/* ponytail: honeypot only, add Cloudflare Turnstile if spam gets through */}
      <div aria-hidden="true" className="sr-only">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
    </form>
  );
}
