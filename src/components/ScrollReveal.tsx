import React from "react";
import { motion, useReducedMotion } from "motion/react";

type RevealVariant = "up" | "fade" | "scale" | "left" | "right";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  reducedMotion?: boolean;
  once?: boolean;
  amount?: number;
  as?: "div" | "section" | "article" | "li";
  id?: string;
}

const OFFSETS: Record<
  RevealVariant,
  { hidden: Record<string, number>; visible: Record<string, number> }
> = {
  up: { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } },
  fade: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  scale: {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1 },
  },
  left: { hidden: { opacity: 0, x: -24 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 24 }, visible: { opacity: 1, x: 0 } },
};

/**
 * Scroll-triggered reveal  respects reducedMotion (prop or system preference).
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = "",
  variant = "up",
  delay = 0,
  duration = 0.55,
  reducedMotion = false,
  once = true,
  amount = 0.2,
  as = "div",
  id,
}) => {
  const systemReduced = useReducedMotion();
  const quiet = reducedMotion || systemReduced;
  const MotionTag = motion[as];
  const frames = OFFSETS[variant];

  if (quiet) {
    const Tag = as;
    return (
      <Tag id={id} className={className}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      id={id}
      className={className}
      initial={frames.hidden}
      whileInView={frames.visible}
      viewport={{ once, amount, margin: "0px 0px -8% 0px" }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </MotionTag>
  );
};
