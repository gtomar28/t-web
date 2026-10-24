import { Routes, Route, Navigate, useLocation, type Location } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { SiteSettings } from "../types";
import { lazy, useLayoutEffect, type ComponentType } from "react";
import { markRouteContentReadyForPath } from "../utils/routeTransitionOverlay";

function withRouteReady<P extends object>(Component: ComponentType<P>) {
  return function RouteReadyPage(props: P) {
    const { pathname } = useLocation();
    useLayoutEffect(() => {
      markRouteContentReadyForPath(pathname);
    }, [pathname]);
    return (
      <div data-trevyk-route-page={pathname}>
        <Component {...props} />
      </div>
    );
  };
}

function lazyWithReady<P extends object>(
  factory: () => Promise<{ default: ComponentType<P> }>,
) {
  return lazy(async () => {
    const mod = await factory();
    return { default: withRouteReady(mod.default) };
  });
}

const ServicesPage = lazyWithReady(() =>
  import("../pages/ServicesPage").then((m) => ({ default: m.ServicesPage })),
);
const TechnologyPage = lazyWithReady(() =>
  import("../pages/TechnologyPage").then((m) => ({ default: m.TechnologyPage })),
);
const KiduartPage = lazyWithReady(() =>
  import("../pages/KiduartPage").then((m) => ({ default: m.KiduartPage })),
);
const ProcessPage = lazyWithReady(() =>
  import("../pages/ProcessPage").then((m) => ({ default: m.ProcessPage })),
);
const AboutPage = lazyWithReady(() =>
  import("../pages/AboutPage").then((m) => ({ default: m.AboutPage })),
);
const ContactPage = lazyWithReady(() =>
  import("../pages/ContactPage").then((m) => ({ default: m.ContactPage })),
);
const GuidePage = lazyWithReady(() =>
  import("../pages/GuidePage").then((m) => ({ default: m.GuidePage })),
);
const AiPage = lazyWithReady(() =>
  import("../pages/AiPage").then((m) => ({ default: m.AiPage })),
);
const SitemapPage = lazyWithReady(() =>
  import("../pages/SitemapPage").then((m) => ({ default: m.SitemapPage })),
);
const NotFoundPage = lazyWithReady(() =>
  import("../pages/NotFoundPage").then((m) => ({ default: m.NotFoundPage })),
);

const HomePageReady = withRouteReady(HomePage);

type Props = {
  location: Location;
  settings: SiteSettings;
  scrollProgress: number;
  mousePos: { x: number; y: number };
  onOpenArchitectureModal: (index?: number | null) => void;
  hoveredCube: number | null;
  onCubeHover: (index: number | null) => void;
};

export function AppRoutes({
  location,
  settings,
  scrollProgress,
  mousePos,
  onOpenArchitectureModal,
  hoveredCube,
  onCubeHover,
}: Props) {
  return (
    <Routes location={location}>
      <Route
        path="/"
        element={
          <HomePageReady
            settings={settings}
            scrollProgress={scrollProgress}
            mousePos={mousePos}
            onOpenArchitectureModal={onOpenArchitectureModal}
            hoveredCube={hoveredCube}
            onCubeHover={onCubeHover}
          />
        }
      />
      <Route path="/services" element={<Navigate to="/what-we-do" replace />} />
      <Route
        path="/what-we-do"
        element={
          <ServicesPage
            settings={settings}
            onOpenArchitectureModal={() => onOpenArchitectureModal(null)}
          />
        }
      />
      <Route
        path="/technology"
        element={
          <TechnologyPage
            settings={settings}
            onOpenArchitectureModal={onOpenArchitectureModal}
            hoveredCube={hoveredCube}
            onCubeHover={onCubeHover}
          />
        }
      />
      <Route path="/kiduart" element={<Navigate to="/our-products" replace />} />
      <Route path="/our-products" element={<KiduartPage settings={settings} />} />
      <Route path="/process" element={<ProcessPage settings={settings} />} />
      <Route path="/about" element={<Navigate to="/who-we-are" replace />} />
      <Route
        path="/who-we-are"
        element={
          <AboutPage
            settings={settings}
            onOpenArchitectureModal={() => onOpenArchitectureModal(null)}
          />
        }
      />
      <Route path="/contact" element={<ContactPage settings={settings} />} />
      <Route path="/ai" element={<AiPage />} />
      <Route path="/sitemap" element={<SitemapPage />} />
      <Route path="/work/:slug" element={<GuidePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
