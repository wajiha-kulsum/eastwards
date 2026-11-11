"use client";

import { Suspense, useEffect, useRef, useState, type DragEvent, type FormEvent, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowUpRight, Check, FileText, Upload, X } from "lucide-react";
import { RichText } from "@/components/legal/RichText";
import { ERROR_CLASS, FIELD_CLASS, FORM_LINK_CLASS, LABEL_CLASS, OPTIONAL_CLASS } from "@/components/ui/form-styles";
import { careers, CAREERS_EMAIL, CV_RULES, GENERAL_APPLICATION } from "@/lib/careers";
import { contact } from "@/lib/content";
import { allowedExtension, isEmail, isHttpUrl } from "@/lib/validation";

/* The application form. It validates here first, so every message sits next
   to its field in the page's voice; the API re-checks the same rules and
   answers with field codes. The CV goes up as multipart form data, picked
   with the file dialog or dropped on the upload box. A failed send offers a
   pre-filled email instead of a dead end. */

const copy = careers.form;
const openings = careers.positions.openings;

type FieldName = "firstName" | "lastName" | "email" | "link" | "area" | "cv" | "consent";
type FieldErrors = Partial<Record<FieldName, string>>;

const ORDER: readonly FieldName[] = ["firstName", "lastName", "email", "link", "area", "cv", "consent"];

const MESSAGES: Record<FieldName, string> = {
  firstName: "Enter your first name.",
  lastName: "Enter your last name.",
  email: "Enter your email address.",
  link: "Enter a full link, starting with https://",
  area: "Select the area you’re interested in.",
  cv: "Attach your CV.",
  consent: "Confirm we may process your application.",
};
const EMAIL_INVALID = "Enter a valid email address, like name@example.com.";
const CV_TYPE = "Upload a PDF, DOC or DOCX file.";
const CV_SIZE = `That file is over ${CV_RULES.maxLabel}. Upload a smaller version.`;

const formatSize = (bytes: number) =>
  bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;

function checkFile(file: File | null): string | undefined {
  if (!file) return MESSAGES.cv;
  if (!allowedExtension(file.name, CV_RULES.extensions)) return CV_TYPE;
  if (file.size > CV_RULES.maxBytes) return CV_SIZE;
  return undefined;
}

function validate(data: FormData, file: File | null): FieldErrors {
  const errors: FieldErrors = {};
  const value = (name: string) => String(data.get(name) ?? "").trim();
  if (!value("firstName")) errors.firstName = MESSAGES.firstName;
  if (!value("lastName")) errors.lastName = MESSAGES.lastName;
  const email = value("email");
  if (!email) errors.email = MESSAGES.email;
  else if (!isEmail(email)) errors.email = EMAIL_INVALID;
  const link = value("link");
  if (link && !isHttpUrl(link)) errors.link = MESSAGES.link;
  if (!value("area")) errors.area = MESSAGES.area;
  const cv = checkFile(file);
  if (cv) errors.cv = cv;
  if (!data.get("consent")) errors.consent = MESSAGES.consent;
  return errors;
}

// When sending fails, the visitor's own mail app gets the application instead
function mailtoFor(data: FormData) {
  const value = (name: string) => String(data.get(name) ?? "").trim();
  const name = `${value("firstName")} ${value("lastName")}`.trim();
  const phone = value("phone") && `${value("phoneCode")} ${value("phone")}`;
  const lines = [
    ["Name", name],
    ["Email", value("email")],
    ["Phone", phone],
    ["Location", value("location")],
    ["LinkedIn / portfolio", value("link")],
    ["Position", value("position") || GENERAL_APPLICATION],
    ["Area of interest", value("area")],
  ]
    .filter(([, v]) => v)
    .map(([label, v]) => `${label}: ${v}`);
  const body = [...lines, "", value("message").slice(0, 1500), "", "(CV attached)"].join("\n");
  const subject = [copy.failed.subject, name].filter(Boolean).join(": ");
  return `mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/* Links like /careers?position=<slug>#apply arrive with the role chosen.
   Reading the URL is client-only, so it sits in its own Suspense boundary
   and the form itself stays prerendered. */
function PositionFromUrl({ onPick }: { onPick: (title: string) => void }) {
  const slug = useSearchParams().get("position");
  useEffect(() => {
    const match = openings.find((opening) => opening.slug === slug);
    if (match) onPick(match.title);
  }, [slug, onPick]);
  return null;
}

function Field({
  id,
  label,
  optional,
  error,
  children,
  className = "",
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className={LABEL_CLASS}>
        {label} {optional ? <span className={OPTIONAL_CLASS}>(optional)</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className={ERROR_CLASS}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

/* aria wiring for a field that may carry an error */
const invalid = (errors: FieldErrors, name: FieldName) => ({
  "aria-invalid": errors[name] ? true : undefined,
  "aria-describedby": errors[name] ? `${name}-error` : undefined,
});

export function CareerForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const positionRef = useRef<HTMLSelectElement>(null);
  const sentHeading = useRef<HTMLHeadingElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [fallback, setFallback] = useState("");
  const [sentTo, setSentTo] = useState("");

  useEffect(() => {
    if (sentTo) sentHeading.current?.focus();
  }, [sentTo]);

  const clearError = (name: FieldName) =>
    setErrors((current) => (current[name] ? { ...current, [name]: undefined } : current));

  const pickFile = (next: File | null) => {
    setFile(next);
    const problem = next ? checkFile(next) : undefined;
    setErrors((current) => ({ ...current, cv: problem }));
  };

  const removeFile = () => {
    if (fileRef.current) fileRef.current.value = "";
    setFile(null);
    fileRef.current?.focus();
  };

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    const dropped = event.dataTransfer.files?.[0];
    if (!dropped || !fileRef.current) return;
    // keep the input as the single source, so FormData carries the file
    const transfer = new DataTransfer();
    transfer.items.add(dropped);
    fileRef.current.files = transfer.files;
    pickFile(dropped);
  };

  const focusFirst = (found: FieldErrors) => {
    const first = ORDER.find((name) => found[name]);
    if (first) formRef.current?.querySelector<HTMLElement>(`#${first}`)?.focus();
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setFallback("");

    const data = new FormData(event.currentTarget);
    const found = validate(data, file);
    if (Object.keys(found).length) {
      setErrors(found);
      focusFirst(found);
      return;
    }
    setErrors({});

    // No success message until the server confirms the email went out
    try {
      setSubmitting(true);
      const response = await fetch("/api/careers", { method: "POST", body: data });
      if (response.ok) {
        setSentTo(String(data.get("email")));
        return;
      }
      const result = await response.json().catch(() => null);
      const codes: Record<string, string> = result?.errors ?? (response.status === 413 ? { cv: "too-large" } : {});
      const rejected: FieldErrors = {};
      for (const name of ORDER) {
        const code = codes[name];
        if (!code) continue;
        if (name === "cv") rejected.cv = code === "too-large" ? CV_SIZE : code === "invalid" ? CV_TYPE : MESSAGES.cv;
        else if (name === "email" && code === "invalid") rejected.email = EMAIL_INVALID;
        else rejected[name] = MESSAGES[name];
      }
      if (Object.keys(rejected).length) {
        setErrors(rejected);
        focusFirst(rejected);
      } else {
        setFallback(mailtoFor(data));
      }
    } catch {
      setFallback(mailtoFor(data));
    } finally {
      setSubmitting(false);
    }
  }

  function startOver() {
    setErrors({});
    setFallback("");
    setFile(null);
    setSentTo("");
  }

  if (sentTo) {
    return (
      <div className="flex animate-[fade-in_250ms_ease-out] flex-col items-start rounded-3xl border border-line bg-surface p-6 motion-reduce:animate-none sm:p-8">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-primary text-white">
          <Check className="h-5 w-5" aria-hidden="true" />
        </span>
        <h3 ref={sentHeading} tabIndex={-1} className="mt-5 text-lead font-semibold tracking-[-0.02em] text-ink focus:outline-none">
          {copy.sent.title}
        </h3>
        <p className="mt-2 max-w-[520px] text-pretty text-small text-body">
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
      aria-labelledby="apply-form-heading"
      encType="multipart/form-data"
      className="rounded-3xl border border-line bg-surface p-5 sm:p-7 lg:p-8"
    >
      <h3 id="apply-form-heading" className="text-small font-semibold text-ink">
        {copy.title}
      </h3>
      <p className="mt-1 text-small text-body">{copy.intro}</p>

      <div className="mt-6 grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2 lg:gap-y-5">
        <Field id="firstName" label="First Name" error={errors.firstName}>
          <input
            id="firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            maxLength={80}
            onChange={() => clearError("firstName")}
            className={`${FIELD_CLASS} h-12 w-full`}
            {...invalid(errors, "firstName")}
          />
        </Field>

        <Field id="lastName" label="Last Name" error={errors.lastName}>
          <input
            id="lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            maxLength={80}
            onChange={() => clearError("lastName")}
            className={`${FIELD_CLASS} h-12 w-full`}
            {...invalid(errors, "lastName")}
          />
        </Field>

        <Field id="email" label="Email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="name@example.com"
            maxLength={254}
            onChange={() => clearError("email")}
            className={`${FIELD_CLASS} h-12 w-full`}
            {...invalid(errors, "email")}
          />
        </Field>

        <Field id="phone" label="Phone" optional>
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
              maxLength={40}
              className={`${FIELD_CLASS} h-12 min-w-0 flex-1`}
            />
          </div>
        </Field>

        <Field id="location" label="Current Location" optional>
          <input
            id="location"
            name="location"
            type="text"
            autoComplete="address-level2"
            placeholder="City, country"
            maxLength={120}
            className={`${FIELD_CLASS} h-12 w-full`}
          />
        </Field>

        <Field id="link" label="LinkedIn or Portfolio" optional error={errors.link}>
          <input
            id="link"
            name="link"
            type="url"
            inputMode="url"
            placeholder="https://"
            maxLength={300}
            onChange={() => clearError("link")}
            className={`${FIELD_CLASS} h-12 w-full`}
            {...invalid(errors, "link")}
          />
        </Field>

        {openings.length ? (
          <Field id="position" label="Position" className="sm:col-span-2">
            <select
              ref={positionRef}
              id="position"
              name="position"
              defaultValue={GENERAL_APPLICATION}
              className={`${FIELD_CLASS} h-12 w-full`}
            >
              {openings.map((opening) => (
                <option key={opening.slug} value={opening.title}>
                  {opening.title}
                </option>
              ))}
              <option value={GENERAL_APPLICATION}>{GENERAL_APPLICATION}</option>
            </select>
            <Suspense fallback={null}>
              <PositionFromUrl
                onPick={(title) => {
                  if (positionRef.current) positionRef.current.value = title;
                }}
              />
            </Suspense>
          </Field>
        ) : (
          <input type="hidden" name="position" value={GENERAL_APPLICATION} />
        )}

        <Field id="area" label="Area of Interest" error={errors.area} className="sm:col-span-2">
          <div className="relative">
            <select
              id="area"
              name="area"
              defaultValue=""
              onChange={() => clearError("area")}
              className={`${FIELD_CLASS} h-12 w-full appearance-none pr-10`}
              {...invalid(errors, "area")}
            >
              <option value="" disabled>
                Select an area
              </option>
              {copy.areas.map((area) => (
                <option key={area} value={area}>
                  {area}
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
        </Field>

        {/* CV: the real file input stays in the form (visually hidden, still
            focusable); the box around it is its label and drop target */}
        {/* the whole block takes drops, so a chosen file can be replaced by
            dropping another one on its card */}
        <div
          className="sm:col-span-2"
          onDragOver={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragLeave={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setDragging(false);
          }}
          onDrop={onDrop}
        >
          <span id="cv-label" className={LABEL_CLASS}>
            {copy.cv.label}
          </span>
          {file && !errors.cv ? (
            <div
              className={`flex items-center gap-3 rounded-xl border bg-card px-4 py-3 transition-colors ${dragging ? "border-primary bg-primary/5" : "border-line-strong"}`}
            >
              <FileText className="h-5 w-5 shrink-0 text-link" aria-hidden="true" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-small font-medium text-ink">{file.name}</span>
                <span className="block text-small text-body">{formatSize(file.size)}</span>
              </span>
              <button
                type="button"
                onClick={removeFile}
                aria-label={`${copy.cv.remove} ${file.name}`}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-lg text-body transition-colors hover:bg-surface hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          ) : null}
          <label
            htmlFor="cv"
            className={`${file && !errors.cv ? "sr-only" : "flex"} cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border bg-card px-4 py-7 text-center transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-primary ${
              errors.cv ? "border-destructive" : dragging ? "border-primary bg-primary/5" : "border-field-line hover:border-primary"
            }`}
          >
            <Upload className="h-5 w-5 text-link" aria-hidden="true" />
            <span className="text-small text-ink">
              <span className="font-semibold text-link">{copy.cv.cta}</span> {copy.cv.drop}
            </span>
            <span id="cv-hint" className="text-small text-body">
              {copy.cv.hint}
            </span>
            <input
              ref={fileRef}
              id="cv"
              name="cv"
              type="file"
              accept={CV_RULES.accept}
              aria-labelledby="cv-label"
              aria-describedby={`cv-hint${errors.cv ? " cv-error" : ""}`}
              aria-invalid={errors.cv ? true : undefined}
              onChange={(event) => pickFile(event.target.files?.[0] ?? null)}
              className="sr-only"
            />
          </label>
          {errors.cv ? (
            <p id="cv-error" className={ERROR_CLASS}>
              {errors.cv}
            </p>
          ) : null}
        </div>

        <Field id="message" label="Brief Introduction" optional className="sm:col-span-2">
          <textarea
            id="message"
            name="message"
            rows={4}
            maxLength={3000}
            placeholder="Tell us about yourself and the work you’d like to do."
            className={`${FIELD_CLASS} min-h-[120px] w-full resize-y py-3`}
          />
        </Field>
      </div>

      <div className="mt-6 flex items-start gap-2.5">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          onChange={() => clearError("consent")}
          className="mt-0.5 size-5 shrink-0 rounded-[4px] border border-line-strong bg-surface accent-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          {...invalid(errors, "consent")}
        />
        <label htmlFor="consent" className="text-small text-body">
          <RichText text={copy.consent} linkClassName={FORM_LINK_CLASS} />
        </label>
      </div>
      {errors.consent ? (
        <p id="consent-error" className={ERROR_CLASS}>
          {errors.consent}
        </p>
      ) : null}

      {fallback ? (
        <p role="alert" className="mt-5 rounded-xl bg-destructive/10 px-4 py-3 text-small font-medium text-destructive">
          {copy.failed.text}{" "}
          <a href={fallback} className="rounded-sm underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
            {copy.failed.link}
          </a>{" "}
          {copy.failed.note}.
        </p>
      ) : null}

      <div className="mt-6 flex">
        <button
          type="submit"
          aria-disabled={submitting || undefined}
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-7 text-small font-semibold text-white transition-[filter] duration-200 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface active:brightness-95 aria-disabled:cursor-progress sm:ml-auto sm:w-auto"
        >
          {submitting ? (
            <span aria-hidden="true" className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white motion-reduce:animate-none" />
          ) : null}
          {submitting ? copy.sending : copy.submit}
          {submitting ? null : <ArrowUpRight size={14} aria-hidden="true" />}
        </button>
      </div>

      {/* honeypot: people never see it, bots fill it */}
      <div aria-hidden="true" className="sr-only">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
    </form>
  );
}
