import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { workHeroBackdrop } from "../../config/media";
import type { WorkPageContent } from "../../data/workPages";
import { soundEngine } from "../../utils/audioEngine";
import { WorkSectionLabel } from "./WorkSectionLabel";
import { workIcon } from "./workIcons";

type Props = WorkPageContent["hero"];

export function WorkHeroSection({
  badge,
  titleBefore,
  titleHighlight,
  titleAfter,
  description,
  supporting,
  highlights = [],
  primaryCta,
  secondaryCta,
  backdropImage,
  backdropAlt = "",
  objectPosition = "70% center",
}: Props & { backdropAlt?: string }) {
  return (
    <section
      id="work-hero"
      aria-labelledby="work-hero-heading"
      className="relative min-h-[100dvh] min-h-[100svh] w-full overflow-hidden pt-28 sm:pt-32 lg:pt-36"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <img
          src={backdropImage}
          alt={backdropAlt}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition }}
          fetchPriority="high"
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: `rgba(${workHeroBackdrop.washRgb}, ${workHeroBackdrop.washOpacity})`,
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: workHeroBackdrop.vignetteLayers.join(", ") }}
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-7rem)] min-h-[calc(100svh-7rem)] w-full max-w-7xl flex-col justify-center px-4 pb-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl lg:max-w-[40rem]">
          <WorkSectionLabel>{badge}</WorkSectionLabel>

          <h1
            id="work-hero-heading"
            className="mt-5 font-heading text-[clamp(1.85rem,4.6vw,3.05rem)] font-bold leading-[1.12] tracking-tight text-[#F8F6FB]"
          >
            {titleBefore}
            <span className="bg-gradient-to-r from-[#E8A9C2] via-[#D892AD] to-[#F8F6FB] bg-clip-text text-transparent">
              {titleHighlight}
            </span>
            {titleAfter}
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-[#E7E1F0] sm:max-w-2xl sm:text-[17px]">
            {description}
          </p>

          {supporting ? (
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#C4B4D8] sm:max-w-2xl sm:text-[15px]">
              {supporting}
            </p>
          ) : null}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to={primaryCta.href}
              onClick={() => soundEngine.playClick("hero")}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#E8A9C2] to-[#d892ad] px-6 py-3 font-heading text-sm font-semibold text-[#1E1024] shadow-[0_8px_24px_rgba(232,169,194,0.32)] transition hover:brightness-105"
            >
              {primaryCta.label}
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              to={secondaryCta.href}
              onClick={() => soundEngine.playClick("soft")}
              className="inline-flex items-center gap-2 rounded-full border border-[#B9A6D1]/45 bg-[#1E1024]/40 px-6 py-3 font-heading text-sm font-semibold text-[#F8F6FB] backdrop-blur-sm transition hover:border-[#E8A9C2]/55"
            >
              {secondaryCta.label}
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>

        {highlights.length > 0 ? (
          <div className="mt-8 w-full max-w-5xl border-t border-[#B9A6D1]/22 pt-6 sm:mt-9 sm:pt-7">
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
              {highlights.map(({ icon, label, detail }) => {
                const Icon = workIcon(icon);
                return (
                  <li
                    key={label}
                    className="flex gap-3 rounded-xl border border-[#B9A6D1]/20 bg-[#1E1024]/45 p-3.5 backdrop-blur-sm sm:p-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#E8A9C2]/35 bg-[#55356a]/90 text-[#F8F6FB] shadow-[0_0_16px_rgba(107,74,135,0.35)]">
                      <Icon className="h-[1.1rem] w-[1.1rem]" strokeWidth={1.65} aria-hidden />
                    </div>
                    <div className="min-w-0">
                      <p className="font-heading text-[13px] font-semibold leading-snug text-[#F8F6FB] sm:text-sm">
                        {label}
                      </p>
                      {detail ? (
                        <p className="mt-1 text-[11px] leading-snug text-[#B9A6D1] sm:text-xs">{detail}</p>
                      ) : null}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}
