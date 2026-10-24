import React, { useState, useEffect, useLayoutEffect, useRef, Suspense, lazy } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import type Lenis from 'lenis';

import { SiteSettings } from './types';
import { Cursor } from './components/Cursor';
import { Navbar } from './components/Navbar';
import { SiteFooter } from './components/plum/layout/SiteFooter';
import { BrandGradientBar } from './components/BrandGradientBar';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { SEOManager } from './components/SEOManager';
import { Analytics } from './components/Analytics';
import { PageTransition } from './components/PageTransition';
import { AppRoutes } from './components/AppRoutes';
import { RouteLoader } from './components/RouteLoader';
import { useRouteTransitionOverlay } from './hooks/useRouteTransitionOverlay';
import { trackChatOpen } from './utils/analytics';
import { setRouteOverlayPathname } from './utils/routeTransitionOverlay';
import { dismissTrevykBoot } from './utils/heroVideoPreload';
import { soundEngine } from './utils/audioEngine';
import { isOurProductsPath, isWhoWeArePath } from './config/site';
import { initSmoothScroll } from './utils/initSmoothScroll';
import { prefetchCommonRoutesIdle } from './utils/routePrefetch';

const SolarFooterStage = lazy(() =>
  import('./components/plum/sections/SolarFooterStage').then((m) => ({
    default: m.SolarFooterStage,
  })),
);
const ArchitectureModal = lazy(() =>
  import('./components/ArchitectureModal').then((m) => ({
    default: m.ArchitectureModal,
  })),
);
const GeminiChatbot = lazy(() =>
  import('./components/GeminiChatbot').then((m) => ({
    default: m.GeminiChatbot,
  })),
);

// Instant scroll reset. useEffect was too late, and html.scroll-smooth made the jump visible as footer-first.
function ScrollToTop({ lenisRef }: { lenisRef: React.RefObject<Lenis | null> }) {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    const root = document.documentElement;
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    root.scrollTop = 0;
    document.body.scrollTop = 0;
    lenisRef.current?.scrollTo(0, { immediate: true, force: true });
    root.style.scrollBehavior = previous;
  }, [pathname, lenisRef]);

  return null;
}

function MainAppContent() {
  const location = useLocation();
  const pathname = location.pathname;
  const hideFooterNextProject =
    pathname === "/contact" ||
    isWhoWeArePath(pathname) ||
    isOurProductsPath(pathname);
  const compactFooterTop = pathname === "/technology";
  const { overlayVisible } = useRouteTransitionOverlay(pathname);

  useLayoutEffect(() => {
    setRouteOverlayPathname(pathname);
  }, [pathname]);

  useLayoutEffect(() => {
    if (!overlayVisible) dismissTrevykBoot();
  }, [overlayVisible]);

  const [settings, setSettings] = useState<SiteSettings>({
    reducedMotion: false,
    highQuality3D: true,
    soundEnabled: true,
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInitialPrompt, setChatInitialPrompt] = useState<string | undefined>(undefined);
  const [chatWidgetReady, setChatWidgetReady] = useState(false);
  const [selectedCubeIndex, setSelectedCubeIndex] = useState<number | null>(null);
  const [hoveredCube, setHoveredCube] = useState<number | null>(null);

  const lenisRef = useRef<Lenis | null>(null);

  const openChatWithPrompt = (prompt?: string) => {
    setChatWidgetReady(true);
    setChatInitialPrompt(prompt);
    setChatOpen(true);
    trackChatOpen();
  };

  const handleOpenArchitectureModal = (cubeIndex?: number | null) => {
    setSelectedCubeIndex(cubeIndex !== undefined ? cubeIndex : null);
    setModalOpen(true);
  };

  useEffect(() => {
    soundEngine.setEnabled(settings.soundEnabled, { feedback: false });
  }, [settings.soundEnabled]);

  // Check system prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setSettings((prev) => ({ ...prev, reducedMotion: true }));
    }

    const handleChange = (e: MediaQueryListEvent) => {
      setSettings((prev) => ({ ...prev, reducedMotion: e.matches }));
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    prefetchCommonRoutesIdle();
  }, []);

  useEffect(() => {
    if (settings.reducedMotion) {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      return;
    }

    let cancelled = false;
    let teardown: (() => void) | null = null;

    const start = () => {
      void initSmoothScroll().then((handle) => {
        if (cancelled) {
          handle.cancelRaf();
          return;
        }
        lenisRef.current = handle.lenis;
        teardown = handle.cancelRaf;
      });
    };

    if (typeof requestIdleCallback !== 'undefined') {
      const idleId = requestIdleCallback(start, { timeout: 2500 });
      return () => {
        cancelled = true;
        cancelIdleCallback(idleId);
        teardown?.();
        lenisRef.current = null;
      };
    }

    const timeoutId = window.setTimeout(start, 800);
    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
      teardown?.();
      lenisRef.current = null;
    };
  }, [settings.reducedMotion]);

  useEffect(() => {
    if (chatOpen) {
      setChatWidgetReady(true);
      return;
    }
    const timeoutId = window.setTimeout(() => setChatWidgetReady(true), 4500);
    return () => window.clearTimeout(timeoutId);
  }, [chatOpen]);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    if (chatOpen) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [chatOpen]);

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  return (
    <div id="trevyk-app" className="relative min-h-screen max-w-[100vw] bg-[#1a0f18] text-[#F8F6FB]">
      {pathname !== "/" && !overlayVisible && (
        <div
          className="trevyk-checkered-bg pointer-events-none fixed inset-0 z-0"
          aria-hidden
        />
      )}
      <ScrollToTop lenisRef={lenisRef} />
      <SEOManager />
      <Analytics />

      {!overlayVisible && (
        <BrandGradientBar height={5} pinnedTop={true} shimmer={true} />
      )}

      {!overlayVisible && <Cursor reducedMotion={settings.reducedMotion} />}

      <RouteLoader visible={overlayVisible} reducedMotion={settings.reducedMotion} />

      <Navbar
        settings={settings}
        onUpdateSettings={updateSettings}
        onOpenArchitectureModal={() => handleOpenArchitectureModal(null)}
      />

      <main
        id="main-content"
        className={`relative z-10 min-h-screen${overlayVisible ? " pointer-events-none" : ""}`}
        aria-busy={overlayVisible}
      >
        <AnimatePresence mode="sync">
          <PageTransition
            key={pathname}
            pathname={pathname}
            reducedMotion={settings.reducedMotion}
          >
            <Suspense fallback={null}>
              <AppRoutes
                location={location}
                settings={settings}
                onOpenArchitectureModal={handleOpenArchitectureModal}
                hoveredCube={hoveredCube}
                onCubeHover={setHoveredCube}
              />
            </Suspense>
          </PageTransition>
        </AnimatePresence>
      </main>

      {/* 7. Plum footer — “Next project” band hidden on contact & who-we-are */}
      {pathname === "/" ? (
        <div className="relative z-[35]">
          <Suspense fallback={null}>
            <SolarFooterStage />
          </Suspense>
        </div>
      ) : (
        <div className="relative z-[35]">
          <SiteFooter
            showSolarVideo
            hideNextProjectCta={hideFooterNextProject}
            compactTop={compactFooterTop}
          />
        </div>
      )}

      {modalOpen ? (
        <Suspense fallback={null}>
          <ArchitectureModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            initialCubeIndex={selectedCubeIndex}
            onSelectCube={(index) => {
              setSelectedCubeIndex(index);
              setHoveredCube(index);
            }}
          />
        </Suspense>
      ) : null}

      <WhatsAppFloatingButton />

      {chatWidgetReady ? (
        <Suspense fallback={null}>
          <GeminiChatbot
            isOpen={chatOpen}
            onClose={() => {
              setChatOpen(false);
              setChatInitialPrompt(undefined);
            }}
            onOpen={() => {
              setChatOpen(true);
              trackChatOpen();
            }}
            initialPrompt={chatInitialPrompt}
          />
        </Suspense>
      ) : null}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <MainAppContent />
    </BrowserRouter>
  );
}
