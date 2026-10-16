/* Single source of truth for all page content.
   Components render whatever this module exports, making future
   backend/CMS integration seamless. */

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Partners", href: "/partners" },
  { label: "About", href: "/about" },
  { label: "Contact Us", href: "/contact" },
] as const;

export const hero = {
  headline: "Technology that moves business forward",
  subtext:
    "We help businesses navigate complexity and move forward with the right technology, engineering, and expertise.",
  cta: "Find your solution",
  image: "/images/hero-tiles.png",
} as const;

export const features = {
  headline: "For crafting truly prominent IT solutions",
  label: "Build for what’s next",
  body: "We bring together AI, data, cloud, and digital engineering to solve complex challenges, modernize businesses, and create lasting impact.",
  cta: "More",
  services: [
    { id: 1, title: "Application Security", image: "/images/service-1-exact.jpg" },
    { id: 2, title: "Application Security", image: "/images/service-2-exact.jpg" },
    { id: 3, title: "Application Security", image: "/images/service-3-exact.jpg" },
    { id: 4, title: "Application Security", image: "/images/service-1-exact.jpg" },
    { id: 5, title: "Application Security", image: "/images/service-2-exact.jpg" },
    { id: 6, title: "Application Security", image: "/images/service-3-exact.jpg" },
  ],
} as const;

export const coreValues = {
  kicker: "The Future, Engineered",
  statement:
    "Heavyweight experience, new approach. Eastwards brings 20+ years of IT engineering and product design expertise together. To help teams untangle complex tech, modernize their systems, and build for what’s next.",
  values: [
    {
      label: "Experience",
      caption: "Experience that understands the bigger picture.",
      image: "/images/value-panels.png",
      alt: "Layered translucent glass panels",
    },
    {
      label: "Approach",
      caption: "Thoughtful by design. Practical by nature.",
      image: "/images/value-ovals.png",
      alt: "Layered translucent blue glass ovals",
    },
    {
      label: "Partnership",
      caption: "A team that builds with you.",
      image: "/images/value-cubes.png",
      alt: "Futuristic glass cube cluster",
    },
  ],
} as const;

export type BlogPost = {
  id: string;
  category: string;
  title: string;
  description: string;
  href: string;
  image: string;
  accent: string;
};

export const blog = {
  heading: "Explore the Blog",
  subtext:
    "Real-world tech insights, backed by 20+ years of engineering experience.",
  posts: [
    {
      id: "security",
      category: "Security",
      title: "AI Security Best Practices: Safeguarding Innovation in the Digital Era",
      description:
        "They play a role in making operations more seamless, bridging the gap between authorities, consumers and businesses.",
      href: "/insights/ai-security",
      image: "/images/insight-ai-security.png",
      accent: "from-orange-300 via-orange-700 to-slate-950",
    },
    {
      id: "identity",
      category: "Technology",
      title: "Building Trust in a Digital-First World",
      description:
        "Explore how modern identity systems and intelligent security infrastructure are transforming digital trust.",
      href: "/insights/digital-trust",
      image: "/images/insight-digital-trust.jpg",
      accent: "from-blue-950 via-cyan-800 to-slate-950",
    },
    {
      id: "ai",
      category: "Artificial Intelligence",
      title: "The Next Era of Enterprise AI",
      description:
        "A practical look at how businesses can integrate AI into their workflows and unlock new opportunities.",
      href: "/insights/enterprise-ai",
      image: "/images/insight-enterprise-ai.jpg",
      accent: "from-violet-800 via-blue-800 to-indigo-950",
    },
    {
      id: "engineering",
      category: "Engineering",
      title: "Engineering Systems That Scale",
      description:
        "Designing resilient, scalable digital systems for complex enterprise environments.",
      href: "/insights/scalable-systems",
      image: "/images/insight-scalable-systems.jpg",
      accent: "from-rose-500 via-red-800 to-slate-950",
    },
    {
      id: "infrastructure",
      category: "Infrastructure",
      title: "Rethinking Modern Digital Infrastructure",
      description:
        "Building the foundation for connected, efficient and future-ready organisations.",
      href: "/insights/digital-infrastructure",
      image: "/images/insight-digital-infrastructure.jpg",
      accent: "from-slate-500 via-slate-800 to-black",
    },
  ] as readonly BlogPost[],
} as const;

export const contact = {
  title: "CONTACT US",
  subtitle:
    "Fill out the form below, and a member of our leadership or technical team will reach out within one business day.",
  eyebrow: "get in touch",
  headline:
    "Ready to move forward? Have a challenge you're trying to solve, a technology initiative you're planning, or simply an idea worth exploring?",
  location: {
    title: "Our Location",
    headquarters: "Singapore Headquarters",
    company: "Eastwards Consulting Pte Ltd",
    building: "Chinatown Point",
    postalCode: "Singapore 059 413",
  },
  call: {
    title: "Call Us",
    phones: ["+65 93756 413513", "+91 99125 96699"],
  },
  form: {
    submitText: "Send Message",
  },
  directChannels: {
    title: "Direct Channels",
    subtitle:
      "Need to reach a specific department? Use the direct lines below for a faster response.",
    channels: [
      { department: "General Inquiries", email: "info@eastwards.co" },
      { department: "Business & Partnerships", email: "partners@eastwards.co" },
      { department: "Careers & Talent", email: "careers@eastwards.co" },
      { department: "Media & Press", email: "media@eastwards.co" },
    ],
  },
} as const;

export const footer = {
  columns: [
    {
      title: "Engineering & Core",
      links: ["Application Services", "Product Engineering", "Quantum Computing"],
    },
    {
      title: "Cloud & Intelligence",
      links: ["Data & AI", "Infrastructure & Cloud", "Modern Device Management"],
    },
    {
      title: "Advisory & Operations",
      links: ["Cybersecurity", "IT Staffing Services", "Projects & Professional"],
    },
    { title: "Socials", links: ["Instagram", "Twitter X", "LinkedIn"] },
    { title: "About Us", links: ["Careers", "Corporate Social Responsibility"] },
  ],
  legal: ["Privacy Policy", "Cookie Policy", "Terms of Use"],
  copyright:
    "Copyright © 2026 Eastwards Consulting Pte Ltd. All Rights Reserved",
  wordmark: "Eastwards",
} as const;

export const partners = {
  title: "Partners",
  lede: "We collaborate with industry leaders across Cloud, Security, Data, and Emerging Tech.",
  intro:
    "At Eastwards, we believe that the best solutions are built on a foundation of world-class technology.",
  ecosystem:
    "To deliver “Intelligent Growth”, we have cultivated a robust ecosystem of strategic alliances with global technology leaders. These partnerships allow us to provide our clients with validated architectures, early access to emerging features, and deep technical support that ensures long-term platform resilience.",
  why: {
    title: "Why Our Partnerships Matter to You",
    subtitle:
      "We don’t just use these tools; we master them. Our alliance network is designed to provide three core advantages",
    advantages: [
      {
        title: "Integrated Solutions",
        body: "We ensure that different technologies work seamlessly together within your specific environment.",
      },
      {
        title: "Validated Excellence",
        body: "Our team maintains up-to-date certifications and training directly from our partners, ensuring we implement best practices every time.",
      },
      {
        title: "Accelerated Delivery",
        body: "Leveraging partner-backed frameworks allows us to move from discovery to production faster, reducing your time-to-market.",
      },
    ],
  },
  join: {
    title: "Interested in Partnering with Eastwards?",
    subtitle:
      "We are always looking to expand our ecosystem with innovative technology providers and service specialists who share our commitment to engineering rigor and client success.",
    points: [
      "Collaborate on complex enterprise transformations.",
      "Integrate your technology into high-growth digital platforms.",
      "Expand your reach within the Singapore and global markets.",
    ],
    cta: "Join our network",
    href: "mailto:partners@eastwards.co",
  },
} as const;

export const about = {
  title: "About Us",
  lede: "Guiding Enterprises Toward Intelligent Growth",
  intro:
    "At Eastwards, we help enterprises transform digital complexity into measurable advantage. Headquartered in Singapore with a global delivery footprint, we combine strategic insight with hands-on engineering to design, secure, and operate the platforms that power modern business.",
  promise: {
    label: "Our promise",
    points: [
      "Faster time to market",
      "Lower operational risk",
      "Sustained cost efficiency",
    ],
    cta: { label: "Contact Us", href: "/contact" },
  },
  mission: {
    title: "Mission",
    body: "To make digital transformation predictable, secure, and outcome-driven. We view transformation as a continuous capability, not a one-off project. By aligning engineering rigor with business priorities, we deliver measurable ROI and long-term resilience.",
    link: { label: "Discover now", href: "#solutions" },
  },
  foundation: {
    title: "Our Foundation",
    body: "Founded by senior IT and delivery leaders with over 20 years of experience, Eastwards bridges legacy operations with future-ready innovation. We blend deep technical expertise with pragmatic delivery practices so clients can reduce risk, scale reliably, and unlock new revenue streams.",
    link: { label: "Discover now", href: "#solutions" },
  },
  solutions: {
    title: "Comprehensive Digital Solutions",
    groups: [
      {
        title: "Innovation & Engineering",
        items: [
          {
            title: "Application Development & Product Engineering",
            body: "Cloud-native web and mobile platforms, from discovery to continuous delivery.",
          },
          {
            title: "Quantum Computing Advisory",
            body: "Feasibility studies and strategic roadmaps for organizations exploring quantum advantage.",
          },
          {
            title: "Data & Artificial Intelligence",
            body: "Data engineering, analytics, and ML operationalization to turn information into strategic assets.",
          },
        ],
      },
      {
        title: "Resilience & Security",
        items: [
          {
            title: "Cybersecurity Services",
            body: "Risk assessments, security engineering, and compliance built into delivery.",
          },
          {
            title: "Infrastructure & Cloud",
            body: "Resilient migrations, hybrid architectures, and cost optimization.",
          },
          {
            title: "Modern Device Management",
            body: "Secure remote work enablement and unified endpoint management.",
          },
        ],
      },
      {
        title: "Delivery & Talent",
        items: [
          {
            title: "Projects & Professional Services",
            body: "Program management and solution architecture to ensure projects land on time and on budget.",
          },
          {
            title: "IT Staffing Services",
            body: "Flexible access to vetted technical talent for specialized or long-term needs.",
          },
          {
            title: "Digital Support Services",
            body: "24/7 managed services and UX operations to keep systems reliable and user experiences consistent.",
          },
        ],
      },
    ],
  },
  approach: {
    title: "Our Approach – Your Partner in Growth",
    points: [
      {
        title: "Client First",
        body: "Engagements begin with your strategic goals and measurable outcomes.",
      },
      {
        title: "Agile & Iterative",
        body: "Continuous feedback and incremental delivery keep projects aligned with evolving priorities.",
      },
      {
        title: "Engineering Rigor",
        body: "Automated testing, CI/CD, and Infrastructure as Code ensure quality and repeatability.",
      },
      {
        title: "Collaborative Partnership",
        body: "We embed with your teams to transfer knowledge and build long-term capability.",
      },
    ],
  },
  why: {
    title: "Why Organizations Choose Eastwards",
    points: [
      {
        title: "Proven Expertise",
        body: "Decades of leadership in large-scale transformations across industries.",
      },
      {
        title: "Outcome Focused",
        body: "Success measured by reduced cycle time, improved uptime, and demonstrable ROI.",
      },
      {
        title: "Security by Design",
        body: "Compliance and security embedded from day one.",
      },
      {
        title: "Global Reach, Local Sensibility",
        body: "Strategic hub in Singapore with delivery tailored to local markets.",
      },
      {
        title: "Ecosystem Alliances",
        body: "Partnerships with leading technology vendors for validated, high-performance solutions.",
      },
    ],
  },
  next: {
    title: "Take the Next Step",
    lead: "Book a Quantum Readiness Review",
    body: "A 30-minute assessment with quick wins and a 90-day roadmap.",
    cta: { label: "Contact Us", href: "/contact" },
  },
} as const;
