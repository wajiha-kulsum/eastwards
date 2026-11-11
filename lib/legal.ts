import { contact } from "@/lib/content";

/* Legal documents as data: Terms of Use, Privacy Policy, Cookie Policy, plus
   the privacy notice and cookie choices the consent banner shows. The text is
   the client's; rendering lives
   in components/legal. Inline links use [label](/path). Hyphens the pasted
   copy had dropped ("Sessionbased", "ThirdParty", "OptIn") are restored. */

export type LegalListItem = string | { term: string; text: string };

export type LegalBlock =
  | { kind: "p"; text: string; lead?: string }
  | { kind: "list"; items: readonly LegalListItem[]; lead?: string; tone?: "allow" | "deny" }
  | { kind: "table"; caption: string; head: readonly string[]; rows: readonly (readonly string[])[] }
  | { kind: "note"; text: string }
  | { kind: "contact"; items: readonly { label: string; value: string; href?: string }[] };

export type LegalSection = { id: string; title: string; blocks: readonly LegalBlock[] };

/* Icon names map to lucide icons in components/legal/LegalPage.tsx */
export type LegalIcon = "landmark" | "info" | "shield" | "ban" | "user" | "clock" | "sliders" | "toggle";

export type LegalDoc = {
  path: "/terms" | "/privacy" | "/cookies";
  title: string;
  description: string;
  intro: readonly string[];
  numbered: boolean;
  image: { src: string; alt: string; width: number; height: number };
  /* "At a glance": each card restates a section below, nothing new */
  highlights: readonly { icon: LegalIcon; title: string; text: string }[];
  sections: readonly LegalSection[];
};

const { location } = contact;
const ADDRESS = `${location.street}, ${location.unit} ${location.building}, ${location.postalCode}`;
const LEGAL_EMAIL = "legal@eastwards.co";
const DPO_EMAIL = "DPO@eastwards.co";

export const terms: LegalDoc = {
  path: "/terms",
  title: "Terms of Use",
  description:
    "The terms that apply when you use eastwards.co: intellectual property, permitted use, liability and the Singapore law that governs them.",
  intro: [
    "Welcome to Eastwards.co. This website is owned and operated by Eastwards Consulting Pte Ltd. By accessing or using this website, including our blogs and news articles, you agree to comply with and be bound by the following terms and conditions.",
  ],
  numbered: false,
  // Scott Graham on Unsplash, free under the Unsplash License (no credit required):
  // https://unsplash.com/photos/man-writing-on-paper-OQMZwNd3ThU
  image: { src: "/images/legal-terms.jpg", alt: "A person signing a printed document at a desk", width: 1600, height: 1068 },
  highlights: [
    { icon: "landmark", title: "Singapore law", text: "These terms are governed by the laws of Singapore and its courts." },
    { icon: "info", title: "Information, not advice", text: "Site content is general information. Consulting needs a formal service agreement." },
    { icon: "shield", title: "Use it lawfully", text: "No malware, no scraping without permission, nothing that harms the site." },
  ],
  sections: [
    {
      id: "intellectual-property",
      title: "Intellectual Property Rights",
      blocks: [
        {
          kind: "p",
          text: "Unless otherwise stated, Eastwards Consulting Pte Ltd owns the intellectual property rights for all material on this website, including:",
        },
        {
          kind: "list",
          items: [
            "Text, graphics, and logos.",
            "Whitepapers, case studies, blogs, news articles, and service descriptions regarding AI, Quantum Computing, and Cybersecurity.",
            "Website design and layout.",
          ],
        },
        {
          kind: "list",
          lead: "You may:",
          tone: "allow",
          items: ["View and download content for personal, non-commercial caching or printing only."],
        },
        {
          kind: "list",
          lead: "You must not:",
          tone: "deny",
          items: [
            "Repost, sell, rent, or sub-license material from this website without our express written consent.",
            "Use our content in a way that infringes copyright or intellectual property rights.",
          ],
        },
      ],
    },
    {
      id: "permitted-use",
      title: "Permitted Use",
      blocks: [
        { kind: "p", text: "You agree to use this website only for lawful purposes. You are prohibited from:" },
        {
          kind: "list",
          tone: "deny",
          items: [
            "Using the site in any way that causes damage or impairs availability.",
            "Uploading or transmitting spyware, viruses, or malicious software.",
            "Conducting systematic or automated data collection (scraping, mining) without our permission.",
          ],
        },
      ],
    },
    {
      id: "no-professional-advice",
      title: "No Professional Advice",
      blocks: [
        {
          kind: "p",
          text: "The information provided on this website, including blogs, news articles, and service pages, is for general informational purposes only. It does not constitute professional technical, business, or legal advice. For specific consulting needs, you must enter into a formal service agreement with us.",
        },
      ],
    },
    {
      id: "user-generated-content",
      title: "User-Generated Content",
      blocks: [
        {
          kind: "p",
          text: "If you submit inquiries via our [“Contact Us”](/contact) forms or provide comments on our blog:",
        },
        {
          kind: "list",
          items: [
            "You grant us a non-exclusive, royalty-free license to use and process that information to fulfill your request.",
            "You agree that we may moderate, edit, or remove comments at our discretion.",
            "You must not submit content that is defamatory, obscene, or infringes on third-party rights.",
          ],
        },
      ],
    },
    {
      id: "age-limitations",
      title: "Age Limitations",
      blocks: [
        {
          kind: "p",
          text: "Our website and services are intended for business clients and are not directed to children under 16 years of age. We do not knowingly collect personal data from minors.",
        },
      ],
    },
    {
      id: "limitation-of-liability",
      title: "Limitation of Liability",
      blocks: [
        {
          kind: "p",
          text: "Eastwards Consulting Pte Ltd provides this website on an “as-is” basis. While we strive for accuracy, we make no representations or warranties:",
        },
        {
          kind: "list",
          items: [
            "That the website will be constantly available or error-free.",
            "That the information on this website is complete, true, or non-misleading.",
          ],
        },
        { kind: "p", text: "We will not be liable for any loss or damage arising from your use of this website." },
      ],
    },
    {
      id: "indemnity",
      title: "Indemnity",
      blocks: [
        {
          kind: "p",
          text: "You agree to indemnify and hold harmless Eastwards Consulting Pte Ltd, its employees, and affiliates against any claims, damages, liabilities, or expenses arising from your misuse of the website or violation of these Terms of Use.",
        },
      ],
    },
    {
      id: "termination-of-use",
      title: "Termination of Use",
      blocks: [
        {
          kind: "p",
          text: "We reserve the right to suspend or terminate your access to the website at any time, without notice, if you violate these Terms of Use or engage in unlawful activity.",
        },
      ],
    },
    {
      id: "external-links",
      title: "External Links",
      blocks: [
        {
          kind: "p",
          text: "Our website may contain links to third-party websites (e.g., partners, cloud providers). We have no control over the content or privacy practices of these sites and accept no responsibility for them.",
        },
      ],
    },
    {
      id: "variation-and-updates",
      title: "Variation & Updates",
      blocks: [
        {
          kind: "p",
          text: "We may revise these Terms of Use from time to time. The revised terms will apply from the date of publication. Material changes will be notified via a website banner or other appropriate means.",
        },
      ],
    },
    {
      id: "governing-law",
      title: "Governing Law",
      blocks: [
        {
          kind: "p",
          text: "These terms are governed by and construed in accordance with the laws of Singapore. Any disputes relating to these terms shall be subject to the exclusive jurisdiction of the courts of Singapore.",
        },
      ],
    },
    {
      id: "contact-details",
      title: "Contact Details",
      blocks: [
        { kind: "p", text: "If you have any questions about these Terms of Use, please contact us:" },
        {
          kind: "contact",
          items: [
            { label: "Email", value: LEGAL_EMAIL, href: `mailto:${LEGAL_EMAIL}` },
            { label: "Address", value: ADDRESS },
          ],
        },
      ],
    },
  ],
};

export const privacy: LegalDoc = {
  path: "/privacy",
  title: "Privacy Policy",
  description:
    "How Eastwards Consulting collects, uses, shares and protects your personal data under Singapore’s PDPA, and how to exercise your rights.",
  intro: [
    "Welcome to Eastwards Consulting Pte Ltd. We value your privacy and are committed to protecting your personal data. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you interact with our website and services.",
  ],
  numbered: true,
  // Philipp Katzenberger on Unsplash, free under the Unsplash License (no credit required):
  // https://unsplash.com/photos/closeup-photo-of-turned-on-blue-and-white-laptop-computer-iIJrUoeRoCQ
  image: { src: "/images/legal-privacy.jpg", alt: "A laptop keyboard lit in blue in a dark room", width: 1600, height: 1067 },
  highlights: [
    { icon: "ban", title: "We do not sell your data", text: "We share it only on a need-to-know basis, with trusted vendors, or when the law requires." },
    { icon: "user", title: "Your data, your rights", text: "Access, correct, delete or move your data, or withdraw consent at any time." },
    { icon: "clock", title: "Answers within 30 days", text: "We aim to respond to every privacy-related inquiry within 30 days." },
  ],
  sections: [
    {
      id: "information-we-collect",
      title: "Information We Collect",
      blocks: [
        { kind: "p", text: "We collect various types of information to provide and improve our services:" },
        {
          kind: "list",
          items: [
            { term: "Personal Data", text: "Names, email addresses, phone numbers, and billing information." },
            { term: "Technical Data", text: "IP addresses, browser types, device information, and cookie data." },
            { term: "Business Data", text: "Project details, client requirements, and operational workflows." },
            {
              term: "Sensitive Data",
              text: "In specific engagements, we may process financial or regulatory data as required for project execution.",
            },
          ],
        },
      ],
    },
    {
      id: "how-we-collect",
      title: "How We Collect Your Data",
      blocks: [
        {
          kind: "list",
          items: [
            {
              term: "Direct Interaction",
              text: "Information you provide by filling out forms, signing contracts, or communicating with us via email.",
            },
            {
              term: "Automated Technologies",
              text: "As you navigate our site, we may automatically collect technical data via cookies and website analytics.",
            },
            {
              term: "Third-Party Sources",
              text: "Information received from business partners, vendors, or public databases.",
            },
          ],
        },
      ],
    },
    {
      id: "purpose-of-data-use",
      title: "Purpose of Data Use",
      blocks: [
        { kind: "p", text: "Eastwards Consulting Pte Ltd uses your data for the following purposes:" },
        {
          kind: "list",
          items: [
            {
              term: "Service Delivery",
              text: "Executing projects across our core pillars (AI, Quantum Computing, Cybersecurity, Cloud, etc.).",
            },
            {
              term: "Communication",
              text: "Providing project updates, technical support, and marketing materials (with your consent).",
            },
            { term: "Legal Compliance", text: "Meeting tax, audit, and regulatory obligations." },
            { term: "Optimization", text: "Analyzing website usage to improve our digital presence and service offerings." },
          ],
        },
      ],
    },
    {
      id: "data-sharing",
      title: "Data Sharing and Disclosure",
      blocks: [
        { kind: "p", text: "We do not sell your data. We only share information with:" },
        {
          kind: "list",
          items: [
            { term: "Internal Teams", text: "Consultants and support staff on a “need-to-know” basis." },
            { term: "Third-Party Vendors", text: "Trusted partners such as cloud service providers and payment processors." },
            { term: "Legal Authorities", text: "When mandated by law or to protect our legal rights." },
            {
              term: "International Transfers",
              text: "When transferring personal data outside Singapore, we ensure the recipient provides a standard of protection comparable to the PDPA. This may include Standard Contractual Clauses (SCCs), binding corporate rules, or certifications such as ISO/IEC 27001.",
            },
          ],
        },
      ],
    },
    {
      id: "retention-and-deletion",
      title: "Data Retention & Deletion",
      blocks: [
        {
          kind: "list",
          items: [
            {
              term: "Retention",
              text: "We retain personal data only for as long as necessary to fulfill the purposes for which it was collected, or as required by applicable laws. For example, financial records are retained for 7 years in accordance with Singapore’s Income Tax Act.",
            },
            {
              term: "Secure Disposal",
              text: "Once the retention period expires, data will be securely deleted or anonymized to prevent unauthorized access.",
            },
          ],
        },
      ],
    },
    {
      id: "your-rights",
      title: "Your Rights",
      blocks: [
        {
          kind: "p",
          text: "You have the following rights under the PDPA and, where applicable, international frameworks:",
        },
        {
          kind: "list",
          items: [
            { term: "Access & Correction", text: "Request a copy of your data or correct inaccuracies." },
            { term: "Deletion (Right to be Forgotten)", text: "Request that we erase your personal data." },
            { term: "Portability", text: "Request the transfer of your data to another organization." },
            { term: "Opt-out", text: "Withdraw consent for marketing communications at any time." },
          ],
        },
      ],
    },
    {
      id: "consent-and-notification",
      title: "Consent & Notification",
      blocks: [
        {
          kind: "list",
          items: [
            "We obtain your consent before collecting, using, or disclosing personal data, except where permitted or required by law.",
            "Consent may be provided through written agreements, online forms, or electronic checkboxes.",
            "You may withdraw consent at any time by contacting our Data Protection Officer.",
            "Before or at the time of collecting personal data, we will notify you of the purposes for which the data is collected, how it will be used, and to whom it may be disclosed.",
          ],
        },
      ],
    },
    {
      id: "security-measures",
      title: "Security Measures",
      blocks: [
        { kind: "p", text: "We implement robust security protocols to protect your information:" },
        {
          kind: "list",
          items: [
            { term: "Technical", text: "Encryption (SSL/TLS), firewalls, and secure servers." },
            { term: "Organizational", text: "Employee training on data privacy and strict access control policies." },
            {
              term: "Incident Response",
              text: "In the event of a data breach, we have procedures to notify affected individuals and regulators as required by the PDPA.",
            },
          ],
        },
      ],
    },
    {
      id: "cookies-and-tracking",
      title: "Cookies and Tracking",
      blocks: [
        {
          kind: "list",
          items: [
            "Our website uses essential cookies for functionality and non-essential cookies (analytics, marketing) only with your explicit consent.",
            "You may manage cookie preferences via our consent banner at any time.",
            "Non-essential cookies will not be activated unless you opt in.",
          ],
        },
        { kind: "p", text: "For detailed information, please refer to our [Cookie Policy](/cookies)." },
      ],
    },
    {
      id: "compliance-frameworks",
      title: "Compliance Frameworks",
      blocks: [
        {
          kind: "p",
          text: "Eastwards Consulting Pte Ltd operates primarily under the Singapore Personal Data Protection Act (PDPA). We also strive to align our data processing practices with global standards (such as GDPR and CCPA) where applicable to our international clientele.",
        },
      ],
    },
    {
      id: "contact-us",
      title: "Contact Us",
      blocks: [
        {
          kind: "p",
          text: "If you have questions about this policy or wish to exercise your rights, please contact our Data Protection Officer (DPO):",
        },
        {
          kind: "contact",
          items: [
            { label: "Company", value: contact.location.company },
            { label: "Data Protection Officer Address", value: ADDRESS },
            { label: "General Legal Inquiries", value: LEGAL_EMAIL, href: `mailto:${LEGAL_EMAIL}` },
            { label: "DPO Inquiries", value: DPO_EMAIL, href: `mailto:${DPO_EMAIL}` },
          ],
        },
        {
          kind: "p",
          lead: "Complaint Process:",
          text: "You may also submit concerns via our website [“Contact Us” form](/contact). We aim to respond to all privacy-related inquiries within 30 days.",
        },
      ],
    },
  ],
};

export const cookiePolicy: LegalDoc = {
  path: "/cookies",
  title: "Cookie Policy",
  description:
    "Which cookies eastwards.co uses, why, how long they last, and how to accept, reject or change them at any time.",
  intro: [
    "This Cookie Policy explains how Eastwards Consulting Pte Ltd (“we”, “us”, or “our”) uses cookies and similar tracking technologies when you visit our website. By managing your preferences through our cookie banner, you control which cookies are activated. Essential cookies are always enabled, while non-essential cookies require your explicit consent.",
  ],
  numbered: false,
  // Burst on Unsplash, free under the Unsplash License (no credit required):
  // https://unsplash.com/photos/person-typing-on-silver-macbook-kUqqaRjJuw0
  image: { src: "/images/legal-cookies.jpg", alt: "A person typing on a laptop at a bright desk", width: 1600, height: 1067 },
  highlights: [
    { icon: "shield", title: "Essential only by default", text: "Non-essential cookies stay off until you opt in." },
    { icon: "sliders", title: "You decide", text: "Accept all, reject all, or choose category by category." },
    { icon: "toggle", title: "Your browser, your rules", text: "You can also set your browser to refuse cookies or alert you when they are set." },
  ],
  sections: [
    {
      id: "what-are-cookies",
      title: "What Are Cookies?",
      blocks: [
        {
          kind: "p",
          text: "Cookies are small text files stored on your computer or mobile device when you visit a website. They are widely used to make websites function efficiently, enhance user experience, and provide information to site owners.",
        },
      ],
    },
    {
      id: "how-we-use-cookies",
      title: "How We Use Cookies",
      blocks: [
        { kind: "p", text: "We use cookies for several purposes, including:" },
        {
          kind: "list",
          items: [
            { term: "Security", text: "Keeping our site safe and stable." },
            { term: "Preferences", text: "Remembering your language, region, or other choices." },
            {
              term: "Analytics",
              text: "Understanding how visitors interact with our services (e.g., Quantum Computing or Cybersecurity pages).",
            },
            { term: "Marketing", text: "Delivering relevant ads and measuring campaign effectiveness." },
          ],
        },
      ],
    },
    {
      id: "types-of-cookies",
      title: "Types of Cookies We Use",
      blocks: [
        {
          kind: "table",
          caption: "Cookie categories, what they do, whether they are required, and how long they typically last",
          head: ["Cookie Category", "Purpose", "Necessity", "Typical Retention"],
          rows: [
            ["Essential Cookies", "Required for site functionality (secure logins, billing processes).", "Mandatory", "Session-based"],
            ["Analytics Cookies", "Measure traffic and usage patterns via tools like Google Analytics.", "Optional", "30 days – 1 year"],
            ["Preference Cookies", "Store user choices (language, region).", "Optional", "Up to 1 year"],
            ["Marketing Cookies", "Track visitors across websites for personalized advertising.", "Optional", "6 months – 2 years"],
          ],
        },
      ],
    },
    {
      id: "third-party-cookies",
      title: "Third-Party Cookies",
      blocks: [
        { kind: "p", text: "We may use cookies provided by trusted third parties, including:" },
        {
          kind: "list",
          items: [
            { term: "Google Analytics", text: "To measure traffic and usage patterns." },
            { term: "Cloudflare", text: "To protect against DDoS attacks and ensure site stability." },
            { term: "Stripe/PayPal", text: "To facilitate secure transactions for our professional services." },
          ],
        },
      ],
    },
    {
      id: "your-choices",
      title: "Your Choices: Opt-In & Opt-Out",
      blocks: [
        { kind: "p", text: "We respect your privacy. You have the following options:" },
        {
          kind: "list",
          items: [
            {
              term: "Cookie Consent Banner",
              text: "On your first visit, you can “Accept All,” “Reject All” (except essential), or “Manage Preferences.”",
            },
            { term: "Browser Settings", text: "Configure your browser to refuse cookies or alert you when cookies are set." },
            {
              term: "Withdrawal of Consent",
              text: "Change preferences anytime via the “Cookie Settings” link in our website footer.",
            },
          ],
        },
        { kind: "note", text: "Disabling certain cookies may affect site functionality." },
      ],
    },
    {
      id: "international-transfers",
      title: "International Data Transfers",
      blocks: [
        {
          kind: "p",
          text: "As Eastwards Consulting serves a global audience, information collected via cookies may be processed outside Singapore. We ensure such transfers comply with the PDPA and other relevant laws by using secure cloud providers and contractual safeguards.",
        },
      ],
    },
    {
      id: "age-limitations",
      title: "Age Limitations",
      blocks: [
        {
          kind: "p",
          text: "Our services are intended for business clients and are not directed to children under 16 years of age. We do not knowingly use cookies to collect personal data from minors.",
        },
      ],
    },
    {
      id: "updates",
      title: "Updates to This Policy",
      blocks: [
        {
          kind: "p",
          text: "We may update this Cookie Policy periodically to reflect changes in technology or legislation. Please check this page for the latest version.",
        },
      ],
    },
    {
      id: "contact-us",
      title: "Contact Us",
      blocks: [
        { kind: "p", text: "If you have questions about our use of cookies, please contact:" },
        {
          kind: "contact",
          items: [
            { label: "Email", value: DPO_EMAIL, href: `mailto:${DPO_EMAIL}` },
            { label: "Address", value: ADDRESS },
          ],
        },
      ],
    },
  ],
};

/* Order of the "Related policies" links at the foot of each document */
export const legalDocs = [terms, privacy, cookiePolicy] as const;

/* The consent banner: the client's privacy notice, then the cookie choices.
   Categories mirror the Cookie Policy table above. */
export const consent = {
  title: "Privacy Notice",
  intro:
    "Eastwards Consulting Pte Ltd respects your privacy and is committed to protecting your personal data. We collect and use information only for legitimate business purposes such as delivering IT services, providing support, and meeting legal obligations.",
  more: "Read the full notice",
  less: "Show less",
  points: [
    { term: "Your Rights", text: "You may request access, correction, deletion, or withdrawal of consent at any time." },
    {
      term: "Data Security",
      text: "We safeguard your information with encryption, strict access controls, and compliance with the Singapore PDPA.",
    },
    {
      term: "Cookies",
      text: "Essential cookies support site functionality; non-essential cookies (analytics/marketing) are used only with your consent.",
    },
    {
      term: "International Transfers",
      text: "If data is transferred outside Singapore, we ensure comparable protection standards.",
    },
    {
      term: "Age Limitations",
      text: "Our services are intended for business clients and are not directed to children under 16 years of age. We do not knowingly collect personal data from minors.",
    },
  ],
  fullDetails: "For full details, please read our [Privacy Policy](/privacy).",
  actions: { accept: "Accept All", reject: "Reject All", manage: "Manage Preferences", save: "Save Preferences" },
  preferences: {
    title: "Cookie Preferences",
    body: "Essential cookies are always on. Choose which optional cookies we may use.",
    alwaysOn: "Always on",
    policyLink: "Read the [Cookie Policy](/cookies)",
  },
  categories: [
    {
      id: "essential",
      title: "Essential Cookies",
      text: "Required for site functionality (secure logins, billing processes).",
      retention: "Session-based",
      required: true,
    },
    {
      id: "analytics",
      title: "Analytics Cookies",
      text: "Measure traffic and usage patterns via tools like Google Analytics.",
      retention: "30 days – 1 year",
      required: false,
    },
    {
      id: "preferences",
      title: "Preference Cookies",
      text: "Store user choices (language, region).",
      retention: "Up to 1 year",
      required: false,
    },
    {
      id: "marketing",
      title: "Marketing Cookies",
      text: "Track visitors across websites for personalized advertising.",
      retention: "6 months – 2 years",
      required: false,
    },
  ],
} as const;
