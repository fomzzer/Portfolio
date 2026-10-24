export const en = {
  profile: {
    firstName: "Kostiantyn",
    lastName: "Naumenko",
    role: "Full-Stack Web Developer",
    headline: "I design and build fast, reliable web products — from database schema to the last pixel.",
    location: "Odesa, Ukraine",
    availability: "Open to freelance & full-time roles",
    bio: [
      "I'm a full-stack developer who enjoys owning the whole product: data modeling, APIs, payments, admin tooling and interfaces that feel effortless.",
      "My focus is shipping production-grade software — secure by default, measurable, and fast on every device. I care about clean architecture as much as about motion and typography.",
    ],
    stats: ["Years coding", "Projects shipped", "Lighthouse score", "In production"],
  },
  nav: {
    work: "Work",
    about: "About",
    stack: "Stack",
    experience: "Experience",
    services: "Services",
    contact: "Contact",
    home: "Home",
    letsTalk: "Let's talk",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    openCommand: "Open command menu",
    language: "Language",
    skip: "Skip to content",
  },
  hero: {
    available: "Available",
    busy: "Busy",
    titleTop: "Full-Stack",
    titleBottom: "Developer",
    greeting: "Hi, I'm",
    viewWork: "View selected work",
    getInTouch: "Get in touch",
    scroll: "Scroll",
  },
  work: {
    eyebrow: "Selected work",
    title: "Products I've designed, built and shipped.",
    description: "Real projects running in production — from database schema and payment flows to motion and micro-interactions.",
    readCase: "Read case study",
    status: { live: "Live", dev: "In development", archived: "Archived" },
    preview: "preview",
  },
  caseStudy: {
    back: "All projects",
    label: "Case study",
    visit: "Visit live site",
    source: "Source code",
    client: "Client",
    role: "Role",
    year: "Year",
    status: "Status",
    overview: "Overview",
    challenge: "The challenge",
    solution: "The solution",
    features: "Key features",
    stack: "Tech stack",
    next: "Next project",
  },
  about: {
    eyebrow: "About",
    statement: "I turn complex business requirements into calm, fast and secure software. One developer, the whole stack — from Postgres to pixels.",
    downloadCv: "Download CV",
  },
  stack: {
    eyebrow: "Toolkit",
    title: "A modern stack, end to end.",
    description: "Tools I use daily to take products from an empty repository to a monitored production deployment.",
    groups: [
      { title: "Frontend", description: "Interfaces that are fast, accessible and alive." },
      { title: "Backend", description: "APIs, auth, payments and background jobs." },
      { title: "Data", description: "Schemas that survive real traffic." },
      { title: "Infrastructure", description: "Shipping, observing, scaling." },
    ],
  },
  experience: {
    eyebrow: "Experience",
    title: "Where I've been building.",
    description: "A short path with a lot of production code. Every role taught me to ship faster without cutting corners.",
    now: "Now",
    items: [
      {
        title: "Full-Stack Developer",
        company: "Freelance",
        description: "End-to-end development of e-commerce and business websites: architecture, payments, admin panels, deployment and support.",
      },
      {
        title: "Mobile & Backend Developer",
        company: "UniApp",
        description: "Native iOS client in SwiftUI with a FastAPI backend on Azure, CI pipeline and data aggregation from multiple sources.",
      },
      {
        title: "Computer Science Student",
        company: "University",
        description: "Algorithms, databases, software engineering. Applying coursework directly to production projects.",
      },
    ],
  },
  services: {
    eyebrow: "Services",
    title: "What I can build for you.",
    description: "Whether it's a new product or an existing one that needs to scale — I take ownership from first call to production.",
    items: [
      { title: "Web Applications", description: "Full-cycle products on Next.js — from idea and schema to launch and support." },
      { title: "E-commerce", description: "Stores with catalog, cart, online payments, delivery integrations and analytics." },
      { title: "Admin Panels", description: "Internal tools with roles, audit logs and secure sessions that teams actually enjoy." },
      { title: "APIs & Integrations", description: "Payment gateways, logistics, email, storage and third-party services wired reliably." },
    ],
    process: [
      { title: "Discover", text: "Goals, audience, constraints. A clear scope before a single line of code." },
      { title: "Design", text: "Architecture, data model and interface — validated early, iterated fast." },
      { title: "Build", text: "Typed, tested, reviewed. Weekly previews on real URLs." },
      { title: "Launch", text: "Deployment, monitoring, SEO and handover. Then continuous improvement." },
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Have a project in mind? Let's talk.",
    description: "Tell me about your idea, timeline and budget. I usually reply within a day.",
    email: "Email",
    copy: "Copy address",
    copied: "Copied",
    worldwide: "Based in {location}, working worldwide.",
    name: "Your name",
    emailField: "Email address",
    budget: "Budget",
    budgets: { lt1k: "< $1k", "1to5k": "$1k – 5k", "5to15k": "$5k – 15k", gt15k: "$15k+", unsure: "Not sure" },
    message: "Tell me about your project",
    send: "Send message",
    sending: "Sending…",
    success: "Thanks! Your message is on its way — I'll reply within 24 hours.",
    errors: {
      name: "Please enter your name",
      email: "Please enter a valid email",
      message: "Tell me a bit more (10+ characters)",
      fields: "Please check the highlighted fields.",
      rate: "Too many messages. Please try again in a few minutes.",
      config: "The form isn't configured yet. Please email me directly.",
      generic: "Something went wrong. Please try again or email me directly.",
    },
  },
  footer: {
    tagline: "Building products that feel fast and look inevitable.",
    sitemap: "Sitemap",
    elsewhere: "Elsewhere",
    backToTop: "Back to top",
  },
  command: {
    placeholder: "Type a command or search…",
    empty: "Nothing found.",
    navigate: "Navigate",
    projects: "Projects",
    actions: "Actions",
    socials: "Socials",
    language: "Language",
    copyEmail: "Copy email",
    copied: "Copied!",
    sendEmail: "Send email",
    downloadCv: "Download CV",
    hintNavigate: "navigate",
    hintSelect: "select",
  },
  notFound: {
    label: "Error 404",
    text: "This page drifted off into the void. Let's get you back to something real.",
    back: "Back home",
  },
  projects: {
    "prirodni-skarby": {
      title: "Prirodni Skarby",
      tagline: "Full-stack e-commerce platform for a natural food store",
      role: "Full-Stack Developer · Design · DevOps",
      client: "Prirodni Skarby, Odesa",
      summary:
        "A production online store with a physical location in Odesa: product catalog with variants, cart, checkout with online payments and delivery across Ukraine, customer accounts and a fully custom admin panel.",
      challenge:
        "The business needed more than a template shop: real payment processing with reconciliation, delivery integration, customer accounts with email verification and a secure back-office that non-technical staff could run every day.",
      solution:
        "I built the platform from scratch on Next.js App Router with a PostgreSQL schema of 17 models via Prisma. Payments go through LiqPay with signed callbacks and a daily cron that reconciles pending orders. The admin panel has isolated sessions, login challenges, rate limiting and a full audit log.",
      features: [
        { title: "Catalog & variants", text: "Categories, search, product pages with size and volume variants and server-side rendering for SEO." },
        { title: "Checkout & payments", text: "LiqPay integration with signature verification, payment events log, refunds and nightly reconciliation cron." },
        { title: "Delivery", text: "Nova Poshta API for cities and warehouses directly in the checkout form." },
        { title: "Customer accounts", text: "Registration, email verification, password reset and persistent carts via NextAuth and Resend." },
        { title: "Admin panel", text: "Products, orders, customers, reviews, messages with replies, image uploads to S3-compatible storage." },
        { title: "Security", text: "Admin sessions with challenges, audit log, rate limiting, strict security headers and CSP." },
      ],
      metrics: ["Database models", "Routes & pages", "Custom code", "Live in production"],
    },
    uniapp: {
      title: "UniApp 2.0",
      tagline: "Native iOS app for students with a Python backend",
      role: "iOS & Backend Developer",
      client: "Personal project",
      summary:
        "A remake of a university companion app: native SwiftUI client and FastAPI backend that aggregates schedules and academic data into one fast interface.",
      challenge: "Data lived in multiple inconsistent sources, and the original app was slow and hard to maintain.",
      solution:
        "A clean FastAPI service on Azure normalizes data from all sources, while the SwiftUI client focuses on speed and native feel. CI builds are produced automatically for sideloading.",
      features: [
        { title: "Unified data", text: "Aggregation and normalization from several sources behind one typed API." },
        { title: "Native UI", text: "SwiftUI interface with offline-friendly caching and smooth navigation." },
        { title: "Automated builds", text: "GitHub Actions pipeline producing ready-to-install builds." },
      ],
      metrics: ["Platforms", "Automated builds", "Cloud hosting"],
    },
    "next-project": {
      title: "Your Next Project",
      tagline: "Placeholder for an upcoming case study",
      role: "Full-Stack Developer",
      client: "Coming soon",
      summary: "This slot is ready for your next product.",
      challenge: "Describe the problem the client had.",
      solution: "Describe how you solved it and which decisions mattered.",
      features: [{ title: "Feature", text: "Describe a key feature." }],
      metrics: ["Metric"],
    },
  } as Record<string, ProjectText>,
};

export type ProjectText = {
  title: string;
  tagline: string;
  role: string;
  client: string;
  summary: string;
  challenge: string;
  solution: string;
  features: { title: string; text: string }[];
  metrics: string[];
};

export type Dictionary = typeof en;
