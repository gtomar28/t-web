import React from "react";
import { Link } from "react-router-dom";
import { Layers, ArrowRight, Maximize2 } from "lucide-react";
import { SiteSettings } from "../../types";
import { soundEngine } from "../../utils/audioEngine";
import { ScrollReveal } from "../ScrollReveal";
import { ArchitectureStackDiagram } from "./ArchitectureStackDiagram";

interface TechnologyTeaserProps {
  settings: SiteSettings;
  onOpenArchitectureModal: (cubeIndex?: number | null) => void;
  hoveredCube: number | null;
  onCubeHover: (cubeIndex: number | null) => void;
}

export const TechnologyTeaser: React.FC<TechnologyTeaserProps> = ({
  settings,
  onOpenArchitectureModal,
  hoveredCube,
  onCubeHover,
}) => {
  return (
    <section
      id="technology-teaser"
      className="trevyk-viewport-section relative bg-background px-4 py-14 sm:px-6 sm:py-20 lg:px-8"
    >
      <div className="mx-auto max-w-7xl space-y-10 lg:space-y-14">
        <ScrollReveal reducedMotion={settings.reducedMotion}>
          <div className="flex justify-between items-start">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center space-x-2 rounded-full border border-[#B9A6D1]/45 bg-[#2A1830]/80 px-3.5 py-1.5 font-mono-accent text-xs text-[#E8A9C2]">
                <span className="font-semibold text-[#F8F6FB]/50">02</span>
                <Layers className="h-3.5 w-3.5" />
                <span>ARCHITECTURE</span>
              </div>

              <h2 className="font-heading text-2xl font-bold leading-tight text-[#F8F6FB] sm:text-4xl">
                The same stack behind{" "}
                <span className="text-[#E8A9C2]">product</span> and{" "}
                <span className="text-[#E8A9C2]">custom work</span>.
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#B9A6D1] sm:text-base">
                Independent layers with explicit boundaries change one domain
                without cascading risk across the platform.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link
                to="/technology"
                onClick={() => soundEngine.playClick("soft")}
                className="inline-flex items-center space-x-2 rounded-full bg-gradient-to-r from-[#6B4A87] to-[#8558A5] px-5 py-3 font-heading text-xs font-semibold text-white sm:text-sm"
              >
                <span>Technology deep dive</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick("hero");
                  onOpenArchitectureModal(null);
                }}
                className="inline-flex items-center space-x-2 rounded-full border border-[#B9A6D1]/45 bg-[#2A1830] px-5 py-3 font-heading text-xs text-[#E7E1F0] sm:text-sm"
              >
                <Maximize2 className="h-3.5 w-3.5 text-[#E8A9C2]" />
                <span>Open inspector</span>
              </button>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal
          variant="fade"
          reducedMotion={settings.reducedMotion}
          className="w-full"
        >
          <ArchitectureStackDiagram
            activeIndex={hoveredCube}
            onActiveChange={onCubeHover}
          />
        </ScrollReveal>
      </div>
    </section>
  );
};
