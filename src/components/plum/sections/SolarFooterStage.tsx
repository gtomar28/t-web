import { FooterSolarVideo } from "../layout/FooterSolarVideo";
import { SiteFooter } from "../layout/SiteFooter";
import { Testimonials } from "./Testimonials";

export function SolarFooterStage() {
  return (
    <div className="relative isolate">
      <Testimonials />

      <div className="relative">
        <div className="sticky top-0 z-0 h-[100svh] min-h-[100svh] overflow-hidden">
          <FooterSolarVideo className="absolute inset-0 z-0 h-full w-full" showGrain={false} />
        </div>

        <div className="relative z-10 -mt-[100svh]">
          <SiteFooter showSolarVideo={false} />
        </div>
      </div>
    </div>
  );
}
