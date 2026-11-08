/* Dashed drafting grid behind a band: full-bleed vertical hairlines on a
   four-column rhythm, plus an optional rule along the top edge. The
   reference's blueprint sheet, drawn with the site's line tokens. Purely
   decorative; content sits on z-10 above it. */
export default function BlueprintGrid({
  rule = false,
  className = "",
}: {
  rule?: boolean;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 ${
        rule ? "border-t border-dashed border-line-strong" : ""
      } ${className}`}
    >
      {/* Hidden below sm: three dashed lines on a 360px screen read as noise. */}
      <div className="mx-auto hidden h-full max-w-[1920px] grid-cols-4 sm:grid">
        <div />
        <div className="border-l border-dashed border-line-strong" />
        <div className="border-l border-dashed border-line-strong" />
        <div className="border-l border-dashed border-line-strong" />
      </div>
    </div>
  );
}
