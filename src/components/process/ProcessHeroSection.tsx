import { BarChart3, Target, Users } from "lucide-react";
import { processHeroBackdrop } from "../../config/media";

const HIGHLIGHTS = [
  { icon: Target, line1: "Goal-Focused", line2: "Approach" },
  { icon: Users, line1: "Collaborative", line2: "Execution" },
  { icon: BarChart3, line1: "Long-Term", line2: "Support" },
] as const;

export function ProcessHeroSection() {
  return (
    <section
      id="process-hero"
      aria-labelledby="process-hero-heading"
      className="relative min-h-[min(100dvh,920px)] w-full overflow-hidden pt-28 sm:pt-32 lg:pt-36"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <img
          src={processHeroBackdrop.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
          fetchPriority="high"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#1a0f18]/82 via-[#1a0f18]/45 to-[#1a0f18]/15"
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(min(100dvh,920px)-7rem)] w-full max-w-7xl flex-col justify-center px-4 pb-14 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl text-left lg:max-w-3xl">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#B9A6D1]/40 bg-[#1E1024]/85 px-4 py-1.5 font-mono-accent text-[11px] uppercase tracking-[0.2em] text-[#E8A9C2] sm:text-xs">
            <span
              className="h-2 w-2 shrink-0 rounded-full bg-[#E8A9C2] shadow-[0_0_10px_rgba(232,169,194,0.85)]"
              aria-hidden
            />
            Our process
          </div>

          <h1
            id="process-hero-heading"
            className="mt-5 font-heading text-[clamp(1.85rem,4.6vw,3.05rem)] font-bold leading-[1.1] tracking-tight text-[#F8F6FB]"
          >
            A clear process.
            <br />
            <span className="bg-gradient-to-r from-[#F8F6FB] via-[#D4C4DC] to-[#E8A9C2] bg-clip-text text-transparent">
              From idea
            </span>{" "}
            <span className="bg-gradient-to-r from-[#E8A9C2] via-[#D892AD] to-[#B9A6D1] bg-clip-text text-transparent">
              to delivery.
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-[#E7E1F0] sm:text-[17px]">
            We follow a structured and transparent process to turn your ideas
            into reliable, well-built digital products. From understanding your
            goals to post-launch support, we work closely at every step to
            ensure clarity, quality and long-term value.
          </p>

          <ul className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-stretch sm:gap-0">
            {HIGHLIGHTS.map(({ icon: Icon, line1, line2 }, index) => (
              <li
                key={line1}
                className={`flex flex-1 items-center gap-3 ${
                  index > 0
                    ? "sm:border-l sm:border-[#B9A6D1]/28 sm:pl-6 lg:pl-8"
                    : "sm:pr-2"
                }`}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#E8A9C2]/35 bg-[#2A1830]/90 text-[#E8A9C2] shadow-[0_0_18px_rgba(107,74,135,0.28)]">
                  <Icon className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.65} aria-hidden />
                </div>
                <p className="font-heading text-sm font-semibold leading-snug text-[#E8A9C2]">
                  {line1}
                  <br />
                  <span className="text-[#F8F6FB]">{line2}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
