import { footer } from "@/lib/content";

/* Paper design (footer): columns form a centered ~80.5% block, wordmark
   centered below, and a full-width white breathing strip closes the page. */

export function Footer() {
  /* w-full: as a flex item with mx-auto, the footer would otherwise
     shrink-to-fit its own min-content — and the unbreakable wordmark
     would inflate the page wider than the screen. */
  return (
    <footer className="mx-auto mt-16 w-full max-w-[1440px] overflow-hidden px-4 md:mt-20 md:px-[17px]">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-5 md:px-[73px]">
        {footer.columns.map((column) => (
          <nav
            key={column.title}
            aria-label={column.title}
            className="text-[13px] leading-[17px]"
          >
            <p className="text-faint">{column.title}</p>
            <ul className="mt-0.5 font-semibold text-ink">
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

      <div className="mt-12 flex flex-col gap-3 text-[12px] text-subtle md:flex-row md:items-center md:justify-between md:px-[73px]">
        <p className="text-[10px]">{footer.copyright}</p>
        <div className="flex gap-8 text-[12px] font-medium text-neutral-600">
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

      {/* Giant gradient wordmark reflecting into the page edge */}
      <p
        aria-hidden="true"
        className="mt-12 select-none bg-gradient-to-b from-body to-white bg-clip-text text-center font-display text-[clamp(4rem,21vw,19rem)] font-bold leading-[0.85] tracking-tight text-transparent"
      >
        {footer.wordmark}
      </p>
    </footer>
  );
}
