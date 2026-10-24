import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Menu,
  X,
  Layers,
  GraduationCap,
  Cpu,
  Volume2,
  VolumeX,
  MessageSquareCode,
  ShieldCheck,
  GitMerge,
  MessageSquareQuote,
  Mail,
  ChevronRight,
  Info,
} from "lucide-react";
import { MagneticButton } from "./MagneticButton";
import { TrevykLogo } from "./TrevykLogo";
import { SiteSettings } from "../types";
import { soundEngine } from "../utils/audioEngine";
import { beginRouteTransition } from "../utils/routeTransitionOverlay";

interface NavbarProps {
  settings: SiteSettings;
  onUpdateSettings: (settings: Partial<SiteSettings>) => void;
  onOpenArchitectureModal: () => void;
}

type MainNavLink = {
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
};

export const Navbar: React.FC<NavbarProps> = ({
  settings,
  onUpdateSettings,
  onOpenArchitectureModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Close mobile menu automatically on window resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileMenuOpen]);

  // Handle ESC key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const handleToggleSound = () => {
    const nextSound = !settings.soundEnabled;
    soundEngine.setEnabled(nextSound);
    onUpdateSettings({ soundEnabled: nextSound });
  };

  const navLinks: MainNavLink[] = [
    { label: "Who we are", path: "/who-we-are", icon: Info },
    { label: "What we do", path: "/what-we-do", icon: Cpu },
    {
      label: "Our Products",
      path: "/our-products",
      icon: GraduationCap,
      // label: "Kiduart",
      // badge: "Flagship",
    },
    {
      label: "Technology",
      path: "/technology",
      icon: Layers,
      // badge: "Core",
    },
    { label: "Process", path: "/process", icon: GitMerge },
    { label: "Contact", path: "/contact", icon: Mail },
    /*
    Legacy main nav (restore labels/badges here if needed):
    { label: "Services", path: "/services", icon: Cpu },
    { label: "Technology", path: "/technology", badge: "Core", icon: Layers },
    { label: "Kiduart", path: "/kiduart", badge: "Flagship", icon: GraduationCap },
    { label: "Who we are", path: "/who-we-are", icon: Info },
    Separate Contact pill CTA lived in the right action cluster (pre–text-link nav).
    */
  ];

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-[#B9A6D1]/10 bg-transparent backdrop-blur-md shadow-[inset_0_1px_0_rgba(248,246,251,0.06)]"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[#1a0f18]/[0.03] supports-[backdrop-filter]:bg-[#1a0f18]/[0.02]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F8F6FB]/12 to-transparent"
          aria-hidden
        />
        <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-3.5 sm:px-6 lg:grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-center lg:px-8">
          <div className="flex justify-start lg:col-start-1">
            <NavLink
              id="brand-logo-link"
              to="/"
              onClick={() => {
                beginRouteTransition();
                soundEngine.playClick("hero");
                if (mobileMenuOpen) setMobileMenuOpen(false);
              }}
              className="group flex shrink-0 items-center interactive-target rounded-xl p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A9C2]"
              data-cursor-label="TREVYK"
              aria-label="Trevyk Technologies Home"
            >
              <TrevykLogo size="sm" theme="dark" showTagline={false} />
            </NavLink>
          </div>

          <nav
            className="hidden items-center justify-center gap-0.5 lg:col-start-2 lg:flex xl:gap-2"
            aria-label="Main Desktop Navigation"
          >
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <NavLink
                    key={link.label}
                    to={link.path}
                    onClick={() => {
                      beginRouteTransition();
                      soundEngine.playClick("soft");
                    }}
                    onMouseEnter={() => soundEngine.playHover()}
                    className={`group relative flex shrink-0 items-center gap-1 rounded-md px-2 py-1.5 text-[11px] font-medium transition-colors xl:gap-1.5 xl:px-2.5 xl:text-[13px] ${
                      isActive
                        ? "text-[#F8F6FB]"
                        : "text-[#E7E1F0]/78 hover:text-[#F8F6FB]"
                    }`}
                  >
                    <span className="relative inline-block pb-1">
                      {link.label}
                      <span
                        className={`pointer-events-none absolute bottom-0 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-gradient-to-r from-[#E8A9C2] via-[#4A3058] to-[#E8A9C2] transition-[width] duration-300 ease-out ${
                          isActive ? "w-full opacity-100" : "w-0 opacity-90 group-hover:w-full"
                        }`}
                        aria-hidden
                      />
                    </span>
                    {link.badge ? (
                      <span className="hidden rounded px-1.5 py-0.5 font-mono-accent text-[9px] uppercase text-[#E8A9C2]/85 xl:inline">
                        {link.badge}
                      </span>
                    ) : null}
                    {/* Active dot — replaced by gradient underline; restore if needed:
                    {isActive && (
                      <motion.div layoutId="active-nav-dot" ... />
                    )}
                    */}
                  </NavLink>
                );
              })}
          </nav>

          <div className="hidden shrink-0 items-center justify-end space-x-2 lg:col-start-3 lg:flex xl:space-x-3">

            {/* Audio Toggle */}
            <button
              id="sound-toggle-btn"
              onClick={handleToggleSound}
              title={
                settings.soundEnabled
                  ? "Mute Audio Sound FX"
                  : "Enable Interactive Sound FX"
              }
              aria-label={
                settings.soundEnabled
                  ? "Mute Audio Sound FX"
                  : "Enable Interactive Sound FX"
              }
              className={`p-2 rounded-full border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A9C2] ${
                settings.soundEnabled
                  ? "bg-[#E8A9C2]/20 border-[#E8A9C2] text-[#E8A9C2] shadow-[0_0_10px_rgba(232,169,194,0.3)]"
                  : "bg-[#1E1024]/80 border-[#6B4A87]/40 text-[#B9A6D1] hover:text-[#E8A9C2]"
              }`}
              data-cursor-label={settings.soundEnabled ? "MUTE" : "UNMUTE"}
            >
              {settings.soundEnabled ? (
                <Volume2 className="w-4 h-4" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>

            {/* Motion (eye) toggle — removed from header; prefers-reduced-motion still respected via OS setting in App */}

            {/* Architecture Modal CTA */}
            <MagneticButton
              id="nav-consult-btn"
              variant="primary"
              onClick={() => {
                soundEngine.playClick("hero");
                onOpenArchitectureModal();
              }}
              className="!py-2 !px-2.5 xl:!px-3.5 !text-xs whitespace-nowrap"
              cursorLabel="INSPECT"
              reducedMotion={settings.reducedMotion}
            >
              <Layers className="w-3.5 h-3.5 xl:mr-1 text-white" aria-hidden />
              <span className="sr-only">Inspect Core</span>
              <span className="hidden xl:inline" aria-hidden>
                Inspect Core
              </span>
            </MagneticButton>
          </div>

          {/* Mobile / Tablet Header Controls (< 1024px) */}
          <div className="flex items-center space-x-2 lg:hidden">
            {/* Mobile Sound FX Toggle */}
            <button
              id="mobile-sound-toggle-btn"
              onClick={handleToggleSound}
              aria-label={settings.soundEnabled ? "Mute Audio" : "Enable Audio"}
              className={`p-2 rounded-xl border transition-all ${
                settings.soundEnabled
                  ? "bg-[#E8A9C2]/20 border-[#E8A9C2] text-[#E8A9C2]"
                  : "bg-[#1E1024]/80 border-[#6B4A87]/40 text-[#B9A6D1]"
              }`}
            >
              {settings.soundEnabled ? (
                <Volume2 className="w-4 h-4" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>

            {/* Mobile Hamburger / Close Button */}
            <button
              id="mobile-menu-toggle"
              onClick={() => {
                soundEngine.playClick("soft");
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={
                mobileMenuOpen
                  ? "Close Navigation Menu"
                  : "Open Navigation Menu"
              }
              className="p-2.5 rounded-xl bg-[#1E1024]/90 border border-[#6B4A87]/50 text-[#F8F6FB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A9C2] active:scale-95 transition-transform"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-[#E8A9C2]" />
              ) : (
                <Menu className="w-5 h-5 text-[#B9A6D1]" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-30 lg:hidden flex flex-col">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-[#1E1024]/45 backdrop-blur-md"
              aria-hidden="true"
            />

            {/* Sliding Drawer Sheet */}
            <motion.div
              id="mobile-navigation-drawer"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-h-[92vh] overflow-y-auto border-b border-[#6B4A87]/40 bg-[#1E1024] px-4 pb-8 pt-16 shadow-2xl sm:px-6"
            >
              {/* Brand Tagline in Drawer Header */}
              <div className="mb-4 pb-3 border-b border-[#6B4A87]/30 flex items-center justify-between">
                <span className="text-[11px] font-mono-accent uppercase tracking-wider text-[#B9A6D1]">
                  Turning Vision Into Progress.
                </span>
                <span className="text-[10px] font-mono-accent text-[#6B4A87] bg-[#2A1830] px-2 py-0.5 rounded border border-[#6B4A87]/40">
                  v3.0 Multi-Page
                </span>
              </div>

              {/* Navigation Links Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {navLinks.map((link, idx) => {
                  const Icon = link.icon;
                  const isActive = location.pathname === link.path;
                  return (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.03 }}
                    >
                      <NavLink
                        to={link.path}
                        onClick={() => {
                          beginRouteTransition();
                          soundEngine.playClick("soft");
                          setMobileMenuOpen(false);
                        }}
                        className={`flex items-center justify-between p-3 rounded-xl border text-sm font-medium transition-all group ${
                          isActive
                            ? "bg-[#3D1D45] border-[#E8A9C2] text-[#F8F6FB] shadow-[0_0_15px_rgba(232,169,194,0.25)]"
                            : "bg-[#1E1024]/60 hover:bg-[#2A1830] border-[#6B4A87]/30 text-[#B9A6D1]"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          {Icon && (
                            <div
                              className={`w-7 h-7 rounded-lg flex items-center justify-center transition-transform ${
                                isActive
                                  ? "bg-[#E8A9C2] text-[#241428]"
                                  : "bg-[#2A1830] text-[#E8A9C2] border border-[#6B4A87]/40"
                              }`}
                            >
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                          )}
                          <span>{link.label}</span>
                          {link.badge ? (
                            <span className="text-[9px] uppercase font-mono-accent px-1.5 py-0.5 rounded bg-[#6B4A87]/50 text-[#E8A9C2]">
                              {link.badge}
                            </span>
                          ) : null}
                        </div>
                        <ChevronRight className="w-4 h-4 text-[#B9A6D1] group-hover:text-[#E8A9C2] group-hover:translate-x-0.5 transition-all" />
                      </NavLink>
                    </motion.div>
                  );
                })}
              </div>

              {/* Settings & Interactive Toggles */}
              <div className="mt-5 pt-4 border-t border-[#6B4A87]/30 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    onClick={() => {
                      soundEngine.playClick("soft");
                      onUpdateSettings({
                        reducedMotion: !settings.reducedMotion,
                      });
                    }}
                    className="flex items-center justify-between text-xs text-[#B9A6D1] p-3 rounded-xl bg-[#1E1024]/80 border border-[#6B4A87]/30"
                  >
                    <span className="text-[#B9A6D1]">3D Motion Engine:</span>
                    <span className="text-[#E8A9C2] font-semibold">
                      {settings.reducedMotion ? "Reduced" : "Cinematic 3D"}
                    </span>
                  </button>

                  <button
                    onClick={handleToggleSound}
                    className="flex items-center justify-between text-xs text-[#B9A6D1] p-3 rounded-xl bg-[#1E1024]/80 border border-[#6B4A87]/30"
                  >
                    <span className="text-[#B9A6D1]">Sound FX:</span>
                    <span className="text-[#E8A9C2] font-semibold">
                      {settings.soundEnabled ? "Enabled" : "Muted"}
                    </span>
                  </button>
                </div>

                <button
                  onClick={() => {
                    soundEngine.playClick("hero");
                    setMobileMenuOpen(false);
                    onOpenArchitectureModal();
                  }}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#6B4A87] via-[#8558A5] to-[#E8A9C2] text-[#F8F6FB] font-heading font-semibold text-sm flex items-center justify-center space-x-2 shadow-[0_10px_25px_rgba(107,74,135,0.4)] active:scale-[0.99] transition-transform"
                >
                  <Cpu className="w-4 h-4 text-[#F8F6FB]" />
                  <span>Inspect System Architecture</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
