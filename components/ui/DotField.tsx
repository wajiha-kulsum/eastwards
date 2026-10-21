import type { CSSProperties, ReactNode, Ref } from "react";

/* Layer-1 dot field shared by the sub-page heroes: a radial-gradient dot
   matrix on a 10px pitch (5px dot + 5px gap). The paint lives in the
   .dot-field rule in globals.css so dark mode can retint the lattice; the
   style prop still exists for callers that need a custom pitch or tint.
   fieldRef exposes the layer so elements (the logo triangle) can snap onto
   its grid, and children paint inside this same layer instead of stacking
   on top of it. */
export default function DotField({
  className = "",
  children,
  fieldRef,
  style,
}: {
  className?: string;
  children?: ReactNode;
  fieldRef?: Ref<HTMLDivElement>;
  style?: CSSProperties;
}) {
  return (
    <div
      ref={fieldRef}
      aria-hidden="true"
      className={`dot-field pointer-events-none absolute inset-x-0 ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
