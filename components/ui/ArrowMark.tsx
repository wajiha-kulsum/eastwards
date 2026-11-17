/* The Eastwards logo's arrow drawn as an outline (the client's card sketch):
   inside a `group`, it fills with blue and nudges forward on hover. Used on
   About, Careers and CSR cards in place of generic icons. */
export function ArrowMark({ className }: { className?: string }) {
  return (
    <svg viewBox="-2 -2 31 36" aria-hidden="true" className={className}>
      <path
        d="M27 15.5885L0 31.1769L0 0L27 15.5885Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
        className="fill-transparent transition-[fill] duration-300 ease-out group-hover:fill-current"
      />
    </svg>
  );
}
