import type { AnchorHTMLAttributes, ReactNode } from "react";

type PrimaryButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children?: ReactNode;
  href?: string;
};

/**
 * Solid brand-blue pill, #2970ff, fully rounded, semibold.
 * Size-agnostic: callers set height/width/text-size via className.
 * Hover: brightness bump only (subtle, no movement).
 */
export default function PrimaryButton({
  children,
  className = "",
  href = "#",
  ...props
}: PrimaryButtonProps) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center justify-center rounded-full bg-primary font-semibold text-white transition-[filter] duration-200 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:brightness-95 ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
