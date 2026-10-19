/* "/ Label /", brand-blue section eyebrow, quiet size */
export function SectionLabel({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return (
    <p
      className={`text-[13px] font-medium text-primary sm:text-[14px] ${className}`}
    >
      / {children} /
    </p>
  );
}
