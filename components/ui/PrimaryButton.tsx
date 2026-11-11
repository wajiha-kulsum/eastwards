import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type PrimaryButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children?: ReactNode;
  href?: string;
};

/**
 * Solid brand-blue pill, #2970ff, fully rounded, semibold.
 * Size-agnostic: callers set height/width/text-size via className.
 * Hover: brightness bump only (subtle, no movement).
 * Internal paths go through next/link, so they navigate without a reload.
 */
export default function PrimaryButton({
  children,
  className = "",
  href = "#",
  ...props
}: PrimaryButtonProps) {
  const classes = `group inline-flex items-center justify-center rounded-full bg-primary font-semibold text-white transition-[filter] duration-200 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page active:brightness-95 ${className}`;

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={classes} {...props}>
      {children}
    </a>
  );
}
