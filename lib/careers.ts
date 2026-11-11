import { contact } from "@/lib/content";

/* Careers page content: the client's copy (supplied 2026-11-11) plus the
   application form's labels and rules. Rendering lives in components/careers,
   the server checks in app/api/careers. Openings are data: add a row to
   `openings` and it appears under Open positions, grouped by team, and in
   the form's position menu. */

export type Opening = {
  slug: string;
  title: string;
  team: string;
  location: string;
  type: string;
};

export type CareersIcon = "cpu" | "graduation" | "globe" | "target";

const { location } = contact;

export const CAREERS_EMAIL = "careers@eastwards.co";

/* Upload rules, shared by the form and the API so they can't drift */
export const CV_RULES = {
  maxBytes: 5 * 1024 * 1024,
  maxLabel: "5 MB",
  extensions: ["pdf", "doc", "docx"] as const,
  accept:
    ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

export const GENERAL_APPLICATION = "General Application";

export const careers = {
  title: "Careers",
  description:
    "Careers at Eastwards: work on Quantum Computing, Generative AI and cloud-native engineering with a Singapore-headquartered team. Send your application.",
  hero: {
    label: "Careers",
    title: "Shape the Future of",
    highlight: "Intelligent Growth.",
    lede: "At Eastwards, we don’t just hire for skills; we hire for mindset. We are looking for builders, thinkers, and problem-solvers who are passionate about using technology to solve the world’s most complex enterprise challenges.",
    primary: "Join the team",
    secondary: "View open positions",
    // under the tile chart: a fact from the copy, not a claim of our own
    caption: "Over 20 years of experience in global IT delivery.",
  },
  // Annie Spratt on Unsplash, free under the Unsplash License (no credit required):
  // https://unsplash.com/photos/group-of-people-using-laptop-computer-QckxruozjRg
  photo: {
    src: "/images/careers-team.jpg",
    alt: "A team working together on laptops around a shared table",
    width: 2000,
    height: 1334,
  },
  /* Facts restated from the copy below, nothing new */
  facts: [
    { value: "20+", label: "Years of leadership experience in global IT delivery" },
    { value: "Singapore", label: "Headquarters, with a global mindset" },
    { value: "Global", label: "International projects across diverse markets and industries" },
  ],
  /* Two-tone headings, ink lead then grey rest, as on attio.com/careers */
  statement: {
    lead: "We hire for mindset.",
    rest: "As a member of the Eastwards team, you will be at the forefront of digital engineering, working alongside industry veterans to deliver high-impact solutions for a global clientele.",
  },
  why: {
    label: "Why Join Eastwards?",
    lede: "Pioneering work, seasoned mentors, global projects and real ownership.",
    items: [
      {
        icon: "cpu" as CareersIcon,
        title: "Work on the Cutting Edge",
        body: "From Quantum Computing and Generative AI to high-scale Cloud-Native Architecture, you will work with technologies that are defining the next decade of business. At Eastwards, “innovation” isn’t a buzzword; it’s our daily output.",
      },
      {
        icon: "graduation" as CareersIcon,
        title: "Learn from the Best",
        body: "With a leadership team boasting over 20 years of experience in global IT delivery, mentorship is built into our DNA. You will work in a high-performance environment where engineering rigor and best practices are the standard.",
      },
      {
        icon: "globe" as CareersIcon,
        title: "Global Impact, Local Roots",
        body: "Headquartered in Singapore, we operate with a global mindset. You will have the opportunity to collaborate on international projects, gaining exposure to diverse markets and industries.",
      },
      {
        icon: "target" as CareersIcon,
        title: "Culture of Ownership",
        body: "We believe in autonomy. We empower our consultants and engineers to take ownership of their work, encouraging creative problem-solving and a “client-first” mentality.",
      },
    ],
  },
  values: {
    label: "Our Values in Action.",
    lede: "How we work, with our clients and with each other.",
    items: [
      {
        title: "Engineering Excellence",
        body: "We don’t cut corners. We believe in automated testing, CI/CD, and clean, scalable code.",
      },
      { title: "Integrity & Transparency", body: "We are honest with our clients and with each other." },
      {
        title: "Continuous Growth",
        body: "The tech landscape changes weekly; we provide the resources and environment for you to keep your skills sharp.",
      },
    ],
  },
  positions: {
    label: "View Jobs",
    title: "Open positions.",
    intro: "Browse current openings, or send a general application and tell us where you would add the most value.",
    // add roles here as they open
    openings: [] as Opening[],
    generalTeam: "Open Applications",
    general: { title: GENERAL_APPLICATION, location: "All locations" },
    empty: "No specific roles are listed right now. General applications are always open.",
    apply: "Apply",
  },
  apply: {
    title: "Join the Team",
    lede: "Ready to take the next step in your career? We make the process simple for top talent.",
    howTitle: "How to Apply",
    steps: [
      {
        title: "Submit via Website",
        body: "Use our online application portal to upload your CV and portfolio directly.",
      },
      {
        title: "Email Us",
        body: "Send your resume and a brief introduction to our talent acquisition team at",
        email: CAREERS_EMAIL,
      },
    ],
    // Jud Mackrill on Unsplash, free under the Unsplash License (no credit required):
    // https://unsplash.com/photos/four-coworkers-smiling-around-laptop-at-table-Of_m3hMsoAA
    photo: {
      src: "/images/careers-apply.jpg",
      alt: "Four colleagues smiling around a laptop at a shared desk",
      width: 1400,
      height: 933,
    },
    company: location.company,
    address: `${location.street}, ${location.unit} ${location.building}, ${location.postalCode}`,
    eeo: "Eastwards is an equal opportunity employer. We celebrate diversity and are committed to creating an inclusive environment for all employees.",
  },
  /* Job alerts: the address goes to the talent team's inbox (app/api/careers/alerts) */
  alerts: {
    title: "Right role, right time.",
    lede: "Leave your email and we’ll let you know when relevant roles open up.",
    label: "Your email address",
    submit: "Notify me",
    sending: "Saving...",
    done: "You’re on the list. We’ll be in touch when a relevant role opens.",
    invalid: "Enter a valid email address, like name@example.com.",
    failed: "That didn’t go through. Try again, or email",
  },
  /* Where to follow along: the verified profiles from the footer, plus email */
  updates: {
    title: "Keep up to date.",
    lede: "Follow what the team is building.",
    channels: [
      { id: "LinkedIn", title: "LinkedIn", text: "Company news and new roles as they open." },
      { id: "YouTube", title: "YouTube", text: "Watch what the team is working on." },
      { id: "Instagram", title: "Instagram", text: "A look at life at Eastwards." },
      { id: "Email", title: "Email", text: "Questions about a role? Write to us." },
    ],
  },
  form: {
    title: "Application form",
    intro: "Takes about two minutes. Fields marked optional can be left blank.",
    // what they do; the position (General Application or an opening) is separate
    areas: [
      "Software & Product Engineering",
      "Data & AI",
      "Quantum Computing",
      "Cybersecurity",
      "Cloud & Infrastructure",
      "Consulting & Project Delivery",
      "IT Support & Device Management",
      "Other",
    ],
    cv: {
      label: "CV / Resume",
      cta: "Choose a file",
      drop: "or drag it here",
      hint: `PDF, DOC or DOCX, up to ${CV_RULES.maxLabel}`,
      remove: "Remove",
    },
    consent: "I agree that Eastwards may store and process my application for recruitment purposes, as described in the [Privacy Policy](/privacy).",
    submit: "Submit Application",
    sending: "Sending...",
    sent: {
      title: "Application received",
      before: "Thank you. We’ve sent a confirmation to",
      after: "and our talent acquisition team will be in touch if there is a match.",
      again: "Submit another application",
    },
    failed: {
      text: "Your application didn’t send. Try again, or",
      link: "email it to us instead",
      note: "(attach your CV to the email)",
      subject: "Job application",
    },
  },
} as const;
