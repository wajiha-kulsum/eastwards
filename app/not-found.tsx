import Link from "next/link";

export default function NotFound() {
  return (
    <main
      id="main"
      className="grid min-h-[calc(100svh-60px)] place-items-center bg-page text-ink sm:min-h-[calc(100svh-68px)] lg:min-h-[calc(100svh-72px)]"
    >
      <div className="flex flex-col items-center gap-6 px-6 text-center">
        <svg
          viewBox="0 0 32 32"
          className="h-10 w-10"
          aria-hidden="true"
          fill="none"
        >
          <path d="M8 3L29 16L8 29V3Z" fill="#2868FF" />
        </svg>
        <p className="text-small font-semibold tracking-[-0.04em] text-primary">
          / 404 /
        </p>
        <h1 className="font-display text-title font-bold tracking-[-0.02em] text-ink">
          This page does not exist.
        </h1>
        <p className="text-small text-body">
          The link you followed is old or mistyped - the rest of the site is
          still where you left it.
        </p>
        <Link
          href="/"
          className="inline-flex h-11 items-center rounded-full bg-primary px-7 text-small font-semibold text-white transition hover:brightness-110"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
