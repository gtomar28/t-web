import React from "react";
import { SiteSettings } from "../types";
import { WhatWeDoHeroSection } from "../components/what-we-do/WhatWeDoHeroSection";
import { OurServicesSection } from "../components/what-we-do/OurServicesSection";
import { HowWeCanHelpSection } from "../components/what-we-do/HowWeCanHelpSection";

/**
 * Previous catalogue UI (filters, ServiceCard3D, constellation, etc.) is preserved in
 * `ServicesPage.catalogue.legacy.tsx` — not rendered. Restore from that file if needed.
 */

interface ServicesPageProps {
  settings: SiteSettings;
  onOpenArchitectureModal: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = () => {
  return (
    <div id="services-page" className="relative w-full min-h-screen overflow-hidden pb-28">
      <WhatWeDoHeroSection />
      <OurServicesSection />
      <HowWeCanHelpSection />
    </div>
  );
};
