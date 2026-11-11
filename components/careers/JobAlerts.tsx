"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { careers, CAREERS_EMAIL } from "@/lib/careers";
import { isEmail } from "@/lib/validation";

/* "Right role, right time": one email field and a button. The live region
   is on the page from the start (a region created with its message is often
   not announced), and on success focus moves to the confirmation, since the
   button that had focus is gone. */

const copy = careers.alerts;
const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export function JobAlerts() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "failed">("idle");
  const [error, setError] = useState("");
  const doneRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (state === "done") doneRef.current?.focus();
  }, [state]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    if (!isEmail(email)) {
      setError(copy.invalid);
      return;
    }
    setError("");
    setState("sending");
    try {
      const response = await fetch("/api/careers/alerts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website: data.get("website") ?? "" }),
      });
      if (response.ok) setState("done");
      else if (response.status === 400) {
        setError(copy.invalid);
        setState("idle");
      } else setState("failed");
    } catch {
      setState("failed");
    }
  }

  return (
    <div aria-live="polite">
      {state === "done" ? (
        <p
          ref={doneRef}
          tabIndex={-1}
          className="mt-6 inline-flex items-center gap-2.5 rounded-sm text-small font-medium text-ink focus:outline-none"
        >
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary text-white">
            <Check className="h-4 w-4" aria-hidden="true" />
          </span>
          {copy.done}
        </p>
      ) : (
        <form noValidate onSubmit={submit} className="mt-6 max-w-[480px]">
          <div className="flex flex-col gap-3 sm:flex-row">
            <label htmlFor="alerts-email" className="sr-only">
              {copy.label}
            </label>
            <input
              id="alerts-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder={copy.label}
              maxLength={254}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? "alerts-error" : undefined}
              onChange={() => setError("")}
              className="h-12 min-w-0 flex-1 rounded-lg border border-line-strong bg-card px-3.5 text-small text-ink outline-none transition-colors placeholder:text-placeholder focus:border-primary focus:ring-2 focus:ring-primary/20 aria-invalid:border-destructive"
            />
            <button
              type="submit"
              aria-disabled={state === "sending" || undefined}
              className={`inline-flex h-12 shrink-0 items-center justify-center rounded-lg bg-ink px-5 text-small font-semibold text-page transition-opacity hover:opacity-90 aria-disabled:cursor-progress ${FOCUS}`}
            >
              {state === "sending" ? copy.sending : copy.submit}
            </button>
          </div>
          {/* honeypot */}
          <div aria-hidden="true" className="sr-only">
            <label htmlFor="alerts-website">Website</label>
            <input id="alerts-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>
          {error ? (
            <p id="alerts-error" className="mt-2 text-small text-destructive">
              {error}
            </p>
          ) : null}
          {state === "failed" ? (
            <p className="mt-2 text-small text-destructive">
              {copy.failed}{" "}
              <a href={`mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent("Job alerts")}`} className="underline underline-offset-2">
                {CAREERS_EMAIL}
              </a>
              .
            </p>
          ) : null}
        </form>
      )}
    </div>
  );
}
