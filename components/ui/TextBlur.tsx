import type { ReactNode, Ref } from "react";

/* Frosted backing that hugs its text: whatever sits behind the words (the
   dot field on hero bands) is hidden only inside the text's own box.
   box-decoration-break: clone keeps the frost on each wrapped line fragment,
   so a multi-line lede gets one chip per line and never a full row.
   spanRef hands the chip's line fragments back to the caller for layout. */
export default function TextBlur({
  children,
  spanRef,
}: {
  children: ReactNode;
  spanRef?: Ref<HTMLSpanElement>;
}) {
  return (
    <span
      ref={spanRef}
      className="rounded-md bg-white/95 px-2 backdrop-blur-md [-webkit-box-decoration-break:clone] [box-decoration-break:clone]"
    >
      {children}
    </span>
  );
}
