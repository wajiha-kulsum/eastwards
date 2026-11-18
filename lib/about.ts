/* About page content. Every sentence is from the client's About document
   (supplied 2026-11-16) and nothing else: the client asked for that text
   only. Hyphens lost in the document's paste are restored (hands-on,
   long-term), and the spaced dashes between a term and its text become the
   title/body split. Rendering lives in components/about.

   Photos are from Unsplash, free license (no credit required); the comment
   above each names the photographer and source. */

type Photo = { src: string; alt: string };

export type Specialisation = { title: string; body: string; image: Photo };

export type Layer = {
  id: string;
  title: string;
  // short name for the progress line beside the walkthrough
  short: string;
  items: readonly Specialisation[];
};

export const about = {
  title: "About Us",
  // meta description: the document's opening sentence
  lede: "At Eastwards, we help enterprises transform digital complexity into measurable advantage.",
  hero: {
    title: "Guiding Enterprises Toward Intelligent Growth.",
    // the document's opening paragraph: its first sentence leads in ink, the rest follows in grey
    intro: {
      lead: "At Eastwards, we help enterprises transform digital complexity into measurable advantage.",
      rest: "Headquartered in Singapore with a global delivery footprint, we combine strategic insight with hands-on engineering to design, secure, and operate the platforms that power modern business.",
    },
    photo: {
      src: "/images/people.jpg",
      alt: "Eastwards team working together around a table",
      width: 1594,
      height: 1054,
    },
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
      { title: "Faster time to market" },
      { title: "Lower operational risk" },
      { title: "Sustained cost efficiency" },
    ],
  },
  capabilities: {
    title: "Comprehensive Digital Solutions.",
    layers: [
      {
        id: "innovation-engineering",
        title: "Innovation & Engineering",
        short: "Engineering",
        items: [
          {
            title: "Application Development & Product Engineering",
            body: "Cloud-native web and mobile platforms, from discovery to continuous delivery.",
            // Balázs Kétyi, https://unsplash.com/photos/sScmok4Iq1o
            image: { src: "/images/about-app-development.jpg", alt: "A hand holding a phone with a mobile app dashboard" },
          },
          {
            title: "Quantum Computing Advisory",
            body: "Feasibility studies and strategic roadmaps for organizations exploring quantum advantage.",
            // Brecht Corbeel, https://unsplash.com/photos/hEoOAYIo0oU
            image: { src: "/images/about-quantum.jpg", alt: "A processor chip inside a glowing golden ring" },
          },
          {
            title: "Data & Artificial Intelligence",
            body: "Data engineering, analytics, and ML operationalization to turn information into strategic assets.",
            // Carlos Muza, https://unsplash.com/photos/hpjSkU2UYSU
            image: { src: "/images/about-data-ai.jpg", alt: "A laptop showing an analytics dashboard with charts" },
          },
        ],
      },
      {
        id: "resilience-security",
        title: "Resilience & Security",
        short: "Security",
        items: [
          {
            title: "Cybersecurity Services",
            body: "Risk assessments, security engineering, and compliance built into delivery.",
            // Adi Goldstein, https://unsplash.com/photos/EUsVwEOsblE
            image: { src: "/images/about-cybersecurity.jpg", alt: "A circuit board lit in teal" },
          },
          {
            title: "Infrastructure & Cloud",
            body: "Resilient migrations, hybrid architectures, and cost optimization.",
            // Taylor Vick, https://unsplash.com/photos/M5tzZtFCOfs
            image: { src: "/images/about-cloud.jpg", alt: "Server racks with network cables in a data center" },
          },
          {
            title: "Modern Device Management",
            body: "Secure remote work enablement and unified endpoint management.",
            // Firmbee.com, https://unsplash.com/photos/2mc2B5iX6as
            image: { src: "/images/about-devices.jpg", alt: "A laptop, a tablet and a phone side by side on a desk" },
          },
        ],
      },
      {
        id: "delivery-talent",
        title: "Delivery & Talent",
        short: "Delivery",
        items: [
          {
            title: "Projects & Professional Services",
            body: "Program management and solution architecture to ensure projects land on time and on budget.",
            // Memento Media, https://unsplash.com/photos/2pPw5Glro5I
            image: { src: "/images/about-projects.jpg", alt: "A project team meeting around a conference table" },
          },
          {
            title: "IT Staffing Services",
            body: "Flexible access to vetted technical talent for specialized or long-term needs.",
            // Resume Genius, https://unsplash.com/photos/IESB4iFVuzA
            image: { src: "/images/about-staffing.jpg", alt: "A candidate shaking hands with a hiring manager after an interview" },
          },
          {
            title: "Digital Support Services",
            body: "24/7 managed services and UX operations to keep systems reliable and user experiences consistent.",
            // Petr Macháček, https://unsplash.com/photos/BeVGrXEktIk
            image: { src: "/images/about-support.jpg", alt: "A support headset resting beside a laptop" },
          },
        ],
      },
    ] satisfies readonly Layer[],
  },
  why: {
    title: "Why Organizations Choose Eastwards",
    items: [
      { title: "Proven Expertise", body: "Decades of leadership in large-scale transformations across industries." },
      { title: "Outcome Focused", body: "Success measured by reduced cycle time, improved uptime, and demonstrable ROI." },
      {
        title: "End-to-End Delivery",
        body: "One partner from strategy and design through build, run, and ongoing support.",
      },
      { title: "Security by Design", body: "Compliance and security embedded from day one." },
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
  approach: {
    // the document's "Our Approach – Your Partner in Growth", dash as a colon
    title: "Our Approach: Your Partner in Growth",
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
    // Kaleidico, https://unsplash.com/photos/3V8xo5Gbusk
    image: { src: "/images/about-approach.jpg", alt: "Two colleagues working through a plan on a whiteboard" },
  },
  // each step opens the contact form, with the matching requirement chosen where one exists
  nextStep: {
    title: "Take the Next Step.",
    // Amy Hirschi, https://unsplash.com/photos/JaoVGh5aJ3E
    image: { src: "/images/about-next-step.jpg", alt: "Two colleagues talking through a plan over a laptop" },
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
