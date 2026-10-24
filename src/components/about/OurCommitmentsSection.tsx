import type { ComponentType } from "react";
import {
  Eye,
  FileCheck,
  MessageSquareText,
  ShieldCheck,
  Target,
} from "lucide-react";
import { ViewportSection } from "../ViewportSection";

const COMMITMENT_ITEMS = [
  {
    title: "Honest by Default",
    description:
      "We promise what we can deliver. We clearly distinguish between what is live, what is in development, and what is planned.",
    icon: Eye,
  },
  {
    title: "Clear Scope, Clear Expectations",
    description:
      "We define requirements, deliverables, and project boundaries upfront so everyone knows what's included and what to expect.",
    icon: FileCheck,
  },
  {
    title: "Respect for Data & Privacy",
    description:
      "We handle client and user data responsibly, limit access to what's necessary, and respect agreed confidentiality requirements.",
    icon: ShieldCheck,
  },
  {
    title: "Communication That Stays Clear",
    description:
      "We keep you informed about progress, blockers, changes, and delays — not just when there's a problem, but throughout the journey.",
    icon: MessageSquareText,
  },
] as const;

function CommitmentCard({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
}) {
  return (
    <article className="rounded-2xl border border-[#6B4A87]/40 bg-[#2A1830]/55 p-5 shadow-[0_12px_40px_rgba(0,0,0,0.22)] backdrop-blur-sm sm:p-6">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#E8A9C2]/45 bg-[#1A0D20]/70 text-[#E8A9C2]">
        <Icon className="h-5 w-5" strokeWidth={1.65} aria-hidden />
      </div>
      <h3 className="mt-4 font-heading text-lg font-semibold text-[#F8F6FB] sm:text-xl">
        {title}
      </h3>
      <div
        className="mt-2 h-px w-10 bg-gradient-to-r from-[#E8A9C2]/80 to-transparent"
        aria-hidden
      />
      <p className="mt-3 text-xs leading-relaxed text-[#D8CCE6] sm:text-[13px]">
        {description}
      </p>
    </article>
  );
}

export function OurCommitmentsSection() {
  return (
    <ViewportSection
      id="our-commitments"
      aria-labelledby="our-commitments-heading"
      className="trevyk-viewport-section--center relative overflow-hidden before:pointer-events-none before:absolute before:inset-y-0 before:left-1/2 before:-z-10 before:w-screen before:-translate-x-1/2 before:bg-[#1a0f18]"
      innerClassName="relative flex flex-col justify-center py-10 sm:py-12"
    >
      <div className="inline-flex w-fit max-w-full self-start items-center gap-2 rounded-full border border-[#B9A6D1]/40 bg-[#1E1024]/90 px-4 py-1.5 font-mono-accent text-[11px] uppercase tracking-[0.2em] text-[#E8A9C2] sm:text-xs">
        <Target className="h-4 w-4" aria-hidden />
        <span>05 / Our commitments</span>
      </div>

      <p className="mt-5 font-mono-accent text-[11px] uppercase tracking-[0.22em] text-[#E8A9C2] sm:text-xs">
        Our commitments
      </p>

      <h2
        id="our-commitments-heading"
        className="mt-3 max-w-3xl font-heading text-[clamp(1.85rem,4.5vw,2.85rem)] font-bold leading-[1.1] tracking-tight text-[#F8F6FB]"
      >
        Promises should be{" "}
        <span className="bg-gradient-to-r from-[#F8F6FB] via-[#F0B8CE] to-[#E8A9C2] bg-clip-text text-transparent">
          visible in the way we work.
        </span>
      </h2>

      <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#E7E1F0] sm:text-[17px]">
        We are committed to building lasting relationships through honesty,
        clarity, responsibility, and consistent communication.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-6">
        {COMMITMENT_ITEMS.map((item) => (
          <CommitmentCard key={item.title} {...item} />
        ))}
      </div>
    </ViewportSection>
  );
}
