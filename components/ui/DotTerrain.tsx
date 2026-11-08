/* The "no ceiling" close: a mountain range drawn in the site's 10px dot
   lattice (the DotField recipe), its base running past the page edge so the
   page never shows a floor. The reference's engraved panorama translated
   into the project's one visual system; pure CSS, dots stay 10px on every
   screen. Decorative. */
const DOTS =
  "bg-[radial-gradient(circle,currentColor_1.6px,transparent_1.9px)] [background-size:10px_10px]";

export default function DotTerrain({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none relative h-[260px] w-full overflow-hidden [mask-image:linear-gradient(to_bottom,#000_78%,transparent_100%)] sm:h-[340px] lg:h-[420px] ${className}`}
    >
      {/* Far ridge, higher and softer. */}
      <div
        className={`absolute inset-0 text-ink/20 ${DOTS}`}
        style={{
          clipPath:
            "polygon(0 70.8%, 3.5% 61.7%, 6.8% 66.3%, 9.6% 51.3%, 12.3% 60.8%, 15.5% 54.6%, 18.6% 41.3%, 21.9% 55%, 24.5% 49.2%, 27.3% 59.6%, 30.4% 45.8%, 33.7% 56.7%, 36.5% 40.4%, 40.1% 54.6%, 43.1% 47.9%, 46.4% 59.2%, 49.4% 50%, 52.8% 37.1%, 56.1% 52.5%, 59% 47.1%, 62.3% 57.9%, 65.4% 50%, 68.4% 60.8%, 71.6% 51.7%, 74.8% 62.9%, 77.9% 53.3%, 81.1% 63.8%, 84.4% 55%, 87.6% 64.2%, 90.7% 56.7%, 94.1% 65.4%, 97.3% 58.8%, 100% 64.6%, 100% 100%, 0 100%)",
        }}
      />

      {/* Near ridge, lower and firmer. */}
      <div
        className={`absolute inset-0 text-ink/40 ${DOTS}`}
        style={{
          clipPath:
            "polygon(0 84.6%, 3.2% 77.9%, 6.5% 82.9%, 9.5% 74.2%, 12.7% 81.3%, 15.7% 72.5%, 19.1% 80%, 22.2% 71.3%, 25.5% 79.2%, 28.7% 70.8%, 31.9% 78.8%, 35.1% 72.1%, 38.4% 80.8%, 41.6% 73.8%, 44.9% 82.1%, 48% 74.6%, 51.4% 82.5%, 54.6% 75%, 57.9% 83.3%, 61.1% 76.7%, 64.5% 83.8%, 67.7% 77.1%, 71.1% 84.2%, 74.3% 77.9%, 77.7% 85%, 80.9% 78.3%, 84.3% 85.4%, 87.5% 79.6%, 90.9% 85.8%, 94.1% 80.4%, 97.5% 86.3%, 100% 82.5%, 100% 100%, 0 100%)",
        }}
      />

      {/* One blue-lit summit, echoing the logo triangle. Sits on the same
          lattice: the blue dots turn existing grey dots blue. */}
      <div
        className={`absolute inset-0 text-primary ${DOTS}`}
        style={{ clipPath: "polygon(27% 79%, 28.7% 68.5%, 30.4% 79%)" }}
      />
    </div>
  );
}
