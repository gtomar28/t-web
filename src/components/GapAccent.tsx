import React, { useState } from "react";
import { motion } from "motion/react";

export type GapAccentVariant = "orbit" | "modules" | "nodes" | "pulse";

interface GapAccentProps {
  variant?: GapAccentVariant;
  reducedMotion?: boolean;
  className?: string;
  caption?: string;
}

/**
 * Interactive gap filler  sits in empty layout columns / margins.
 * Pointer-friendly micro-scene that does not compete with primary copy.
 */
export const GapAccent: React.FC<GapAccentProps> = ({
  variant = "orbit",
  reducedMotion = false,
  className = "",
  caption,
}) => {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div
      className={`relative select-none ${className}`}
      onMouseLeave={() => setActive(null)}
    >
      {variant === "orbit" && (
        <div className="relative w-44 h-44 sm:w-52 sm:h-52 mx-auto">
          <motion.div
            className="absolute inset-3 rounded-full border border-[#B9A6D1]/35"
            animate={reducedMotion ? undefined : { rotate: 360 }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-8 rounded-full border border-dashed border-[#E8A9C2]/40"
            animate={reducedMotion ? undefined : { rotate: -360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute inset-[42%] rounded-full bg-gradient-to-br from-[#6B4A87] to-[#E8A9C2] shadow-[0_0_28px_rgba(232,169,194,0.45)]" />

          <motion.div
            className="absolute inset-0"
            animate={reducedMotion ? undefined : { rotate: 360 }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          >
            {[0, 1, 2].map((i) => {
              const angle = (i / 3) * Math.PI * 2;
              const r = 70;
              return (
                <button
                  key={i}
                  type="button"
                  aria-label={`Orbit node ${i + 1}`}
                  className="absolute w-3.5 h-3.5 -ml-[7px] -mt-[7px] rounded-sm bg-[#E8A9C2]/85 border border-[#F8F6FB]/40 shadow-[0_0_12px_rgba(232,169,194,0.6)] cursor-pointer hover:scale-125 transition-transform"
                  style={{
                    left: `calc(50% + ${Math.cos(angle) * r}px)`,
                    top: `calc(50% + ${Math.sin(angle) * r}px)`,
                  }}
                  onMouseEnter={() => setActive(i)}
                />
              );
            })}
          </motion.div>

          {active !== null && (
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[9px] font-mono-accent text-[#E8A9C2] tracking-wider uppercase whitespace-nowrap">
              Node 0{active + 1} live
            </div>
          )}
        </div>
      )}

      {variant === "modules" && (
        <div className="relative w-40 h-44 mx-auto flex flex-col items-center justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <motion.button
              key={i}
              type="button"
              aria-label={`Module block ${i + 1}`}
              onMouseEnter={() => setActive(i)}
              className="w-28 h-9 rounded-xl border cursor-pointer"
              style={{
                background:
                  active === i
                    ? "linear-gradient(90deg, #6B4A87, #E8A9C2)"
                    : "rgba(30,16,36,0.85)",
                borderColor:
                  active === i
                    ? "rgba(232,169,194,0.7)"
                    : "rgba(185,166,209,0.35)",
                marginLeft: i * 10,
              }}
              animate={
                reducedMotion ? undefined : { y: [0, i % 2 === 0 ? -4 : 4, 0] }
              }
              transition={{
                duration: 2.8 + i * 0.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              whileHover={{ scale: 1.04, x: 4 }}
            />
          ))}
          <div className="text-[9px] font-mono-accent text-[#B9A6D1] tracking-wider uppercase mt-1">
            {active !== null ? `Layer 0${active + 1}` : "Modular stack"}
          </div>
        </div>
      )}

      {variant === "nodes" && (
        <div className="relative w-48 h-36 mx-auto">
          <svg viewBox="0 0 200 140" className="w-full h-full">
            <defs>
              <linearGradient id="gapNodeLine" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#6B4A87" />
                <stop offset="100%" stopColor="#E8A9C2" />
              </linearGradient>
            </defs>
            <path
              d="M30 100 C70 20, 130 20, 170 100"
              fill="none"
              stroke="url(#gapNodeLine)"
              strokeWidth="1.5"
              opacity="0.55"
              strokeDasharray="4 6"
            />
            {[
              { cx: 30, cy: 100, label: "In" },
              { cx: 100, cy: 36, label: "Core" },
              { cx: 170, cy: 100, label: "Out" },
            ].map((n, i) => (
              <g key={n.label}>
                <circle
                  cx={n.cx}
                  cy={n.cy}
                  r={active === i ? 9 : 7}
                  fill={active === i ? "#E8A9C2" : "#6B4A87"}
                  stroke="#F8F6FB"
                  strokeWidth="1"
                  style={{ cursor: "pointer" }}
                  onMouseEnter={() => setActive(i)}
                  opacity={0.9}
                />
                <text
                  x={n.cx}
                  y={n.cy + 22}
                  textAnchor="middle"
                  fill="#B9A6D1"
                  fontSize="8"
                  fontFamily="monospace"
                >
                  {n.label}
                </text>
              </g>
            ))}
          </svg>
        </div>
      )}

      {variant === "pulse" && (
        <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-[#E8A9C2]/40"
              style={{ width: 48 + i * 32, height: 48 + i * 32 }}
              animate={
                reducedMotion
                  ? undefined
                  : { scale: [1, 1.12, 1], opacity: [0.45, 0.15, 0.45] }
              }
              transition={{
                duration: 2.6 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.25,
              }}
            />
          ))}
          <motion.button
            type="button"
            aria-label="Pulse core"
            className="relative z-10 w-12 h-12 rounded-2xl bg-gradient-to-br from-[#6B4A87] to-[#E8A9C2] shadow-[0_0_24px_rgba(232,169,194,0.5)] cursor-pointer"
            whileHover={{ scale: 1.1, rotate: 8 }}
            whileTap={{ scale: 0.96 }}
            onMouseEnter={() => setActive(0)}
            onMouseLeave={() => setActive(null)}
          />
          {active !== null && (
            <div className="absolute bottom-1 text-[9px] font-mono-accent text-[#E8A9C2] tracking-wider uppercase">
              Signal locked
            </div>
          )}
        </div>
      )}

      {caption ? (
        <p className="mt-3 text-center text-[10px] font-mono-accent text-[#B9A6D1]/80 tracking-[0.18em] uppercase">
          {caption}
        </p>
      ) : null}
    </div>
  );
};
