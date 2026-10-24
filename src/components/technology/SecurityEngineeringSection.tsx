import type { LucideIcon } from "lucide-react";
import {
  Cloud,
  Code2,
  Database,
  Monitor,
  Settings,
  Users,
} from "lucide-react";

type PracticeCard = {
  title: string;
  body: string;
  icon: LucideIcon;
  tags: string[];
};

const PRACTICES: PracticeCard[] = [
  {
    title: "Access Control",
    body: "Role-based access control (RBAC) to manage users and permissions effectively.",
    icon: Users,
    tags: ["RBAC", "Multi-tenant Support", "Audit Logs"],
  },
  {
    title: "Data Protection",
    body: "Encrypted connections and secure data handling practices to protect sensitive information.",
    icon: Database,
    tags: ["Data Encryption", "Secure APIs", "Data Isolation"],
  },
  {
    title: "Secure Development",
    body: "We follow secure coding standards, code reviews and vulnerability checks during development.",
    icon: Code2,
    tags: ["Code Reviews", "Static Analysis", "Dependency Checks"],
  },
  {
    title: "Infrastructure & Deployment",
    body: "Reliable cloud infrastructure, containerization and automated workflows for scalable deployments.",
    icon: Cloud,
    tags: ["Cloud Deployment", "Docker", "CI/CD"],
  },
  {
    title: "Monitoring & Maintenance",
    body: "We monitor performance, track errors and maintain systems to ensure reliability and uptime.",
    icon: Monitor,
    tags: ["Error Logging", "Performance Monitoring", "Backups"],
  },
  {
    title: "API Security",
    body: "Validation, rate limiting and secure access controls to prevent misuse.",
    icon: Settings,
    tags: ["Input Validation", "Rate Limiting", "Secure Endpoints"],
  },
];

function PracticeCardItem({ card }: { card: PracticeCard }) {
  const Icon = card.icon;
  return (
    <article className="flex h-full flex-col rounded-2xl border border-[#B9A6D1]/28 bg-[#1E1024]/75 p-5 shadow-[0_12px_32px_rgba(0,0,0,0.22)] sm:p-6">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#B9A6D1]/30 bg-[#2A1830]/90 text-[#E8A9C2]">
        <Icon className="h-5 w-5" aria-hidden />
      </div>
      <h3 className="mt-4 font-heading text-lg font-bold leading-tight text-[#F8F6FB]">
        {card.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-[#C4B4D8]">{card.body}</p>
      <ul className="mt-5 flex flex-wrap gap-2 border-t border-[#B9A6D1]/20 pt-4">
        {card.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full border border-[#B9A6D1]/30 bg-[#2A1830]/70 px-2.5 py-1 text-[11px] text-[#E7E1F0]"
          >
            {tag}
          </li>
        ))}
      </ul>
    </article>
  );
}

export function SecurityEngineeringSection() {
  return (
    <section
      id="security-practices"
      aria-labelledby="security-engineering-heading"
      className="relative w-full scroll-mt-28 bg-transparent py-14 sm:scroll-mt-32 sm:py-16 lg:py-20"
    >
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#B9A6D1]/40 bg-[#1E1024]/90 px-4 py-1.5 font-mono-accent text-[11px] uppercase tracking-[0.2em] text-[#E8A9C2] sm:text-xs">
            <span
              className="h-2 w-2 shrink-0 rounded-full bg-[#E8A9C2] shadow-[0_0_10px_rgba(232,169,194,0.85)]"
              aria-hidden
            />
            Security & engineering practices
          </div>

          <h2
            id="security-engineering-heading"
            className="mt-5 font-heading text-[clamp(1.75rem,4vw,2.65rem)] font-bold leading-[1.12] tracking-tight text-[#F8F6FB]"
          >
            Built with care,{" "}
            <span className="bg-gradient-to-r from-[#E8A9C2] via-[#D892AD] to-[#F8F6FB] bg-clip-text text-transparent">
              not just code.
            </span>
          </h2>

          <p className="mt-4 text-base leading-relaxed text-[#C4B4D8] sm:text-[17px]">
            We follow industry best practices and a security-first approach to build
            reliable, scalable and maintainable solutions. From code to deployment,
            every step is designed to keep your data, users and systems secure.
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {PRACTICES.map((card) => (
            <li key={card.title} className="min-h-0">
              <PracticeCardItem card={card} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
