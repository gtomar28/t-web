import { getGuide } from "./guides";

export type WorkIconKey =
  | "search"
  | "layers"
  | "circleCheck"
  | "monitor"
  | "fileText"
  | "list"
  | "settings"
  | "code"
  | "users"
  | "bot"
  | "database"
  | "megaphone"
  | "video"
  | "school";

export type WorkPageContent = {
  slug: string;
  hero: {
    badge: string;
    titleBefore: string;
    titleHighlight: string;
    titleAfter: string;
    description: string;
    supporting?: string;
    highlights?: { icon: WorkIconKey; label: string; detail?: string }[];
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    backdropImage: string;
    objectPosition?: string;
  };
  problemApproach: {
    label: string;
    headingBefore: string;
    headingHighlight: string;
    headingAfter: string;
    body: string;
    approach: { title: string; description: string; icon: WorkIconKey }[];
  };
  whatYouGet: {
    label: string;
    items: { title: string; description: string; icon: WorkIconKey }[];
  };
  howWeDeliver: {
    label: string;
    steps: { num: string; title: string; description: string }[];
  };
};

const DELIVER_STEPS_DEFAULT: WorkPageContent["howWeDeliver"]["steps"] = [
  {
    num: "01",
    title: "Discovery",
    description: "We discuss your goals, requirements and constraints.",
  },
  {
    num: "02",
    title: "Planning & design",
    description: "We finalize structure, content and visual direction.",
  },
  {
    num: "03",
    title: "Development",
    description: "We build, review and iterate with you in the loop.",
  },
  {
    num: "04",
    title: "Testing & launch",
    description: "We test thoroughly, hand over access, and go live.",
  },
];

const APPROACH_DEFAULT: WorkPageContent["problemApproach"]["approach"] = [
  {
    title: "Understand your goals",
    description: "We clarify who you serve, what success looks like, and what must ship first.",
    icon: "search",
  },
  {
    title: "Plan the right structure",
    description: "We map pages, flows and responsibilities before build starts.",
    icon: "layers",
  },
  {
    title: "Build for real results",
    description: "We ship something your team can run—not a demo that falls apart in production.",
    icon: "circleCheck",
  },
];

const WORK_PAGES: Record<string, WorkPageContent> = {
  "custom-websites": {
    slug: "custom-websites",
    hero: {
      badge: "Custom websites",
      titleBefore: "Custom websites built around ",
      titleHighlight: "your business.",
      titleAfter: "",
      description:
        "We design and develop modern, responsive websites that help businesses attract the right audience, communicate clearly and generate genuine enquiries.",
      supporting:
        "Pages are structured around what you sell, who it is for, and one clear enquiry path—written for real searches, not filler paragraphs.",
      highlights: [
        { icon: "monitor", label: "Responsive by default", detail: "Readable on phones and desktops." },
        { icon: "list", label: "Clear enquiry path", detail: "One primary form—not five competing CTAs." },
        { icon: "search", label: "SEO in the copy", detail: "Titles and headings match how buyers search." },
        { icon: "settings", label: "Editable handoff", detail: "Your team can update key content." },
      ],
      primaryCta: { label: "Discuss a project", href: "/contact" },
      secondaryCta: { label: "View our work", href: "/what-we-do#our-services" },
      backdropImage: "/images/work/custom-websites-hero.jpg",
      objectPosition: "72% center",
    },
    problemApproach: {
      label: "The problem & our approach",
      headingBefore: "A website should do more than just ",
      headingHighlight: "look good.",
      headingAfter: "",
      body: "Many businesses struggle with outdated designs, unclear messaging, and websites that fail to convert visitors into leads. We start by understanding how you serve customers, who you want to reach, and what action you need visitors to take—then build a site aligned with those goals.",
      approach: APPROACH_DEFAULT,
    },
    whatYouGet: {
      label: "What you get",
      items: [
        {
          title: "Responsive design",
          description: "Pages that stay readable on phones, tablets and desktops.",
          icon: "monitor",
        },
        {
          title: "Custom pages",
          description: "Structure and copy shaped around your offer—not a generic template.",
          icon: "fileText",
        },
        {
          title: "Enquiry forms",
          description: "One clear path to contact you with the fields you actually need.",
          icon: "list",
        },
        {
          title: "Basic SEO setup",
          description: "Titles, headings and internal links written for real searches.",
          icon: "search",
        },
        {
          title: "Easy to manage",
          description: "Handoff and guidance so your team can update key content.",
          icon: "settings",
        },
      ],
    },
    howWeDeliver: {
      label: "How we deliver",
      steps: DELIVER_STEPS_DEFAULT,
    },
  },
  "web-applications": {
    slug: "web-applications",
    hero: {
      badge: "Web applications",
      titleBefore: "Web apps built for ",
      titleHighlight: "your workflow.",
      titleAfter: "",
      description:
        "When spreadsheets and shared passwords stop scaling, we scope portals, dashboards and tools your team owns—with a first release you can actually run.",
      supporting:
        "From customer portals and staff dashboards to internal tools, we document what ships first, how roles see data, and how your team runs the system after go-live—without a locked vendor portal.",
      highlights: [
        { icon: "users", label: "Role-based screens", detail: "Each role sees only the work it needs." },
        { icon: "fileText", label: "Written scope", detail: "Agreed deliverables before development starts." },
        { icon: "code", label: "Source ownership", detail: "Custom code and handoff—you keep the keys." },
        { icon: "circleCheck", label: "Launch checklist", detail: "A runbook for go-live week." },
      ],
      primaryCta: { label: "Discuss a project", href: "/contact" },
      secondaryCta: { label: "View our work", href: "/what-we-do#our-services" },
      backdropImage: "/images/work/web-applications-hero.jpg",
      objectPosition: "70% center",
    },
    problemApproach: {
      label: "The problem & our approach",
      headingBefore: "Software should match ",
      headingHighlight: "how you work.",
      headingAfter: "",
      body: "Teams often duct-tape bookings, approvals and customer data across chat and sheets. We map the workflow you repeat every week, define roles and permissions, and build a web app around that—before adding nice-to-have features.",
      approach: [
        {
          title: "Understand the workflow",
          description: "We walk through the steps, exceptions and who touches each record.",
          icon: "search",
        },
        {
          title: "Scope the first release",
          description: "We separate must-ship from later phases so launch stays realistic.",
          icon: "layers",
        },
        {
          title: "Build with ownership",
          description: "You keep the source and documentation—not a locked vendor portal.",
          icon: "code",
        },
      ],
    },
    whatYouGet: {
      label: "What you get",
      items: [
        {
          title: "Role-based screens",
          description: "Staff and customers see only what their job requires.",
          icon: "users",
        },
        {
          title: "Written scope",
          description: "Agreed deliverables before the first screen is coded.",
          icon: "fileText",
        },
        {
          title: "APIs & integrations",
          description: "Connections to the tools you already use, where scope allows.",
          icon: "layers",
        },
        {
          title: "Source ownership",
          description: "Custom code and handoff—you are not renting your own product.",
          icon: "code",
        },
        {
          title: "Launch checklist",
          description: "A runbook your team can follow on go-live week.",
          icon: "circleCheck",
        },
      ],
    },
    howWeDeliver: {
      label: "How we deliver",
      steps: DELIVER_STEPS_DEFAULT,
    },
  },
  seo: {
    slug: "seo",
    hero: {
      badge: "SEO",
      titleBefore: "Search visibility built on ",
      titleHighlight: "honest pages.",
      titleAfter: "",
      description:
        "We map keywords to service pages, internal links and crawlable structure so people who already want your offer can find you—without vanity metrics.",
      primaryCta: { label: "Discuss a project", href: "/contact" },
      secondaryCta: { label: "View our work", href: "/what-we-do#our-services" },
      backdropImage: "/images/work/seo-hero.jpg",
      objectPosition: "68% center",
    },
    problemApproach: {
      label: "The problem & our approach",
      headingBefore: "Traffic only helps when the ",
      headingHighlight: "page matches intent.",
      headingAfter: "",
      body: "Stuffing keywords or copying competitors rarely brings enquiries. We start with what buyers type when they are ready to talk, assign one primary topic per page, and connect related offers with plain internal links.",
      approach: APPROACH_DEFAULT,
    },
    whatYouGet: {
      label: "What you get",
      items: [
        {
          title: "Keyword map",
          description: "Services and locations mapped to pages you can maintain.",
          icon: "search",
        },
        {
          title: "On-page structure",
          description: "Titles, headings and copy aligned to the search—not filler.",
          icon: "fileText",
        },
        {
          title: "Internal linking",
          description: "Related offers linked with phrases people actually search.",
          icon: "layers",
        },
        {
          title: "Search Console setup",
          description: "So you can see queries and coverage—not invented rankings.",
          icon: "settings",
        },
        {
          title: "Next-page plan",
          description: "A backlog of pages to add as you grow.",
          icon: "list",
        },
      ],
    },
    howWeDeliver: {
      label: "How we deliver",
      steps: [
        {
          num: "01",
          title: "Discovery",
          description: "We review your offers, geography and existing site.",
        },
        {
          num: "02",
          title: "Keyword & page map",
          description: "We assign topics and outline each service page.",
        },
        {
          num: "03",
          title: "On-page work",
          description: "We update or draft pages, links and metadata.",
        },
        {
          num: "04",
          title: "Measure & iterate",
          description: "We tune from Search Console and your enquiry data.",
        },
      ],
    },
  },
  "digital-marketing": {
    slug: "digital-marketing",
    hero: {
      badge: "Digital marketing",
      titleBefore: "Campaigns tied to a ",
      titleHighlight: "clear offer.",
      titleAfter: "",
      description:
        "Ads, landing pages and forms that name the same offer—so budget goes toward conversations, not confused clicks.",
      primaryCta: { label: "Discuss a project", href: "/contact" },
      secondaryCta: { label: "View our work", href: "/what-we-do#our-services" },
      backdropImage: "/images/work/digital-marketing-hero.jpg",
    },
    problemApproach: {
      label: "The problem & our approach",
      headingBefore: "A campaign fails when the ",
      headingHighlight: "landing page lies.",
      headingAfter: "",
      body: "Sending traffic to a vague homepage wastes spend. We pick one offer, write the ad and page together, and size the plan to starter budgets when that is where you are.",
      approach: APPROACH_DEFAULT,
    },
    whatYouGet: {
      label: "What you get",
      items: [
        { title: "One offer per campaign", description: "Single story from ad to form.", icon: "megaphone" },
        { title: "Landing page", description: "Matches the ad copy and CTA.", icon: "fileText" },
        { title: "Budget guidance", description: "Ranges that fit early-stage businesses.", icon: "list" },
        { title: "Weekly readout", description: "What to keep, pause or change.", icon: "search" },
        { title: "Honest metrics", description: "Enquiries and clarity—not vanity impressions.", icon: "circleCheck" },
      ],
    },
    howWeDeliver: { label: "How we deliver", steps: DELIVER_STEPS_DEFAULT },
  },
  "social-media": {
    slug: "social-media",
    hero: {
      badge: "Social media",
      titleBefore: "A feed that sounds like ",
      titleHighlight: "your business.",
      titleAfter: "",
      description:
        "Calendars, captions and profile work so you look present between client jobs—with a path back to your website or contact form.",
      primaryCta: { label: "Discuss a project", href: "/contact" },
      secondaryCta: { label: "View our work", href: "/what-we-do#our-services" },
      backdropImage: "/images/work/social-media-hero.jpg",
    },
    problemApproach: {
      label: "The problem & our approach",
      headingBefore: "Quiet pages look like ",
      headingHighlight: "closed shops.",
      headingAfter: "",
      body: "Owners know they should post; nobody owns the calendar. We write in your voice, align the feed with your website offer, and keep replies simple.",
      approach: APPROACH_DEFAULT,
    },
    whatYouGet: {
      label: "What you get",
      items: [
        { title: "Profile & bio", description: "Written for what you sell.", icon: "fileText" },
        { title: "30-day calendar", description: "Planned posts your team can approve.", icon: "list" },
        { title: "Captions", description: "English or Hindi—matched to your tone.", icon: "megaphone" },
        { title: "Comment rules", description: "Simple guidance for DMs and replies.", icon: "users" },
        { title: "Site links", description: "Paths from social back to enquiry.", icon: "layers" },
      ],
    },
    howWeDeliver: { label: "How we deliver", steps: DELIVER_STEPS_DEFAULT },
  },
  "video-scripts": {
    slug: "video-scripts",
    hero: {
      badge: "Video & scripts",
      titleBefore: "Short films that ",
      titleHighlight: "name the offer.",
      titleAfter: "",
      description:
        "Scripts and shot lists for reels and explainers—written before cameras so a small team can publish this month.",
      primaryCta: { label: "Discuss a project", href: "/contact" },
      secondaryCta: { label: "View our work", href: "/what-we-do#our-services" },
      backdropImage: "/images/work/video-scripts-hero.jpg",
    },
    problemApproach: {
      label: "The problem & our approach",
      headingBefore: "Long videos nobody ",
      headingHighlight: "finishes.",
      headingAfter: "",
      body: "Video works when it does one job: show the offer in under a minute. We script first, plan shots a small crew can film, and place the result on your site.",
      approach: APPROACH_DEFAULT,
    },
    whatYouGet: {
      label: "What you get",
      items: [
        { title: "Script", description: "Written for silent viewing with captions.", icon: "fileText" },
        { title: "Shot list", description: "A small team can follow on shoot day.", icon: "list" },
        { title: "Bilingual options", description: "English, Hindi or both where needed.", icon: "megaphone" },
        { title: "Website embed plan", description: "Where the film lives on your site.", icon: "monitor" },
        { title: "Edit notes", description: "Guidance for reels and explainers.", icon: "video" },
      ],
    },
    howWeDeliver: { label: "How we deliver", steps: DELIVER_STEPS_DEFAULT },
  },
  "ai-agents": {
    slug: "ai-agents",
    hero: {
      badge: "AI agents",
      titleBefore: "Agents scoped for ",
      titleHighlight: "one workflow.",
      titleAfter: "",
      description:
        "Language models plus approved tools, human checkpoints and audit logs—built for ops teams, not slide-deck demos.",
      primaryCta: { label: "Discuss a project", href: "/contact" },
      secondaryCta: { label: "AI solutions hub", href: "/ai" },
      backdropImage: "/images/work/ai-agents-hero.jpg",
    },
    problemApproach: {
      label: "The problem & our approach",
      headingBefore: "Chat alone is ",
      headingHighlight: "not an agent.",
      headingAfter: "",
      body: "Teams want hours back on repeat lookups and drafts—but need humans on money, identity and sensitive writes. We scope one workflow, define tools and escalation, then harden before expanding.",
      approach: [
        {
          title: "Map the workflow",
          description: "Intake, tools, approvals and logging—on paper first.",
          icon: "search",
        },
        {
          title: "Least privilege",
          description: "Integrations and write actions only where you authorize.",
          icon: "layers",
        },
        {
          title: "Evaluate honestly",
          description: "Eval sets and traces—not vanity chat volume.",
          icon: "bot",
        },
      ],
    },
    whatYouGet: {
      label: "What you get",
      items: [
        { title: "Scoped agent service", description: "One primary workflow in v1.", icon: "bot" },
        { title: "Tool wrappers", description: "APIs your policy allows.", icon: "code" },
        { title: "Human gates", description: "Review on high-risk actions.", icon: "users" },
        { title: "Eval checklist", description: "Tasks, refusals and cost notes.", icon: "list" },
        { title: "Runbook", description: "Operate and change prompts safely.", icon: "settings" },
      ],
    },
    howWeDeliver: { label: "How we deliver", steps: DELIVER_STEPS_DEFAULT },
  },
  "rag-knowledge-assistants": {
    slug: "rag-knowledge-assistants",
    hero: {
      badge: "RAG & knowledge",
      titleBefore: "Answers that ",
      titleHighlight: "cite your sources.",
      titleAfter: "",
      description:
        "Retrieval over your documents with permissions, citations and refusals when context is thin—not guesses dressed as confidence.",
      primaryCta: { label: "Discuss a project", href: "/contact" },
      secondaryCta: { label: "AI solutions hub", href: "/ai" },
      backdropImage: "/images/work/rag-knowledge-assistants-hero.jpg",
    },
    problemApproach: {
      label: "The problem & our approach",
      headingBefore: "Models invent when ",
      headingHighlight: "context is missing.",
      headingAfter: "",
      body: "Private knowledge assistants need retrieval first, generation second. We design corpus access, chunking and cited answers—and refuse when nothing relevant is found.",
      approach: APPROACH_DEFAULT,
    },
    whatYouGet: {
      label: "What you get",
      items: [
        { title: "Corpus design", description: "Sources, metadata and permissions.", icon: "database" },
        { title: "Retrieval pipeline", description: "Chunking, filters and optional rerank.", icon: "layers" },
        { title: "Cited answers", description: "Passages staff can verify.", icon: "fileText" },
        { title: "Refresh path", description: "When documents change.", icon: "settings" },
        { title: "Eval report", description: "Golden questions and refusal checks.", icon: "search" },
      ],
    },
    howWeDeliver: { label: "How we deliver", steps: DELIVER_STEPS_DEFAULT },
  },
  "ai-for-schools": {
    slug: "ai-for-schools",
    hero: {
      badge: "AI for schools",
      titleBefore: "School AI with ",
      titleHighlight: "clear boundaries.",
      titleAfter: "",
      description:
        "Custom assistants beside school operations—role-aware and human-supervised. Kiduart ERP product detail lives on kiduart.com.",
      primaryCta: { label: "Discuss a project", href: "/contact" },
      secondaryCta: { label: "Explore Kiduart", href: "/our-products" },
      backdropImage: "/images/work/ai-for-schools-hero.jpg",
    },
    problemApproach: {
      label: "The problem & our approach",
      headingBefore: "Student data needs ",
      headingHighlight: "real controls.",
      headingAfter: "",
      body: "Schools ask for AI help on enquiries, drafts and staff lookups—but not unsupervised writes to fees or exams. We separate Kiduart product work from custom scoped assistants.",
      approach: APPROACH_DEFAULT,
    },
    whatYouGet: {
      label: "What you get",
      items: [
        { title: "Role-aware access", description: "Staff see only what their job allows.", icon: "school" },
        { title: "Use-case scope", description: "Handbooks, triage, drafts—not mystery chat.", icon: "fileText" },
        { title: "Human approval", description: "On irreversible or sensitive actions.", icon: "users" },
        { title: "Honest positioning", description: "Live vs scoped features labelled clearly.", icon: "circleCheck" },
        { title: "Kiduart path", description: "Product demos via kiduart.com when ERP is the need.", icon: "layers" },
      ],
    },
    howWeDeliver: { label: "How we deliver", steps: DELIVER_STEPS_DEFAULT },
  },
};

function heroImageForSlug(slug: string, guideImage?: string): string {
  return `/images/work/${slug}-hero.jpg`;
}

function enrichHero(page: WorkPageContent): WorkPageContent {
  const highlights =
    page.hero.highlights ??
    page.whatYouGet.items.slice(0, 4).map((item) => ({
      icon: item.icon,
      label: item.title,
      detail: item.description,
    }));

  const supporting =
    page.hero.supporting ??
    (page.problemApproach.body.length > 120
      ? `${page.problemApproach.body.slice(0, 118).trim()}…`
      : page.problemApproach.body);

  return {
    ...page,
    hero: {
      ...page.hero,
      supporting,
      highlights,
    },
  };
}

function buildFallback(slug: string): WorkPageContent | null {
  const guide = getGuide(slug);
  if (!guide) return null;

  const badge = guide.kicker;
  return {
    slug,
    hero: {
      badge,
      titleBefore: guide.title.split(" ").slice(0, 3).join(" ") + " ",
      titleHighlight: guide.title.split(" ").slice(3, 6).join(" ") || "your goals",
      titleAfter: guide.title.split(" ").length > 6 ? " " + guide.title.split(" ").slice(6).join(" ") : "",
      description: guide.description,
      primaryCta: { label: "Discuss a project", href: "/contact" },
      secondaryCta: { label: "View our work", href: "/what-we-do#our-services" },
      backdropImage: heroImageForSlug(slug, guide.image),
    },
    problemApproach: {
      label: "The problem & our approach",
      headingBefore: "We start with the ",
      headingHighlight: "real problem.",
      headingAfter: "",
      body: guide.paragraphs[0] ?? guide.description,
      approach: APPROACH_DEFAULT,
    },
    whatYouGet: {
      label: "What you get",
      items: guide.points.slice(0, 5).map((point, i) => ({
        title: point.split(" ").slice(0, 4).join(" "),
        description: point,
        icon: (["monitor", "fileText", "list", "search", "settings"] as WorkIconKey[])[i] ?? "circleCheck",
      })),
    },
    howWeDeliver: {
      label: "How we deliver",
      steps: DELIVER_STEPS_DEFAULT,
    },
  };
}

export function getWorkPageContent(slug: string): WorkPageContent | null {
  const preset = WORK_PAGES[slug];
  if (preset) {
    return enrichHero(preset);
  }
  const fallback = buildFallback(slug);
  return fallback ? enrichHero(fallback) : null;
}
