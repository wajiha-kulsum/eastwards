/* About page content. The words are the client's approved About copy,
   reorganized for the redesign: the hero line, the "who we are" statement
   with its promise split into its three outcomes, and the five capability
   layers, each with a photo. Rendering lives in components/about. */

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
  // meta description and the hero's second line
  lede: "Nobody builds alone. It takes the right people, a fresh perspective, and a shared idea to make something click.",
  hero: {
    label: "About Us",
    lead: "Nobody builds alone.",
    rest: "It takes the right people, a fresh perspective, and a shared idea to make something click.",
    primary: { label: "Talk to our team", href: "/contact" },
    secondary: { label: "See how we work", href: "#capabilities" },
    photo: {
      src: "/images/people.jpg",
      alt: "Eastwards team working together around a table",
      width: 1594,
      height: 1054,
    },
    // two facts from the statement below, pinned on the photo
    place: { title: "Singapore HQ", detail: "Global delivery footprint" },
  },
  intro: {
    title: "We provide solutions that drive business.",
    body: "At Eastwards, we help enterprises transform digital complexity into measurable advantage. Headquartered in Singapore with a global delivery footprint, we combine strategic insight with hands-on engineering to design, secure, and operate the platforms that power modern business.",
    promiseTitle: "Our promise",
    promise: [
      { icon: "rocket" as PromiseIcon, title: "Faster time to market" },
      { icon: "shield" as PromiseIcon, title: "Lower operational risk" },
      { icon: "trend" as PromiseIcon, title: "Sustained cost efficiency" },
    ],
  },
  capabilities: {
    title: "Comprehensive Digital Solutions.",
    lede: "Five layers, from the first line of code to the results that matter.",
    layer: "Layer",
    of: "of",
    layers: [
      {
        id: "innovation-engineering",
        title: "Innovation & Engineering",
        short: "Engineering",
        items: [
          { title: "Application Development & Product Engineering", body: "Web and mobile products built to grow with your business." },
          { title: "Quantum Computing Advisory", body: "Explore quantum possibilities and find where they fit." },
          { title: "Data & Artificial Intelligence", body: "Turn data into insights and AI into real value." },
        ],
        // James Harrison, https://unsplash.com/photos/vpOeXr5wmR4
        image: { src: "/images/about-engineering.jpg", alt: "A laptop showing source code on a desk" },
      },
      {
        id: "resilience-security",
        title: "Resilience & Security",
        short: "Security",
        items: [
          { title: "Cybersecurity Services", body: "Spot risks early and protect what matters." },
          { title: "Infrastructure & Cloud", body: "Build smarter, more flexible cloud infrastructure." },
          { title: "Modern Device Management", body: "Keep devices secure and teams connected." },
        ],
        // Albert Stoynov, https://unsplash.com/photos/dyUp7WPu5q4
        image: { src: "/images/about-security.jpg", alt: "Network cables plugged into a switch lit in blue" },
      },
      {
        id: "delivery-talent",
        title: "Delivery & Talent",
        short: "Delivery",
        items: [
          { title: "Projects & Professional Services", body: "Bring clarity, expertise, and momentum to every project." },
          { title: "IT Staffing Services", body: "Find the right technical talent for your team." },
          { title: "Digital Support Services", body: "Keep your systems running and your users supported." },
        ],
        // airfocus, https://unsplash.com/photos/v89zhr0iBFY
        image: { src: "/images/about-delivery.jpg", alt: "Two colleagues planning a project on a board of notes" },
      },
      {
        id: "partner-in-growth",
        title: "Your Partner in Growth",
        short: "Partnership",
        items: [
          { title: "We Listen First", body: "We understand your needs before jumping into solutions." },
          { title: "We Build Together", body: "We share progress, adapt quickly, and keep you involved." },
          { title: "We Grow Together", body: "We share knowledge and build lasting partnerships." },
        ],
        // Radission US, https://unsplash.com/photos/_XeQ8XEWb4Q
        image: { src: "/images/about-partner.jpg", alt: "Two people shaking hands across a meeting table" },
      },
      {
        id: "why-eastwards",
        title: "Why Choose Eastwards",
        short: "Why Eastwards",
        items: [
          { title: "Experience That Counts", body: "Technical expertise focused on your challenges." },
          { title: "Results That Matter", body: "Solutions built around meaningful business outcomes." },
          { title: "Better Together", body: "The right people and expertise, working as one." },
        ],
        // Vitaly Gariev, https://unsplash.com/photos/d80Nf1ptTfY
        image: { src: "/images/about-why.jpg", alt: "A consultant presenting results charts to a team" },
      },
    ] satisfies readonly Layer[],
  },
  channels: {
    title: "Talk to the right team.",
    lede: "Need to reach a specific department? Use the direct lines below for a faster response.",
  },
} as const;
