/* Layer-1 dot field shared by the sub-page heroes: a radial-gradient dot
   matrix on a 10px pitch (5px dot + 5px gap). It is positioned by the
   caller, pass className for the inset/height, or override the pitch and
   tint with your own backgroundImage/backgroundSize. */
export default function DotField({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 ${className}`}
      style={{
        backgroundImage:
          "radial-gradient(circle, #d9dce3 1.6px, transparent 1.9px)",
        backgroundSize: "10px 10px",
      }}
    />
  );
}
