import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { TrevykLogo } from "./TrevykLogo";
import { peekEntryHandoff } from "../utils/entryHandoff";

interface RouteLoaderProps {
  reducedMotion?: boolean;
}

/**
 * Brief brand-core veil on route change.
 * Skips first paint and preloader→home entry handoff.
 */
export const RouteLoader: React.FC<RouteLoaderProps> = ({
  reducedMotion = false,
}) => {
  const { pathname } = useLocation();
  const [show, setShow] = useState(false);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setArmed(true), 900);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!armed || reducedMotion) return;
    if (peekEntryHandoff()) return;
    if (pathname === "/" || pathname === "") return;

    setShow(true);
    const t = window.setTimeout(() => setShow(false), 680);
    return () => window.clearTimeout(t);
  }, [pathname, reducedMotion, armed]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-[80] pointer-events-none flex items-center justify-center bg-[#160A1C]/72 backdrop-blur-[2px]"
          aria-hidden
        >
          <div className="relative flex flex-col items-center gap-4">
            <TrevykLogo layout="icon-only" size="md" theme="dark" />
            <span className="font-mono-accent text-[10px] tracking-[0.3em] text-[#E8A9C2] uppercase">
              Switching context
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
