/* One lane for the whole site, header to footer: content starts 24px from
   the edge on phones and 48px from 640 (in line with the header's logo),
   and runs up to 2000px. The client asked for little side margin and wide
   text everywhere, so every page uses this one lane. */
export const LANE = "mx-auto max-w-[2000px] px-6 sm:px-12";

// A home page section on the lane, with the shared top rhythm
export const SECTION_LANE = `${LANE} mt-14 md:mt-16`;
