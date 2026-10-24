import {
  ArrowUpRight,
  BarChart3,
  Lightbulb,
  Mouse,
  Settings2,
  Users,
} from "lucide-react";
import { ourProductsHeroBackdrop } from "../../config/media";
import { soundEngine } from "../../utils/audioEngine";

const HIGHLIGHTS = [
  { icon: Lightbulb, line1: "Problem-focused", line2: "Products" },
  { icon: Users, line1: "For Schools,", line2: "Businesses & More" },
  { icon: Settings2, line1: "Practical and", line2: "Scalable" },
  { icon: BarChart3, line1: "Built for Real", line2: "Impact" },
] as const;

export function OurProductsHeroSection() {
  return (
    <section
      id="our-products-hero"
      aria-labelledby="our-products-hero-heading"
      className="relative min-h-[min(100dvh,920px)] w-full overflow-hidden pt-28 sm:pt-32 lg:pt-36"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <img
          src={ourProductsHeroBackdrop.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[58%_42%] lg:object-[62%_45%]"
          fetchPriority="high"
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: `rgba(${ourProductsHeroBackdrop.washRgb}, ${ourProductsHeroBackdrop.washOpacity})`,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: ourProductsHeroBackdrop.vignetteLayers.join(", "),
          }}
        />
        <div className="trevyk-build-together-live-bg absolute inset-0 opacity-[0.18] mix-blend-soft-light" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(min(100dvh,920px)-7rem)] w-full max-w-7xl flex-col justify-center px-4 pb-14 sm:px-6 lg:px-8">
        <div className="max-w-xl lg:max-w-[34rem]">
          <div className="inline-flex w-fit max-w-full items-center gap-2 rounded-full border border-[#B9A6D1]/40 bg-[#1E1024]/85 px-4 py-1.5 font-mono-accent text-[11px] uppercase tracking-[0.2em] text-[#E8A9C2] sm:text-xs">
            <span
              className="h-2 w-2 shrink-0 rounded-full bg-[#E8A9C2] shadow-[0_0_10px_rgba(232,169,194,0.85)]"
              aria-hidden
            />
            <span>Our products</span>
          </div>

          <h1
            id="our-products-hero-heading"
            className="mt-5 font-heading text-[clamp(1.85rem,4.6vw,3rem)] font-bold leading-[1.1] tracking-tight text-[#F8F6FB]"
          >
            Products that turn ideas into{" "}
            <span className="bg-gradient-to-r from-[#F8F6FB] via-[#D4C4DC] to-[#E8A9C2] bg-clip-text text-transparent">
              real solutions.
            </span>
          </h1>

          <p className="mt-5 text-base leading-relaxed text-[#E7E1F0] sm:text-[17px]">
            We build focused products and solutions for schools, businesses and
            organisations — designed to solve real-world problems and create
            long-term value.
          </p>

          <ul className="mt-10 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {HIGHLIGHTS.map(({ icon: Icon, line1, line2 }) => (
              <li key={line1} className="flex flex-col items-start gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#B9A6D1]/35 bg-[#1E1024]/80 text-[#E8A9C2]">
                  <Icon
                    className="h-[1.15rem] w-[1.15rem]"
                    strokeWidth={1.65}
                    aria-hidden
                  />
                </div>
                <p className="font-heading text-[11px] font-semibold leading-snug text-[#E8A9C2] sm:text-xs">
                  {line1}
                  <br />
                  <span className="text-[#F8F6FB]">{line2}</span>
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap items-center gap-5 sm:gap-6">
            <a
              href="#products-overview"
              onClick={() => soundEngine.playClick("hero")}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#E8A9C2] to-[#d892ad] px-6 py-3 font-heading text-sm font-semibold text-[#1E1024] shadow-[0_8px_24px_rgba(232,169,194,0.32)] transition hover:brightness-105"
            >
              Explore our products
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>

            <div
              className="hidden items-center gap-4 sm:flex"
              aria-hidden
            >
              <span className="h-10 w-px bg-[#B9A6D1]/35" />
              <div className="flex items-center gap-3 text-[#B9A6D1]">
                <Mouse className="h-5 w-5 shrink-0 text-[#E8A9C2]/80" strokeWidth={1.5} />
                <span className="font-mono-accent text-[11px] uppercase tracking-[0.14em]">
                  Scroll to explore
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
