import React from "react";
import { SiteSettings } from "../types";
import { HeroScroll } from "../components/plum/sections/HeroScroll";
import { ServicesTeaser } from "../components/home/ServicesTeaser";
import { TechnologyTeaser } from "../components/home/TechnologyTeaser";
import { KiduartTeaser } from "../components/home/KiduartTeaser";
import { ProcessTeaser } from "../components/home/ProcessTeaser";
import { AboutTeaser } from "../components/home/AboutTeaser";
import { GrowthOffer } from "../components/home/GrowthOffer";
import { HomeMidBand } from "../components/home/HomeMidBand";

interface HomePageProps {
  settings: SiteSettings;
  onOpenArchitectureModal: (index?: number | null) => void;
  hoveredCube: number | null;
  onCubeHover: (index: number | null) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  settings,
  onOpenArchitectureModal,
  hoveredCube,
  onCubeHover,
}) => {
  return (
    <div id="home-page" className="relative w-full bg-background">
      <HeroScroll />

      <HomeMidBand>
        <GrowthOffer />
        <div className="home-products-services-band">
          <div className="relative z-1">
            <ServicesTeaser settings={settings} />
          </div>
        </div>
        <TechnologyTeaser
          settings={settings}
          onOpenArchitectureModal={onOpenArchitectureModal}
          hoveredCube={hoveredCube}
          onCubeHover={onCubeHover}
        />
        <KiduartTeaser settings={settings} />
        <AboutTeaser settings={settings} />
        <ProcessTeaser settings={settings} />
      </HomeMidBand>
    </div>
  );
};
