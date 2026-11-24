/* Copy for /services/ai-security, written from the client's service brief
   (AI_Security_Service.txt) in a plain, peer-to-peer voice. No dashes or
   slashes in visible text, and no years in framework names so it stays
   accurate through 2027. */

const SCOPING_CALL = "/contact?requirement=Cybersecurity";

export const aiSecurity = {
  hero: {
    tag: "AI Security",
    title: "Ship AI fast.",
    highlight: "Keep your data safe.",
    lede: "Your team is shipping agents that read inboxes, query customer data and call real tools. We make sure none of them can be talked into something you would never sign off on.",
    primary: { label: "Book a 20-minute scoping call", href: SCOPING_CALL },
    secondary: { label: "Request a fixed-fee Quick-Scan", href: "#quick-scan" },
    frameworks:
      "Independent, based in Singapore and working worldwide. Every control we ship maps to IMDA's Agentic AI framework, CSA's AI security guidelines, the PDPA, OWASP, the NIST AI RMF and ISO/IEC 42001.",
  },

  /* The hero's illustration: one agent run as runtime guardrails see it.
     Illustrative, and labelled so. */
  trace: {
    title: "Support agent, one run",
    tag: "Example",
    caption: "Example: what runtime controls catch in a single agent run",
    steps: [
      { status: "Allowed", tool: "crm.read_contact", note: "Scoped to the ticket owner" },
      { status: "Allowed", tool: "kb.search", note: "Tenant filter on the vector index" },
      { status: "Redacted", tool: "llm.complete", note: "Card number removed before the model call" },
      { status: "Blocked", tool: "email.send", note: "Instruction hidden in an attached PDF" },
      { status: "Held", tool: "payments.refund", note: "Over the limit, waiting for a human" },
    ],
    footer: "Every step logged for oversight audits",
    // the held step waits for the visitor: they play the human in the loop
    approve: "Approve",
    decline: "Decline",
    approved: { status: "Approved", note: "Released by a human reviewer" },
    declined: { status: "Declined", note: "Stopped by a human reviewer" },
    replay: "Replay run",
    logged: "Decision logged to the audit trail",
  },

  /* A wide photo with one plain statement, in place of a row of numbers */
  band: {
    image: {
      src: "/images/about-approach.jpg",
      alt: "Two engineers mapping a system on a whiteboard",
    },
    statement: "Most AI incidents are designed in, not hacked in.",
    body: "A permission nobody questioned. An index that ignores who is asking. So we start where your system starts: the architecture, with your team, at the whiteboard. Twenty years of global IT delivery, now pointed at the AI you ship.",
  },

  nav: {
    label: "On this page",
    items: [
      { id: "risk", label: "The risk" },
      { id: "services", label: "Services" },
      { id: "why", label: "Why Eastwards" },
      { id: "quick-scan", label: "Quick-Scan" },
    ],
  },

  risk: {
    lead: "Your AI can read, write and act.",
    rest: "Make sure it only does what you intended.",
    paragraphs: [
      "The attack arrives as ordinary text: a web page, a PDF, a support ticket. Firewalls and WAFs let it straight through, and your agent reads it as an instruction.",
      "For a growing business one incident costs far more than the fix. It stalls the enterprise deal, triggers PDPA obligations and spends the trust your product runs on.",
    ],
    map: {
      label: "Where an agent gets attacked",
      center: "Your AI agent",
      attackLabel: "How it happens",
      controlLabel: "What we put in place",
      scrollHint: "Scroll for the next surface",
      next: "Next surface",
      restart: "Start again",
      surfaces: [
        {
          id: "rag",
          label: "RAG and vector databases",
          attack: "A sales rep asks the assistant a simple question and gets an answer built from HR files they were never cleared to see.",
          control: "Permission-aware retrieval, filtered per user and per tenant.",
        },
        {
          id: "mcp",
          label: "MCP tool integrations",
          attack: "A third-party tool's description carries hidden instructions, and the agent follows them on its next call.",
          control: "Allow-listed tools, pinned versions and scoped tool permissions.",
        },
        {
          id: "browser",
          label: "Browser and desktop agents",
          attack: "A page the agent visits tells it to open a new tab, sign in and export your customer list.",
          control: "Sandboxed sessions, and a human approval before anything leaves the browser.",
        },
        {
          id: "delegation",
          label: "Multi-agent delegation",
          attack: "A low-trust research agent hands a payment task to a finance agent that trusts any internal request.",
          control: "Delegation that checks each agent's rights at every hop.",
        },
        {
          id: "identity",
          label: "Non-human identities",
          attack: "One long-lived API key lets an agent read every customer's records, and the key sits in a prompt log.",
          control: "Short-lived, narrowly scoped credentials for every agent and tool.",
        },
        {
          id: "shadow",
          label: "Shadow AI and AI SaaS",
          attack: "Someone pastes a customer contract into an AI app nobody vetted, and it may now train someone else's model.",
          control: "An approved tools list and a vendor review your team can repeat.",
        },
      ],
    },
  },

  pillars: {
    lead: "Four services across the AI lifecycle.",
    rest: "From the first architecture review to oversight in production.",
    outcomeLabel: "You get",
    items: [
      {
        n: "01",
        stage: "Before you build",
        title: "AI, Agentic & Third-Party Vendor Risk Assessment",
        body: "Know exactly what your AI can see, touch and send before an attacker or an auditor finds out.",
        points: [
          "Architecture and data-flow mapping",
          "RAG pipelines, MCP tools and computer-use agents",
          "Shadow AI and third-party AI SaaS vendor vetting",
          "Compliance gap analysis against IMDA, CSA, the PDPA and OWASP",
        ],
        outcome: "A risk register and compliance gap report",
      },
      {
        n: "02",
        stage: "While you build",
        title: "Deterministic Guardrails & Zero-Trust Controls",
        body: "Replace fragile prompt rules with controls written in code, so no clever input can talk its way past them.",
        points: [
          "Code-level input and output guardrails",
          "Scoped, short-lived credentials for non-human identities",
          "PII redaction before data reaches a model",
          "Human-in-the-loop approval for irreversible actions",
        ],
        outcome: "Guardrails in your codebase, with tests",
      },
      {
        n: "03",
        stage: "Before launch",
        title: "Adversarial LLM & Multi-Agent Red Teaming",
        body: "We attack your system the way a real adversary would, then prove the fixes hold before launch.",
        points: [
          "Jailbreaks and direct prompt injection",
          "Indirect prompt injection through documents, web pages and email",
          "Memory and context poisoning",
          "Cross-agent delegation hijacking",
        ],
        outcome: "An attack report with verified fixes",
      },
      {
        n: "04",
        stage: "After launch",
        title: "Continuous AI Runtime Monitoring & Governance",
        body: "Keep your controls working as models, prompts and tools change after go-live.",
        points: [
          "Runtime telemetry on prompts and tool calls",
          "Anomaly alerts on agent behavior",
          "Human-oversight log audits",
          "Checks for drift and automation bias",
        ],
        outcome: "A monthly oversight report",
      },
    ],
  },

  why: {
    lead: "Why Eastwards Consulting.",
    rest: "Senior security work, sized for lean teams.",
    body: "We are an independent IT and AI security consultancy in Singapore. We work alongside your engineers, leave the controls in your codebase and the evidence in your hands, and keep the paperwork to what your buyers actually ask for.",
    link: { label: "Talk to a consultant", href: SCOPING_CALL },
    image: {
      src: "/images/contact-singapore.jpg",
      alt: "The Singapore skyline across Marina Bay",
      caption: "Headquartered in Singapore, serving clients across APAC, the US, the UK and Europe",
    },
    items: [
      {
        title: "Vendor-neutral advice",
        body: "We sell no AI platform and take no referral fees, so our advice fits the stack you already run: Azure OpenAI, AWS Bedrock, Google Vertex AI or open-source agents.",
      },
      {
        title: "Fixed fees, sized for SMBs",
        body: "Scoped sprints with the price agreed upfront, built for lean engineering teams and run alongside your releases instead of in their way.",
      },
      {
        title: "Documentation buyers accept",
        body: "Evidence mapped to IMDA, OWASP, the NIST AI RMF and ISO/IEC 42001, ready for the vendor due diligence questionnaires enterprise customers send before they sign.",
      },
    ],
  },

  quickScan: {
    tag: "Start here",
    title: "The AI Security Quick-Scan",
    body: "A fast, fixed-fee first engagement. In one to two weeks you know where your AI is exposed, what to fix first and what it will take.",
    facts: [
      { label: "Turnaround", value: "1 to 2 weeks" },
      { label: "Fee", value: "Fixed price" },
    ],
    deliverablesLabel: "What you get",
    deliverables: [
      "Architecture and data-flow review",
      "AI risk heatmap",
      "Prioritized remediation roadmap",
      "IMDA, PDPA and OWASP gap summary",
    ],
    primary: { label: "Request a Quick-Scan", href: SCOPING_CALL },
    /* One page of a sample Quick-Scan report. Scores are likelihood times
       impact on a 1 to 4 scale; the bands follow the usual risk-matrix cut-offs. */
    heatmap: {
      document: "Quick-Scan report",
      tag: "Sample report",
      title: "Risk heatmap",
      likelihood: "Likelihood",
      impact: "Impact",
      likelihoodLevels: ["Rare", "Possible", "Likely", "Almost certain"],
      impactLevels: ["Minor", "Moderate", "Major", "Severe"],
      priorityLabel: "Fix",
      // [likelihood, impact] on a 1 to 4 scale
      findings: [
        { at: [4, 4], label: "Prompt injection through inbound email", priority: "Now" },
        { at: [3, 3], label: "Agent token scoped to every customer", priority: "This sprint" },
        { at: [2, 2], label: "Unvetted AI SaaS holding customer data", priority: "This quarter" },
      ],
    },
  },
} as const;
