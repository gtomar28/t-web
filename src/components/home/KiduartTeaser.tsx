import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  School,
  Mail,
} from "lucide-react";
import { KIDUART_TEASER_JOURNEY } from "../../data/kiduartTeaserJourney";
import { SiteSettings } from "../../types";
import { soundEngine } from "../../utils/audioEngine";
import { ScrollReveal } from "../ScrollReveal";
import { CampusGraphIllustration } from "./CampusGraphIllustration";

interface KiduartTeaserProps {
  settings: SiteSettings;
}

export const KiduartTeaser: React.FC<KiduartTeaserProps> = ({ settings }) => {
  const [step, setStep] = useState(0);
  const journey = KIDUART_TEASER_JOURNEY;
  const active = journey[step];
  const thumbLeftPct = ((step + 1) / journey.length) * 100;

  return (
    <section
      id="kiduart-teaser"
      className="trevyk-viewport-section relative overflow-hidden px-4 py-14 sm:px-6 sm:py-20 lg:px-8"
    >
      <div className="relative max-w-7xl mx-auto">
        <ScrollReveal className="mb-10" reducedMotion={settings.reducedMotion}>
          <div className="mb-4 inline-flex items-center space-x-2 rounded-full border border-[#B9A6D1]/40 bg-[#1E1024] px-3.5 py-1.5 font-mono-accent text-xs text-[#E8A9C2]">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>FLAGSHIP PRODUCT · KIDUART</span>
          </div>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
            <h2 className="max-w-3xl font-heading text-3xl font-bold leading-tight text-[#F8F6FB] sm:text-5xl">
              Kiduart the school operating system we ship.
            </h2>
            <div className="flex shrink-0 flex-wrap items-center gap-3 lg:justify-end lg:pt-1">
              <a
                href="https://kiduart.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundEngine.playClick("soft")}
                className="inline-flex items-center gap-2 rounded-full bg-[#6B4A87] px-5 py-2.5 font-heading text-xs font-semibold text-white sm:text-sm"
              >
                Book a free demo <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <Link
                to="/process"
                onClick={() => soundEngine.playClick("soft")}
                className="inline-flex items-center gap-2 rounded-full border border-[#B9A6D1]/40 bg-[#2A1830] px-5 py-2.5 font-mono-accent text-xs font-semibold text-[#E8A9C2] sm:text-sm"
              >
                How we implement <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#E7E1F0] sm:text-lg">
            Scrub the campus year each step lights the campus graph.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 font-mono-accent text-xs text-[#B9A6D1]">
            <School className="w-3.5 h-3.5" />
            <span>Live product desk · kiduart.com</span>
          </div>
        </ScrollReveal>
        {/*  */}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:items-start">

          <ScrollReveal
            className="lg:col-span-5 lg:self-start"
            reducedMotion={settings.reducedMotion}
          >
            <CampusGraphIllustration
              step={step}
              reducedMotion={settings.reducedMotion}
              className="w-full"
            />
          </ScrollReveal>

          <ScrollReveal
            className="lg:col-span-7 lg:self-start"
            reducedMotion={settings.reducedMotion}
          >
            <div className="rounded-2xl border border-[#B9A6D1]/40 bg-[#1E1024]/95 p-5 sm:p-6">
              <div className="mb-3 flex items-center justify-between font-mono-accent text-[10px] text-[#E8A9C2]">
                <span>SCHOOL-YEAR SCRUBBER</span>
                <span>
                  {String(step + 1).padStart(2, "0")} / {journey.length}
                </span>
              </div>
              <div className="relative w-full py-1.5">
                <div
                  className="relative h-2 overflow-hidden rounded-full border border-[#B9A6D1]/30 bg-[#2A1830]"
                  aria-hidden
                >
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#6B4A87] via-[#8B6AA8] to-[#B9A6D1] transition-[width] duration-200 ease-out"
                    style={{ width: `${thumbLeftPct}%` }}
                  />
                </div>
                <div
                  className="pointer-events-none absolute top-1/2 z-10 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#F8F6FB] bg-[#E8A9C2] shadow-[0_0_12px_rgba(232,169,194,0.55)] transition-[left] duration-200"
                  style={{ left: `${thumbLeftPct}%` }}
                  aria-hidden
                />
                <input
                  type="range"
                  min={0}
                  max={journey.length - 1}
                  step={1}
                  value={step}
                  aria-label="Scrub school-year journey"
                  aria-valuetext={`Step ${step + 1} of ${journey.length}: ${active.title}`}
                  onChange={(e) => {
                    setStep(Number(e.target.value));
                    soundEngine.playHover();
                  }}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {journey.map((j, i) => (
                  <button
                    key={j.title}
                    type="button"
                    onClick={() => {
                      setStep(i);
                      soundEngine.playClick("soft");
                    }}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-mono-accent border ${
                      i === step
                        ? "bg-[#6B4A87] text-white border-[#6B4A87]"
                        : "border-[#B9A6D1]/30 bg-[#2A1830] text-[#E7E1F0]"
                    }`}
                  >
                    {j.title}
                  </button>
                ))}
              </div>
              <h3 className="mt-5 font-heading text-lg font-bold text-[#F8F6FB]">
                {active.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#E7E1F0]">
                {active.desc}
              </p>
              <ul className="mt-4 space-y-2.5 text-xs leading-relaxed text-[#B9A6D1]">
                {active.bullets.map((line) => (
                  <li key={line} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#6B4A87]" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="https://kiduart.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundEngine.playClick("soft")}
                  className="inline-flex items-center gap-2 rounded-full bg-[#6B4A87] px-4 py-2 font-heading text-xs font-semibold text-white"
                >
                  Visit kiduart.com
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <Link
                  to="/contact"
                  onClick={() => soundEngine.playClick("soft")}
                  className="inline-flex items-center gap-2 rounded-full border border-[#B9A6D1]/40 bg-[#2A1830] px-4 py-2 font-mono-accent text-xs font-semibold text-[#E8A9C2]"
                >
                  Contact
                  <Mail className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
