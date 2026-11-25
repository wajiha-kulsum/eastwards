/* Responsibility (CSR) page content: the client's copy (supplied
   2026-11-11). Rendering lives in components/responsibility. Spaced dashes
   in the supplied text are rewritten as ordinary punctuation (the client
   asked for no dashes); hyphenated compounds stay, as the English needs them. */

// One icon per commitment; mapped to lucide icons in ResponsibilityPage
export type ItemIcon = "cloud" | "code" | "building" | "mentor" | "book" | "handshake" | "ai" | "lock" | "users" | "growth";

export type Pillar = {
  id: string;
  // short name for the index, the sticky pillar bar and the hero figure
  short: string;
  title: string;
  subtitle?: string;
  intro: string;
  items: readonly { term: string; body: string; icon: ItemIcon }[];
  /* Section photo, licensed from 123RF (Standard licence). */
  image: { src: string; alt: string };
};

export const responsibility = {
  title: "Responsibility",
  description:
    "Purpose-driven growth at Eastwards: sustainable engineering, bridging the digital divide, ethical and responsible AI, and diversity, equity and inclusion.",
  hero: {
    title: "Purpose Driven Growth",
    highlight: "Our Commitment to Responsibility.",
    lede: "At Eastwards, we believe that true progress is measured by more than just technological milestones. As we guide enterprises towards intelligent growth, we recognize our responsibility to ensure that growth is sustainable, equitable, and ethical.",
    framework:
      "Our CSR framework is built on four core pillars that align our technical expertise with our commitment to the global community.",
    primary: "Partner with us",
    secondary: "Explore the four pillars",
  },
  index: { label: "Four pillars.", lede: "One framework for growth that is sustainable, equitable and ethical." },
  nav: "Pillars",
  pillars: [
    {
      id: "environmental-stewardship",
      // 123RF image 180796534, Standard licence
      image: { src: "/images/csr-environment.jpg", alt: "Rows of solar panels across a large solar farm" },
      short: "Environment",
      title: "Environmental Stewardship.",
      subtitle: "Sustainable Engineering",
      intro:
        "Technology has a footprint. We are committed to minimizing the environmental impact of digital infrastructure through Green Engineering practices.",
      items: [
        {
          term: "Carbon-Efficient Cloud",
          icon: "cloud",
          body: "We help clients optimize their cloud environments to reduce energy consumption and waste.",
        },
        {
          term: "Sustainable Architecture",
          icon: "code",
          body: "We prioritize “clean code” and efficient algorithms that require less processing power, contributing to a lower digital carbon footprint.",
        },
        {
          term: "Operational Sustainability",
          icon: "building",
          body: "In our Singapore headquarters and global offices, we maintain a paperless environment and prioritize energy-efficient hardware.",
        },
      ],
    },
    {
      id: "bridging-the-digital-divide",
      // 123RF image 324682672, Standard licence
      image: { src: "/images/csr-digital-access.jpg", alt: "A young man helping an older colleague on a laptop" },
      short: "Digital access",
      title: "Bridging the Digital Divide.",
      intro:
        "As experts in 20+ years of IT delivery, we feel a duty to foster the next generation of technical talent and ensure that the digital economy is accessible to all.",
      items: [
        {
          term: "Mentorship Programs",
          icon: "mentor",
          body: "Our senior consultants volunteer time to mentor students and career-switchers from underrepresented backgrounds in the tech industry.",
        },
        {
          term: "Digital Literacy",
          icon: "book",
          body: "We support local initiatives in Singapore and our delivery regions that provide digital skills training to underserved communities.",
        },
        {
          term: "Empowering Non-Profits",
          icon: "handshake",
          body: "We offer pro-bono or subsidized advisory services to non-profit organizations to help them modernize their operations and maximize their impact.",
        },
      ],
    },
    {
      id: "ethical-innovation",
      // 123RF image 149198628, Standard licence
      image: { src: "/images/csr-ethical-ai.jpg", alt: "A robot hand reaching toward a human hand" },
      short: "Ethical AI",
      title: "Ethical Innovation & AI Responsibility.",
      intro:
        "In a world increasingly driven by algorithms and data, we advocate for “Security and Ethics by Design.”",
      items: [
        {
          term: "Responsible AI",
          icon: "ai",
          body: "We adhere to strict ethical frameworks in our Data & AI practice, ensuring that the models we build are transparent, unbiased, and respect user privacy.",
        },
        {
          term: "Data Sovereignty",
          icon: "lock",
          body: "We help organizations navigate complex compliance landscapes, ensuring that individual data rights are protected at every stage of the digital lifecycle.",
        },
      ],
    },
    {
      id: "diversity-equity-inclusion",
      // 123RF image 299699676, Standard licence
      image: { src: "/images/csr-inclusion.jpg", alt: "A diverse team smiling around a table in a bright office" },
      short: "Inclusion",
      title: "Diversity, Equity, and Inclusion.",
      intro:
        "Our strength lies in our diversity. We are committed to building a workplace, and a broader industry, where talent is the only prerequisite for success.",
      items: [
        {
          term: "Inclusive Staffing",
          icon: "users",
          body: "Through our IT Staffing Services, we promote diverse hiring practices, ensuring our clients have access to a wide range of perspectives and backgrounds.",
        },
        {
          term: "Equitable Growth",
          icon: "growth",
          body: "We maintain a culture of transparency and meritocracy, ensuring that every member of the Eastwards team has a clear path to leadership.",
        },
      ],
    },
  ] satisfies readonly Pillar[],
  closing: {
    title: "Moving Forward Together.",
    statement:
      "For Eastwards, CSR is not a separate department; it is a mindset that informs how we design, build, and secure technology for our clients. We are proud to build a future where intelligent growth benefits everyone.",
    quote:
      "We don’t just build for today; we engineer for a future that is sustainable and inclusive for the generations to come.",
    attribution: "The Eastwards Leadership Team",
  },
  contact: {
    title: "Partner with us.",
    lede: "To learn more about our social impact initiatives or to partner with us on a community project, send the CSR team a note.",
    // the CSR form (components/responsibility/CsrForm, app/api/csr)
    form: {
      submit: "Send to the CSR team",
      sending: "Sending...",
      failed: "Your message didn’t send. Please try again in a moment.",
      sent: { title: "Message sent", before: "Thank you. The CSR team will reply to", after: "soon." },
      again: "Send another message",
    },
  },
} as const;
