import React, { useId } from "react";
import { motion } from "motion/react";
import { BrandGradientDivider } from "./BrandGradientBar";

interface SectionBridgeProps {
  /** Short mono label for the divider (e.g. Stack, Journey) */
  label?: string;
  /** Show animated energy stream between sections */
  stream?: boolean;
  reducedMotion?: boolean;
  className?: string;
  /** Visual tone  soft for dark pages, lilac for light rhythm */
  tone?: "dark" | "lilac" | "pink";
  /** Slim bridge  divider only (or short stream) for home gap diet */
  compact?: boolean;
}

/**
 * Section connector  dual energy paths + labeled brand divider.
 */
export const SectionBridge: React.FC<SectionBridgeProps> = ({
  label,
  stream = true,
  reducedMotion = false,
  className = "",
  tone = "dark",
  compact = false,
}) => {
  const uid = useId().replace(/:/g, "");
  const gradId = `bridgeGrad-${uid}`;
  const gradIdB = `bridgeGradB-${uid}`;
  const glowId = `bridgeGlow-${uid}`;

  const wash =
    tone === "lilac"
      ? "bg-gradient-to-r from-[#6B4A87]/12 via-[#E7E1F0]/18 to-[#B9A6D1]/14"
      : tone === "pink"
        ? "bg-gradient-to-r from-[#6B4A87]/15 via-[#E8A9C2]/28 to-[#B9A6D1]/12"
        : "bg-gradient-to-r from-[#6B4A87]/22 via-[#B9A6D1]/28 to-[#E8A9C2]/22";

  const showStream = stream && !compact;

  return (
    <div className={`relative ${className}`}>
      {showStream ? (
        <div
          className="relative w-full h-28 sm:h-36 flex items-center justify-center overflow-hidden pointer-events-none select-none"
          aria-hidden
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`w-[32rem] h-20 blur-2xl rounded-full ${wash}`} />
          </div>

          <svg
            viewBox="0 0 1000 180"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            <defs>
              <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6B4A87" stopOpacity="0.25" />
                <stop offset="35%" stopColor="#B9A6D1" stopOpacity="0.9" />
                <stop offset="70%" stopColor="#E8A9C2" stopOpacity="1" />
                <stop offset="100%" stopColor="#6B4A87" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id={gradIdB} x1="100%" y1="0%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#E8A9C2" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#E7E1F0" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#6B4A87" stopOpacity="0.25" />
              </linearGradient>
              <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Secondary reverse path */}
            <path
              d="M 40,130 C 260,130 280,55 500,55 C 720,55 740,130 960,130"
              fill="none"
              stroke={`url(#${gradIdB})`}
              strokeWidth="1.25"
              opacity="0.45"
            />
            <path
              d="M 40,50 C 260,50 220,130 500,130 C 780,130 740,50 960,50"
              fill="none"
              stroke="#6B4A87"
              strokeWidth="1.25"
              strokeDasharray="3 7"
              opacity="0.35"
            />
            <motion.path
              d="M 40,50 C 260,50 220,130 500,130 C 780,130 740,50 960,50"
              fill="none"
              stroke={`url(#${gradId})`}
              strokeWidth="2.5"
              filter={`url(#${glowId})`}
              strokeDasharray="18 160"
              animate={{
                strokeDashoffset: reducedMotion ? 0 : [0, -360],
              }}
              transition={{
                duration: 4.0,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            {!reducedMotion && (
              <motion.path
                d="M 40,130 C 260,130 280,55 500,55 C 720,55 740,130 960,130"
                fill="none"
                stroke={`url(#${gradIdB})`}
                strokeWidth="1.5"
                strokeDasharray="10 120"
                animate={{ strokeDashoffset: [0, 280] }}
                transition={{
                  duration: 5.2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            )}
            <circle cx="500" cy="130" r="3.5" fill="#E8A9C2">
              {!reducedMotion && (
                <animate
                  attributeName="r"
                  values="3;5.5;3"
                  dur="2.2s"
                  repeatCount="indefinite"
                />
              )}
            </circle>
            <circle cx="500" cy="55" r="2.5" fill="#B9A6D1" opacity="0.8">
              {!reducedMotion && (
                <animate
                  attributeName="opacity"
                  values="0.45;1;0.45"
                  dur="2.8s"
                  repeatCount="indefinite"
                />
              )}
            </circle>
          </svg>

          {!reducedMotion && (
            <>
              <motion.div
                animate={{ x: [-110, 110], y: [8, -10, 8], rotate: [0, 160] }}
                transition={{
                  duration: 5.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute w-2.5 h-2.5 border border-[#E8A9C2] bg-[#E8A9C2]/35 rotate-45 shadow-[0_0_10px_#E8A9C2]"
              />
              <motion.div
                animate={{ x: [90, -90], y: [-6, 10, -6], rotate: [0, -120] }}
                transition={{
                  duration: 6.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.6,
                }}
                className="absolute w-2 h-2 rounded-full bg-[#B9A6D1]/70 shadow-[0_0_8px_#B9A6D1]"
              />
            </>
          )}
        </div>
      ) : null}

      <BrandGradientDivider
        label={label}
        reducedMotion={reducedMotion}
        compact={compact}
      />
    </div>
  );
};
