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

/* Services nav dropdown — labels and order from the approved dropdown mock.
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
      { label: "Threat Monitoring & Incident Response", href: "/services" },
      { label: "Infrastructure Security", href: "/services" },
      { label: "Identity and Access Management", href: "/services" },
      { label: "Governance Risk and Compliance", href: "/services" },
      { label: "Cloud Security", href: "/services" },
      { label: "Application Security", href: "/services" },
      { label: "AI Security", href: "/services" },
    ],
  },
  { label: "Infrastructure and Cloud services", href: "/services" },
  { label: "Modern Device Management", href: "/services" },
];

export const hero = {
  headline: "Technology that moves business forward",
  subtext:
    "We help businesses navigate complexity and move forward with the right technology, engineering, and expertise.",
  cta: "Find your solution",
  image: "/images/hero-tiles.png",
  mobileImage: "/images/hero-mobile.png",
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
    lede: "Applications modernized, managed, and enhanced — powerful engines of growth.",
    blocks: [
      {
        kind: "lead",
        body: "At Eastwards, we help businesses unlock the full potential of their applications by modernizing, managing, and enhancing them to function as powerful engines of growth. Our approach goes beyond routine support — we deliver end-to-end transformation, from initial assessment and design to development, testing, and optimization.",
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
    lede: "Roadmaps aligned with your digital transformation goals — and the best ROI.",
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
        body: "The shift to quantum computing is not just an upgrade in speed — it is a fundamental change in how businesses solve the “unsolvable.” At Eastwards, we provide a comprehensive transition framework designed to make your organization Quantum Ready.",
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
                body: "Deep-dive analysis to select the “low-hanging fruit” projects — such as portfolio optimization, molecular docking, or supply chain scheduling.",
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
                body: "We build industry-specific training modules — whether it’s quantum chemistry for Pharma or quantum risk modeling for Banking.",
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
];
