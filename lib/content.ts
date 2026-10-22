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

/* Services nav dropdown, labels and order from the approved dropdown mock.
   Items 1, 2 and 7 carry `detail`: hovering them opens a sideways flyout.
   detail.body is the verbatim service description from the /about grid. */
export type NavService = {
  label: string;
  href: string;
  detail?: { title: string; body: string };
  items?: { label: string; href: string }[];
};

export const navServices: readonly NavService[] = [
  {
    label: "Application Services",
    href: "/services/application-services",
    items: [
      {
        label: "Application Lifecycle Management",
        href: "/services/application-services",
      },
      {
        label: "Enterprise Change Management",
        href: "/services/application-services",
      },
      { label: "Quality Engineering", href: "/services/application-services" },
      {
        label: "Workflow Automation Services",
        href: "/services/application-services",
      },
    ],
  },
  {
    label: "Data and Artificial Intelligence",
    href: "/services",
    items: [
      { label: "Data Engineering", href: "/services" },
      { label: "Data Modernization", href: "/services" },
      { label: "Enterprise Agentic AI", href: "/services" },
      { label: "Enterprise Generative AI Solutions", href: "/services" },
    ],
  },
  { label: "Digital Support Services", href: "/services/digital-support-services" },
  { label: "IT staffing services", href: "/services/it-staffing-services" },
  { label: "Projects and Professional Services", href: "/services/projects-professional-services" },
  { label: "Quantum Computing", href: "/services/quantum-computing" },
  {
    label: "Cybersecurity",
    href: "/services",
    items: [
      {
        label: "Threat Monitoring & Incident Response",
        href: "/services/threat-monitoring-incident-response",
      },
      {
        label: "Infrastructure Security",
        href: "/services/infrastructure-security",
      },
      {
        label: "Identity and Access Management",
        href: "/services/identity-and-access-management",
      },
      {
        label: "Governance Risk and Compliance",
        href: "/services/governance-risk-and-compliance",
      },
      { label: "Cloud Security", href: "/services/cloud-security" },
      { label: "Application Security", href: "/services/application-security" },
      { label: "AI Security", href: "/services/ai-security" },
    ],
  },
  {
    label: "Infrastructure and Cloud services",
    href: "/services",
  },
  {
    label: "Modern Device Management",
    href: "/services/modern-device-management",
  },
];

export const hero = {
  subtext:
    "We help businesses navigate complexity and move forward with the right technology, engineering, and expertise.",
  cta: "Find your solution",
  image: "/images/hero-tiles.png",
  mobileImage: "/images/hero-mobile.png",
} as const;

export const features = {
  label: "Build for what’s next",
  body: "We bring together AI, data, cloud, and digital engineering to solve complex challenges, modernize businesses, and create lasting impact.",
  cta: "More",
  services: [
    { title: "Application Security", href: "/services/application-security", image: "/images/service-1-exact.jpg" },
    { title: "Cloud Security", href: "/services/cloud-security", image: "/images/service-2-exact.jpg" },
    { title: "Quantum Computing", href: "/services/quantum-computing", image: "/images/service-3-exact.jpg" },
    { title: "IT Staffing Services", href: "/services/it-staffing-services", image: "/images/service-1-exact.jpg" },
    { title: "Modern Device Management", href: "/services/modern-device-management", image: "/images/service-2-exact.jpg" },
    { title: "Application Services", href: "/services/application-services", image: "/images/service-3-exact.jpg" },
  ],
} as const;

export const coreValues = {
  kicker: "The Future, Engineered",
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
  title: "Partnership",
  lede: "Nobody builds alone. It takes the right people, a fresh perspective, and a shared idea to make something click.",
  eyebrow: "/ Let’s work together /",
  statement: "Navigating Success :\nYour Strategic\nPartner",
  statementBody:
    "At Eastwards, we believe in building relationships with technology providers, industry experts, and businesses that share our approach to solving problems. Across cloud, security, data, and emerging technologies, we look for ways to combine our strengths and deliver solutions that make a real difference.",
  why: {
    title: "Why team up with us?",
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
} as const;

export const about = {
  title: "About Us",
  lede: "Nobody builds alone. It takes the right people, a fresh perspective, and a shared idea to make something click.",
  banner: {
    eyebrow: "/ Let's work together /",
    line: "We provide solutions",
    follow: "that drive",
    highlight: "business",
    body: "At Eastwards, we help enterprises transform digital complexity into measurable advantage. Headquartered in Singapore with a global delivery footprint, we combine strategic insight with hands-on engineering to design, secure, and operate the platforms that power modern business.\nOur promise: faster time to market, lower operational risk, and sustained cost efficiency.",
    alt: "Eastwards team working together around a table",
  },
  solutions: {
    title: "Comprehensive Digital Solutions",
    groups: [
      {
        title: "Innovation & Engineering",
        items: [
          {
            title: "Application Development & Product Engineering",
            body: "Web and mobile products built to grow with your business.",
          },
          {
            title: "Quantum Computing Advisory",
            body: "Explore quantum possibilities and find where they fit.",
          },
          {
            title: "Data & Artificial Intelligence",
            body: "Turn data into insights and AI into real value.",
          },
        ],
      },
      {
        title: "Resilience & Security",
        items: [
          {
            title: "Cybersecurity Services",
            body: "Spot risks early and protect what matters.",
          },
          {
            title: "Infrastructure & Cloud",
            body: "Build smarter, more flexible cloud infrastructure.",
          },
          {
            title: "Modern Device Management",
            body: "Keep devices secure and teams connected.",
          },
        ],
      },
      {
        title: "Delivery & Talent",
        items: [
          {
            title: "Projects & Professional Services",
            body: "Bring clarity, expertise, and momentum to every project.",
          },
          {
            title: "IT Staffing Services",
            body: "Find the right technical talent for your team.",
          },
          {
            title: "Digital Support Services",
            body: "Keep your systems running and your users supported.",
          },
        ],
      },
      {
        title: "Your Partner in Growth",
        items: [
          {
            title: "We Listen First",
            body: "We understand your needs before jumping into solutions.",
          },
          {
            title: "We Build Together",
            body: "We share progress, adapt quickly, and keep you involved.",
          },
          {
            title: "We Grow Together",
            body: "We share knowledge and build lasting partnerships.",
          },
        ],
      },
      {
        title: "Why Choose Eastwards",
        items: [
          {
            title: "Experience That Counts",
            body: "Technical expertise focused on your challenges.",
          },
          {
            title: "Results That Matter",
            body: "Solutions built around meaningful business outcomes.",
          },
          {
            title: "Better Together",
            body: "The right people and expertise, working as one.",
          },
        ],
      },
    ],
  },
} as const;


/* ---------- Service pages (/services/[slug]) ----------
   Copy is the client-approved service page text, structured into
   render blocks; the Related Blogs showcase is shared by all pages. */

export type ServiceBlock =
  | { kind: "lead"; body: string }
  | { kind: "prose"; heading?: string; paragraphs: string[] }
  | { kind: "bullets"; heading?: string; items: string[] }
  | {
      kind: "cards";
      heading?: string;
      columns?: 2 | 3 | 4;
      items: { n?: string; title: string; body: string }[];
    }
  | {
      kind: "panels";
      heading?: string;
      groups: {
        title: string;
        body?: string;
        items: { title: string; body?: string }[];
      }[];
    };

export type ServicePageContent = {
  slug: string;
  title: string;
  lede: string;
  blocks: ServiceBlock[];
};

export const servicePages: readonly ServicePageContent[] = [
  {
    slug: "application-services",
    title: "Application Services",
    lede: "Applications modernized, managed, and enhanced, powerful engines of growth.",
    blocks: [
      {
        kind: "lead",
        body: "At Eastwards, we help businesses unlock the full potential of their applications by modernizing, managing, and enhancing them to function as powerful engines of growth. Our approach goes beyond routine support, we deliver end-to-end transformation, from initial assessment and design to development, testing, and optimization.",
      },
      {
        kind: "prose",
        heading: "Overview",
        paragraphs: [
          "By leveraging expertise across leading platforms such as Oracle, Salesforce, and SAP, combined with advanced practices in quality engineering and application lifecycle management, we enable organizations to achieve faster delivery, improved efficiency, and superior user experiences. With agility at the heart of our methods, Eastwards ensures that your applications evolve in step with your business ambitions.",
        ],
      },
      {
        kind: "cards",
        heading: "Our Specialized Offerings",
        items: [
          {
            n: "01",
            title: "Oracle Solutions",
            body: "Secure hybrid cloud implementations designed to reduce operational overhead and enhance resilience.",
          },
          {
            n: "02",
            title: "Salesforce Solutions",
            body: "Empowering businesses to strengthen customer relationships and streamline CRM processes.",
          },
          {
            n: "03",
            title: "SAP Solutions",
            body: "Accelerating digital journeys with SAP S/4HANA and cloud-ready enterprise systems.",
          },
          {
            n: "04",
            title: "Application Lifecycle Management",
            body: "Comprehensive management of business applications, from development to ongoing optimization.",
          },
          {
            n: "05",
            title: "Quality Engineering",
            body: "Continuous integration and automated testing frameworks to ensure reliability and speed.",
          },
          {
            n: "06",
            title: "Enterprise Change Management",
            body: "Helping organizations and people adapt seamlessly to transformation initiatives.",
          },
          {
            n: "07",
            title: "Low Code and No Code Development",
            body: "Helping organizations launch secure, scalable solutions faster and with lower development overhead.",
          },
          {
            n: "08",
            title: "Workflow Automation Services",
            body: "Tailored workflow automation services that remove repetitive work, speed up processes, and let your team focus on higher-value tasks.",
          },
        ],
      },
    ],
  },
  {
    slug: "digital-support-services",
    title: "Digital Support Services",
    lede: "Rapid resolution and seamless operations for a workforce without constraints.",
    blocks: [
      {
        kind: "lead",
        body: "Eastwards believes in rapid resolution and seamless business operations. Our digital support services help businesses meet their employees worldwide without any constraints by implementing the two-tier approach: service desk and remote resolution.",
      },
      {
        kind: "prose",
        paragraphs: [
          "Interactions with technology play a vital role in the current workforce scenarios to drive better results with digital transformation initiatives. With digital support services, you can assist your employees and provide rapid resolutions within an instant, regardless of their work location.",
          "Every business that operates with the help of IT infrastructure deals with a diverse range of issues on a day-to-day basis, which requires a wide range of skills. Few people prefer the support team’s assistance, whereas the rest need a quick chat or basic guidance. Eastwards prioritizes businesses’ unique needs and preferences and offers a wide range of support services.",
        ],
      },
      {
        kind: "prose",
        heading: "Supporting Your Workforce and Digital Transformation Journey",
        paragraphs: [
          "We help businesses improve their growth, scalability, and flexibility in the workforce with our digital support services; we aim to enhance employee interactions and experience. Eastwards aims to exceed client expectations by driving better outcomes.",
          "By using experience analytics based on various parameters, integrated with AI/ML, we continue to enhance our support services and workforce management, while implementing the latest technologies and prioritizing the client’s targets.",
        ],
      },
      {
        kind: "bullets",
        heading: "Our Digital Support Services include",
        items: [
          "24×7 two-tier support services",
          "Worldwide delivery locations",
          "Multi-lingual support and multi-channel engagement (voice, text, chat, web, email)",
          "On-demand support regardless of employee work location",
          "Hybrid and remote workforce support",
        ],
      },
      {
        kind: "prose",
        paragraphs: [
          "Eastwards facilitates resource optimization and cost effectiveness by integrating automated AI-assisted help along with our team of experts.",
        ],
      },
      {
        kind: "bullets",
        heading: "We drive better results by including the following approaches",
        items: [
          "Proactive error resolution and increased first-contact resolution",
          "Reduced time to incident resolution and support costs",
          "Enhanced user efficiency and customer experience",
          "Reduced deskside dispatches",
          "Implementation of self-help and self-service",
        ],
      },
      {
        kind: "prose",
        paragraphs: [
          "Our customer-centric approach ensures that our Digital Support Services align with the client’s digital transformation goals while improving employee productivity and overall work satisfaction.",
        ],
      },
    ],
  },
  {
    slug: "it-staffing-services",
    title: "IT Staffing Services",
    lede: "Connecting businesses with top-tier talent to enhance digital transformation.",
    blocks: [
      {
        kind: "lead",
        body: "As a leading IT staffing organization, Eastwards helps businesses connect with compatible teams and assists them with exceptional skills and competencies to enhance digital transformation. We hire IT resources for temporary projects, niche projects, and full-time employment. Eastwards IT staffing services provide tailored solutions to meet the client’s workforce needs.",
      },
      {
        kind: "prose",
        paragraphs: [
          "We help businesses build compatible teams by connecting them with the top-tier talents in their domain. Our comprehensive IT staffing services aim to meet the diverse needs of firms of all sizes, from startups to enterprises.",
        ],
      },
      {
        kind: "cards",
        columns: 2,
        items: [
          {
            n: "01",
            title: "IT staffing resourcing and placement",
            body: "Eastwards ensures the identification and recruitment of talented resources equipped with essential skill sets and credentials that fit businesses’ unique requirements. Our IT staffing services include targeted technology staffing services/solutions, contract/permanent resources, and IT staff outsourcing for enhancing the in-house teams or curating teams from scratch.",
          },
          {
            n: "02",
            title: "Worldwide recruitment and assignment support",
            body: "Eastwards Technical Staffing Services provides a diverse range of IT resources, such as software developers, QA leads, project managers, and product owners, as per the client’s requirements. Our seamless hiring process helps businesses screen and onboard candidates, enabling them to enhance business flexibility and scalability. We aim to manage all aspects of employment and prioritize both the employer and employee expectations.",
          },
        ],
      },
      {
        kind: "prose",
        heading: "Eastwards USPs",
        paragraphs: [
          "We ensure you achieve your digital transformation goals without hassle with our time-tested IT staffing services.",
        ],
      },
      {
        kind: "bullets",
        heading: "Our USPs",
        items: [
          "We have delivered resources to businesses and established trusted partnerships with them worldwide.",
          "Our commitment to meeting fine-quality resources and setting benchmarks.",
          "Our tailored staffing services curate solutions to meet your unique needs.",
          "We provide 24×7 client assistance and rapid resolution.",
          "We provide end-to-end assistance with onboarding employees, scaling up the in-house team as per project needs, and meeting engagement model requirements.",
        ],
      },
      {
        kind: "prose",
        paragraphs: [
          "Eastwards understands your unique needs and observes the essential project parameters such as budget, timelines, and necessary skills to provide talented resources that align with the eligibility criteria to enhance productivity and generate optimized outcomes.",
        ],
      },
    ],
  },
  {
    slug: "projects-professional-services",
    title: "Projects & Professional Services",
    lede: "Roadmaps aligned with your digital transformation goals, and the best ROI.",
    blocks: [
      {
        kind: "lead",
        body: "Eastwards Projects and Professional Services consultants help businesses curate the roadmap aligned with the client’s digital transformation goals and for the best return on investment (ROI). Our services include:",
      },
      {
        kind: "bullets",
        heading: "What we help with",
        items: [
          "Address performance issues",
          "Migrate to modern device management",
          "Migrate to the cloud environment",
          "Implement and integrate the latest IT advancements",
          "Develop a mature IT service management (ITSM)",
          "Optimize the enterprise network",
          "Assess the existing security models and strategize for improvements",
        ],
      },
      {
        kind: "prose",
        paragraphs: [
          "Eastwards’ team of experts has real-world, multi-industry experience and has worked with our partners such as Amazon, Cisco, Google, and Microsoft. We provide vendor-neutral consulting services to help businesses identify and implement the security models and solutions most compatible with their digital transformation goals.",
        ],
      },
      {
        kind: "prose",
        heading: "Projects",
        paragraphs: [
          "Eastwards Project Management Office delivers ROIs for clients by implementing a holistic approach and ensuring the project’s success. Our services are designed to implement the industry’s best practices and align with regulatory standards. Our services include:",
        ],
      },
      {
        kind: "bullets",
        heading: "Focus areas",
        items: [
          "Minimize security risk and optimize end-user digital experience",
          "Reduce business impact and user downtime",
          "Assess workplace culture and prioritize unique business needs",
          "Drive user adoption",
        ],
      },
      {
        kind: "prose",
        paragraphs: [
          "We aim to address potential security risks and threats by assessing each client project based on the industry’s best practices to enhance the client’s security landscape. With our extensive experience and advanced technology, we help businesses achieve their digital transformation goals.",
        ],
      },
      {
        kind: "prose",
        heading: "Professional Services",
        paragraphs: [
          "Professional services help businesses achieve the desired outcomes. Eastwards professional services assist clients in implementing advanced technology and user-centric transformative solutions to provide an exceptional digital experience.",
          "Eastwards’ proven industrial experience and long-standing partner relationships help build rapport with client teams, and our subject matter experts offer vendor-neutral solutions to translate client needs into solutions.",
        ],
      },
      {
        kind: "bullets",
        heading: "Our services are made up of the following four distinct areas",
        items: ["Assess", "Design", "Strategize", "Implement"],
      },
      {
        kind: "prose",
        paragraphs: [
          "Our practical and secure digital experience implements progressive solutions, generates tangible business value, and delivers anticipated adoption and ROI.",
        ],
      },
    ],
  },
  {
    slug: "quantum-computing",
    title: "Quantum Computing",
    lede: "Navigating the transition to sub-atomic computational power.",
    blocks: [
      {
        kind: "lead",
        body: "The shift to quantum computing is not just an upgrade in speed, it is a fundamental change in how businesses solve the “unsolvable.” At Eastwards, we provide a comprehensive transition framework designed to make your organization Quantum Ready.",
      },
      {
        kind: "prose",
        paragraphs: [
          "As a modern firm backed by strategic partnerships with global technology leaders, Eastwards delivers the elite expertise required to identify, build, and maintain quantum-advantaged workflows today, for the breakthroughs of tomorrow.",
        ],
      },
      {
        kind: "panels",
        heading: "Quantum Readiness & Strategic Maturity",
        groups: [
          {
            title: "Quantum Readiness & Strategic Maturity",
            body: "We help you move from curiosity to a structured business strategy, ensuring your quantum investments are grounded in high-impact ROI.",
            items: [
              {
                title: "Maturity Benchmarking",
                body: "Evaluating your current computational bottlenecks in finance, logistics, or materials science to see where quantum “speed-ups” offer the highest value.",
              },
              {
                title: "Strategic Roadmap Design",
                body: "Developing a 3-to-5-year blueprint for quantum integration, including talent acquisition, hardware selection, and IP protection.",
              },
              {
                title: "Vendor-Agnostic Advisory",
                body: "Independent guidance on selecting the right quantum architecture (Superconducting, Trapped Ion, or Neutral Atom) based on your specific use cases.",
              },
            ],
          },
          {
            title: "Technical Algorithm Engineering & Pilot Design",
            body: "Practical quantum advantage today relies on “hybrid” logic. We design software that uses the best of both classical and quantum systems.",
            items: [
              {
                title: "Use Case Prioritization",
                body: "Deep-dive analysis to select the “low-hanging fruit” projects, such as portfolio optimization, molecular docking, or supply chain scheduling.",
              },
              {
                title: "Custom Algorithm Development",
                body: "Designing and testing Variational Quantum Eigensolvers (VQE) and Optimization Algorithms (QAOA) tailored to your proprietary data.",
              },
              {
                title: "Computational Benchmarking",
                body: "Rigorous testing of algorithms across different Quantum Processing Units (QPUs) to ensure stability, accuracy, and resource efficiency.",
              },
            ],
          },
          {
            title: "Enterprise Training & Executive Enablement",
            body: "The biggest barrier to quantum adoption is the talent gap. Eastwards provides the “Quantum Literacy” your team needs to lead.",
            items: [
              {
                title: "Executive Briefings",
                body: "High-level strategic sessions for leadership on “Q-Day” preparedness, cybersecurity threats, and market opportunity.",
              },
              {
                title: "Developer & Data Scientist Bootcamps",
                body: "Hands-on technical training in major SDKs (Qiskit, Cirq, Braket) and quantum programming languages.",
              },
              {
                title: "Custom Curriculum Design",
                body: "We build industry-specific training modules, whether it’s quantum chemistry for Pharma or quantum risk modeling for Banking.",
              },
            ],
          },
          {
            title: "Operational Support & Q-Ops Integration",
            body: "We don’t just hand over a pilot; we ensure it remains operational in a rapidly evolving hardware environment.",
            items: [
              {
                title: "Hybrid Cloud Integration",
                body: "Seamlessly connecting your existing enterprise cloud (Azure, AWS, GCP) to quantum hardware via secure, low-latency tunnels.",
              },
              {
                title: "Managed Support Services",
                body: "As hardware providers update their processors, we re-calibrate and re-train your algorithms to maintain peak performance.",
              },
              {
                title: "Quantum-Safe Migration Support",
                body: "Helping your IT teams transition legacy encryption to Post-Quantum Cryptography (PQC) standards to protect against future threats.",
              },
            ],
          },
        ],
      },
      {
        kind: "cards",
        heading: "Industry-Focused Readiness Programs",
        items: [
          {
            n: "01",
            title: "Banking & Finance",
            body: "Monte Carlo simulations for risk, fraud detection, and complex portfolio hedging.",
          },
          {
            n: "02",
            title: "Life Sciences",
            body: "Molecular simulations and protein folding research to drastically accelerate R&D.",
          },
          {
            n: "03",
            title: "Manufacturing",
            body: "Optimizing multi-variable assembly lines and discovering high-efficiency materials.",
          },
          {
            n: "04",
            title: "Cybersecurity",
            body: "Implementing “Crypto Agility” to protect enterprise data from future quantum attacks.",
          },
        ],
      },
      {
        kind: "cards",
        heading: "The Eastwards Advantage",
        items: [
          {
            title: "Partner-Powered Access",
            body: "Our alliances with major technology brands allow Eastwards clients to bypass “hardware waitlists” and gain priority access to the latest processors.",
          },
          {
            title: "Born in the Cloud Agility",
            body: "We focus on “Quantum as a Service,” meaning you don’t need to manage physical hardware to harness sub-atomic power.",
          },
          {
            title: "Result-Oriented Delivery",
            body: "We avoid theoretical “blue-sky” research in favor of practical pilot projects that demonstrate value to stakeholders within months, not years.",
          },
        ],
      },
    ],
  },
  {
    slug: "modern-device-management",
    title: "Modern Device Management",
    lede: "The centralized system that secures and manages every device in the firm’s operations.",
    blocks: [
      {
        kind: "lead",
        body: "Modern Device Management (MDM) is the centralized management system that secures and manages all the IT assets involved in the firm’s operations, including smartphones, laptops, and IoT devices, it helps businesses optimize device configuration, and maintain alignment with security compliances and application distribution.",
      },
      {
        kind: "prose",
        paragraphs: [
          "In recent employment scenarios, people still prefer remote work setups and BYOD (bring your own devices) policies, which creates challenges for businesses in terms of cybersecurity. Securing, assessing, and managing critical data across numerous devices from employees’ preferred work locations can be challenging and create potential data breach risks.",
          "Eastwards helps businesses streamline the latest work culture trends and manage devices worldwide by implementing zero-touch provisioning, a unified endpoint management system, and an alliance to security and compliance standards.",
          "With the Eastwards Modern Device Management system, businesses can remotely conduct regular risk assessments, analyse threat patterns, and provide rapid resolutions regardless of the employee’s work location, ensuring data protection.",
        ],
      },
      {
        kind: "prose",
        heading: "Capabilities",
        paragraphs: [
          "As IT work culture is moving from a work-from-office setup to work-from-anywhere, it is vital to implement endpoint management tools with the latest advancements. Our services include:",
        ],
      },
      {
        kind: "bullets",
        items: [
          "Flexible cloud-based management",
          "Endpoint business intelligence, automation, and real-time error resolution",
          "Zero-touch device provisioning and enrolment",
          "Security compliance and application configuration management with publication and distribution",
          "OS servicing",
        ],
      },
      {
        kind: "bullets",
        heading:
          "Our flexible, cloud-based Modern Device Management services help businesses deliver",
        items: [
          "Cost savings from data-informed asset allocation and procurement",
          "Increased employee satisfaction, productivity, and empowerment through the BYOD approach",
          "Enhanced employee productivity through optimized device performance",
          "Quantifiable efficiency in endpoint reliability and performance",
        ],
      },
      {
        kind: "prose",
        paragraphs: [
          "Eastwards Modern Device Management services prioritize the end-user experience by implementing endpoint telemetry and Artificial Intelligence/Machine Learning (AI/ML) analytics to reduce endpoint incidents and proactively enhance device reliability and performance.",
          "We ensure enhanced productivity, employees’ choice to use their preferred devices, and quantifiable business growth by implementing endpoint reliability and providing remarkable performance.",
        ],
      },
    ],
  },
  {
    slug: "threat-monitoring-incident-response",
    title: "Threat Monitoring & Incident Response",
    lede: "Security threat management with advanced technology, visibility without blind spots.",
    blocks: [
      {
        kind: "lead",
        body: "With ever-evolving strategies employed to gain access to the firm’s digital assets, it is challenging to identify potential risks. This calls for establishing a security solution with visibility to eliminate blind spots by implementing the latest technologies. To exponentially reduce the growing risk of cyber threats, businesses need next-gen security threat management solutions integrated with robust technologies, tailored strategies, agile methodologies, rapid threat detection, and quick response capabilities.",
      },
      {
        kind: "panels",
        groups: [
          {
            title: "Threat Visibility Assurance",
            body: "We eliminate blind spots, and design and incorporate relevant logs at the appropriate level, which includes:",
            items: [
              {
                title:
                  "Around-the-clock attack surface monitoring and integration for overall security visibility",
              },
              {
                title:
                  "Targeted threat mitigation for customer-specific analytics",
              },
              { title: "High-fidelity telemetry" },
            ],
          },
          {
            title: "Threat Detection",
            body: "We help firms conduct risk assessments and identify internal and external threats via next-gen techniques to provide:",
            items: [
              { title: "Overall risk prediction" },
              { title: "AI/ML-based threat and risk detection" },
              { title: "Dark and deep web surveillance" },
            ],
          },
          {
            title: "Threat Prevention, Response & Compliance",
            body: "We help firms monitor, prevent, and respond to potential threats through:",
            items: [
              { title: "Engineered response" },
              { title: "Risk-based threat prioritization" },
              { title: "Security breach investigation and reporting" },
            ],
          },
        ],
      },
      {
        kind: "bullets",
        heading: "Benefits",
        items: [
          "Modular security model with stack features",
          "Flexible, consumption-based payment models",
          "Enhanced threat visibility through customer-contextualized intelligence, alert elimination, and automation",
          "Prevention and detection at speed with dark, deep, and surface web surveillance, and advanced external and internal threat identification",
          "Automated and engineered risk response, on-demand deep investigation, and forensics",
        ],
      },
    ],
  },
  {
    slug: "infrastructure-security",
    title: "Infrastructure Security",
    lede: "Safeguarding the core with advanced platforms and the latest threat detection.",
    blocks: [
      {
        kind: "lead",
        body: "In recent scenarios where cyber threats across the ecosystem are evolving, one shouldn’t overlook the significance of infrastructure security integrated with advanced security platforms and the latest cyber threat detection technologies. With ever-evolving technologies, security definitions are evolving at a disruptive pace, which requires taking preventive measures to secure IT infrastructure.",
      },
      {
        kind: "prose",
        heading: "Infrastructure Security Solution",
        paragraphs: [
          "Eastwards infrastructure security services help organizations assess the deployed controls and landscape blueprints before implementing advanced measures to protect the core. Our infrastructure security service methodologies are aligned with NIST and ISO standards. The Eastwards team of experts helps businesses improve scalability, agility, and cost effectiveness of the overall firm security in alignment with compliance and regulatory standards, including:",
        ],
      },
      {
        kind: "bullets",
        items: [
          "24X7 comprehensive, integrated operations (infrastructure and security)",
          "CARTA-based approach to infrastructure security management",
          "Integrated security management with continuous monitoring",
          "Regular assessing and managing risk and trust, through reactive and proactive approaches",
          "Rapid detection and resolution by implementing business intelligence, AI, automation, and orchestration-enabled delivery",
        ],
      },
      {
        kind: "panels",
        groups: [
          {
            title: "Endpoint Protection",
            body: "Eastwards helps businesses conduct regular risk assessments, design and implement comprehensive security models, and secure endpoints including IT assets and core IT infrastructure. Our service includes:",
            items: [
              { title: "Real-time risk detection" },
              { title: "Intrusion testing" },
              { title: "File integrity monitoring" },
              { title: "Encryption and behaviour analytics" },
              { title: "Rapid resolution" },
              { title: "Assessing and reinforcing" },
            ],
          },
          {
            title: "Vulnerability Management",
            body: "Eastwards vulnerability management is based on a risk-sensitive approach, which includes:",
            items: [
              { title: "Vulnerability detection" },
              {
                title:
                  "Risk profiling, prioritizing, and regular harness assessment",
              },
              { title: "Resolution and consolidation services" },
              { title: "Cyber incident loss computation" },
            ],
          },
          {
            title: "Network Protection",
            body: "Eastwards helps businesses assess firewall standards, design and modify the existing digital perimeter, and support the ecosystem using orchestration and automation for rapid resolution. Our service includes:",
            items: [
              {
                title:
                  "Firewall management across network, web applications, and cloud devices",
              },
              { title: "DDOS" },
              { title: "SSL, VPN" },
              { title: "SDN security" },
            ],
          },
          {
            title: "Email Security",
            body: "We help firms design, implement, and maintain external and internal email threat and data protection to facilitate the following:",
            items: [
              { title: "Mailbox security" },
              { title: "Email gateway protection" },
              { title: "Mobile device management" },
              { title: "Anti-phishing services, VPN" },
            ],
          },
          {
            title: "Internet Security",
            body: "We design, deploy, and manage browser content for business and support units and include necessary controls to reduce the attack landscape. Our service includes:",
            items: [
              { title: "URL filtering" },
              { title: "Content filtering" },
              { title: "Application safelisting" },
              { title: "Web application firewall" },
            ],
          },
        ],
      },
      {
        kind: "bullets",
        heading: "Benefits",
        items: [
          "Regular supervision of critical patch releases through a surveillance and alerting framework to proactively initiate resolution workflows",
          "Automated reporting and tracking of resolution progress by integrating vulnerability assessment and service management tools",
          "Maintain compliance in core infrastructure components",
          "Real-time tailored business intelligence through reporting dashboards",
        ],
      },
    ],
  },
  {
    slug: "identity-and-access-management",
    title: "Identity and Access Management",
    lede: "A modern, robust identity ecosystem, agile IAM tailored to your needs.",
    blocks: [
      {
        kind: "lead",
        body: "Digital adoption and cloud computing facilitate evolution and business growth, but they also expose the firm to the potential risks of data breaches, insider threats, compliance, and service outage issues. Dealing with identity security requirements using traditional methods is risky when managing diverse identities. With Eastwards’ innovative and agile methods, you can transform your business, protect your identity ecosystem, and manage all identities associated with your firm.",
      },
      {
        kind: "prose",
        heading: "Solution",
        paragraphs: [
          "Eastwards IAM services provide a modern ecosystem with effective, reliable, robust, and scalable identity access management tailored to your needs. Eastwards helps prevent data breaches and facilitates integrated data delivery. Our team of experts curates tailored solutions, develops transformation roadmaps, and generates service outcomes by implementing AI/ML and integrating essential security intelligence and automation. Eastwards helps strengthen the firm’s identity security, ensuring regulatory compliance.",
          "Eastwards’ best-in-class Azure Active Directory and Microsoft Entra ID Premium consulting services help minimize unauthorized access by assisting in configuring phishing-resistant passwordless credentials and managing external identities efficiently. Our IAM service helps businesses deploy a unified identity authentication mechanism, ensuring onboarding, offboarding, and segregation of responsibilities.",
        ],
      },
      {
        kind: "panels",
        heading: "IAM Portfolio",
        groups: [
          {
            title: "Workplace IAM",
            body: "Eastwards helps businesses modernize identity management using identity intelligence. We help you design, configure greenfield/transform legacy setups, and integrate with business applications to secure sensitive data and minimize potential security breaches and data theft risks. Eastwards helps businesses align to the following regulatory compliance standards:",
            items: [
              { title: "Identity lifecycle management" },
              { title: "Connector development & integration" },
              { title: "Role-based access control" },
              { title: "IAM governance" },
            ],
          },
          {
            title: "Authentication",
            body: "Eastwards helps you integrate IAM into cloud security, deploying robust user access to cloud resources. We build a secure unified platform that supports identity protocols, geographical controls, and a Zero Trust security model by implementing the following services:",
            items: [
              { title: "Identity federation" },
              { title: "Credential management" },
              { title: "MFA/adaptive authentication" },
            ],
          },
          {
            title: "Privilege Access Management",
            body: "Eastwards deploys, secures, manages, and audits privileged access across various devices of the platform by implementing the following services:",
            items: [
              { title: "Privilege account discovery" },
              { title: "Solution design & configuration" },
              { title: "Solution administration" },
              { title: "Auditing & reporting" },
            ],
          },
          {
            title: "Customer IAM",
            body: "Eastwards manages customer identity management solutions by using security aspects of IAM in conjunction with digital customer experiences and curating tailored integrations.",
            items: [
              { title: "User lifecycle management" },
              { title: "Customer self-service" },
              { title: "Third-party service integration" },
              { title: "Consent & preference management" },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "governance-risk-and-compliance",
    title: "Governance Risk and Compliance",
    lede: "Regulatory compliance and risk mitigation with Eastwards GRC services.",
    blocks: [
      {
        kind: "lead",
        body: "With ever-evolving technologies, security definitions are evolving at a disruptive pace. A robust governance, risk, and compliance (GRC) program helps firms maintain overall security and protect their data from advanced and evolving threats. The GRC security system helps organizations detect and mitigate potential threats, comply with essential regulatory standards, and protect IT infrastructure while maintaining stakeholders’ trust.",
      },
      {
        kind: "prose",
        heading: "Governance Risk and Compliance Services",
        paragraphs: [
          "With Eastwards’ comprehensive view of GRC, we understand that governance, risk management, and compliance are interrelated disciplines. We build integration between the security models and GRC systems to ensure the firm is aligned with the GRC framework to create a robust and cohesive system. Our diverse range of GRC services helps organizations improve their GRC postures. Our services include:",
        ],
      },
      {
        kind: "bullets",
        items: [
          "Cybersecurity strategy and roadmap",
          "Policy development and management",
          "IT security risk management and IT resiliency assessment",
          "Regular technology assessments",
          "Alignment with regulatory compliance requirements",
          "Compliance consulting and internal audit",
          "Third-party security posture & compliance",
          "CISO as a Service",
        ],
      },
      {
        kind: "bullets",
        heading: "Our USPs",
        items: [
          "Leading-edge GRC technology solutions to streamline processes and enhance efficiency",
          "AI-driven solutions to enhance the effectiveness of the operations",
          "Flexible service offerings tailored to meet unique customer needs",
          "User-focused solutions to foster security awareness and spread awareness within the organizations",
          "Firm grasp of the latest GRC trends and best practices",
        ],
      },
    ],
  },
  {
    slug: "cloud-security",
    title: "Cloud Security",
    lede: "Security should never be a blocker in business transformation, the cloud works as an accelerator.",
    blocks: [
      {
        kind: "lead",
        body: "Cloud computing facilitates evolution and business growth by providing on-demand self-service and broad network access. Cloud computing offers scalability and flexibility, allowing resource pooling to serve clients dynamically and optimizing resources by measuring various parameters that aid resource capabilities. Along with the numerous benefits, cloud computing also introduces several risks in the security realm.",
      },
      {
        kind: "prose",
        paragraphs: [
          "Cloud security must cater to business agility, scalability, and growth in the cloud environment. Security should never be a blocker in business transformation, the cloud should work as an accelerator. Secure cloud platforms facilitate an IT ecosystem that can defend against a highly dynamic threat landscape, align with ever-evolving compliance requirements, and meet business requirements.",
        ],
      },
      {
        kind: "prose",
        heading: "Microsoft Solutions Partners",
        paragraphs: [
          "Eastwards is a Microsoft Solutions Partner in global security services. Eastwards provides best-in-class capability within a Microsoft solution area. Our expertise, proven methods, and creative approach aid in our clients’ cloud migration journey.",
          "Our Microsoft Cloud Security Solutions are based on some cardinal principles: they are tech-based, focused on prevention using threat intelligence and automation, and leverage the potential of AI/ML and other latest technologies, to deliver effective outcomes at a reasonable cost. Our solutions facilitate hybrid environments, empowering our client ecosystem on a multi-cloud landscape.",
        ],
      },
      {
        kind: "prose",
        heading: "Solution",
        paragraphs: [
          "We differentiate the uniqueness of every organization’s cloud journey and digital transformation needs and identify the common potential cloud-based security threats every organization exposes itself to. Eastwards implements a ZERO TRUST security model as the base framework to establish a unified security program to facilitate seamless migration to Azure. Additionally, Eastwards helps develop a systematic approach to secure data transfer across all devices and modernize the workplace. By aligning with NIST 800-207 standards for Zero Trust, we meet the clients’ requirements and create a tailored roadmap to achieve the target ecosystem. Through the strategized implementation of Microsoft’s native security capabilities, third-party solutions, and Eastwards frameworks, we ensure the optimal deployment of the Zero Trust model for your business growth and scalability. Eastwards solutions work in conjunction with AI/ML technology, essential security intelligence, and automation to deliver effective and long-term solutions at a reasonable price.",
        ],
      },
      {
        kind: "bullets",
        heading: "Benefits",
        items: [
          "Partner with Microsoft for cloud security services",
          "Have a global perspective of the compliance state of your Azure environment with our Zero Trust security model",
          "Enhance compliance with industry standards",
          "Supports secure collaboration and remote work environments and provides flexibility in engagement models",
          "Maintain and protect all cloud resources and facilitate multiple end-to-end cloud adoption and migration engagements",
        ],
      },
      {
        kind: "prose",
        heading: "Stay Ahead of Cyber Threats with Eastwards",
        paragraphs: [
          "Empowering your business with AI-driven visibility, rapid detection, and swift incident response.",
        ],
      },
    ],
  },
  {
    slug: "application-security",
    title: "Application Security & DevSecOps",
    lede: "Shift-left security, integrated early in the software development lifecycle.",
    blocks: [
      {
        kind: "lead",
        body: "With the rapid expansion of application transformation from on-premises to cloud computing or hybrid environments, the rate of potential risks and security breaches has increased multiple fold. This transition also induces breaches across the application layer. Integrating security measures early in the software development lifecycle in conjunction with DevOps helps organizations reduce costs, identify and mitigate potential risks in the early stages, and minimize impact during production rollouts. Additionally, application security provides an element of security through the Shift-left DevOps process.",
      },
      {
        kind: "prose",
        heading: "Solution",
        paragraphs: [
          "Eastwards application security services help organizations establish a holistic security ecosystem by implementing the latest innovations and technological changes. We enhance the security within DevOps using automation, helping reduce false detections and ensuring rapid countermeasures. We follow a three-step process that begins with threat modeling, followed by vulnerability assessment and intrusion testing on the application attack surface across all the firm’s devices. We map the maturity curve on the current blueprint of the organization and help assess the areas of improvement in the organization’s security ecosystem. Eastwards helps design the application security governance framework and modify the existing application landscape to establish DevSecOps. Our security framework helps organizations implement collaboration, automation, and agility within DevOps lifecycle phases.",
        ],
      },
      {
        kind: "panels",
        heading: "DevSecOps Services",
        groups: [
          {
            title: "Threat Modeling",
            body: "We help assess the digital landscape to identify potential risks and integrate security models within the design phases to shift left early in the SDLC process, which includes:",
            items: [
              {
                title:
                  "Using the STRIDE, VAST, or PASTA methodologies to identify potential threats",
              },
              { title: "Leveraging the DREAD model for severity ratings" },
              {
                title:
                  "Integrating threat models into the development lifecycle",
              },
            ],
          },
          {
            title: "Software Composition Analysis",
            body: "We help organizations manage open-source components and analyze threat patterns and vulnerabilities. Our service includes:",
            items: [
              { title: "Open-source governance" },
              { title: "Integration of SCA (Software Composition Analysis)" },
              { title: "Software bill of materials (BOM)" },
            ],
          },
          {
            title: "Static & Dynamic Application Security Testing",
            body: "We facilitate static development lifecycle testing with automated and comprehensive testing to shift-left security. Our service includes:",
            items: [
              { title: "AST tool integration into the IDE and CI/CD pipeline" },
              { title: "Mobile and API testing" },
              { title: "False detection analysis" },
              { title: "Intrusion testing" },
            ],
          },
          {
            title: "Application Vulnerability Management",
            body: "We help organizations draw the correlation between all vulnerabilities and automate and customize risk assessments, including:",
            items: [
              { title: "Vulnerability correlation" },
              { title: "De-duplication" },
              { title: "False positive analysis" },
              { title: "Dashboards and reporting" },
            ],
          },
        ],
      },
      {
        kind: "bullets",
        heading: "Benefits",
        items: [
          "Integrated agile methodology within the application security model",
          "Facilitates business scalability in the security validation process by mitigating manual inspection bottlenecks without compromising organizations’ data",
          "Develop self-service by facilitating automated security inspections as part of the deployment pipeline",
          "Maximized value at a lower cost for our clients without the need to invest in and own offshore assets",
          "Service delivered from a physically and logically secure (ISO 27001, SOC Type 2) facility",
          "Accelerated maturity, improvement, and faster response to incidents",
        ],
      },
    ],
  },
  {
    slug: "ai-security",
    title: "AI Security",
    lede: "Building trust in the digital era, securing AI end-to-end.",
    blocks: [
      {
        kind: "lead",
        body: "Artificial Intelligence (AI) is transforming industries, from healthcare and finance to retail and manufacturing. Yet, as organizations embrace AI to drive innovation and efficiency, they face a critical challenge: how to secure AI systems against evolving cyber threats.",
      },
      {
        kind: "prose",
        paragraphs: [
          "At Eastwards, we believe that protecting AI is not just about safeguarding technology, it’s about preserving trust, compliance, and business resilience.",
        ],
      },
      {
        kind: "prose",
        heading: "Why AI Security Matters",
        paragraphs: [
          "AI systems thrive on data, and that makes them prime targets for attackers. From adversarial inputs that trick algorithms into making wrong decisions, to poisoned training datasets that corrupt models at their core, the risks are real. Left unchecked, these vulnerabilities can lead to:",
        ],
      },
      {
        kind: "bullets",
        items: [
          "Data breaches exposing sensitive customer or patient information",
          "Model manipulation that undermines decision accuracy",
          "Compliance failures with regulations such as GDPR or HIPAA",
          "Loss of trust among customers, partners, and stakeholders",
        ],
      },
      {
        kind: "prose",
        paragraphs: [
          "Securing AI is therefore not optional, it is a strategic necessity for every modern enterprise.",
        ],
      },
      {
        kind: "prose",
        heading: "Common Threats Facing AI Systems",
        paragraphs: [
          "Organizations deploying AI must be aware of the most pressing risks:",
        ],
      },
      {
        kind: "cards",
        columns: 2,
        items: [
          {
            title: "Adversarial Attacks",
            body: "Subtle changes to inputs (images, text, or audio) that cause misclassification.",
          },
          {
            title: "Poisoning Attacks",
            body: "Corrupted training data that biases or destabilizes models.",
          },
          {
            title: "Model Extraction",
            body: "Reverse-engineering AI models to steal intellectual property or exploit sensitive outputs.",
          },
          {
            title: "Prompt Manipulation",
            body: "Tricking generative AI into producing harmful or misleading content.",
          },
        ],
      },
      {
        kind: "prose",
        heading: "Our Approach to Securing AI",
        paragraphs: [
          "Eastwards offers a comprehensive AI security framework designed to protect models, data, and infrastructure across the entire lifecycle:",
        ],
      },
      {
        kind: "cards",
        columns: 2,
        items: [
          {
            title: "Adversarial Training & Testing",
            body: "We harden models by exposing them to manipulated inputs during training, ensuring resilience against real-world attacks.",
          },
          {
            title: "Data Integrity & Validation",
            body: "Our teams implement strict input validation, anomaly detection, and continuous monitoring to prevent poisoning attempts.",
          },
          {
            title: "Model Protection & Access Control",
            body: "We safeguard proprietary models with encryption, role-based access, and multi-factor authentication to prevent theft or misuse.",
          },
          {
            title: "Explainable AI",
            body: "Transparency builds trust. We integrate explainability tools that allow stakeholders to understand and verify AI decisions.",
          },
          {
            title: "Regular Security Audits",
            body: "Through penetration testing, vulnerability assessments, and compliance checks, we ensure AI systems remain secure and aligned with regulations.",
          },
        ],
      },
      {
        kind: "prose",
        heading: "Emerging Trends We Address",
        paragraphs: [
          "AI security is a moving target. Our services anticipate and mitigate new risks such as:",
        ],
      },
      {
        kind: "cards",
        items: [
          {
            title: "Federated Learning",
            body: "Protecting data privacy without centralizing sensitive information.",
          },
          {
            title: "Supply Chain Security",
            body: "Ensuring third-party datasets and pre-trained models are verified and trustworthy.",
          },
          {
            title: "Ethical AI Governance",
            body: "Embedding fairness, accountability, and compliance into every deployment.",
          },
        ],
      },
      {
        kind: "prose",
        heading: "Why Partner with Eastwards",
        paragraphs: [
          "By choosing Eastwards, organizations gain more than technical safeguards, they gain a strategic partner committed to ensuring AI delivers value securely. Our expertise helps businesses:",
        ],
      },
      {
        kind: "bullets",
        items: [
          "Protect intellectual property",
          "Maintain compliance with global standards",
          "Build customer trust through secure, ethical AI practices",
          "Enable innovation without compromising resilience",
        ],
      },
      {
        kind: "prose",
        paragraphs: [
          "AI is the future of business, but without robust security, its promise can quickly turn into risk. At Eastwards, we help enterprises secure their AI systems end-to-end, ensuring they remain reliable, compliant, and future-ready.",
        ],
      },
    ],
  },
];
