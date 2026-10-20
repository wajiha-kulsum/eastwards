import type { ReactNode, Ref } from "react";

/* Layer-1 dot field shared by the sub-page heroes: a radial-gradient dot
   matrix on a 10px pitch (5px dot + 5px gap). It is positioned by the
   caller, pass className for the inset/height, or override the pitch and
   tint with your own backgroundImage/backgroundSize. fieldRef exposes the
   layer so elements (the logo triangle) can snap onto its grid, and
   children paint inside this same layer instead of stacking on top of it. */
export default function DotField({
  className = "",
  children,
  fieldRef,
}: {
  className?: string;
  children?: ReactNode;
  fieldRef?: Ref<HTMLDivElement>;
}) {
  return (
    <div
      ref={fieldRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 ${className}`}
      style={{
        backgroundImage:
          "radial-gradient(circle, #d9dce3 1.6px, transparent 1.9px)",
        backgroundSize: "10px 10px",
      }}
    >
      {children}
    </div>
  );
}
