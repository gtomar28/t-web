import React from "react";
import { SiteSettings } from "../types";
import { OurProductsHeroSection } from "../components/our-products/OurProductsHeroSection";
import { OurProductsCatalogSection } from "../components/our-products/OurProductsCatalogSection";
import { MoreToComeSection } from "../components/our-products/MoreToComeSection";

interface KiduartPageProps {
  settings: SiteSettings;
}

/**
 * `/our-products` — hero + product catalog.
 * Previous page body lives in `KiduartPage.legacy.tsx` (KiduartPageLegacy).
 */
export const KiduartPage: React.FC<KiduartPageProps> = () => {
  return (
    <div id="kiduart-page" className="relative w-full min-h-screen overflow-hidden">
      <OurProductsHeroSection />
      <OurProductsCatalogSection />
      <MoreToComeSection />
    </div>
  );
};
