/* Structured data for crawlers. The `<` scrub is the XSS guard the Next
   JSON-LD guide calls for; it keeps the payload valid JSON. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
