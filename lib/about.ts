/* About page content. Every sentence is from the client's About document
   (supplied 2026-11-16) and nothing else: the client asked for that text
   only. Hyphens lost in the document's paste are restored (hands-on,
   long-term), and the spaced dashes between a term and its text become the
   title/body split. Rendering lives in components/about. */

export type PromiseIcon = "rocket" | "shield" | "trend";

export type Layer = {
  id: string;
  title: string;
  // short name for the layer index beside the stack
  short: string;
  items: readonly { title: string; body: string }[];
  /* Photos from Unsplash, free license (no credit required); the
     credit comment above each names the photographer and source. */
  image: { src: string; alt: string };
};

export const about = {
  title: "About Us",
  // meta description: the document's opening sentence
  lede: "At Eastwards, we help enterprises transform digital complexity into measurable advantage.",
  hero: {
    title: "Guiding Enterprises Toward Intelligent Growth.",
    body: "At Eastwards, we help enterprises transform digital complexity into measurable advantage. Headquartered in Singapore with a global delivery footprint, we combine strategic insight with hands-on engineering to design, secure, and operate the platforms that power modern business.",
    primary: { label: "Contact Us", href: "/contact" },
    secondary: { label: "Comprehensive Digital Solutions", href: "#capabilities" },
    photo: {
      src: "/images/people.jpg",
      alt: "Eastwards team working together around a table",
      width: 1594,
      height: 1054,
    },
    // two facts from the statement above, pinned on the photo
    place: { title: "Headquartered in Singapore", detail: "Global delivery footprint" },
  },
  mission: {
    title: "Mission",
    statement: "To make digital transformation predictable, secure, and outcome-driven.",
    body: "We view transformation as a continuous capability, not a one-off project. By aligning engineering rigor with business priorities, we deliver measurable ROI and long-term resilience.",
  },
  foundation: {
    title: "Our Foundation",
    statement:
      "Founded by senior IT and delivery leaders with over 20 years of experience, Eastwards bridges legacy operations with future-ready innovation.",
    body: "We blend deep technical expertise with pragmatic delivery practices so clients can reduce risk, scale reliably, and unlock new revenue streams.",
  },
  promise: {
    title: "Our promise",
    items: [
      { icon: "rocket" as PromiseIcon, title: "Faster time to market" },
      { icon: "shield" as PromiseIcon, title: "Lower operational risk" },
      { icon: "trend" as PromiseIcon, title: "Sustained cost efficiency" },
    ],
  },
  capabilities: {
    title: "Comprehensive Digital Solutions.",
    layer: "Layer",
    of: "of",
    layers: [
      {
        id: "innovation-engineering",
        title: "Innovation & Engineering",
        short: "Engineering",
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
        // James Harrison, https://unsplash.com/photos/vpOeXr5wmR4
        image: { src: "/images/about-engineering.jpg", alt: "A laptop showing source code on a desk" },
      },
      {
        id: "resilience-security",
        title: "Resilience & Security",
        short: "Security",
        items: [
          { title: "Cybersecurity Services", body: "Risk assessments, security engineering, and compliance built into delivery." },
          { title: "Infrastructure & Cloud", body: "Resilient migrations, hybrid architectures, and cost optimization." },
          { title: "Modern Device Management", body: "Secure remote work enablement and unified endpoint management." },
        ],
        // Albert Stoynov, https://unsplash.com/photos/dyUp7WPu5q4
        image: { src: "/images/about-security.jpg", alt: "Network cables plugged into a switch lit in blue" },
      },
      {
        id: "delivery-talent",
        title: "Delivery & Talent",
        short: "Delivery",
        items: [
          {
            title: "Projects & Professional Services",
            body: "Program management and solution architecture to ensure projects land on time and on budget.",
          },
          { title: "IT Staffing Services", body: "Flexible access to vetted technical talent for specialized or long-term needs." },
          {
            title: "Digital Support Services",
            body: "24/7 managed services and UX operations to keep systems reliable and user experiences consistent.",
          },
        ],
        // airfocus, https://unsplash.com/photos/v89zhr0iBFY
        image: { src: "/images/about-delivery.jpg", alt: "Two colleagues planning a project on a board of notes" },
      },
      {
        id: "why-eastwards",
        title: "Why Organizations Choose Eastwards",
        short: "Why Eastwards",
        items: [
          { title: "Proven Expertise", body: "Decades of leadership in large-scale transformations across industries." },
          { title: "Outcome Focused", body: "Success measured by reduced cycle time, improved uptime, and demonstrable ROI." },
          { title: "Security by Design", body: "Compliance and security embedded from day one." },
          { title: "Global Reach, Local Sensibility", body: "Strategic hub in Singapore with delivery tailored to local markets." },
          {
            title: "Ecosystem Alliances",
            body: "Partnerships with leading technology vendors for validated, high-performance solutions.",
          },
        ],
        // Vitaly Gariev, https://unsplash.com/photos/d80Nf1ptTfY
        image: { src: "/images/about-why.jpg", alt: "A consultant presenting results charts to a team" },
      },
      {
        id: "partner-in-growth",
        // the document's "Our Approach – Your Partner in Growth", dash as a colon
        title: "Our Approach: Your Partner in Growth",
        short: "Our Approach",
        items: [
          { title: "Client First", body: "Engagements begin with your strategic goals and measurable outcomes." },
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
        // Radission US, https://unsplash.com/photos/_XeQ8XEWb4Q
        image: { src: "/images/about-partner.jpg", alt: "Two people shaking hands across a meeting table" },
      },
    ] satisfies readonly Layer[],
  },
  // each step opens the contact form, with the matching requirement chosen where one exists
  nextStep: {
    title: "Take the Next Step.",
    items: [
      {
        title: "Book a Quantum Readiness Review",
        body: "A 30-minute assessment with quick wins and a 90-day roadmap.",
        href: "/contact?requirement=Quantum%20Computing",
      },
      { title: "Request a Case Study", body: "Get a detailed case study tailored to your industry.", href: "/contact" },
      {
        title: "Engage Talent Fast",
        body: "Access vetted technical specialists for immediate project needs.",
        href: "/contact?requirement=IT%20Staffing%20Services",
      },
    ],
  },
} as const;
