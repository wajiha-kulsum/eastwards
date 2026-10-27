import type { Metadata } from "next";
import { contact } from "@/lib/content";

/* The one place search-engine metadata is assembled.
   Next REPLACES a page's whole `openGraph` object when that page defines one
   (it does not merge with the layout's), so every page repeats the shared
   fields through pageMetadata instead of relying on inheritance. */

export const SITE_URL = "https://eastwards.co";
export const SITE_NAME = "Eastwards Consulting";
export const SITE_TITLE =
  "Eastwards Consulting | Technology that moves business forward";
export const SITE_DESCRIPTION =
  "We help businesses navigate complexity and move forward with the right technology, engineering, and expertise.";

export function pageMetadata({
  title,
  description,
  path,
}: {
  /* Omitted on the homepage: it keeps the layout's full site title. */
  title?: string;
  description: string;
  path: string;
}): Metadata {
  const ogTitle = title ?? SITE_TITLE;
  return {
    title: title ?? { absolute: SITE_TITLE },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_SG",
      url: path,
      title: ogTitle,
      description,
      /* Declared, not inherited: a page-level `openGraph` replaces the whole
         object, which is what drops the file convention's own og:image tags.
         This points at app/opengraph-image.tsx. */
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: ["/opengraph-image"],
    },
  };
}

/* Facts mirror lib/content.ts (contact block) — nothing here is invented. */
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  legalName: contact.location.company,
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.svg`,
  email: contact.directChannels.channels[0].email,
  telephone: contact.call.phones,
  address: {
    "@type": "PostalAddress",
    streetAddress: contact.location.building,
    addressLocality: "Singapore",
    addressCountry: "SG",
  },
};
