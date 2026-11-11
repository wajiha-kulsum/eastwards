"use client";

import { useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

// mailto often opens the wrong app for webmail users, so every address
// can be copied too. `tone` matches the surface: "dark" on the black bands,
// "light" on page-coloured sections.
const TONES = {
  dark: {
    button: "text-white/70 hover:bg-white/10 hover:text-white",
    tip: "bg-page text-ink",
  },
  light: {
    button: "border border-line-strong bg-card text-body hover:border-ink hover:text-ink",
    tip: "bg-ink text-page",
  },
} as const;

export function CopyEmail({
  email,
  label,
  done,
  tone = "dark",
}: {
  email: string;
  label: string;
  done: string;
  tone?: keyof typeof TONES;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      return; // clipboard blocked, the address link still works
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  }

  return (
    <span className="relative inline-flex items-center">
      <button
        type="button"
        onClick={copy}
        aria-label={`${label} ${email}`}
        className={`grid h-11 w-11 place-items-center rounded-full transition-[background-color,border-color,color] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${TONES[tone].button}`}
      >
        {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
      </button>
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute bottom-full left-1/2 mb-1 -translate-x-1/2 whitespace-nowrap rounded-md px-2 py-0.5 text-small font-medium transition-opacity duration-200 ${TONES[tone].tip} ${copied ? "opacity-100" : "opacity-0"}`}
      >
        {done}
      </span>
      <span aria-live="polite" className="sr-only">
        {copied ? `${done} ${email}` : ""}
      </span>
    </span>
  );
}
