"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { ERROR_CLASS, FIELD_CLASS, LABEL_CLASS } from "@/components/ui/form-styles";
import { responsibility } from "@/lib/responsibility";
import { isEmail } from "@/lib/validation";

/* The CSR enquiry form, posting to /api/csr (its own inbox, apart from Contact
   Us and Careers). Same behaviour as the contact form: errors in the page's
   voice beside each field, the button locked while sending, and success only
   once the server confirms. */

const copy = responsibility.contact.form;

type FieldName = "name" | "email" | "message";
type FieldErrors = Partial<Record<FieldName, string>>;
const ORDER: readonly FieldName[] = ["name", "email", "message"];

const MESSAGES: Record<FieldName, string> = {
  name: "Enter your name.",
  email: "Enter your email address.",
  message: "Tell us a little about your idea or question.",
};
const EMAIL_INVALID = "Enter a valid email address, like name@company.com.";

function validate(data: FormData): FieldErrors {
  const value = (name: string) => String(data.get(name) ?? "").trim();
  const errors: FieldErrors = {};
  if (!value("name")) errors.name = MESSAGES.name;
  if (!value("email")) errors.email = MESSAGES.email;
  else if (!isEmail(value("email"))) errors.email = EMAIL_INVALID;
  if (!value("message")) errors.message = MESSAGES.message;
  return errors;
}

export function CsrForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const sentHeading = useRef<HTMLHeadingElement>(null);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [failed, setFailed] = useState(false);
  const [sentTo, setSentTo] = useState("");

  useEffect(() => {
    if (sentTo) sentHeading.current?.focus();
  }, [sentTo]);

  const clear = (name: FieldName) => setErrors((current) => (current[name] ? { ...current, [name]: undefined } : current));
  const focusFirst = (found: FieldErrors) => {
    const first = ORDER.find((name) => found[name]);
    if (first) formRef.current?.querySelector<HTMLElement>(`#csr-${first}`)?.focus();
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return; // one send at a time
    setFailed(false);
    const data = new FormData(event.currentTarget);
    const found = validate(data);
    if (Object.keys(found).length) {
      setErrors(found);
      focusFirst(found);
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      const response = await fetch("/api/csr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      });
      if (response.ok) {
        setSentTo(String(data.get("email")));
        return;
      }
      const result = await response.json().catch(() => null);
      const rejected: FieldErrors = {};
      for (const name of ORDER) {
        const code = result?.errors?.[name];
        if (code) rejected[name] = name === "email" && code === "invalid" ? EMAIL_INVALID : MESSAGES[name];
      }
      if (Object.keys(rejected).length) {
        setErrors(rejected);
        focusFirst(rejected);
      } else setFailed(true);
    } catch {
      setFailed(true);
    } finally {
      setSubmitting(false);
    }
  }

  const field = (name: FieldName) => ({
    id: `csr-${name}`,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `csr-${name}-error` : undefined,
    onChange: () => clear(name),
  });
  const error = (name: FieldName) =>
    errors[name] ? (
      <p id={`csr-${name}-error`} className={ERROR_CLASS}>
        {errors[name]}
      </p>
    ) : null;

  if (sentTo) {
    return (
      <div className="flex animate-[fade-in_250ms_ease-out] flex-col items-start rounded-3xl bg-page p-6 motion-reduce:animate-none sm:p-8">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-primary text-white">
          <Check className="h-5 w-5" aria-hidden="true" />
        </span>
        <h3 ref={sentHeading} tabIndex={-1} className="mt-5 text-lead font-semibold tracking-[-0.02em] text-ink focus:outline-none">
          {copy.sent.title}
        </h3>
        <p className="mt-2 text-pretty text-small text-body">
          {copy.sent.before} <span className="font-medium text-ink">{sentTo}</span> {copy.sent.after}
        </p>
        <button
          type="button"
          onClick={() => setSentTo("")}
          className="mt-6 inline-flex min-h-11 items-center rounded-full bg-surface px-6 text-small font-semibold text-ink transition-colors hover:text-link focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {copy.again}
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={handleSubmit}
      aria-labelledby="csr-contact-heading"
      className="grid gap-3 rounded-3xl bg-page p-5 sm:grid-cols-2"
    >
      <div>
        <label htmlFor="csr-name" className={LABEL_CLASS}>
          Name
        </label>
        <input {...field("name")} type="text" autoComplete="name" maxLength={120} className={`${FIELD_CLASS} h-12 w-full`} />
        {error("name")}
      </div>
      <div>
        <label htmlFor="csr-email" className={LABEL_CLASS}>
          Email
        </label>
        <input
          {...field("email")}
          type="email"
          autoComplete="email"
          placeholder="name@company.com"
          maxLength={254}
          className={`${FIELD_CLASS} h-12 w-full`}
        />
        {error("email")}
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="csr-message" className={LABEL_CLASS}>
          Message
        </label>
        <textarea
          {...field("message")}
          rows={2}
          maxLength={5000}
          placeholder="Your idea, project or question."
          className={`${FIELD_CLASS} min-h-[72px] w-full resize-y py-3`}
        />
        {error("message")}
      </div>

      {failed ? (
        <p role="alert" className="rounded-xl bg-destructive/10 px-4 py-3 text-small font-medium text-destructive sm:col-span-2">
          {copy.failed}
        </p>
      ) : null}

      <div className="sm:col-span-2 sm:flex sm:justify-end">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-7 text-small font-semibold text-white transition-[filter] duration-200 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:brightness-95 disabled:cursor-progress sm:w-auto lg:min-h-[52px]"
        >
          {submitting ? (
            <span aria-hidden="true" className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white motion-reduce:animate-none" />
          ) : null}
          {submitting ? copy.sending : copy.submit}
          {submitting ? null : <ArrowUpRight size={14} aria-hidden="true" />}
        </button>
      </div>

      {/* shortcut: honeypot plus the server's rate limit only; add Turnstile if spam gets through */}
      <div aria-hidden="true" className="sr-only">
        <label htmlFor="csr-website">Website</label>
        <input id="csr-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
    </form>
  );
}
