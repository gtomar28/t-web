import React, { useState } from "react";
import {
  ShieldCheck,
  HeartHandshake,
  TrendingUp,
  Layers,
  ArrowRight,
  CheckCircle2,
  Compass,
  Building2,
  GraduationCap,
  Briefcase,
  MapPin,
} from "lucide-react";
import { SiteSettings } from "../types";
import { TrevykLogo } from "../components/TrevykLogo";
import { PageAtmosphere } from "../components/PageAtmosphere";
import { SectionBridge } from "../components/SectionBridge";
import { WowAccent } from "../components/WowAccent";
import { ScrollReveal } from "../components/ScrollReveal";
import { MagneticCard } from "../components/MagneticCard";
import { soundEngine } from "../utils/audioEngine";
import { Link } from "react-router-dom";
import { StudioFrame } from "../components/StudioFrame";

interface AboutPageProps {
  settings: SiteSettings;
  onOpenArchitectureModal: () => void;
}

const CORE_VALUES = [
  {
    title: "Publish only what exists",
    tagline: "Honest claims",
    desc: "We describe capabilities that are built and shippable. Anything still in development is labelled clearly  not billed as live. Same charter our Kiduart product team holds publicly.",
    icon: ShieldCheck,
  },
  {
    title: "Support that stays close",
    tagline: "Accountable team",
    desc: "Demos, onboarding, and support run with the people who ship the product. No invented 24/7 SLA theatre  we reply within one business day and stay accountable.",
    icon: HeartHandshake,
  },
  {
    title: "Partnership for progress",
    tagline: "Product + engineering",
    desc: "Trevyk builds platforms like Kiduart and delivers custom software when a product alone is not enough  for schools, organizations, and teams that need systems they can own.",
    icon: TrendingUp,
  },
];

export const AboutPage: React.FC<AboutPageProps> = ({
  settings,
  onOpenArchitectureModal,
}) => {
  const [activeValue, setActiveValue] = useState(0);

  return (
    <div
      id="about-page"
      className="relative w-full min-h-screen pt-36 sm:pt-44 pb-28 overflow-hidden"
    >
      <PageAtmosphere
        variant="about"
        lightBand={{ top: "40%", height: "16%" }}
        bands={[
          { top: "18%", height: "10%", tone: "ink" },
          { top: "72%", height: "12%", tone: "pink" },
        ]}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal reducedMotion={settings.reducedMotion}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#1E1024]/95 border border-[#B9A6D1]/40 text-[#E8A9C2] font-mono-accent text-xs mb-5">
                <Compass className="w-3.5 h-3.5" />
                <span>ABOUT TREVYK TECHNOLOGIES</span>
              </div>

              <h1 className="font-heading font-bold text-3xl sm:text-5xl lg:text-[3.15rem] text-[#F8F6FB] leading-[1.12] tracking-tight">
                Turning Vision Into{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F8F6FB] via-[#B9A6D1] to-[#E8A9C2]">
                  Progress
                </span>
              </h1>

              <p className="mt-5 text-[#B9A6D1] text-base sm:text-lg leading-relaxed max-w-2xl">
                Trevyk Technologies designs and delivers technology products and
                engineered solutions including{" "}
                <a
                  href="https://kiduart.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#E8A9C2] font-semibold underline underline-offset-2 hover:text-[#F8F6FB]"
                >
                  Kiduart
                </a>
                alongside custom websites, web applications, and the growth work
                around them: SEO, campaigns, social pages, and video. Based in
                Noida. We publish only what we can actually deliver.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  onClick={() => soundEngine.playClick("hero")}
                  className="inline-flex items-center space-x-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#6B4A87] to-[#8558A5] text-[#F8F6FB] font-heading text-xs sm:text-sm font-semibold border border-[#E8A9C2]/25 shadow-[0_12px_28px_rgba(107,74,135,0.35)]"
                >
                  <span>Talk to Trevyk</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="https://kiduart.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-full bg-[#1E1024] border border-[#B9A6D1]/40 text-[#B9A6D1] hover:text-[#F8F6FB] hover:border-[#E8A9C2] font-mono-accent text-xs"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-[#E8A9C2]" />
                  <span>Visit kiduart.com</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <MagneticCard reducedMotion={settings.reducedMotion}>
                <div className="relative rounded-3xl border border-[#B9A6D1]/35 bg-[#1E1024]/95 p-8 sm:p-10 shadow-[0_24px_50px_rgba(0,0,0,0.35)] flex flex-col items-center text-center space-y-6 overflow-hidden">
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#6B4A87] via-[#B9A6D1] to-[#E8A9C2]"
                    aria-hidden
                  />
                  <TrevykLogo
                    layout="horizontal"
                    size="lg"
                    theme="dark"
                    showTagline={true}
                  />
                  <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                    <div className="p-3.5 rounded-xl bg-[#2A1830] border border-[#B9A6D1]/25">
                      <div className="flex items-center gap-2 text-[#E8A9C2] mb-1">
                        <Building2 className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-mono-accent uppercase">
                          Base
                        </span>
                      </div>
                      <div className="text-sm font-heading font-semibold text-[#F8F6FB]">
                        Noida, UP, India
                      </div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#2A1830] border border-[#B9A6D1]/25">
                      <div className="flex items-center gap-2 text-[#E8A9C2] mb-1">
                        <Briefcase className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-mono-accent uppercase">
                          Focus
                        </span>
                      </div>
                      <div className="text-sm font-heading font-semibold text-[#F8F6FB]">
                        Products &amp; engineering
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-[#B9A6D1] leading-relaxed">
                    Individual team profiles will be published when ready. Until
                    then we keep this page honest brand, product, and how to
                    reach us.
                  </p>
                </div>
              </MagneticCard>
            </div>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="font-heading text-2xl font-bold text-[#F8F6FB] sm:text-3xl">
              A company page, not a slogan wall
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#E7E1F0] sm:text-base">
              Trevyk is a Noida practice for custom websites, software, and the
              marketing that helps a business get found. Kiduart is the school
              product. We do not invent client counts to look larger than we are.
            </p>
            <Link to="/work/custom-websites" className="mt-4 inline-block text-sm text-[#E8A9C2] underline underline-offset-2">
              How a starter website is scoped
            </Link>
          </div>
          <div className="lg:col-span-7">
            <StudioFrame
              src="/images/studio-about.jpg"
              alt="Gouache painting of a studio table with plans and a cup"
              caption="Plans on the table. The work still has to be nameable."
              kicker="About"
            />
          </div>
        </div>

        <SectionBridge
          className="mt-10"
          label="Principles"
          reducedMotion={settings.reducedMotion}
        />

        <div className="mt-2">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-10">
            <div className="lg:col-span-8 max-w-2xl">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#1E1024] border border-[#B9A6D1]/40 text-[#E8A9C2] font-mono-accent text-xs mb-3">
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>HOW WE WORK</span>
              </div>
              <h2 className="font-heading font-bold text-2xl sm:text-4xl text-[#F8F6FB]">
                The same honesty we publish on Kiduart
              </h2>
              <p className="mt-3 text-sm text-[#B9A6D1] leading-relaxed">
                Company standards match the product charter trust first, polish
                second.
              </p>
            </div>
            <div className="lg:col-span-4 hidden lg:flex justify-end">
              <WowAccent
                kind="brand"
                reducedMotion={settings.reducedMotion}
                className="w-48 h-48"
                caption="Signal locked"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CORE_VALUES.map((val, idx) => {
              const Icon = val.icon;
              const isActive = activeValue === idx;
              return (
                <button
                  key={val.title}
                  type="button"
                  onClick={() => {
                    soundEngine.playClick("soft");
                    setActiveValue(idx);
                  }}
                  className={`relative overflow-hidden p-6 pl-5 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                    isActive
                      ? "bg-[#24132B] border-[#E8A9C2] shadow-[0_0_24px_rgba(232,169,194,0.16)] scale-[1.02]"
                      : "bg-[#1E1024]/95 border-[#B9A6D1]/30 hover:border-[#E8A9C2]/55 opacity-80 hover:opacity-100"
                  }`}
                >
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#6B4A87] to-[#E8A9C2]"
                    aria-hidden
                  />
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#2A1830] border border-[#B9A6D1]/30 flex items-center justify-center text-[#E8A9C2] mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono-accent text-[#E8A9C2] uppercase tracking-wider">
                      {val.tagline}
                    </span>
                    <h3 className="font-heading font-bold text-lg sm:text-xl text-[#F8F6FB] mt-1">
                      {val.title}
                    </h3>
                    <p
                      className={`mt-3 text-xs sm:text-sm leading-relaxed transition-colors ${
                        isActive ? "text-[#E7E1F0]" : "text-[#B9A6D1]"
                      }`}
                    >
                      {val.desc}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-[#B9A6D1]/20 flex items-center gap-1.5 text-xs font-mono-accent text-[#E8A9C2]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>
                      {isActive ? "Active principle" : "Public commitment"}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <SectionBridge
          className="mt-10"
          label="Build"
          tone="pink"
          reducedMotion={settings.reducedMotion}
        />

        <div className="mt-2 relative p-8 sm:p-12 rounded-3xl bg-[#1E1024]/95 border border-[#B9A6D1]/35 shadow-[0_24px_50px_rgba(0,0,0,0.35)] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 flex justify-center">
              <TrevykLogo
                layout="vertical"
                size="xl"
                theme="dark"
                showTagline={true}
              />
            </div>
            <div className="lg:col-span-8 space-y-4">
              <span className="text-[10px] font-mono-accent text-[#E8A9C2] uppercase tracking-widest">
                What we build
              </span>
              <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#F8F6FB]">
                Products for schools. Engineering for teams that need more.
              </h3>
              <p className="text-sm text-[#B9A6D1] leading-relaxed">
                Our flagship product is Kiduart School ERP admissions through
                parent updates in one system. Alongside it, Trevyk delivers
                custom software, web/mobile apps, and cloud work when an
                institution needs something beyond the product surface.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-[#2A1830] border border-[#B9A6D1]/25 text-xs text-[#B9A6D1]">
                  <strong className="text-[#E8A9C2] block mb-0.5">
                    Product
                  </strong>
                  Kiduart for schools and trusts{" "}
                  <a
                    href="https://kiduart.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 text-[#E8A9C2]"
                  >
                    kiduart.com
                  </a>
                </div>
                <div className="p-3.5 rounded-xl bg-[#2A1830] border border-[#B9A6D1]/25 text-xs text-[#B9A6D1]">
                  <strong className="text-[#E8A9C2] block mb-0.5">
                    Engineering
                  </strong>
                  Custom software, integrations, and digital builds scoped to
                  what you need.
                </div>
              </div>
              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  type="button"
                  onClick={onOpenArchitectureModal}
                  className="inline-flex items-center gap-2 text-xs font-mono-accent text-[#E8A9C2] hover:text-[#F8F6FB]"
                >
                  <Layers className="w-3.5 h-3.5" />
                  Inspect modular architecture
                </button>
                <Link
                  to="/technology"
                  onClick={() => soundEngine.playClick("soft")}
                  className="inline-flex items-center gap-2 text-xs font-mono-accent text-[#B9A6D1] hover:text-[#E8A9C2]"
                >
                  Engineering atlas →
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-3xl bg-[#1E1024]/90 border border-[#B9A6D1]/30">
          <div className="flex items-start gap-3 text-center sm:text-left">
            <MapPin className="w-5 h-5 text-[#E8A9C2] shrink-0 mt-0.5 hidden sm:block" />
            <div>
              <h4 className="font-heading font-bold text-lg text-[#F8F6FB]">
                Ready to talk product or a custom build?
              </h4>
              <p className="text-xs text-[#B9A6D1] mt-1">
                Kiduart demos and Trevyk service requests one contact path,
                honest timelines.
              </p>
            </div>
          </div>
          <Link
            to="/contact"
            onClick={() => soundEngine.playClick("hero")}
            className="px-7 py-3.5 rounded-full bg-[#6B4A87] text-[#F8F6FB] font-heading font-semibold text-xs sm:text-sm shrink-0 hover:bg-[#8558A5] border border-[#E8A9C2]/25 shadow-lg"
          >
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );
};
