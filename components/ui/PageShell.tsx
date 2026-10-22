import type { ReactNode } from "react";

/* Shared page frame: the <main> bg plus the 1720 lane every content page
   starts with. pb differs per page; children render inside the lane. */
export default function PageShell({
  children,
  pb = "pb-20",
}: {
  children: ReactNode;
  pb?: string;
}) {
  return (
    <main id="main" className="flex-1 bg-page text-ink transition-colors duration-300">
      <div
        className={`mx-auto max-w-[1720px] px-6 pt-3 sm:px-10 lg:px-[5.35%] ${pb}`}
      >
        {children}
      </div>
    </main>
  );
}
