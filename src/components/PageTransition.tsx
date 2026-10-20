import React from "react";
import { motion } from "motion/react";

interface PageTransitionProps {
  pathname: string;
  reducedMotion?: boolean;
  children: React.ReactNode;
}

/**
 * Soft route enter/exit  no CSS blur filters (those tank scroll/nav perf).
 */
export const PageTransition: React.FC<PageTransitionProps> = ({
  pathname,
  reducedMotion = false,
  children,
}) => {
  if (reducedMotion) {
    return (
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      key={pathname}
      className="relative"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{
        duration: 0.38,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-28 overflow-hidden"
        initial={{ opacity: 0.4 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.div
          className="absolute inset-y-0 w-1/3"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(232,169,194,0.16), transparent)",
          }}
          initial={{ x: "-30%" }}
          animate={{ x: "200%" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>
      {children}
    </motion.div>
  );
};
