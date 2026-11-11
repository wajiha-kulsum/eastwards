"use client";

import { useState, useSyncExternalStore } from "react";
import { ChevronDown, Cookie, X } from "lucide-react";
import { Dialog, Switch } from "radix-ui";
import { RichText } from "@/components/legal/RichText";
import {
  getConsent,
  getServerConsent,
  saveConsent,
  subscribeConsent,
  type ConsentCategory,
} from "@/lib/consent";
import { consent as copy } from "@/lib/legal";

/* First-visit privacy notice with the cookie choices, then the preferences
   dialog that "Manage Preferences" opens.
   Reject All sits beside Accept All at the same size and weight: declining
   must be as easy as accepting. The banner never takes focus or blocks the
   page; it waits in the corner until the visitor chooses. */

type Choice = Record<ConsentCategory, boolean>;
const NONE: Choice = { analytics: false, preferences: false, marketing: false };
const ALL: Choice = { analytics: true, preferences: true, marketing: true };

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const SOLID = `inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-5 text-small font-semibold text-white transition-[filter] hover:brightness-110 ${FOCUS}`;
const OUTLINE = `inline-flex min-h-11 items-center justify-center rounded-full border border-line-strong bg-card px-5 text-small font-semibold text-ink transition-colors hover:border-ink ${FOCUS}`;

function Preferences({
  open,
  onOpenChange,
  initial,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initial: Choice;
}) {
  const [choice, setChoice] = useState<Choice>(initial);

  const finish = (value: Choice) => {
    saveConsent(value);
    onOpenChange(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[70] bg-black/40 data-[state=open]:animate-in data-[state=open]:fade-in-0 motion-reduce:animate-none" />
        {/* The whole dialog scrolls (short screens included) and the
            actions stay pinned to its bottom edge */}
        <Dialog.Content className="fixed left-1/2 top-1/2 z-[71] max-h-[min(90svh,780px)] w-[calc(100%-2rem)] max-w-[560px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto overscroll-contain rounded-3xl border border-line bg-card text-ink shadow-2xl data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 motion-reduce:animate-none">
          <div className="flex items-start justify-between gap-4 border-b border-line px-6 py-5">
            <div>
              <Dialog.Title className="text-lead font-medium tracking-[-0.02em]">{copy.preferences.title}</Dialog.Title>
              <Dialog.Description className="mt-2 text-small leading-[1.6] text-body">
                {copy.preferences.body}
              </Dialog.Description>
            </div>
            <Dialog.Close
              aria-label="Close"
              className={`-mr-2 grid h-11 w-11 shrink-0 place-items-center rounded-full text-body transition-colors hover:bg-surface hover:text-ink ${FOCUS}`}
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </Dialog.Close>
          </div>

          <ul className="divide-y divide-line px-6">
            {copy.categories.map((category) => {
              const id = `consent-${category.id}`;
              const checked = category.required || choice[category.id as ConsentCategory];
              return (
                <li key={category.id} className="flex items-start justify-between gap-6 py-5">
                  <div>
                    <label htmlFor={id} className="text-small font-semibold text-ink">
                      {category.title}
                    </label>
                    <p id={`${id}-text`} className="mt-1 text-small leading-[1.6] text-body">
                      {category.text}
                    </p>
                    <p className="mt-1 text-small text-body">Retention: {category.retention}</p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1 pt-0.5">
                    <Switch.Root
                      id={id}
                      checked={checked}
                      disabled={category.required}
                      aria-describedby={`${id}-text`}
                      onCheckedChange={(value) =>
                        setChoice((current) => ({ ...current, [category.id]: value }))
                      }
                      className={`relative h-7 w-12 rounded-full bg-line-strong transition-colors data-[state=checked]:bg-primary disabled:cursor-not-allowed disabled:opacity-70 ${FOCUS}`}
                    >
                      <Switch.Thumb className="block h-6 w-6 translate-x-0.5 rounded-full bg-white shadow transition-transform duration-200 data-[state=checked]:translate-x-[22px] motion-reduce:transition-none" />
                    </Switch.Root>
                    {category.required ? <span className="text-small text-body">{copy.preferences.alwaysOn}</span> : null}
                  </div>
                </li>
              );
            })}
          </ul>

          <p className="px-6 pb-5 text-small text-body">
            <RichText text={copy.preferences.policyLink} />
          </p>

          {/* pinned while the categories scroll, except on very short
              screens (landscape phones) where it would cover them */}
          <div className="sticky bottom-0 grid grid-cols-2 gap-3 border-t border-line bg-card px-6 py-4 sm:grid-cols-3 [@media(max-height:520px)]:static">
            <button type="button" className={OUTLINE} onClick={() => finish(NONE)}>
              {copy.actions.reject}
            </button>
            <button type="button" className={`${OUTLINE} order-last col-span-2 sm:order-none sm:col-span-1`} onClick={() => finish(choice)}>
              {copy.actions.save}
            </button>
            <button type="button" className={SOLID} onClick={() => finish(ALL)}>
              {copy.actions.accept}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function ConsentBanner() {
  // undefined: not read yet (server render), null: no choice made
  const current = useSyncExternalStore(subscribeConsent, getConsent, getServerConsent);
  const [prefsOpen, setPrefsOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const initial: Choice = current
    ? { analytics: current.analytics, preferences: current.preferences, marketing: current.marketing }
    : NONE;

  return (
    <>
      {current === null && !prefsOpen ? (
        <section
          aria-labelledby="consent-title"
          className="fixed inset-x-3 bottom-3 z-[55] max-h-[calc(100svh-1.5rem)] overflow-y-auto overscroll-contain rounded-3xl border border-line bg-card p-5 text-ink shadow-[0_24px_60px_-20px_rgb(0_0_0/0.35)] animate-in fade-in-0 slide-in-from-bottom-4 duration-300 motion-reduce:animate-none sm:inset-x-auto sm:bottom-6 sm:left-6 sm:w-[min(480px,calc(100vw-3rem))] sm:p-6 print:hidden"
        >
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10 text-link">
              <Cookie className="h-5 w-5" aria-hidden="true" />
            </span>
            <h2 id="consent-title" className="text-small font-semibold">
              {copy.title}
            </h2>
          </div>

          {/* phones show three lines until the visitor expands the notice */}
          <p className={`mt-3 text-small leading-[1.6] text-body ${expanded ? "" : "max-sm:line-clamp-3"}`}>{copy.intro}</p>

          <dl id="consent-points" hidden={!expanded} className="mt-3 space-y-2 text-small leading-[1.6]">
            {copy.points.map((point) => (
              <div key={point.term}>
                <dt className="inline font-semibold text-ink">{point.term}: </dt>
                <dd className="inline text-body">{point.text}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-2 flex flex-wrap items-center gap-x-4 text-small">
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls="consent-points"
              onClick={() => setExpanded((open) => !open)}
              className={`inline-flex min-h-11 items-center gap-1.5 rounded-sm font-medium text-link ${FOCUS}`}
            >
              {expanded ? copy.less : copy.more}
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 motion-reduce:transition-none ${expanded ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>
            <span className="text-body">
              <RichText text={copy.fullDetails} />
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <button type="button" className={OUTLINE} onClick={() => saveConsent(NONE)}>
              {copy.actions.reject}
            </button>
            <button type="button" className={SOLID} onClick={() => saveConsent(ALL)}>
              {copy.actions.accept}
            </button>
            <button
              type="button"
              onClick={() => setPrefsOpen(true)}
              className={`col-span-2 inline-flex min-h-11 items-center justify-center rounded-full text-small font-semibold text-ink underline-offset-4 hover:underline ${FOCUS}`}
            >
              {copy.actions.manage}
            </button>
          </div>
        </section>
      ) : null}

      {/* Keyed so each opening starts from the saved choice */}
      {prefsOpen ? (
        <Preferences key={JSON.stringify(initial)} open={prefsOpen} onOpenChange={setPrefsOpen} initial={initial} />
      ) : null}
    </>
  );
}
