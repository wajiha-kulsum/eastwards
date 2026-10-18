import { footer } from "@/lib/content";

/* Footer shares the site's one lane system with every section: the same
   1720px container and 5.35% side lanes. The gradient wordmark is the last
   element on the page - the scroll ends exactly where it ends.
   w-full: a flex item with mx-auto shrink-to-fits; without it the footer
   hugs the unbreakable wordmark instead of filling the page. */

export function Footer() {
  return (
    <footer className="relative mx-auto mt-16 w-full max-w-[1720px] px-6 pt-2 sm:px-10 lg:px-[5.35%]">
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-5">
        {footer.columns.map((column) => (
          <nav
            key={column.title}
            aria-label={column.title}
            className="text-[13px] leading-[17px] md:text-[18px] md:leading-[21px]"
          >
            <p className="text-body">{column.title}</p>
            <ul className="mt-0.5 font-display font-semibold text-ink">
              {column.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="transition-colors hover:text-primary"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="mt-12 flex flex-col gap-3 text-[12px] text-subtle sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[11px] leading-[18px] sm:text-[15px]">
          {footer.copyright}
        </p>
        <div className="flex gap-6 font-display text-[13px] font-medium text-body md:gap-[50px] md:text-[18px] md:leading-[24px]">
          {footer.legal.map((item) => (
            <a
              key={item}
              href="#"
              className="transition-colors hover:text-ink"
            >
              {item}
            </a>
          ))}
        </div>
      </div>

      {/* Giant gradient wordmark reflecting into the page edge. Sized to the
          drawing: "Eastwards" ~= 4.93x the font size, so 17.3vw ~= 86% width
          (paper: 1480/1728) and it never crops at the viewport edges. */}
      <p
        aria-hidden="true"
        className="mt-12 select-none bg-gradient-to-b from-body to-white bg-clip-text text-center font-display text-[clamp(4rem,17.3vw,18.75rem)] font-bold leading-[0.85] tracking-tight text-transparent"
      >
        {footer.wordmark}
      </p>
    </footer>
  );
}
