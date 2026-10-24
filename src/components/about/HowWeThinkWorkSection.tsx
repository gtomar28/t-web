import {
  ArrowUpRight,
  Code2,
  MessageSquareText,
  PenLine,
  Search,
  Target,
} from "lucide-react";
import { Link } from "react-router-dom";
import { ViewportSection } from "../ViewportSection";
import { soundEngine } from "../../utils/audioEngine";

const STEPS = [
  {
    step: "01",
    title: "Understand First",
    description:
      "We take time to learn about the challenge, the users, and the goals before writing a single line of code.",
    icon: Search,
    href: "/process",
  },
  {
    step: "02",
    title: "Design With Intent",
    description:
      "Every feature and flow is planned around real needs, clear priorities, and long-term value.",
    icon: PenLine,
    href: "/process",
  },
  {
    step: "03",
    title: "Build for Real Use",
    description:
      "We focus on creating reliable systems that are easy to use and maintain.",
    icon: Code2,
    href: "/process",
  },
  {
    step: "04",
    title: "Communicate Clearly",
    description:
      "We keep communication open and honest so you always know where things stand.",
    icon: MessageSquareText,
    href: "/process",
  },
] as const;

function ProcessConnector() {
  return (
    <svg
      className="pointer-events-none absolute left-[5%] right-[3%] top-[3.35rem] hidden h-12 sm:block lg:top-[2.9rem]"
      viewBox="0 0 1000 40"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <marker
          id="think-work-arrow"
          markerWidth="12"
          markerHeight="8"
          refX="6"
          refY="4"
          orient="auto"
        >
          <path d="M0,0 L8,4 L0,8 Z" fill="rgba(232,169,194,0.85)" />
        </marker>
        <filter id="think-work-dot-glow">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        d="M 40 24 H 960"
        stroke="rgba(232,169,194,0.55)"
        strokeWidth="1.5"
        markerEnd="url(#think-work-arrow)"
      />
    </svg>
  );
}

/** Midpoints between step columns — aligned to the same 4-col grid as the cards. */
function ProcessConnectorDots() {
  const dotTop = "top-[4rem] sm:top-[4.7rem]";

  return (
    <div
      className={`pointer-events-none absolute inset-x-0 hidden lg:grid lg:grid-cols-4 lg:gap-5 xl:gap-6 ${dotTop}`}
      aria-hidden
    >
      {[0, 1, 2].map((i) => (
        <div key={i} className="relative h-0">
          <div className="absolute left-full top-0 z-10 -translate-x-1/2 -translate-y-1/2">
            <div
              className="h-8 w-8 rounded-full bg-[#E8A9C2]/15 shadow-[0_0_14px_rgba(232,169,194,0.45)]"
              aria-hidden
            />
            <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E8A9C2]" />
          </div>
        </div>
      ))}
    </div>
  );
}

function StepNode({
  step,
  title,
  description,
  icon: Icon,
  href,
}: (typeof STEPS)[number]) {
  return (
    <div className="relative flex flex-col items-center text-center">
      <p className="font-mono-accent text-[10px] uppercase tracking-[0.28em] text-[#E8A9C2]/90 sm:text-[11px]">
        {step}
      </p>
      <div className="relative z-10 mt-3 flex h-[5.25rem] w-[5.25rem] items-center justify-center sm:h-[5.5rem] sm:w-[5.5rem]">
        <div className="absolute inset-0 rounded-full bg-[#1A0D20]/80 shadow-[0_0_36px_rgba(107,74,135,0.35)]" />
        <div className="relative flex h-[3.1rem] w-[3.1rem] items-center justify-center rounded-full border-2 border-[#E8A9C2]/75 bg-[#2A1830]/95 text-[#F3C9DC] sm:h-[3.35rem] sm:w-[3.35rem]">
          <Icon
            className="h-[1.35rem] w-[1.35rem] sm:h-6 sm:w-6"
            strokeWidth={1.65}
            aria-hidden
          />
        </div>
      </div>
      <article className="relative z-1 -mt-3 flex w-full min-h-[11.5rem] flex-col rounded-2xl border border-[#B9A6D1]/35 bg-[#32193f]/92 px-4 pb-4 pt-5 text-left shadow-[0_12px_40px_rgba(0,0,0,0.22)] sm:min-h-[12rem] sm:px-4 sm:pb-4.5 sm:pt-5.5">
        <h3 className="font-heading text-base font-semibold text-[#F8F6FB] sm:text-[17px]">
          {title}
        </h3>
        <p className="mt-2.5 flex-1 text-xs leading-relaxed text-[#D8CCE6] sm:text-[13px]">
          {description}
        </p>
        <Link
          to={href}
          onClick={() => soundEngine.playClick("soft")}
          className="mt-4 inline-flex items-center gap-1.5 font-heading text-xs font-medium text-[#F8F6FB] transition hover:text-[#E8A9C2] sm:text-[13px]"
        >
          Learn more
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </article>
    </div>
  );
}

export function HowWeThinkWorkSection() {
  return (
    <ViewportSection
      id="how-we-think-and-work"
      aria-labelledby="how-we-think-heading"
      className="trevyk-viewport-section--center relative overflow-hidden before:pointer-events-none before:absolute before:inset-y-0 before:left-1/2 before:-z-10 before:w-screen before:-translate-x-1/2 before:bg-[#1a0f18]"
      innerClassName="relative flex flex-col justify-center py-10 sm:py-12"
    >
      <div className="inline-flex w-fit max-w-full self-start items-center gap-2 rounded-full border border-[#B9A6D1]/40 bg-[#1E1024]/90 px-4 py-1.5 font-mono-accent text-[11px] uppercase tracking-[0.2em] text-[#E8A9C2] sm:text-xs">
        <Target className="h-4 w-4" aria-hidden />
        <span>03 / How we think and work</span>
      </div>

      <p className="mt-5 font-mono-accent text-[11px] uppercase tracking-[0.22em] text-[#E8A9C2] sm:text-xs">
        Our approach
      </p>

      <h2
        id="how-we-think-heading"
        className="mt-3 max-w-3xl font-heading text-[clamp(1.85rem,4.5vw,2.85rem)] font-bold leading-[1.1] tracking-tight text-[#F8F6FB]"
      >
        Good software starts with{" "}
        <span className="bg-gradient-to-r from-[#E8A9C2] via-[#F0B8CE] to-[#B9A6D1] bg-clip-text text-transparent">
          good decisions.
        </span>
      </h2>

      <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#E7E1F0] sm:text-[17px]">
        We take a thoughtful and practical approach to every project —
        understanding the real problem, making deliberate choices, building
        reliable solutions, and staying transparent throughout.
      </p>

      <div className="relative mt-12 w-full lg:mt-14">
        <ProcessConnector />
        <ProcessConnectorDots />
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4 lg:gap-5 xl:gap-6">
          {STEPS.map((item) => (
            <StepNode key={item.step} {...item} />
          ))}
        </div>
      </div>
    </ViewportSection>
  );
}
