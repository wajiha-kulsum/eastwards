/* One lane for the whole site, header to footer: content starts 24px from
   the edge on phones and 48px from 640 (in line with the header's logo),
   and runs up to 2000px. The client asked for little side margin and wide
   text everywhere, so every page uses this one lane. */
export const LANE = "mx-auto max-w-[2000px] px-6 sm:px-12";

// Home page sections keep their original lane (1720px cap, 5.35% sides): the
// client asked for the landing page to keep its original look
export const SECTION_LANE = "mx-auto mt-14 max-w-[1720px] px-6 sm:px-10 md:mt-16 lg:px-[5.35%]";
