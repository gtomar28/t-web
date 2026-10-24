import React, { useState, useEffect, useLayoutEffect, useRef, useCallback, Suspense } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { SiteSettings } from './types';
import { Cursor } from './components/Cursor';
import { Navbar } from './components/Navbar';
import { SolarFooterStage } from './components/plum/sections/SolarFooterStage';
import { SiteFooter } from './components/plum/layout/SiteFooter';
import { BrandGradientBar } from './components/BrandGradientBar';
import { ArchitectureModal } from './components/ArchitectureModal';
import { GeminiChatbot } from './components/GeminiChatbot';
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

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

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

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInitialPrompt, setChatInitialPrompt] = useState<string | undefined>(undefined);
  const [selectedCubeIndex, setSelectedCubeIndex] = useState<number | null>(null);
  const [hoveredCube, setHoveredCube] = useState<number | null>(null);

  const lenisRef = useRef<Lenis | null>(null);

  const openChatWithPrompt = (prompt?: string) => {
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

  // Initialize Lenis smooth scroll and connect with GSAP ScrollTrigger
  useEffect(() => {
    if (settings.reducedMotion) {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
    });

    lenisRef.current = lenis;

    // Connect Lenis with ScrollTrigger
    lenis.on('scroll', (e: { scroll: number; limit: number; progress: number }) => {
      ScrollTrigger.update();
      setScrollProgress(e.progress || 0);
      window.dispatchEvent(new Event('scroll'));
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    const animId = requestAnimationFrame(raf);

    // Native scroll fallback listener
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(window.scrollY / totalScroll);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', handleScroll);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [settings.reducedMotion]);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    if (chatOpen) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [chatOpen]);

  // Normalized mouse coordinates (-1 to 1) for 3D parallax
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;
    setMousePos({ x, y });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

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

      {!overlayVisible && (
        <Navbar
          settings={settings}
          onUpdateSettings={updateSettings}
          onOpenArchitectureModal={() => handleOpenArchitectureModal(null)}
        />
      )}

      <main
        id="main-content"
        className={`relative z-10 min-h-screen${overlayVisible ? " invisible" : ""}`}
        aria-hidden={overlayVisible}
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
                scrollProgress={scrollProgress}
                mousePos={mousePos}
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
          <SolarFooterStage />
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

      {/* 8. Interactive 3D Architecture Modal */}
      <ArchitectureModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialCubeIndex={selectedCubeIndex}
        onSelectCube={(index) => {
          setSelectedCubeIndex(index);
          setHoveredCube(index);
        }}
      />

      <WhatsAppFloatingButton />

      {/* 9. Trevyk AI Assistant */}
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
