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

/* Terms of Use for eastwards.co, written to Singapore law as it stands in
   November 2026: the Unfair Contract Terms Act 1977 (no exclusion of
   liability for death or personal injury caused by negligence, other
   exclusions only as far as reasonable), the Copyright Act 2021 (terms
   cannot take away its permitted uses, such as computational data
   analysis), the Computer Misuse Act 1993, and the Contracts (Rights of
   Third Parties) Act 2001. They cover the website only: consulting work is
   under each client's service agreement. Not legal advice: have Singapore
   counsel review them. */
export const terms: LegalDoc = {
  path: "/terms",
  title: "Terms of Use",
  description:
    "The terms that apply when you use eastwards.co: intellectual property, acceptable use, liability, and the Singapore law that governs them.",
  intro: [
    "These Terms of Use apply to your use of eastwards.co (the “website”), which is owned and operated by Eastwards Consulting Pte Ltd (“Eastwards”, “we” or “us”), a company registered in Singapore.",
    "By accessing or using the website, you agree to these terms. If you do not agree, please do not use the website. Our [Privacy Policy](/privacy) and [Cookie Policy](/cookies) explain how we handle personal data and cookies, and form part of these terms.",
  ],
  numbered: true,
  // Scott Graham on Unsplash, free under the Unsplash License (no credit required):
  // https://unsplash.com/photos/man-writing-on-paper-OQMZwNd3ThU
  image: { src: "/images/legal-terms.jpg", alt: "A person signing a printed document at a desk", width: 1600, height: 1068 },
  highlights: [
    { icon: "landmark", title: "Singapore law", text: "These terms are governed by the laws of Singapore and its courts." },
    {
      icon: "info",
      title: "Information, not advice",
      text: "Website content is general information. Consulting work is covered by a separate service agreement.",
    },
    { icon: "shield", title: "Use it lawfully", text: "No malware, no unauthorised access, nothing that harms the site or others." },
  ],
  sections: [
    {
      id: "about-these-terms",
      title: "About These Terms",
      blocks: [
        {
          kind: "list",
          items: [
            "These terms cover the website only. Any consulting, staffing or other services we provide are governed by the service agreement we sign with you, which takes priority over these terms if the two conflict.",
            "You must be at least 18, or using the website with the permission of a parent, guardian or your employer, to accept these terms.",
            "If you use the website on behalf of a company or other organisation, you confirm that you are authorised to accept these terms for it.",
          ],
        },
      ],
    },
    {
      id: "intellectual-property",
      title: "Intellectual Property",
      blocks: [
        {
          kind: "p",
          text: "Unless stated otherwise, Eastwards owns or is licensed to use all intellectual property rights in the website, including its text, graphics, logos, design and layout, and our articles, case studies and service descriptions. These are protected by the Copyright Act 2021 and other intellectual property laws.",
        },
        {
          kind: "list",
          lead: "You may:",
          tone: "allow",
          items: [
            "View, download and print pages for your own reference or for internal use within your organisation.",
            "Share links to our pages.",
          ],
        },
        {
          kind: "list",
          lead: "You must not, without our written permission:",
          tone: "deny",
          items: [
            "Republish, sell, rent, sub-license or otherwise commercially exploit material from the website.",
            "Remove or change any copyright or other notices.",
            "Use our name, logo or trade marks in a way that suggests we endorse you or your products.",
          ],
        },
        {
          kind: "p",
          text: "Names and logos of our partners and other companies shown on the website belong to their owners. Nothing in these terms limits any use of our content that the Copyright Act 2021 permits, such as fair use or computational data analysis.",
        },
      ],
    },
    {
      id: "acceptable-use",
      title: "Acceptable Use",
      blocks: [
        { kind: "p", text: "You agree to use the website only for lawful purposes. You must not:" },
        {
          kind: "list",
          tone: "deny",
          items: [
            "Gain, or try to gain, unauthorised access to the website, its servers or any connected system, which may be an offence under the Computer Misuse Act 1993.",
            "Upload or transmit viruses, spyware or any other harmful code.",
            "Use the website in a way that damages it, disrupts it, or impairs its availability or security, including by overloading it with automated requests.",
            "Send spam, or submit false, misleading or someone else’s information through our forms.",
            "Use the website to harass anyone, or to infringe anyone’s rights.",
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
          text: "The content on the website, including articles and service pages, is general information only. It is not professional technical, business, legal or financial advice, and you should not rely on it as such. For advice on your situation, please [contact us](/contact) about a formal engagement.",
        },
      ],
    },
    {
      id: "information-you-send",
      title: "Information You Send Us",
      blocks: [
        {
          kind: "p",
          text: "When you send us an enquiry, a job application or other information through the website:",
        },
        {
          kind: "list",
          items: [
            "You confirm that it is accurate and that you are entitled to share it.",
            "You allow us to use it to respond to you and for the purposes described in our [Privacy Policy](/privacy).",
            "You must not send anything that is unlawful, defamatory, or that infringes someone else’s rights, or confidential information you are not allowed to share.",
            "Sending an enquiry does not create a client relationship or any obligation on either side until we sign a service agreement.",
          ],
        },
      ],
    },
    {
      id: "availability-and-accuracy",
      title: "Availability and Accuracy",
      blocks: [
        {
          kind: "p",
          text: "We work to keep the website accurate and available, but we provide it “as is” and “as available”. To the extent permitted by law, we do not promise that:",
        },
        {
          kind: "list",
          items: [
            "The website will always be available, uninterrupted, secure or free of errors or viruses.",
            "Its content is complete, accurate or up to date.",
          ],
        },
        {
          kind: "p",
          text: "We may change, suspend or remove any part of the website at any time.",
        },
      ],
    },
    {
      id: "limitation-of-liability",
      title: "Limitation of Liability",
      blocks: [
        {
          kind: "p",
          text: "The website is free to use. To the extent permitted by law, Eastwards will not be liable to you for any loss or damage arising from your use of, or inability to use, the website or its content, including loss of profits, revenue, data, business or goodwill, or any indirect or consequential loss.",
        },
        {
          kind: "p",
          text: "Nothing in these terms excludes or limits our liability for death or personal injury caused by our negligence, for fraud or fraudulent misrepresentation, or for anything else that cannot be excluded or limited under Singapore law, including the Unfair Contract Terms Act 1977.",
        },
      ],
    },
    {
      id: "indemnity",
      title: "Indemnity",
      blocks: [
        {
          kind: "p",
          text: "You agree to compensate Eastwards, its employees and affiliates for any claims, losses, liabilities and reasonable costs (including legal fees) arising from your breach of these terms or your unlawful use of the website.",
        },
      ],
    },
    {
      id: "external-links",
      title: "Links to Other Websites",
      blocks: [
        {
          kind: "p",
          text: "The website links to other websites, such as our partners and our social media profiles. We do not control them and are not responsible for their content or their privacy practices. A link does not mean we endorse the website or its owner.",
        },
      ],
    },
    {
      id: "termination-of-use",
      title: "Suspending Your Access",
      blocks: [
        {
          kind: "p",
          text: "We may suspend or end your access to the website, without notice, if we reasonably believe you have breached these terms or used the website unlawfully.",
        },
      ],
    },
    {
      id: "variation-and-updates",
      title: "Changes to These Terms",
      blocks: [
        {
          kind: "p",
          text: "We may update these terms from time to time. The updated terms apply from the date we publish them on this page, and we will tell you about significant changes through the website. If you keep using the website after that, you accept the updated terms.",
        },
      ],
    },
    {
      id: "general",
      title: "General",
      blocks: [
        {
          kind: "list",
          items: [
            {
              term: "Severability",
              text: "If a court finds any part of these terms invalid or unenforceable, the rest of the terms continue to apply.",
            },
            {
              term: "No waiver",
              text: "If we do not enforce a right under these terms straight away, we can still enforce it later.",
            },
            {
              term: "Third-party rights",
              text: "No one other than you and Eastwards has any right to enforce these terms under the Contracts (Rights of Third Parties) Act 2001.",
            },
            {
              term: "Transfer",
              text: "We may transfer our rights and obligations under these terms, for example if our business is sold or restructured.",
            },
          ],
        },
      ],
    },
    {
      id: "governing-law",
      title: "Governing Law and Disputes",
      blocks: [
        {
          kind: "p",
          text: "These terms, and any dispute arising from them or from your use of the website, are governed by the laws of Singapore. The courts of Singapore have exclusive jurisdiction. Before starting proceedings, please contact us so we can try to resolve the matter informally.",
        },
      ],
    },
    {
      id: "contact-details",
      title: "Contact Us",
      blocks: [
        { kind: "p", text: "If you have questions about these Terms of Use, please contact us:" },
        {
          kind: "contact",
          items: [
            { label: "Company", value: contact.location.company },
            { label: "Email", value: LEGAL_EMAIL, href: `mailto:${LEGAL_EMAIL}` },
            { label: "Address", value: ADDRESS },
          ],
        },
      ],
    },
  ],
};

/* Privacy Policy, written to Singapore's Personal Data Protection Act 2012
   (PDPA) as it stands in November 2026: the PDPA's obligations (consent,
   notification, purpose, access and correction, accuracy, protection,
   retention, transfer, breach notification, accountability), the Do Not
   Call and Spam Control rules for marketing, the PDPC's NRIC guidelines,
   and the Personal Data Protection Regulations 2021 as amended in 2026 for
   overseas transfers. The PDPA's data portability obligation is not yet in
   force, so the policy does not promise it as a legal right.
   Points the client must confirm before relying on them: the 12-month
   retention of unsuccessful job applications, and that every service
   provider has a transfer contract or recognised certification in place.
   Not legal advice: have Singapore counsel review it. */
export const privacy: LegalDoc = {
  path: "/privacy",
  title: "Privacy Policy",
  description:
    "How Eastwards Consulting collects, uses, shares and protects your personal data under Singapore’s Personal Data Protection Act 2012 (PDPA), and how to exercise your rights.",
  intro: [
    "Eastwards Consulting Pte Ltd (“Eastwards”, “we” or “us”) respects your privacy. This Privacy Policy explains how we collect, use, disclose and protect your personal data when you visit eastwards.co, contact us, apply to work with us, or engage our services, and how you can exercise your rights.",
    "We handle personal data in line with Singapore’s Personal Data Protection Act 2012 (PDPA), its regulations, and the advisory guidelines of the Personal Data Protection Commission (PDPC). By using our website or giving us your personal data, you acknowledge that we will handle it as described here.",
  ],
  numbered: true,
  // Philipp Katzenberger on Unsplash, free under the Unsplash License (no credit required):
  // https://unsplash.com/photos/closeup-photo-of-turned-on-blue-and-white-laptop-computer-iIJrUoeRoCQ
  image: { src: "/images/legal-privacy.jpg", alt: "A laptop keyboard lit in blue in a dark room", width: 1600, height: 1067 },
  highlights: [
    {
      icon: "ban",
      title: "We do not sell your data",
      text: "We share it only with our team, service providers bound by contract, or where the law requires.",
    },
    {
      icon: "user",
      title: "Your data, your rights",
      text: "Ask to see or correct your data, or withdraw your consent, at any time.",
    },
    {
      icon: "clock",
      title: "Answers within 30 days",
      text: "We reply to access and correction requests as soon as we can, and within 30 days.",
    },
  ],
  sections: [
    {
      id: "who-we-are",
      title: "Who We Are and What This Policy Covers",
      blocks: [
        {
          kind: "p",
          text: `Eastwards Consulting Pte Ltd is a company registered in Singapore, at ${ADDRESS}. We decide how and why the personal data described in this policy is used, and we are responsible for it under the PDPA.`,
        },
        {
          kind: "list",
          items: [
            {
              term: "What it covers",
              text: "Personal data of website visitors, people who contact us, job applicants, and the people we deal with at our clients, partners and suppliers.",
            },
            {
              term: "Client data in our projects",
              text: "When we process personal data on a client’s behalf during an engagement, we act as that client’s data intermediary. We use that data only to deliver the agreed services, under our contract and the client’s instructions, and the client’s own privacy policy applies to it.",
            },
            {
              term: "Business contact information",
              text: "The PDPA’s main obligations do not apply to business contact information (such as your name, job title and work email) given solely for business purposes. We still protect it as described in this policy.",
            },
          ],
        },
      ],
    },
    {
      id: "information-we-collect",
      title: "Personal Data We Collect",
      blocks: [
        { kind: "p", text: "Depending on how you interact with us, we may collect:" },
        {
          kind: "list",
          items: [
            {
              term: "Identity and contact details",
              text: "Your name, job title, company, email address, phone number and country.",
            },
            {
              term: "Enquiry details",
              text: "The service you are interested in, your message, and a record of your consent to be contacted.",
            },
            {
              term: "Job application details",
              text: "Your CV, work and education history, LinkedIn or portfolio link, current location, the role you are applying for, and anything else you choose to tell us.",
            },
            {
              term: "Engagement and billing details",
              text: "Contracts, invoices, payment records, and project information that may include personal data held in our clients’ systems.",
            },
            {
              term: "Technical data",
              text: "Your IP address, browser and device type, pages visited, and cookie identifiers, collected in line with your cookie choices.",
            },
          ],
        },
        {
          kind: "p",
          lead: "NRIC and other identification numbers:",
          text: "We do not collect your NRIC, FIN, passport or other national identification number unless the law requires it or it is needed to verify your identity to a high degree of accuracy, in line with the PDPC’s advisory guidelines on NRIC numbers.",
        },
        {
          kind: "p",
          text: "Please do not send us sensitive personal data, such as health, financial account or identification details, through our website forms.",
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
              term: "From you",
              text: "When you fill in a form on our website, email or call us, apply for a role, sign a contract, or meet us at an event.",
            },
            {
              term: "Automatically",
              text: "Through cookies and similar technologies as you use our website. Optional cookies are used only if you allow them.",
            },
            {
              term: "From others",
              text: "From your employer when it engages us, from referees or recruitment partners you have authorised, and from public sources such as company registries and professional networking sites.",
            },
          ],
        },
      ],
    },
    {
      id: "purpose-of-data-use",
      title: "How We Use Your Data",
      blocks: [
        { kind: "p", text: "We use personal data only for purposes a reasonable person would consider appropriate, namely to:" },
        {
          kind: "list",
          items: [
            "Respond to your enquiries and requests.",
            "Plan, deliver and manage our services across application development, data and AI, quantum computing advisory, cybersecurity, cloud and IT support.",
            "Assess job applications and manage recruitment.",
            "Send you updates, insights and marketing, where you have agreed to receive them.",
            "Operate, secure and improve our website, including preventing spam, fraud and misuse.",
            "Improve our services and understand how they are used.",
            "Keep accounting, tax and audit records, and meet our other legal and regulatory obligations.",
            "Establish, exercise or defend legal claims.",
          ],
        },
        {
          kind: "p",
          text: "If we want to use your personal data for a new purpose, we will tell you and, where the PDPA requires it, ask for your consent first.",
        },
      ],
    },
    {
      id: "consent-and-notification",
      title: "Consent and Notification",
      blocks: [
        {
          kind: "p",
          text: "We tell you the purposes for collecting your personal data at or before the time we collect it. We then collect, use or disclose it only:",
        },
        {
          kind: "list",
          items: [
            {
              term: "With your consent",
              text: "For example, when you tick the consent box on our contact or careers form.",
            },
            {
              term: "With your deemed consent",
              text: "Where you voluntarily give us your data for an obvious purpose (such as sending us an enquiry), where it is needed to perform a contract with you, or where we have notified you of a new purpose and given you a reasonable period to opt out after assessing that it is not likely to harm you.",
            },
            {
              term: "Under an exception in the PDPA",
              text: "Such as our legitimate interests (for example, detecting fraud or securing our systems) or business improvement, after assessing that the benefit outweighs any likely adverse effect on you, or where the law requires or allows it.",
            },
          ],
        },
      ],
    },
    {
      id: "marketing",
      title: "Marketing Messages",
      blocks: [
        {
          kind: "list",
          items: [
            "We send marketing messages only where you have agreed to receive them.",
            "Every marketing email includes a way to unsubscribe, as required by the Spam Control Act 1965.",
            "We will not send marketing calls or messages to a Singapore telephone number listed on the Do Not Call Registry unless you have given us clear and unambiguous consent in writing or another accessible form.",
            "You can opt out of marketing at any time by using the unsubscribe link or contacting our Data Protection Officer. Opting out will not affect messages about services you have engaged us for.",
          ],
        },
      ],
    },
    {
      id: "data-sharing",
      title: "Sharing Your Data",
      blocks: [
        { kind: "p", text: "We do not sell your personal data. We share it only with:" },
        {
          kind: "list",
          items: [
            { term: "Our team", text: "Consultants and staff, including our team in India, on a need-to-know basis." },
            {
              term: "Service providers",
              text: "Companies that host our website, deliver our email, store our data or support our IT, accounting and professional needs. They may use your data only to provide their services to us, and are bound by contract to protect it.",
            },
            {
              term: "Partners and clients",
              text: "Technology partners or clients, where needed to deliver an engagement you are part of.",
            },
            {
              term: "Authorities and advisers",
              text: "Regulators, law enforcement, courts and our professional advisers, where the law requires or allows it, or to protect our legal rights.",
            },
            {
              term: "Business transfers",
              text: "A buyer or successor if all or part of our business is sold, merged or restructured, as permitted by the PDPA.",
            },
          ],
        },
      ],
    },
    {
      id: "international-transfers",
      title: "Transfers Outside Singapore",
      blocks: [
        {
          kind: "p",
          text: "Some of our team and service providers are outside Singapore, so your personal data may be transferred to and stored in other countries. Before transferring it, we take steps to ensure the recipient protects it to a standard comparable to the PDPA, as the Personal Data Protection Regulations 2021 require. In particular, we ensure the recipient is:",
        },
        {
          kind: "list",
          items: [
            "Bound by legally enforceable obligations, such as data protection laws, a contract (including the ASEAN Model Contractual Clauses, where suitable) or binding corporate rules; or",
            "Holds a certification recognised under those regulations, such as a Global or APEC Cross-Border Privacy Rules (CBPR) or Privacy Recognition for Processors (PRP) certification.",
          ],
        },
      ],
    },
    {
      id: "retention-and-deletion",
      title: "How Long We Keep Your Data",
      blocks: [
        {
          kind: "p",
          text: "We keep personal data only for as long as we need it for the purposes it was collected for, or for legal or business reasons. When we no longer need it, we securely delete it or anonymise it so it can no longer identify you. For example:",
        },
        {
          kind: "list",
          items: [
            {
              term: "Enquiries",
              text: "For as long as needed to answer you and manage any resulting relationship.",
            },
            {
              term: "Job applications",
              text: "If you are hired, as part of your employee records. If not, for up to 12 months so we can consider you for other suitable roles, unless you ask us to delete it sooner.",
            },
            {
              term: "Accounting and tax records",
              text: "For at least five years, as required by the Income Tax Act 1947 and the Companies Act 1967.",
            },
          ],
        },
      ],
    },
    {
      id: "security-measures",
      title: "How We Protect Your Data",
      blocks: [
        {
          kind: "p",
          text: "We make reasonable security arrangements to protect personal data from unauthorised access, collection, use, disclosure, copying, modification, disposal, and from loss of the storage media it is kept on:",
        },
        {
          kind: "list",
          items: [
            {
              term: "Technical",
              text: "Encryption in transit (TLS), access controls, multi-factor authentication and system monitoring.",
            },
            {
              term: "Organisational",
              text: "Need-to-know access, confidentiality obligations, staff training, and due diligence on our service providers.",
            },
          ],
        },
        {
          kind: "p",
          text: "No method of transmission or storage is completely secure, but we work to protect your data and review our safeguards regularly.",
        },
      ],
    },
    {
      id: "data-breaches",
      title: "Data Breaches",
      blocks: [
        {
          kind: "p",
          text: "If we have reason to believe a data breach has occurred, we will assess it promptly, and within 30 days. If it is likely to cause significant harm to the people affected, or affects 500 or more people, we will notify the PDPC within three calendar days of completing our assessment. Where it is likely to cause you significant harm, we will also notify you and tell you what you can do to protect yourself.",
        },
      ],
    },
    {
      id: "your-rights",
      title: "Your Rights",
      blocks: [
        { kind: "p", text: "Under the PDPA, you can ask us to:" },
        {
          kind: "list",
          items: [
            {
              term: "Access your data",
              text: "Give you the personal data we hold about you, and information about how it has been used or disclosed in the past year. We may charge a reasonable fee for this; if so, we will tell you the amount before we proceed.",
            },
            {
              term: "Correct your data",
              text: "Fix personal data that is inaccurate or incomplete.",
            },
            {
              term: "Withdraw your consent",
              text: "Stop collecting, using or disclosing your personal data. We will tell you the likely consequences of withdrawing, for example that we may no longer be able to provide a service, and will stop within a reasonable time unless the law allows us to continue.",
            },
          ],
        },
        { kind: "p", text: "We also welcome requests that go beyond what the PDPA requires:" },
        {
          kind: "list",
          items: [
            {
              term: "Deletion",
              text: "You can ask us to delete your personal data. We will do so unless we need to keep it for a legal or business reason, in which case we will tell you why.",
            },
            {
              term: "A copy in a common format",
              text: "The PDPA’s data portability obligation is not yet in force, but if you would like your data in a commonly used electronic format, we will help where we reasonably can.",
            },
          ],
        },
        {
          kind: "p",
          text: "To make a request, contact our Data Protection Officer using the details below. We may need to verify your identity first. We will respond to access and correction requests as soon as reasonably possible and within 30 days; if we need longer, we will tell you within those 30 days when we will reply. If we cannot meet your request, we will explain why.",
        },
      ],
    },
    {
      id: "cookies-and-tracking",
      title: "Cookies",
      blocks: [
        {
          kind: "list",
          items: [
            "We use essential cookies to make our website work. Analytics, preference and marketing cookies are used only if you opt in.",
            "You can change your cookie choices or withdraw your consent at any time, as explained in our Cookie Policy.",
          ],
        },
        { kind: "p", text: "For details of the cookies we use, see our [Cookie Policy](/cookies)." },
      ],
    },
    {
      id: "children",
      title: "Children",
      blocks: [
        {
          kind: "p",
          text: "Our website and services are intended for businesses and are not directed at children under 16. We do not knowingly collect personal data from children. If you believe a child has given us personal data, please contact us and we will delete it.",
        },
      ],
    },
    {
      id: "other-laws",
      title: "Other Data Protection Laws",
      blocks: [
        {
          kind: "p",
          text: "This policy is written for the PDPA. Where we serve clients in other countries, their local laws (such as the EU or UK GDPR) may give you additional rights, and we will respect them where they apply. Contact us if you would like to know more.",
        },
      ],
    },
    {
      id: "changes",
      title: "Changes to This Policy",
      blocks: [
        {
          kind: "p",
          text: "We may update this policy to reflect changes in the law or in how we handle personal data. The current version is always on this page. If we make significant changes, we will let you know through our website or by email where appropriate.",
        },
      ],
    },
    {
      id: "contact-us",
      title: "Contact Our Data Protection Officer",
      blocks: [
        {
          kind: "p",
          text: "For questions about this policy, to exercise your rights, or to raise a concern, contact our Data Protection Officer (DPO):",
        },
        {
          kind: "contact",
          items: [
            { label: "Company", value: contact.location.company },
            { label: "Data Protection Officer Address", value: ADDRESS },
            { label: "DPO Inquiries", value: DPO_EMAIL, href: `mailto:${DPO_EMAIL}` },
            { label: "General Legal Inquiries", value: LEGAL_EMAIL, href: `mailto:${LEGAL_EMAIL}` },
          ],
        },
        {
          kind: "p",
          lead: "Complaints:",
          text: "If you have a concern, please write to our DPO first so we can look into it. We will acknowledge your complaint and aim to resolve it within 30 days. If you are not satisfied with our response, you may contact the Personal Data Protection Commission at [www.pdpc.gov.sg](https://www.pdpc.gov.sg).",
        },
      ],
    },
  ],
};

/* Cookie Policy. Singapore has no cookie-specific law: the PDPA applies
   where cookies collect personal data, read with the PDPC's Advisory
   Guidelines on Selected Topics (online activities). The tables list what
   the site really stores, checked in November 2026: one essential cookie
   (lib/consent.ts) and the theme setting (next-themes, local storage); no
   server or third-party cookies. Add a row here before adding any tool that
   stores something, and bump VERSION in lib/consent.ts so the banner asks
   again. Not legal advice: have Singapore counsel review it. */
export const cookiePolicy: LegalDoc = {
  path: "/cookies",
  title: "Cookie Policy",
  description:
    "Which cookies and similar technologies eastwards.co uses, why, how long they last, and how to accept, reject or change them, under Singapore’s PDPA.",
  intro: [
    "This Cookie Policy explains how Eastwards Consulting Pte Ltd (“Eastwards”, “we” or “us”) uses cookies and similar technologies on eastwards.co, and how you can control them.",
    "Singapore does not have a separate cookie law. Where cookies collect personal data, the Personal Data Protection Act 2012 (PDPA) applies, and we follow the Personal Data Protection Commission’s guidance on online activities. Please read this policy together with our [Privacy Policy](/privacy).",
  ],
  numbered: false,
  // Burst on Unsplash, free under the Unsplash License (no credit required):
  // https://unsplash.com/photos/person-typing-on-silver-macbook-kUqqaRjJuw0
  image: { src: "/images/legal-cookies.jpg", alt: "A person typing on a laptop at a bright desk", width: 1600, height: 1067 },
  highlights: [
    {
      icon: "shield",
      title: "Only what the site needs",
      text: "One essential cookie and one display setting. No analytics or advertising cookies are in use today.",
    },
    {
      icon: "sliders",
      title: "You decide",
      text: "Optional cookies stay off unless you opt in, and rejecting is as easy as accepting.",
    },
    {
      icon: "toggle",
      title: "Your browser, your rules",
      text: "You can also block or delete cookies in your browser settings at any time.",
    },
  ],
  sections: [
    {
      id: "what-are-cookies",
      title: "What Are Cookies?",
      blocks: [
        {
          kind: "p",
          text: "Cookies are small text files that a website stores on your computer or phone. Websites can also keep information in your browser’s local storage, which works in a similar way. We use both terms together as “cookies” in this policy.",
        },
        {
          kind: "p",
          text: "Essential cookies are needed for a website to work as you would expect. Optional cookies, such as analytics or advertising cookies, are not needed for the site to work.",
        },
      ],
    },
    {
      id: "cookies-we-use",
      title: "Cookies We Use",
      blocks: [
        {
          kind: "p",
          text: "These are the only cookies and similar technologies our website uses today. Both are set by us (first party), and neither is used to identify you or track you across other websites.",
        },
        {
          kind: "table",
          caption: "Cookies and local storage used on eastwards.co, with their purpose and how long they last",
          head: ["Name", "Purpose", "Type", "How long it lasts"],
          rows: [
            ["ew_consent", "A cookie that remembers your cookie choices, so we do not ask on every visit.", "Essential", "6 months"],
            [
              "theme",
              "Kept in local storage. Remembers whether you chose light or dark mode, and is saved only when you switch.",
              "Functional",
              "Until you clear it",
            ],
          ],
        },
      ],
    },
    {
      id: "optional-cookies",
      title: "Optional Cookies",
      blocks: [
        {
          kind: "p",
          text: "Our cookie banner lets you choose three optional categories. We do not use any cookies in these categories today. If we start to, they will stay off unless you opt in, and we will list each one in this policy first.",
        },
        {
          kind: "table",
          caption: "Optional cookie categories, what they would be used for, and their status",
          head: ["Category", "What it would be used for", "Type", "Status"],
          rows: [
            ["Analytics", "Counting visits and seeing how pages are used, so we can improve the site.", "Optional", "Not in use today"],
            ["Preferences", "Remembering choices such as language or region.", "Optional", "Not in use today"],
            ["Marketing", "Measuring campaigns and showing relevant ads on other websites.", "Optional", "Not in use today"],
          ],
        },
      ],
    },
    {
      id: "third-party-cookies",
      title: "Third-Party Cookies and Links",
      blocks: [
        {
          kind: "list",
          items: [
            "No third party sets cookies through our website, and the services that host and deliver our website do not set cookies.",
            "Our website links to other sites, such as LinkedIn, YouTube, Instagram and Google Maps. Those sites set their own cookies when you visit them, under their own policies, which we do not control.",
          ],
        },
      ],
    },
    {
      id: "consent",
      title: "How We Ask for Consent",
      blocks: [
        {
          kind: "list",
          items: [
            {
              term: "Essential cookies",
              text: "These are needed for the website to work as you request, so under the PDPA your consent is deemed when you use the site.",
            },
            {
              term: "Optional cookies",
              text: "We use these only after you opt in through our cookie banner. No option is ticked in advance, and “Reject All” is as easy to use as “Accept All”.",
            },
            {
              term: "Browser settings",
              text: "We do not treat your browser settings alone as consent to optional cookies.",
            },
          ],
        },
      ],
    },
    {
      id: "your-choices",
      title: "Your Choices",
      blocks: [
        {
          kind: "list",
          items: [
            {
              term: "Cookie banner",
              text: "On your first visit you can choose “Accept All”, “Reject All” or “Manage Preferences” to pick categories one by one.",
            },
            {
              term: "Changing your mind",
              text: "To change your choice or withdraw your consent, delete the cookies for eastwards.co in your browser settings. The banner will ask again on your next visit. It also asks again after six months, and whenever we change the categories we use.",
            },
            {
              term: "Browser settings",
              text: "Most browsers let you block or delete cookies, or warn you before one is set. Private or incognito windows delete cookies when you close them.",
            },
          ],
        },
        {
          kind: "note",
          text: "If you block essential cookies, the site still works, but we cannot remember your choices and the banner will appear on every visit.",
        },
      ],
    },
    {
      id: "personal-data",
      title: "Personal Data and Transfers",
      blocks: [
        {
          kind: "p",
          text: "Any personal data collected through cookies is handled as described in our [Privacy Policy](/privacy), including how we protect it, how long we keep it, and how we safeguard it when it is transferred outside Singapore.",
        },
      ],
    },
    {
      id: "age-limitations",
      title: "Children",
      blocks: [
        {
          kind: "p",
          text: "Our website and services are intended for businesses and are not directed at children under 16. We do not knowingly use cookies to collect personal data from children.",
        },
      ],
    },
    {
      id: "updates",
      title: "Updates to This Policy",
      blocks: [
        {
          kind: "p",
          text: "We will update this policy before we add or change any cookies, and when the law or guidance changes. The current version is always on this page.",
        },
      ],
    },
    {
      id: "contact-us",
      title: "Contact Us",
      blocks: [
        { kind: "p", text: "If you have questions about our use of cookies, contact our Data Protection Officer:" },
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
      text: "We use one essential cookie to remember your choices. Optional cookies are used only with your consent, and none are in use today.",
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
      text: "Remembers your cookie choices so we do not ask on every visit.",
      retention: "6 months",
      required: true,
    },
    {
      id: "analytics",
      title: "Analytics Cookies",
      text: "Count visits and see how pages are used. Not in use today.",
      retention: "None while not in use",
      required: false,
    },
    {
      id: "preferences",
      title: "Preference Cookies",
      text: "Remember choices such as language or region. Not in use today.",
      retention: "None while not in use",
      required: false,
    },
    {
      id: "marketing",
      title: "Marketing Cookies",
      text: "Measure campaigns and show relevant ads on other websites. Not in use today.",
      retention: "None while not in use",
      required: false,
    },
  ],
} as const;
