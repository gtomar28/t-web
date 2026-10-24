import {
  ArrowUpRight,
  BarChart3,
  Bot,
  Box,
  Code2,
  Globe,
  LayoutGrid,
  PenLine,
  Settings2,
  Users,
} from "lucide-react";
import { whatWeDoHeroBackdrop } from "../../config/media";
import { soundEngine } from "../../utils/audioEngine";

/** Spread around the laptop — top / mid / bottom on each side (xl+). */
const FLOATING_OFFERS = [
  {
    title: "Web Development",
    description: "Modern, responsive business websites",
    icon: Globe,
    className: "left-[2%] top-[6%] xl:left-[4%] xl:top-[5%]",
  },
  {
    title: "Custom Software",
    description: "Tailored software solutions",
    icon: Code2,
    className: "left-0 top-[40%] -translate-x-[4%] xl:left-[1%] xl:translate-x-0",
  },
  {
    title: "Web Applications",
    description: "Scalable web applications for real business needs",
    icon: LayoutGrid,
    className: "left-[3%] top-[72%] xl:left-[5%] xl:top-[70%]",
  },
  {
    title: "UI/UX & Design",
    description: "User-friendly and modern designs",
    icon: PenLine,
    className: "right-0 top-[6%] translate-x-[6%] xl:top-[5%] xl:translate-x-[10%]",
  },
  {
    title: "AI & Automation",
    description: "Smarter workflows with AI",
    icon: Bot,
    className: "right-0 top-[40%] translate-x-[8%] xl:translate-x-[12%]",
  },
  {
    title: "Digital Growth",
    description: "SEO, digital marketing & online presence",
    icon: BarChart3,
    className: "right-0 top-[72%] translate-x-[5%] xl:top-[70%] xl:translate-x-[10%]",
  },
] as const;

const HIGHLIGHTS = [
  { icon: Box, line1: "Built for", line2: "your needs" },
  { icon: Users, line1: "For schools,", line2: "businesses & more" },
  { icon: Settings2, line1: "Practical and", line2: "scalable" },
  { icon: BarChart3, line1: "Focused on", line2: "real results" },
] as const;

function FloatingOfferCard({
  title,
  description,
  icon: Icon,
  className,
}: (typeof FLOATING_OFFERS)[number]) {
  return (
    <div
      className={`pointer-events-none absolute hidden w-[min(100%,11.5rem)] rounded-xl border border-[#B9A6D1]/35 bg-[#1E1024]/72 p-3 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-md xl:block ${className}`}
    >
      <div className="flex items-start gap-2.5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#E8A9C2]/35 bg-[#2A1830]/90 text-[#E8A9C2]">
          <Icon className="h-4 w-4" strokeWidth={1.65} aria-hidden />
        </div>
        <div className="min-w-0">
          <p className="font-heading text-[11px] font-semibold leading-tight text-[#F8F6FB]">
            {title}
          </p>
          <p className="mt-1 text-[10px] leading-snug text-[#C4B4D8]">
            {description}
          </p>
        </div>
      </div>
      <ArrowUpRight
        className="absolute bottom-2.5 right-2.5 h-3.5 w-3.5 text-[#E8A9C2]/70"
        aria-hidden
      />
    </div>
  );
}

export function WhatWeDoHeroSection() {
  return (
    <section
      id="what-we-do-hero"
      aria-labelledby="what-we-do-hero-heading"
      className="relative min-h-[min(100dvh,920px)] w-full overflow-hidden pt-28 sm:pt-32 lg:pt-36"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <img
          src={whatWeDoHeroBackdrop.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[68%_42%]"
          fetchPriority="high"
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: `rgba(${whatWeDoHeroBackdrop.washRgb}, ${whatWeDoHeroBackdrop.washOpacity})`,
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: whatWeDoHeroBackdrop.vignetteLayers.join(", ") }}
        />
        <div className="trevyk-build-together-live-bg absolute inset-0 opacity-[0.22] mix-blend-soft-light" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(min(100dvh,920px)-7rem)] w-full max-w-7xl flex-col justify-center px-4 pb-14 sm:px-6 lg:px-8">
        <div className="relative grid flex-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6 xl:col-span-5">
            <div className="inline-flex w-fit max-w-full items-center gap-2 rounded-full border border-[#B9A6D1]/40 bg-[#1E1024]/85 px-4 py-1.5 font-mono-accent text-[11px] uppercase tracking-[0.2em] text-[#E8A9C2] sm:text-xs">
              <span
                className="h-2 w-2 shrink-0 rounded-full bg-[#E8A9C2] shadow-[0_0_10px_rgba(232,169,194,0.85)]"
                aria-hidden
              />
              <span>01 / What we do</span>
            </div>

            <h1
              id="what-we-do-hero-heading"
              className="mt-5 font-heading text-[clamp(1.85rem,4.8vw,3.15rem)] font-bold leading-[1.08] tracking-tight text-[#F8F6FB]"
            >
              Custom websites, software, and{" "}
              <span className="bg-gradient-to-r from-[#F8F6FB] via-[#D4C4DC] to-[#E8A9C2] bg-clip-text text-transparent">
                digital growth.
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#E7E1F0] sm:text-[17px]">
              We help schools, businesses, and organisations build, operate, and
              grow with reliable digital solutions — from custom software and web
              applications to SEO and digital marketing.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#our-services"
                onClick={() => soundEngine.playClick("hero")}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#E8A9C2] to-[#d892ad] px-6 py-3 font-heading text-sm font-semibold text-[#1E1024] shadow-[0_8px_24px_rgba(232,169,194,0.32)] transition hover:brightness-105"
              >
                Explore our services
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
              <a
                href="#our-services"
                onClick={() => soundEngine.playClick("soft")}
                className="inline-flex items-center gap-2 rounded-full border border-[#B9A6D1]/45 bg-[#1E1024]/40 px-6 py-3 font-heading text-sm font-semibold text-[#F8F6FB] backdrop-blur-sm transition hover:border-[#E8A9C2]/55 hover:bg-[#2A1830]/50"
              >
                View our work
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
            </div>

            <ul className="mt-10 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              {HIGHLIGHTS.map(({ icon: Icon, line1, line2 }) => (
                <li key={line1} className="flex flex-col items-start gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#B9A6D1]/35 bg-[#1E1024]/80 text-[#E8A9C2]">
                    <Icon className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.65} aria-hidden />
                  </div>
                  <p className="font-heading text-[11px] font-semibold leading-snug text-[#E8A9C2] sm:text-xs">
                    {line1}
                    <br />
                    <span className="text-[#F8F6FB]">{line2}</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="relative hidden min-h-[min(460px,56vh)] lg:col-span-6 lg:block xl:col-span-7 xl:min-h-[520px]"
            aria-hidden
          >
            <div
              className="pointer-events-none absolute left-[32%] top-[30%] h-[34%] w-[36%] rounded-2xl xl:left-[34%] xl:top-[32%] xl:h-[32%] xl:w-[32%]"
              aria-hidden
            />
            {FLOATING_OFFERS.map((offer) => (
              <FloatingOfferCard key={offer.title} {...offer} />
            ))}
          </div>
        </div>

        <ul className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:hidden">
          {FLOATING_OFFERS.map(({ title, description, icon: Icon }) => (
            <li
              key={title}
              className="flex items-start gap-3 rounded-xl border border-[#B9A6D1]/30 bg-[#1E1024]/75 p-3 backdrop-blur-sm"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#E8A9C2]/30 bg-[#2A1830]/90 text-[#E8A9C2]">
                <Icon className="h-4 w-4" aria-hidden />
              </div>
              <div>
                <p className="font-heading text-sm font-semibold text-[#F8F6FB]">{title}</p>
                <p className="text-xs text-[#C4B4D8]">{description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
