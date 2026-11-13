import type { ReactNode } from "react";

/* Shared page frame: the <main> bg plus the 1720 lane every content page
   starts with. pb differs per page; children render inside the lane.
   `wide` is the contact page's lane: content starts 48px from the edge, in
   line with the header's logo, and runs up to 2000px. */
export default function PageShell({
  children,
  pb = "pb-20",
  wide = false,
}: {
  children: ReactNode;
  pb?: string;
  wide?: boolean;
}) {
  return (
    <main id="main" className="flex-1 bg-page text-ink transition-colors duration-300">
      <div
        className={`mx-auto pt-3 ${wide ? "max-w-[2000px] px-6 sm:px-12" : "max-w-[1720px] px-6 sm:px-10 lg:px-[5.35%]"} ${pb}`}
      >
        {children}
      </div>
    </main>
  );
}
