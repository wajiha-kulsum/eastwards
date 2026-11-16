import type { ReactNode } from "react";
import { LANE } from "@/components/ui/lane";

/* Shared page frame: the <main> bg plus the site lane every content page
   starts with. pb differs per page; children render inside the lane. */
export default function PageShell({ children, pb = "pb-20" }: { children: ReactNode; pb?: string }) {
  return (
    <main id="main" className="flex-1 bg-page text-ink transition-colors duration-300">
      <div className={`${LANE} pt-3 ${pb}`}>{children}</div>
    </main>
  );
}
