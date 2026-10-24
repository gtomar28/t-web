export const site = {
  name: "Trevyk Technologies",
  shortName: "TREVYK",
  footerWordmark: "Trevyk Technologies",
  tagline: "Software house — Remote-first, worldwide",
  email: "info@trevyktechnologies.com",
  phone: "+91 90256 98946",
  location: "India & United States · Remote worldwide",
  copyrightYear: 2026,
} as const;

/** WhatsApp Business — floating launcher + wa.me deep links */
export const whatsappContact = {
  /** Digits only, with country code (India +91) */
  phoneE164Digits: "918810664797",
  displayNumber: "+91 88106 64797",
  prefilledMessage:
    "Hello Trevyk Technologies, I would like to connect about your products and services.",
} as const;

export const navLinks = [
  { label: "Work", href: "/what-we-do" },
  { label: "Services", href: "/what-we-do" },
  { label: "About", href: "/process" },
  { label: "Contact", href: "/contact" },
] as const;

export const hero = {
  eyebrow: "Turning vision into progress",
  title: "Custom websites, software, and growth",
  titleLines: [
    "Custom websites, software, and growth",
    "Web apps and mobile products built to last",
    "SEO, campaigns, and growth you can measure",
  ],
  subtitle: "Trevyk Technologies, Noida",
  lead:
    "Product, websites, and growth systems for businesses that want to be found and then keep the software.",
  description:
    "Custom websites, web applications, and custom software for startups and local businesses, plus SEO, campaigns, social media, and video. Starter plans are scoped to your budget. Based in Noida.",
  primaryCta: { label: "Get a starter plan", href: "/contact" },
  secondaryCta: { label: "Explore Kiduart", href: "/our-products" },
  tertiaryCta: { label: "View capabilities", href: "/what-we-do" },
  meta: [
    { label: "Product", value: "Kiduart School ERP" },
    { label: "Engineering", value: "Websites, apps, SEO" },
    { label: "Base", value: "Noida, India" },
  ],
} as const;

export const servicesSection = {
  label: "What we do",
  title: "Four disciplines. One team. Zero hand-offs.",
  subtitle:
    "Design, front end, mobile, and infrastructure live in the same room here — so nothing gets lost between an idea and a deployed product.",
  items: [
    {
      number: "01",
      title: "Web App Development",
      description:
        "ERPs, dashboards, POS systems, and platforms that carry real operations.",
      stack: ["React", "Next.js", "TypeScript", "NodeJS", "PostgreSQL"],
      href: "/contact",
    },
    {
      number: "02",
      title: "Mobile App Development",
      description:
        "Cross-platform iOS and Android apps your customers keep on their home screen.",
      stack: ["React Native", "Expo", "iOS", "Android", "Firebase"],
      href: "/contact",
    },
    {
      number: "03",
      title: "UI/UX Design",
      description:
        "Interfaces shaped for the person using them — cashier, manager, or customer.",
      stack: ["Figma", "Design systems", "Motion", "Prototyping"],
      href: "/contact",
    },
    {
      number: "04",
      title: "Cloud & DevOps / Backend Engineering",
      description:
        "The invisible half of every project we ship: APIs, data, and infrastructure.",
      stack: ["NodeJS", "PostgreSQL", "GCP", "Firebase", "Docker"],
      href: "/contact",
    },
  ],
} as const;

export const processSection = {
  label: "How we work",
  introTitle: "A process built around shipping, not slideware.",
  steps: [
    {
      index: "01 / 04",
      title: "Discover",
      heading: "We learn the business before we touch the code.",
      body: "Every engagement starts with the operation itself — how stock moves, how a sale happens, who touches the system and when. We map the real-world process so the software fits it, not the other way around.",
    },
    {
      index: "02 / 04",
      title: "Design",
      heading: "Flows first. Pixels second.",
      body: "We shape each interface around its user — a cashier mid-rush needs different software than an owner reading weekly numbers. Prototypes go in front of you early, in the browser, where they behave like the real thing.",
    },
    {
      index: "03 / 04",
      title: "Build",
      heading: "Engineered to run, not just to demo.",
      body: "Typed codebases, realtime data where it matters, and backends designed for reporting from day one. You watch the product grow in staging builds every week — no six-month silence, no surprise reveal.",
    },
    {
      index: "04 / 04",
      title: "Ship & Scale",
      heading: "Launch is the midpoint, not the finish line.",
      body: "We deploy on cloud infrastructure we operate, monitor what we ship, and stay on as your product grows — new locations, new roles, new companion apps. Most of our clients are on their second or third project with us.",
    },
  ],
} as const;

export const workSection = {
  label: "Services",
  title: "What we deliver.",
  subtitle:
    "One flagship product we build and operate — Kiduart School ERP — plus websites, apps, design, and growth services scoped to your budget.",
  cta: { label: "Book consultation →", href: "/contact" },
  cards: [
    {
      title: "Kiduart School ERP",
      description:
        "Our announced flagship: admissions, fees, attendance, and parent apps for Indian schools — real product, not a concept deck.",
      stack: ["Next.js", "PostgreSQL", "School ops"],
      image: "/images/services/kiduart-school.jpg",
      imageAlt: "School campus and learning environment",
      tag: "Flagship",
      href: "https://kiduart.com",
    },
    {
      title: "Custom websites",
      description:
        "Marketing sites and company pages built for speed, SEO, and clear calls to action — starter plans available.",
      stack: ["Next.js", "TypeScript", "CMS"],
      image: "/images/services/custom-websites.jpg",
      imageAlt: "Developer building a modern website",
      href: "/contact",
    },
    {
      title: "Web applications",
      description:
        "Dashboards, ERPs, POS tools, and internal platforms that match how your team actually works.",
      stack: ["React", "Node.js", "PostgreSQL"],
      image: "/images/services/web-apps.jpg",
      imageAlt: "Web application on a laptop screen",
      href: "/contact",
    },
    {
      title: "Mobile apps",
      description:
        "Cross-platform iOS and Android apps for customers, staff, or field teams — built with React Native.",
      stack: ["React Native", "Expo", "Firebase"],
      image: "/images/services/mobile-apps.jpg",
      imageAlt: "Mobile app on a smartphone",
      href: "/contact",
    },
    {
      title: "UI/UX design",
      description:
        "Flows and interfaces for the person using them — cashier, manager, teacher, or parent.",
      stack: ["Figma", "Design systems", "Prototypes"],
      image: "/images/services/ui-ux.jpg",
      imageAlt: "UI design workspace and wireframes",
      href: "/contact",
    },
    {
      title: "Cloud & backend",
      description:
        "APIs, databases, hosting, and integrations — the infrastructure your product runs on day to day.",
      stack: ["Node.js", "GCP", "Docker"],
      image: "/images/services/cloud-backend.jpg",
      imageAlt: "Cloud infrastructure and server lights",
      href: "/contact",
    },
    {
      title: "SEO & growth",
      description:
        "Technical SEO, campaigns, social, and video so the software you ship can actually be found.",
      stack: ["SEO", "Analytics", "Campaigns"],
      image: "/images/services/seo-growth.jpg",
      imageAlt: "Marketing analytics dashboard",
      href: "/contact",
    },
  ],
} as const;

export const testimonialsSection = {
  label: "Client reviews",
  title: "Trusted from Milan to Mexico City.",
  subtitle:
    "Six countries, four continents, one standard of work. Every word below is a real client review.",
  regions: [
    { flag: "🇮🇳", name: "India" },
    { flag: "🇺🇸", name: "United States" },
    { flag: "🇦🇪", name: "UAE" },
    { flag: "🇬🇧", name: "United Kingdom" },
    { flag: "🇨🇦", name: "Canada" },
    { flag: "🇲🇽", name: "Mexico" },
  ],
  items: [
    {
      name: "Priya Sharma",
      region: "🇮🇳 India",
      quote:
        "Trevyk understood our workflow before writing code. Weekly demos kept us aligned, and the final platform matched how our team actually operates.",
    },
    {
      name: "James Carter",
      region: "🇺🇸 United States",
      quote:
        "Professional, responsive, and technically solid. They handled our web app and SEO improvements in one engagement — metrics improved within the first quarter.",
    },
    {
      name: "Arun Mehta",
      region: "🇮🇳 India",
      quote:
        "Clear estimates, no jargon on calls, and a mobile app our customers actually use. We are planning phase two with the same team.",
    },
    {
      name: "Sarah Lin",
      region: "🇺🇸 United States",
      quote:
        "They bridged design and backend cleanly. Integrations with our existing tools were documented and stable from launch day.",
    },
    {
      name: "Rahul Verma",
      region: "🇮🇳 India",
      quote:
        "From audit to deployment, the process felt structured. Support after go-live has been as good as the build phase.",
    },
    {
      name: "Michael Torres",
      region: "🇺🇸 United States",
      quote:
        "Timezone-friendly collaboration and honest scoping. What we asked for is what shipped — on the timeline we agreed.",
    },
  ],
} as const;

export const ctaSection = {
  label: "Next project",
  title: "Your operation deserves software built for it — not around it.",
  titleHighlight: "for it",
  body: "Tell us what your business needs to do, and we'll tell you exactly how we'd build it. First call is free, honest, and jargon-optional.",
  cta: { label: "Start a project →", href: "/contact" },
} as const;

export const footer = {
  brand: {
    tagline: "Turning Vision Into Progress.",
    body:
      "We build custom websites, web applications, and AI-powered software that help businesses grow. From strategy to launch and beyond, we turn your ideas into reliable digital products.",
    flagshipLink: { label: "Kiduart School ERP", href: "/our-products" },
    flagshipTail: "for Indian schools.",
    workCta: { label: "Our Work", href: "/what-we-do" },
    kiduartCta: { label: "kiduart.com", href: "https://kiduart.com" },
  },
  offerings: {
    title: "Our offerings",
    links: [
      { label: "Kiduart School ERP", href: "/our-products", tag: "Flagship" },
      { label: "Custom Websites", href: "/work/custom-websites" },
      { label: "Web Applications", href: "/work/web-applications" },
      { label: "AI Solutions", href: "/ai" },
      { label: "Digital Marketing", href: "/work/digital-marketing" },
      { label: "Consultation & Support", href: "/contact" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { label: "Who We Are", href: "/who-we-are" },
      { label: "What We Do", href: "/what-we-do" },
      { label: "Our Products", href: "/our-products" },
      { label: "Our Process", href: "/process" },
      { label: "Technology", href: "/technology" },
      { label: "Contact", href: "/contact" },
    ],
  },
  howWeWork: {
    title: "How we work",
    items: [
      { text: "Publish only what exists.", tag: "Honest" },
      { text: "Clear scope, clear delivery.", tag: "Transparent" },
      { text: "Secure & privacy-ready.", tag: "Private" },
      { text: "Long-term support.", tag: "Support" },
    ],
  },
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com" },
    { label: "Email", href: "mailto:info@trevyktechnologies.com" },
  ],
} as const;
