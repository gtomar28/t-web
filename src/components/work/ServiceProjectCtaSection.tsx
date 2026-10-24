import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getServiceProjectCtaContent } from "../../data/serviceProjectCta";
import { soundEngine } from "../../utils/audioEngine";

type ServiceProjectCtaSectionProps = {
  slug: string;
};

export function ServiceProjectCtaSection({ slug }: ServiceProjectCtaSectionProps) {
  const content = getServiceProjectCtaContent(slug);
  if (!content) return null;

  return (
    <section
      id="service-project-cta"
      aria-labelledby="service-project-cta-heading"
      className="mt-14 sm:mt-16"
    >
      <div className="home-products-services-band relative overflow-hidden rounded-[1.75rem] border border-[#B9A6D1]/28 shadow-[0_22px_56px_rgba(0,0,0,0.38)]">
        <div
          className="pointer-events-none absolute inset-0 z-[1] opacity-[0.05]"
          aria-hidden
          style={{
            backgroundImage:
              "linear-gradient(#B9A6D1 1px, transparent 1px), linear-gradient(90deg, #B9A6D1 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative z-[2] max-w-3xl px-6 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-14">
          <div className="flex items-center gap-4">
            <p className="font-mono-accent text-[11px] uppercase tracking-[0.2em] text-[#E8A9C2] sm:text-xs">
              {content.kicker}
            </p>
            <span
              className="h-px max-w-[7rem] flex-1 bg-gradient-to-r from-[#B9A6D1]/55 to-transparent"
              aria-hidden
            />
          </div>

          <h2
            id="service-project-cta-heading"
            className="mt-5 font-heading text-[clamp(1.85rem,4.2vw,2.65rem)] font-bold leading-[1.1] tracking-tight text-[#F8F6FB]"
          >
            {content.headlineBefore}
            <span className="bg-gradient-to-r from-[#E8A9C2] via-[#D892AD] to-[#F0B8CE] bg-clip-text text-transparent">
              {content.headlineHighlight}
            </span>
            {content.headlineAfter}
          </h2>

          <p className="mt-4 text-base leading-relaxed text-[#C4B4D8] sm:text-[17px]">
            {content.description}
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              to={content.primaryCta.href}
              onClick={() => soundEngine.playClick("hero")}
              className="inline-flex w-fit items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#E8A9C2] to-[#d892ad] px-6 py-3 font-heading text-sm font-semibold text-[#1E1024] shadow-[0_8px_24px_rgba(232,169,194,0.32)] transition hover:brightness-105"
            >
              {content.primaryCta.label}
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              to={content.secondaryCta.href}
              onClick={() => soundEngine.playClick("soft")}
              className="inline-flex w-fit items-center gap-3 text-sm font-medium text-[#F8F6FB] transition hover:text-[#E8A9C2]"
            >
              {content.secondaryCta.label}
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#B9A6D1]/40 bg-[#1E1024]/35 backdrop-blur-sm">
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
