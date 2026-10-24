import {
  ArrowUpRight,
  Briefcase,
  GraduationCap,
  Layers,
  Lightbulb,
  MessageSquare,
} from "lucide-react";
import { Link } from "react-router-dom";
import { soundEngine } from "../../utils/audioEngine";

const PIPELINE_ITEMS = [
  {
    title: "Education-Focused Product",
    status: "In development",
    statusTone: "amber" as const,
    icon: GraduationCap,
  },
  {
    title: "Business Solution",
    status: "In progress",
    statusTone: "plum" as const,
    icon: Briefcase,
  },
  {
    title: "Platform / SaaS Product",
    status: "Planning",
    statusTone: "violet" as const,
    icon: Layers,
  },
  {
    title: "Innovation Project",
    status: "Exploring",
    statusTone: "mint" as const,
    icon: Lightbulb,
  },
] as const;

const STATUS_STYLES = {
  amber: "border-[#E8C97A]/35 bg-[#2A2418]/80 text-[#F0D89A]",
  plum: "border-[#E8A9C2]/35 bg-[#341C3C]/80 text-[#E8A9C2]",
  violet: "border-[#B9A6D1]/40 bg-[#2A1830]/80 text-[#D8CCE6]",
  mint: "border-[#8FD4C4]/30 bg-[#1A2824]/80 text-[#A8E6D8]",
} as const;

function SkeletonLines() {
  return (
    <div className="mt-3 space-y-2" aria-hidden>
      <div className="h-2 w-full animate-pulse rounded bg-[#B9A6D1]/14" />
      <div className="h-2 w-[88%] animate-pulse rounded bg-[#B9A6D1]/10" />
    </div>
  );
}

function PipelineCard({
  title,
  status,
  statusTone,
  icon: Icon,
}: (typeof PIPELINE_ITEMS)[number]) {
  return (
    <article className="flex min-h-[15.5rem] flex-col rounded-2xl border border-[#B9A6D1]/26 bg-[#1E1024]/88 p-5 shadow-[0_14px_36px_rgba(0,0,0,0.28)] sm:p-5">
      <div className="flex items-start justify-between gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E8A9C2]/30 bg-gradient-to-br from-[#6B4A87]/50 to-[#2A1830]/90 text-[#E8A9C2] shadow-[0_0_20px_rgba(107,74,135,0.35)]">
          <Icon className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.65} aria-hidden />
        </div>
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono-accent text-[9px] uppercase tracking-wide sm:text-[10px] ${STATUS_STYLES[statusTone]}`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              statusTone === "amber"
                ? "bg-[#E8C97A]"
                : statusTone === "plum"
                  ? "bg-[#E8A9C2]"
                  : statusTone === "violet"
                    ? "bg-[#B9A6D1]"
                    : "bg-[#8FD4C4]"
            }`}
            aria-hidden
          />
          {status}
        </span>
      </div>

      <h3 className="mt-4 font-heading text-sm font-bold leading-snug text-[#F8F6FB] sm:text-[15px]">
        {title}
      </h3>

      <SkeletonLines />

      <div className="flex-1 min-h-3" aria-hidden />

      <button
        type="button"
        disabled
        className="mt-4 inline-flex w-fit cursor-default items-center gap-2 rounded-full border border-[#B9A6D1]/32 bg-[#1E1024]/60 px-3.5 py-2 font-heading text-xs font-semibold text-[#B9A6D1]/85 sm:text-[13px]"
      >
        Coming soon
        <ArrowUpRight className="h-3.5 w-3.5 opacity-70" aria-hidden />
      </button>
    </article>
  );
}

export function MoreToComeSection() {
  return (
    <section
      id="more-to-come"
      aria-labelledby="more-to-come-heading"
      className="relative border-t border-[#6B4A87]/25 py-14 sm:py-16 lg:py-20"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-35"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 75% 55% at 50% 100%, rgba(107,74,135,0.22) 0%, transparent 65%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#B9A6D1]/40 bg-[#1E1024]/90 px-4 py-1.5 font-mono-accent text-[11px] uppercase tracking-[0.2em] text-[#E8A9C2] sm:text-xs">
            <span
              className="h-2 w-2 shrink-0 rounded-full bg-[#E8A9C2] shadow-[0_0_10px_rgba(232,169,194,0.85)]"
              aria-hidden
            />
            More to come
          </div>

          <h2
            id="more-to-come-heading"
            className="mt-5 font-heading text-[clamp(1.75rem,4vw,2.65rem)] font-bold leading-[1.12] tracking-tight text-[#F8F6FB]"
          >
            More ideas in the{" "}
            <span className="bg-gradient-to-r from-[#F8F6FB] via-[#D4C4DC] to-[#E8A9C2] bg-clip-text text-transparent">
              pipeline.
            </span>
          </h2>

          <p className="mt-4 text-base leading-relaxed text-[#C4B4D8] sm:text-[17px]">
            We are continuously working on new products and solutions to solve
            real-world problems across education, businesses and emerging
            domains.
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {PIPELINE_ITEMS.map((item) => (
            <li key={item.title}>
              <PipelineCard {...item} />
            </li>
          ))}
        </ul>

        <div className="mt-8 overflow-hidden rounded-2xl border border-[#B9A6D1]/28 bg-[#1E1024]/90 shadow-[0_18px_44px_rgba(0,0,0,0.32)] lg:mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 lg:items-center">
            <div className="flex flex-col gap-4 border-b border-[#B9A6D1]/20 p-6 sm:flex-row sm:items-center lg:col-span-5 lg:border-b-0 lg:border-r lg:p-8">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#E8A9C2]/35 bg-gradient-to-br from-[#6B4A87]/45 to-[#2A1830]/90 text-[#E8A9C2] shadow-[0_0_24px_rgba(107,74,135,0.4)]">
                <MessageSquare className="h-5 w-5" strokeWidth={1.65} aria-hidden />
              </div>
              <div>
                <p className="font-mono-accent text-[10px] uppercase tracking-[0.18em] text-[#E8A9C2] sm:text-[11px]">
                  Have a project in mind?
                </p>
                <p className="mt-1 font-heading text-xl font-bold leading-tight text-[#F8F6FB] sm:text-2xl">
                  Let&apos;s{" "}
                  <span className="bg-gradient-to-r from-[#F8F6FB] via-[#D4C4DC] to-[#E8A9C2] bg-clip-text text-transparent">
                    build it together.
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-center border-b border-[#B9A6D1]/20 p-6 lg:col-span-4 lg:border-b-0 lg:border-r lg:px-6 lg:py-8">
              <p className="text-sm leading-relaxed text-[#C4B4D8] sm:text-[15px]">
                Whether it&apos;s a custom web application, a SaaS product, or a
                unique solution for your business or institution — we&apos;d
                love to discuss it.
              </p>
            </div>

            <div className="flex items-center justify-center p-6 lg:col-span-3 lg:p-8">
              <Link
                to="/contact"
                onClick={() => soundEngine.playClick("hero")}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#E8A9C2] to-[#d892ad] px-6 py-3.5 font-heading text-sm font-semibold text-[#1E1024] shadow-[0_10px_28px_rgba(232,169,194,0.32)] transition hover:brightness-105 sm:w-auto"
              >
                Start a project
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
