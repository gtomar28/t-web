import React, { useRef } from "react";
import { useReducedMotion } from "motion/react";

interface MagneticCardProps {
  children: React.ReactNode;
  className?: string;
  reducedMotion?: boolean;
  strength?: number;
  maxTilt?: number;
}

/**
 * Pointer-follow tilt — updates transform on the element directly (no React re-render per move).
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

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (quiet || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    const x = px * strength * 40;
    const y = py * strength * 40;
    const rx = -py * maxTilt;
    const ry = px * maxTilt;
    ref.current.style.transform = `perspective(900px) translate3d(${x}px, ${y}px, 0) rotateX(${rx}deg) rotateY(${ry}deg)`;
  };

  const onLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform =
      "perspective(900px) translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg)";
  };

  if (quiet) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transformStyle: "preserve-3d", willChange: "transform" }}
    >
      {children}
    </div>
  );
};
