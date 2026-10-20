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
      className={`text-small font-medium text-primary ${className}`}
    >
      / {children} /
    </p>
  );
}
