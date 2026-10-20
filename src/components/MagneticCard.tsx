import React, { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

interface MagneticCardProps {
  children: React.ReactNode;
  className?: string;
  reducedMotion?: boolean;
  strength?: number;
  maxTilt?: number;
}

/**
 * Pointer-follow magnetic tilt for interactive cards / panels.
 */
export const MagneticCard: React.FC<MagneticCardProps> = ({
  children,
  className = "",
  reducedMotion = false,
  strength = 0.12,
  maxTilt = 5,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const systemReduced = useReducedMotion();
  const quiet = reducedMotion || systemReduced;
  const [offset, setOffset] = useState({ x: 0, y: 0, rx: 0, ry: 0 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (quiet || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setOffset({
      x: px * strength * 40,
      y: py * strength * 40,
      rx: -py * maxTilt,
      ry: px * maxTilt,
    });
  };

  const onLeave = () => setOffset({ x: 0, y: 0, rx: 0, ry: 0 });

  if (quiet) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      animate={{
        x: offset.x,
        y: offset.y,
        rotateX: offset.rx,
        rotateY: offset.ry,
      }}
      transition={{ type: "spring", stiffness: 260, damping: 22, mass: 0.35 }}
      style={{ transformPerspective: 900, transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  );
};
