import React from "react";
import { Workflow, Boxes, Eye, ShieldCheck } from "lucide-react";
import { SiteSettings } from "../types";
import { WowAccent } from "../components/WowAccent";
import { ScrollReveal } from "../components/ScrollReveal";
import { TechnologyHeroSection } from "../components/technology/TechnologyHeroSection";
import { TechnologyStackSection } from "../components/technology/TechnologyStackSection";
import { ModularArchitectureSection } from "../components/technology/ModularArchitectureSection";
import { SecurityEngineeringSection } from "../components/technology/SecurityEngineeringSection";
import { BuildWithTrevykSection } from "../components/technology/BuildWithTrevykSection";
import { Link } from "react-router-dom";
import { StudioFrame } from "../components/StudioFrame";

interface TechnologyPageProps {
  settings: SiteSettings;
  onOpenArchitectureModal: (cubeIndex?: number | null) => void;
  hoveredCube: number | null;
  onCubeHover: (index: number | null) => void;
}

const ENGINEERING_PRINCIPLES = [
  {
    title: "Modular by default",
    body: "Separate domains so a fees change does not force an attendance rewrite  the same idea behind our Core Block metaphor.",
    icon: Boxes,
  },
  {
    title: "Contracts over folklore",
    body: "Typed APIs, clear ownership of services, and documented handoffs so teams can extend systems without tribal knowledge.",
    icon: Workflow,
  },
  {
    title: "Observable in production",
    body: "Logging, error paths, and audit trails where sensitive actions happen  so support can answer what changed, and when.",
    icon: Eye,
  },
  {
    title: "Honest security claims",
    body: "RBAC, encryption where configured, export paths  published as shipped controls, not borrowed certification badges.",
    icon: ShieldCheck,
  },
];

export const TechnologyPage: React.FC<TechnologyPageProps> = ({
  settings,
}) => {
  return (
    <div
      id="technology-page"
      className="relative w-full min-h-screen overflow-hidden"
    >
      <TechnologyHeroSection />

      {false ? (
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {false ? (
            <div className="mt-12 grid items-center gap-8 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <p className="font-mono-accent text-[11px] uppercase tracking-[0.22em] text-[#E8A9C2]">
                  Same standard on every page
                </p>
                <h2 className="mt-3 font-heading text-2xl font-bold text-[#F8F6FB] sm:text-3xl">
                  Systems a growing company can keep running
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[#E7E1F0] sm:text-base">
                  Technology here means the stack behind a website, a web app, or
                  Kiduart: modular pieces, documented handoff, and security claims
                  we actually ship. The painting is the same studio language as the
                  rest of the site, not a stock screenshot.
                </p>
                <Link
                  to="/work/web-applications"
                  className="mt-4 inline-block text-sm text-[#E8A9C2] underline underline-offset-2"
                >
                  Read how web applications are scoped
                </Link>
              </div>
              <div className="lg:col-span-7">
                <StudioFrame
                  src="/images/studio-technology.jpg"
                  alt="Gouache painting of stacked blocks suggesting software layers"
                  caption="Architecture stays visible. The customer should still understand the offer."
                  kicker="Technology"
                />
              </div>
            </div>
          ) : null}

          <ScrollReveal
            className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
            delay={0.05}
            reducedMotion={settings.reducedMotion}
          >
            {ENGINEERING_PRINCIPLES.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="relative overflow-hidden p-4 pl-5 rounded-2xl bg-[#1E1024]/90 border border-[#B9A6D1]/30"
                >
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#6B4A87] to-[#E8A9C2]"
                    aria-hidden
                  />
                  <Icon className="w-4 h-4 text-[#E8A9C2] mb-2" />
                  <div className="font-heading font-bold text-sm text-[#F8F6FB]">
                    {p.title}
                  </div>
                  <p className="mt-1.5 text-[11px] text-[#B9A6D1] leading-relaxed">
                    {p.body}
                  </p>
                </div>
              );
            })}
          </ScrollReveal>

          <div className="mt-2 mb-8 hidden lg:flex justify-end pr-6">
            <WowAccent
              kind="pipeline"
              reducedMotion={settings.reducedMotion}
              className="w-48 h-40"
              caption="In → core → out"
            />
          </div>
        </div>
      ) : null}

      <TechnologyStackSection />

      <ModularArchitectureSection />

      <SecurityEngineeringSection />

      <BuildWithTrevykSection />
    </div>
  );
};
