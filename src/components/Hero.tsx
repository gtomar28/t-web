import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Cpu, ChevronDown, Zap } from "lucide-react";
import { CanvasContainer } from "./3d/CanvasContainer";
import { MagneticButton } from "./MagneticButton";
import { SiteSettings } from "../types";
import { soundEngine } from "../utils/audioEngine";
import { consumeEntryHandoff } from "../utils/entryHandoff";

interface HeroProps {
  settings: SiteSettings;
  scrollProgress: number;
  mousePos: { x: number; y: number };
  onOpenArchitectureModal: () => void;
  hoveredCube: number | null;
  onCubeHover: (index: number | null) => void;
  onEasterEggDiscovered?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  settings,
  scrollProgress,
  mousePos,
  onOpenArchitectureModal,
  hoveredCube,
  onCubeHover,
  onEasterEggDiscovered,
}) => {
  const navigate = useNavigate();
  const [disassembled, setDisassembled] = useState(false);
  const [showEasterEggToast, setShowEasterEggToast] = useState(false);
  const [handoff] = useState(() =>
    settings.reducedMotion ? false : consumeEntryHandoff()
  );

  const ease = [0.22, 1, 0.36, 1] as const;
  const copyDelay = useMemo(() => (handoff ? 0.35 : 0.05), [handoff]);

  const handleDisassembleToggle = () => {
    const next = !disassembled;
    setDisassembled(next);
    soundEngine.playDisassemble(next);
  };

  const handleEasterEggTriggered = () => {
    setShowEasterEggToast(true);
    onEasterEggDiscovered?.();
    setTimeout(() => setShowEasterEggToast(false), 4500);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden pt-28 pb-12 sm:pb-16 bg-[#2A1830]"
    >
      <AnimatePresence>
        {showEasterEggToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-2xl bg-[#1E1024]/95 border border-[#E8A9C2] shadow-[0_0_30px_rgba(232,169,194,0.4)] backdrop-blur-xl flex items-center space-x-3 text-xs font-mono-accent text-[#F8F6FB]"
          >
            <div className="w-6 h-6 rounded-lg bg-[#E8A9C2] text-[#241428] flex items-center justify-center font-bold">
              <Zap className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-[#E8A9C2] font-bold block">
                EASTER EGG UNLOCKED
              </span>
              <span className="text-xs text-[#B9A6D1]">
                Modular Resonance Synchronized
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_70%_40%,rgba(107,74,135,0.35),transparent_58%),radial-gradient(ellipse_50%_40%_at_15%_80%,rgba(232,169,194,0.14),transparent_50%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E1024]/75 via-[#2A1830]/80 to-[#1E1024]" />
        <div className="absolute inset-0 bg-noise opacity-25" />
      </div>

      {/* Entry veil — fades with handoff from preloader wipe */}
      {handoff && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[15] bg-gradient-to-b from-[#E8A9C2]/25 via-[#6B4A87]/35 to-[#2A1830]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.85, ease }}
        />
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: copyDelay, ease }}
              className="font-mono-accent text-[11px] sm:text-xs tracking-[0.28em] uppercase text-[#E8A9C2] mb-3"
            >
              Turning Vision Into Progress
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: copyDelay + 0.08, ease }}
              className="font-heading font-bold text-[2rem] sm:text-5xl md:text-6xl lg:text-7xl text-[#F8F6FB] tracking-tight leading-[1.05] break-words max-w-full"
            >
              Custom websites, software, and growth
              <span className="block text-lg sm:text-2xl lg:text-3xl font-semibold mt-2 text-[#B9A6D1] tracking-normal">
                Trevyk Technologies, Noida
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: copyDelay + 0.16, ease }}
              className="mt-6 text-lg sm:text-xl text-[#F8F6FB] font-heading font-semibold leading-snug max-w-xl"
            >
              Product, websites, and growth systems for businesses that
              want to be found and then keep the software.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: copyDelay + 0.24, ease }}
              className="mt-4 text-sm sm:text-base text-[#B9A6D1] max-w-xl leading-relaxed"
            >
              Custom websites, web applications, and custom software for
              startups and local businesses, plus SEO, campaigns, social media,
              and video. Starter plans are scoped to your budget. Based in
              Noida.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: copyDelay + 0.34, ease }}
              className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <MagneticButton
                id="hero-primary-cta"
                variant="primary"
                onClick={() => {
                  soundEngine.playClick("hero");
                  navigate("/contact");
                }}
                cursorLabel="ENGAGE"
                reducedMotion={settings.reducedMotion}
              >
                <span>Get a starter plan</span>
                <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
              </MagneticButton>

              <Link
                to="/our-products"
                onClick={() => soundEngine.playClick("soft")}
                className="inline-flex items-center space-x-2 px-5 py-3 rounded-full text-xs sm:text-sm font-heading font-semibold text-[#F8F6FB] bg-[#1E1024] border border-[#B9A6D1]/50 hover:border-[#E8A9C2]/75 transition-all interactive-target"
              >
                <span>Explore Kiduart</span>
              </Link>

              <Link
                to="/what-we-do"
                onClick={() => soundEngine.playClick("soft")}
                className="inline-flex items-center text-xs font-mono-accent text-[#B9A6D1] hover:text-[#E8A9C2] transition-colors px-2 py-2"
              >
                View capabilities →
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: copyDelay + 0.48, ease }}
              className="mt-10 sm:mt-12 pt-6 border-t border-[#6B4A87]/40 w-full grid grid-cols-3 gap-4"
            >
              <div>
                <div className="font-mono-accent text-[10px] uppercase tracking-wider text-[#E8A9C2] mb-1">
                  Product
                </div>
                <div className="text-xs sm:text-sm text-[#F8F6FB] font-medium">
                  Kiduart School ERP
                </div>
              </div>
              <div>
                <div className="font-mono-accent text-[10px] uppercase tracking-wider text-[#E8A9C2] mb-1">
                  Engineering
                </div>
                <div className="text-xs sm:text-sm text-[#F8F6FB] font-medium">
                  Websites, apps, SEO
                </div>
              </div>
              <div>
                <div className="font-mono-accent text-[10px] uppercase tracking-wider text-[#E8A9C2] mb-1">
                  Base
                </div>
                <div className="text-xs sm:text-sm text-[#F8F6FB] font-medium">
                  Noida, India
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="lg:col-span-6 relative w-full h-[380px] sm:h-[480px] lg:h-[560px] flex items-center justify-center"
            initial={
              handoff
                ? { opacity: 0.35, scale: 0.86, y: 24 }
                : { opacity: 1, scale: 1, y: 0 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: handoff ? 0.9 : 0.01, ease, delay: 0.05 }}
          >
            <div className="absolute inset-[10%] rounded-full border border-[#B9A6D1]/18 pointer-events-none" />
            <div className="absolute top-2 left-2 right-2 z-20 flex items-center justify-between gap-2">
              <div className="hidden sm:flex items-center space-x-2 bg-[#1E1024]/85 backdrop-blur-md px-3 py-1 rounded-full border border-[#B9A6D1]/40 text-[10px] font-mono-accent text-[#B9A6D1]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8A9C2] animate-ping" />
                <span>LIVE ARCHITECTURE CORE</span>
              </div>
              <div className="flex items-center gap-2 ml-auto">
                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playClick("hero");
                    onOpenArchitectureModal();
                  }}
                  className="px-3 py-1 rounded-full bg-[#1E1024]/85 border border-[#B9A6D1]/40 text-[10px] font-mono-accent text-[#E8A9C2] hover:border-[#E8A9C2] transition-colors"
                >
                  Inspect layers
                </button>
                <button
                  id="toggle-disassemble-btn"
                  type="button"
                  onClick={handleDisassembleToggle}
                  aria-label={disassembled ? "Reassemble architecture core" : "Disassemble architecture core"}
                  aria-pressed={disassembled}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1E1024]/85 border border-[#B9A6D1]/35 text-[10px] font-mono-accent text-[#B9A6D1] hover:text-[#F8F6FB] transition-colors"
                >
                  <Cpu className="w-3 h-3 text-[#E8A9C2]" aria-hidden />
                  <span className="hidden sm:inline">
                    {disassembled ? "Reassemble" : "Disassemble"}
                  </span>
                </button>
              </div>
            </div>

            <CanvasContainer
              scrollProgress={scrollProgress}
              mousePos={mousePos}
              disassembled={disassembled}
              hoveredCube={hoveredCube}
              onCubeHover={onCubeHover}
              onEasterEggTrigger={handleEasterEggTriggered}
              reducedMotion={settings.reducedMotion}
              forceFallback={!settings.highQuality3D}
            />

            {hoveredCube !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-[#1E1024]/95 backdrop-blur-md border border-[#E8A9C2]/55 px-4 py-2 rounded-xl text-center shadow-lg"
              >
                <span className="text-xs font-mono-accent text-[#E8A9C2] block uppercase tracking-wider">
                  Module in focus
                </span>
                <span className="text-sm font-heading font-semibold text-[#F8F6FB]">
                  {hoveredCube === 0 && "Edge Ingress & CDN Gateway"}
                  {hoveredCube === 1 && "API Gateway & Event Stream"}
                  {hoveredCube === 2 && "Distributed Services Cluster"}
                  {hoveredCube === 3 && "Domain Application Core"}
                  {hoveredCube === 4 && "Resilient Data Layer"}
                </span>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 w-full flex flex-col items-center justify-center mt-6 text-center">
        <div className="flex items-center space-x-2 text-xs font-mono-accent uppercase tracking-widest text-[#B9A6D1]/80">
          <span>Scroll the full practice</span>
        </div>
        <motion.div
          animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="mt-2 flex flex-col items-center"
        >
          <div className="w-[1px] h-8 bg-gradient-to-b from-[#E8A9C2] via-[#6B4A87] to-transparent" />
          <ChevronDown className="w-4 h-4 text-[#E8A9C2] -mt-1" />
        </motion.div>
      </div>
    </section>
  );
};
