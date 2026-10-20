import type { ReactNode } from "react";

/* Frosted backing that hugs its text: whatever sits behind the words (the
   dot field on hero bands) is hidden only inside the text's own box.
   box-decoration-break: clone keeps the frost on each wrapped line fragment,
   so a multi-line lede gets one chip per line and never a full row. */
export default function TextBlur({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-md bg-white/95 px-2 backdrop-blur-md [-webkit-box-decoration-break:clone] [box-decoration-break:clone]">
      {children}
    </span>
  );
}
