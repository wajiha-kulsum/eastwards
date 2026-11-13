import { createCn } from "cn/config";

/* Class merging that knows the site's own text sizes (app/globals.css
   @theme). Without this, `text-lead` reads as a colour and a later
   `text-ink` silently drops it. */
export const cn = createCn({
  extend: { classGroups: { "font-size": [{ text: ["display", "title", "lead", "small"] }] } },
});
