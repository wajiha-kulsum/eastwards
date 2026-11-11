import Link from "next/link";
import { Fragment } from "react";

/* Renders copy with inline [label](href) links, the one markup the legal
   texts use. Site paths go through next/link; mailto and external links
   stay plain anchors. */
const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

export const RICH_LINK_CLASS =
  "rounded-sm font-medium text-link underline decoration-1 underline-offset-[3px] transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export function RichText({ text, linkClassName = RICH_LINK_CLASS }: { text: string; linkClassName?: string }) {
  const parts: React.ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(LINK)) {
    const [whole, label, href] = match;
    const start = match.index ?? 0;
    if (start > last) parts.push(text.slice(last, start));
    parts.push(
      href.startsWith("/") ? (
        <Link key={start} href={href} className={linkClassName}>
          {label}
        </Link>
      ) : (
        <a key={start} href={href} className={linkClassName}>
          {label}
        </a>
      )
    );
    last = start + whole.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <Fragment>{parts}</Fragment>;
}
