import { footer } from "@/lib/content";

/* Footer shares the site's one lane system with every section: the same
   1720px container and 5.35% side lanes. The gradient wordmark is the last
   element on the page - the scroll ends exactly where it ends.
   w-full: a flex item with mx-auto shrink-to-fits; without it the footer
   hugs the unbreakable wordmark instead of filling the page. */

export function Footer() {
  return (
    <footer className="relative mx-auto mt-16 w-full max-w-[1720px] px-6 pt-4 sm:px-10 lg:px-[5.35%]">
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 sm:gap-x-10 md:grid-cols-5 md:gap-x-8">
        {footer.columns.map((column) => (
          <nav
            key={column.title}
            aria-label={column.title}
            className="text-small"
          >
            <p className="text-body">{column.title}</p>
            <ul className="mt-3 space-y-2.5 font-display font-semibold text-ink md:mt-4 md:space-y-3">
              {column.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="link-underline-sweep transition-colors hover:text-primary"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="mt-16 flex flex-col gap-3 text-small text-subtle sm:flex-row sm:items-center sm:justify-between sm:mt-20">
        <p className="text-small">
          {footer.copyright}
        </p>
        <div className="flex gap-6 font-display text-small font-medium text-body md:gap-[50px]">
          {footer.legal.map((item) => (
            <a
              key={item}
              href="#"
              className="link-underline-sweep transition-colors hover:text-ink"
            >
              {item}
            </a>
          ))}
        </div>
      </div>

      {/* Giant gradient wordmark reflecting into the page edge. Sized to the
          drawing: "Eastwards" ~= 4.93x the font size, so 17.3vw ~= 86% width
          (paper: 1480/1728) and it never crops at the viewport edges.
          text-box trims the line box to the alphabetic baseline - "Eastwards"
          has no descenders, so the page ends exactly at the glyph bottoms
          instead of at the font's hidden descent space. */}
      <p
        aria-hidden="true"
        className="mt-16 select-none bg-gradient-to-b from-body to-white bg-clip-text text-center font-display text-[clamp(4rem,17.3vw,18.75rem)] font-bold leading-[0.85] [text-box:trim-end_cap_alphabetic] tracking-tight text-transparent sm:mt-24 dark:to-[#0f0f0f]"
      >
        {footer.wordmark}
      </p>
    </footer>
  );
}
