import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TrevykLogo } from "./TrevykLogo";
import { markEntryHandoff } from "../utils/entryHandoff";

interface PreloaderProps {
  onComplete: () => void;
  reducedMotion?: boolean;
}

/**
 * Cinematic brand boot — assembling architecture core + wipe exit.
 * Marks entry handoff so Hero can continue the motion smoothly.
 */
export const Preloader: React.FC<PreloaderProps> = ({
  onComplete,
  reducedMotion = false,
}) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"boot" | "assemble" | "ready" | "wipe">(
    "boot"
  );
  const [visible, setVisible] = useState(true);
  const onCompleteRef = useRef(onComplete);
  const finishedRef = useRef(false);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const finish = () => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      if (!reducedMotion) markEntryHandoff();
      onCompleteRef.current();
    };

    if (reducedMotion) {
      const t = setTimeout(finish, 500);
      return () => clearTimeout(t);
    }

    let current = 0;
    let leaveTimer: ReturnType<typeof setTimeout> | undefined;
    let doneTimer: ReturnType<typeof setTimeout> | undefined;

    const interval = setInterval(() => {
      if (finishedRef.current) return;
      current = Math.min(current + 34, 100);
      setProgress(Math.floor(current));
      setPhase(current < 50 ? "assemble" : "ready");

      if (current >= 100) {
        clearInterval(interval);
        setPhase("wipe");
        leaveTimer = setTimeout(() => {
          setVisible(false);
          doneTimer = setTimeout(finish, 120);
        }, 80);
      }
    }, 16);

    return () => {
      clearInterval(interval);
      if (leaveTimer) clearTimeout(leaveTimer);
      if (doneTimer) clearTimeout(doneTimer);
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <div className="fixed inset-0 z-[999] bg-[#2A1830] flex items-center justify-center">
        <TrevykLogo layout="horizontal" size="lg" showTagline />
      </div>
    );
  }

  const statuses = {
    boot: "INITIALIZING CORE",
    assemble: "ASSEMBLING MODULES",
    ready: "SYSTEM READY",
    wipe: "ENTERING TREVYK",
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          id="preloader-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[999] bg-[#160A1C] flex flex-col items-center justify-center overflow-hidden select-none"
          aria-busy="true"
          aria-live="polite"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(107,74,135,0.35),transparent_65%)]" />
          <div className="absolute inset-0 bg-noise opacity-30" />

          <div className="relative z-10 w-40 h-40 sm:w-48 sm:h-48 mb-10">
            {[
              { x: -28, y: -36, delay: 0, c: "#E8A9C2" },
              { x: 28, y: -36, delay: 0.12, c: "#C4B0E0" },
              { x: 0, y: -6, delay: 0.22, c: "#8B6BA8" },
              { x: 0, y: 24, delay: 0.32, c: "#6B4A87" },
              { x: 0, y: 54, delay: 0.42, c: "#B9A6D1" },
            ].map((cube, i) => (
              <motion.div
                key={i}
                className="absolute left-1/2 top-1/2 w-11 h-11 sm:w-12 sm:h-12 -ml-[22px] -mt-[22px] sm:-ml-6 sm:-mt-6 rounded-md border border-white/20 shadow-[0_0_24px_rgba(232,169,194,0.25)]"
                style={{
                  background: `linear-gradient(145deg, ${cube.c}, #2A1830)`,
                }}
                initial={{
                  opacity: 0,
                  x: cube.x * 2.2,
                  y: cube.y * 2.2,
                  rotate: 25,
                  scale: 0.4,
                }}
                animate={{
                  opacity: 1,
                  x: cube.x,
                  y: cube.y,
                  rotate: phase === "wipe" ? 8 : 12,
                  scale: phase === "ready" || phase === "wipe" ? 1.05 : 1,
                }}
                transition={{
                  duration: 0.9,
                  delay: cube.delay,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            ))}
            <motion.div
              className="absolute inset-6 rounded-full border border-dashed border-[#E8A9C2]/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="relative z-10"
          >
            <TrevykLogo layout="horizontal" size="lg" showTagline={false} />
          </motion.div>

          <p className="relative z-10 mt-4 text-[11px] sm:text-xs text-[#B9A6D1] font-mono-accent tracking-[0.28em] uppercase">
            Turning Vision Into Progress
          </p>

          <div className="relative z-10 mt-8 w-56 sm:w-72">
            <div className="h-[3px] rounded-full bg-[#2A1830] overflow-hidden border border-[#6B4A87]/40">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#6B4A87] via-[#B9A6D1] to-[#E8A9C2]"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-3 flex items-center justify-between text-[10px] font-mono-accent tracking-wider text-[#B9A6D1]">
              <span className="text-[#E8A9C2]">{statuses[phase]}</span>
              <span className="text-[#F8F6FB]">
                {String(progress).padStart(2, "0")}%
              </span>
            </div>
          </div>

          <AnimatePresence>
            {phase === "wipe" && (
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: [0.65, 0, 0.35, 1] }}
                className="absolute inset-0 z-20 origin-bottom bg-gradient-to-t from-[#2A1830] via-[#6B4A87] to-[#E8A9C2]"
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
