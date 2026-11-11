import { contact, servicePages, type ServicePageContent } from "@/lib/content";

/* The services index reads as three buying paths, not an alphabetical
   directory: build something, run it, secure it. Grouping lives here so the
   home band and the services page can never drift apart. */
export type ServiceGroup = {
  id: string;
  label: string;
  summary: string;
  services: readonly ServicePageContent[];
};

const bySlug = new Map(servicePages.map((service) => [service.slug, service]));

const pick = (slugs: readonly string[]) =>
  slugs.flatMap((slug) => {
    const service = bySlug.get(slug);
    return service ? [service] : [];
  });

export const serviceGroups: readonly ServiceGroup[] = [
  {
    id: "build-and-modernize",
    label: "Build and modernize",
    summary:
      "Modernize applications, platforms and delivery models around your business goals.",
    services: pick([
      "application-services",
      "projects-professional-services",
      "quantum-computing",
    ]),
  },
  {
    id: "operate-and-support",
    label: "Operate and support",
    summary:
      "Keep workforces productive with device management, service desk and specialist talent.",
    services: pick([
      "digital-support-services",
      "modern-device-management",
      "it-staffing-services",
    ]),
  },
  {
    id: "secure-and-govern",
    label: "Secure and govern",
    summary:
      "Protect applications, infrastructure and AI with security built into every layer.",
    services: pick([
      "threat-monitoring-incident-response",
      "infrastructure-security",
      "identity-and-access-management",
      "governance-risk-and-compliance",
      "cloud-security",
      "application-security",
      "ai-security",
    ]),
  },
];

/* The header menu and the footer list the same groups as links, plus the two
   service lines that have no page yet: those open the contact form with that
   requirement chosen and are tagged "Enquire". Swap in the pages when they
   exist. */
export type ServiceLink = { label: string; href: string; enquire?: boolean };

const enquiry = (requirement: (typeof contact.form.requirements)[number]): ServiceLink => ({
  label: requirement,
  href: `/contact?requirement=${encodeURIComponent(requirement)}`,
  enquire: true,
});

const enquiries: Record<string, readonly ServiceLink[]> = {
  "build-and-modernize": [enquiry("Data & AI")],
  "operate-and-support": [enquiry("Infrastructure & Cloud")],
};

export const serviceLinks = serviceGroups.map((group) => ({
  id: group.id,
  label: group.label,
  links: [
    ...group.services.map((service): ServiceLink => ({
      label: service.title,
      href: `/services/${service.slug}`,
    })),
    ...(enquiries[group.id] ?? []),
  ],
}));
