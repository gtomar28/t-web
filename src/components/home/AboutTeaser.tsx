import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Code2,
  Boxes,
  Lightbulb,
  BarChart3,
  Users,
} from "lucide-react";
import { SiteSettings } from "../../types";
import { soundEngine } from "../../utils/audioEngine";
import { ScrollReveal } from "../ScrollReveal";

interface AboutTeaserProps {
  settings: SiteSettings;
}

const PILLARS = [
  {
    num: "01",
    title: "Product-first thinking",
    desc: "We start with real problems, user needs and long-term value.",
    icon: Lightbulb,
    accent: true,
  },
  {
    num: "02",
    title: "Measurable delivery",
    desc: "Clear milestones, transparent progress and outcomes you can track.",
    icon: BarChart3,
    accent: false,
  },
  {
    num: "03",
    title: "Built for real workflows",
    desc: "Systems that fit your operations, not the other way around.",
    icon: Users,
    accent: false,
  },
];

/**
 * Full-bleed plum surface (same as client reviews) — not the mid-band grid.
 * Image slot on the right for a future asset from design.
 */
export const AboutTeaser: React.FC<AboutTeaserProps> = ({ settings }) => {
  return (
    <section
      id="about-teaser"
      className="relative w-full border-t border-[#B9A6D1]/15 bg-background py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <ScrollReveal
            className="lg:col-span-6 xl:col-span-5"
            reducedMotion={settings.reducedMotion}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E8A9C2]/45 bg-[#1E1024]/80 px-3.5 py-1.5 font-mono-accent text-xs text-[#E8A9C2]">
              <span className="font-semibold text-[#F8F6FB]/55">04</span>
              <span>ABOUT TREVYK</span>
            </div>

            <h2 className="mt-5 font-heading text-3xl font-bold leading-[1.12] tracking-tight text-[#F8F6FB] sm:text-4xl lg:text-[2.65rem]">
              We turn complex ideas into working{" "}
              <span className="bg-gradient-to-r from-[#F8F6FB] via-[#B9A6D1] to-[#E8A9C2] bg-clip-text text-transparent">
                digital products.
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#B9A6D1] sm:text-lg">
              A technology company building product platforms and custom systems
              with disciplined engineering.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#B9A6D1]/35 bg-[#1E1024]/60 px-4 py-2 font-mono-accent text-[11px] text-[#E7E1F0] sm:text-xs">
                <Code2 className="h-3.5 w-3.5 text-[#E8A9C2]" aria-hidden />
                Product Engineering
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#B9A6D1]/35 bg-[#1E1024]/60 px-4 py-2 font-mono-accent text-[11px] text-[#E7E1F0] sm:text-xs">
                <Boxes className="h-3.5 w-3.5 text-[#E8A9C2]" aria-hidden />
                Custom Software
              </span>
            </div>

            <div className="mt-8">
              <Link
                to="/about"
                onClick={() => soundEngine.playClick("soft")}
                className="group inline-flex items-center gap-2 rounded-full border border-[#B9A6D1]/45 bg-[#1E1024]/70 px-6 py-3 font-heading text-xs font-semibold text-[#F8F6FB] transition-colors hover:border-[#E8A9C2]/55 sm:text-sm"
              >
                <span>Read our story</span>
                <ArrowRight className="h-4 w-4 text-[#E8A9C2] transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal
            className="lg:col-span-6 xl:col-span-7"
            variant="right"
            reducedMotion={settings.reducedMotion}
          >
            <figure className="mx-auto w-full max-w-xl lg:mx-0 lg:ml-auto lg:max-w-none">
              <img
                src="/about.png"
                alt="Product, systems, and delivery — Trevyk builds ideas into shipped software"
                width={1152}
                height={864}
                loading="lazy"
                decoding="async"
                className="h-auto w-full max-h-[min(72vh,1250px)] object-contain object-center"
                sizes="(max-width: 1024px) 92vw, (max-width: 1280px) 48vw, 640px"
              />
            </figure>
          </ScrollReveal>
        </div>

        <div className="mt-16 grid grid-cols-1 divide-y divide-[#B9A6D1]/20 border-t border-[#B9A6D1]/20 sm:mt-20 md:grid-cols-3 md:divide-x md:divide-y-0">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <ScrollReveal
                key={pillar.num}
                className="px-0 py-8 md:px-8 md:py-10 first:md:pl-0 last:md:pr-0"
                reducedMotion={settings.reducedMotion}
              >
                <p className="font-mono-accent text-[11px] tracking-[0.2em] text-[#B9A6D1]/80">
                  {pillar.num}
                </p>
                <div className="mt-3 inline-flex rounded-lg border border-[#B9A6D1]/30 bg-[#1E1024]/80 p-2.5">
                  <Icon className="h-4 w-4 text-[#E8A9C2]" aria-hidden />
                </div>
                <h3
                  className={`mt-4 font-heading text-lg font-semibold sm:text-xl ${
                    pillar.accent ? "text-[#E8A9C2]" : "text-[#F8F6FB]"
                  }`}
                >
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#B9A6D1]">
                  {pillar.desc}
                </p>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
