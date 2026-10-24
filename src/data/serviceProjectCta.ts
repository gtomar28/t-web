import { getGuide } from "./guides";

export type ServiceProjectCtaContent = {
  slug: string;
  kicker: string;
  headlineBefore: string;
  headlineHighlight: string;
  headlineAfter: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

const DEFAULT_SECONDARY = {
  label: "Or explore other services",
  href: "/what-we-do#our-services",
} as const;

/** Per `/work/:slug` — add new guides here when pages ship. */
const CTA_BY_SLUG: Record<string, Omit<ServiceProjectCtaContent, "slug">> = {
  "custom-websites": {
    kicker: "Ready to get started?",
    headlineBefore: "Have a ",
    headlineHighlight: "website",
    headlineAfter: " in mind?",
    description:
      "Tell us what you need to build. We'll help you define the pages, messaging, and enquiry path for a custom site that explains your offer clearly.",
    primaryCta: { label: "Discuss your project", href: "/contact" },
    secondaryCta: DEFAULT_SECONDARY,
  },
  "web-applications": {
    kicker: "Ready to get started?",
    headlineBefore: "Have a ",
    headlineHighlight: "web app",
    headlineAfter: " in mind?",
    description:
      "Share the workflow you repeat every week. We'll help you scope a practical first release, what to defer, and how your team will use it day to day.",
    primaryCta: { label: "Discuss your project", href: "/contact" },
    secondaryCta: DEFAULT_SECONDARY,
  },
  seo: {
    kicker: "Ready to get started?",
    headlineBefore: "Have an ",
    headlineHighlight: "SEO plan",
    headlineAfter: " in mind?",
    description:
      "Tell us what you sell and where you operate. We'll map keywords to service pages, internal links, and a crawlable structure you can grow over time.",
    primaryCta: { label: "Discuss your project", href: "/contact" },
    secondaryCta: DEFAULT_SECONDARY,
  },
  "digital-marketing": {
    kicker: "Ready to get started?",
    headlineBefore: "Have a ",
    headlineHighlight: "campaign",
    headlineAfter: " in mind?",
    description:
      "Name the offer you want enquiries for. We'll align the ad, landing page, and form so the same story shows up everywhere.",
    primaryCta: { label: "Discuss your project", href: "/contact" },
    secondaryCta: DEFAULT_SECONDARY,
  },
  "social-media": {
    kicker: "Ready to get started?",
    headlineBefore: "Have a ",
    headlineHighlight: "social plan",
    headlineAfter: " in mind?",
    description:
      "Tell us how your business should sound online. We'll outline a calendar, captions, and a simple path from the feed to your website or contact form.",
    primaryCta: { label: "Discuss your project", href: "/contact" },
    secondaryCta: DEFAULT_SECONDARY,
  },
  "video-scripts": {
    kicker: "Ready to get started?",
    headlineBefore: "Have a ",
    headlineHighlight: "video",
    headlineAfter: " in mind?",
    description:
      "Describe the offer you need to explain in under a minute. We'll draft the script, shot list, and where the finished film should live on your site.",
    primaryCta: { label: "Discuss your project", href: "/contact" },
    secondaryCta: DEFAULT_SECONDARY,
  },
  "ai-agents": {
    kicker: "Ready to get started?",
    headlineBefore: "Have an ",
    headlineHighlight: "AI workflow",
    headlineAfter: " in mind?",
    description:
      "Walk us through one repeatable task your team does today. We'll suggest tools, human checkpoints, and a first release you can evaluate honestly.",
    primaryCta: { label: "Discuss your project", href: "/contact" },
    secondaryCta: { label: "Or explore AI services", href: "/ai" },
  },
  "rag-knowledge-assistants": {
    kicker: "Ready to get started?",
    headlineBefore: "Have a ",
    headlineHighlight: "knowledge assistant",
    headlineAfter: " in mind?",
    description:
      "Point us to the documents staff already trust. We'll design retrieval, permissions, and cited answers before any broad rollout.",
    primaryCta: { label: "Discuss your project", href: "/contact" },
    secondaryCta: { label: "Or explore AI services", href: "/ai" },
  },
  "ai-for-schools": {
    kicker: "Ready to get started?",
    headlineBefore: "Have a ",
    headlineHighlight: "school AI scope",
    headlineAfter: " in mind?",
    description:
      "Say whether you need the Kiduart product or custom AI beside your operations. We'll clarify roles, data access, and what stays human-approved.",
    primaryCta: { label: "Discuss your project", href: "/contact" },
    secondaryCta: { label: "Explore Kiduart ERP", href: "/our-products" },
  },
};

function fallbackFromGuide(slug: string): ServiceProjectCtaContent | null {
  const guide = getGuide(slug);
  if (!guide) return null;

  const topic =
    guide.kicker.length <= 24 ? guide.kicker.toLowerCase() : "project";

  return {
    slug,
    kicker: "Ready to get started?",
    headlineBefore: "Have a ",
    headlineHighlight: topic,
    headlineAfter: " in mind?",
    description: guide.description,
    primaryCta: { label: "Discuss your project", href: "/contact" },
    secondaryCta: DEFAULT_SECONDARY,
  };
}

/** CTA block for any published `/work/:slug` guide. */
export function getServiceProjectCtaContent(slug: string): ServiceProjectCtaContent | null {
  const preset = CTA_BY_SLUG[slug];
  if (preset) {
    return { slug, ...preset };
  }
  return fallbackFromGuide(slug);
}
