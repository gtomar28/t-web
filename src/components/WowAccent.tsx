import React from "react";
import { motion } from "motion/react";

export type WowAccentKind =
  | "lattice"
  | "layers"
  | "campus"
  | "pipeline"
  | "brand"
  | "beacon";

interface WowAccentProps {
  kind: WowAccentKind;
  className?: string;
  reducedMotion?: boolean;
  caption?: string;
  /** 0-based focus for interactive sync */
  focus?: number | null;
  step?: number;
}

/**
 * GPU-light section accents (SVG + CSS motion)  unique per section,
 * no WebGL. Replaces multi-canvas SceneEmbed / HomeSceneHost.
 */
export const WowAccent: React.FC<WowAccentProps> = ({
  kind,
  className = "",
  reducedMotion = false,
  caption,
  focus = null,
  step = 0,
}) => {
  return (
    <div className={`relative select-none ${className}`}>
      {caption ? (
        <div className="text-[10px] font-mono-accent uppercase tracking-[0.2em] text-[#E8A9C2] mb-2 text-center">
          {caption}
        </div>
      ) : null}
      <div className="relative w-full aspect-square max-h-[220px] mx-auto overflow-hidden rounded-2xl border border-[#B9A6D1]/25 bg-gradient-to-br from-[#1E1024]/90 to-[#2A1830]/70">
        {kind === "lattice" && (
          <LatticeAccent reducedMotion={reducedMotion} focus={focus} />
        )}
        {kind === "layers" && (
          <LayersAccent reducedMotion={reducedMotion} focus={focus} />
        )}
        {kind === "campus" && (
          <CampusAccent reducedMotion={reducedMotion} step={step} />
        )}
        {kind === "pipeline" && (
          <PipelineAccent
            reducedMotion={reducedMotion}
            stage={typeof focus === "number" ? focus : step}
          />
        )}
        {kind === "brand" && (
          <BrandAccent reducedMotion={reducedMotion} focus={focus} />
        )}
        {kind === "beacon" && (
          <BeaconAccent
            reducedMotion={reducedMotion}
            track={typeof focus === "number" ? focus : 1}
          />
        )}
      </div>
    </div>
  );
};

function LatticeAccent({
  reducedMotion,
  focus,
}: {
  reducedMotion: boolean;
  focus: number | null;
}) {
  const bars = [
    { x: 28, color: "#E8A9C2" },
    { x: 50, color: "#6B4A87" },
    { x: 72, color: "#B9A6D1" },
  ];
  return (
    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
      <defs>
        <linearGradient id="latGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E8A9C2" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#6B4A87" stopOpacity="0.8" />
        </linearGradient>
      </defs>
      <motion.line
        x1="20"
        y1="55"
        x2="80"
        y2="55"
        stroke="url(#latGrad)"
        strokeWidth="1.2"
        animate={reducedMotion ? undefined : { opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      {bars.map((b, i) => (
        <motion.rect
          key={b.x}
          x={b.x - 7}
          y={focus === i ? 22 : 28}
          width="14"
          height={focus === i ? 48 : 40}
          rx="2"
          fill={b.color}
          opacity={focus === null || focus === i ? 0.9 : 0.35}
          animate={
            reducedMotion
              ? undefined
              : {
                  y: [
                    focus === i ? 22 : 28,
                    focus === i ? 18 : 32,
                    focus === i ? 22 : 28,
                  ],
                }
          }
          transition={{
            duration: 2.8 + i * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </svg>
  );
}

function LayersAccent({
  reducedMotion,
  focus,
}: {
  reducedMotion: boolean;
  focus: number | null;
}) {
  const layers = ["#E8A9C2", "#C4B0E0", "#8B6BA8", "#6B4A87", "#B9A6D1"];
  return (
    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
      {layers.map((c, i) => {
        const y = 18 + i * 14;
        const active = focus === i;
        return (
          <motion.rect
            key={c}
            x={active ? 12 : 18}
            y={y}
            width={active ? 76 : 64}
            height="10"
            rx="2"
            fill={c}
            opacity={focus === null || active ? 0.85 : 0.3}
            animate={
              reducedMotion
                ? undefined
                : { x: [active ? 12 : 18, active ? 14 : 20, active ? 12 : 18] }
            }
            transition={{ duration: 2.4 + i * 0.15, repeat: Infinity }}
          />
        );
      })}
    </svg>
  );
}

function CampusAccent({
  reducedMotion,
  step,
}: {
  reducedMotion: boolean;
  step: number;
}) {
  const n = 6;
  const nodes = Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    return { x: 50 + Math.cos(a) * 28, y: 50 + Math.sin(a) * 28, i };
  });
  const active = step % n;
  return (
    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
      {nodes.map((node, i) => {
        const next = nodes[(i + 1) % n];
        return (
          <line
            key={`e-${i}`}
            x1={node.x}
            y1={node.y}
            x2={next.x}
            y2={next.y}
            stroke="#6B4A87"
            strokeWidth="1"
            opacity="0.45"
          />
        );
      })}
      {nodes.map((node) => (
        <line
          key={`s-${node.i}`}
          x1={node.x}
          y1={node.y}
          x2={50}
          y2={50}
          stroke="#B9A6D1"
          strokeWidth="0.8"
          opacity="0.35"
        />
      ))}
      <circle cx="50" cy="50" r="5" fill="#E8A9C2" />
      {nodes.map((node) => (
        <motion.circle
          key={node.i}
          cx={node.x}
          cy={node.y}
          r={node.i === active ? 5.5 : 3.5}
          fill={node.i === active ? "#E8A9C2" : "#6B4A87"}
          animate={
            reducedMotion || node.i !== active
              ? undefined
              : { r: [5.5, 7, 5.5] }
          }
          transition={{ duration: 1.4, repeat: Infinity }}
        />
      ))}
    </svg>
  );
}

function PipelineAccent({
  reducedMotion,
  stage,
}: {
  reducedMotion: boolean;
  stage: number;
}) {
  const points = [15, 32, 50, 68, 85];
  return (
    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
      <line
        x1="12"
        y1="55"
        x2="88"
        y2="55"
        stroke="#6B4A87"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {!reducedMotion && (
        <motion.circle
          r="3"
          fill="#E8A9C2"
          animate={{ cx: [15, 85], cy: [55, 55] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      {points.map((x, i) => (
        <g key={x}>
          <rect
            x={x - 5}
            y={48}
            width="10"
            height="14"
            rx="2"
            fill={i === stage % 5 ? "#E8A9C2" : "#2A1830"}
            stroke={i === stage % 5 ? "#E8A9C2" : "#B9A6D1"}
            strokeWidth="1"
          />
          <motion.polygon
            points={`${x},${36} ${x - 4},${44} ${x + 4},${44}`}
            fill="#B9A6D1"
            animate={
              reducedMotion
                ? undefined
                : i === stage % 5
                  ? { y: [0, -4, 0] }
                  : undefined
            }
            transition={{ duration: 1.2, repeat: Infinity }}
          />
        </g>
      ))}
    </svg>
  );
}

function BrandAccent({
  reducedMotion,
  focus,
}: {
  reducedMotion: boolean;
  focus: number | null;
}) {
  return (
    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
      <motion.g
        style={{ originX: "50px", originY: "50px" }}
        animate={
          reducedMotion ? undefined : { rotate: [0, focus !== null ? 6 : 2, 0] }
        }
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Abstract Y */}
        <line
          x1="32"
          y1="28"
          x2="50"
          y2="52"
          stroke="#E8A9C2"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <line
          x1="68"
          y1="28"
          x2="50"
          y2="52"
          stroke="#B9A6D1"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <line
          x1="50"
          y1="52"
          x2="50"
          y2="78"
          stroke="#6B4A87"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </motion.g>
      {[20, 35, 65, 80].map((x, i) => (
        <circle
          key={x}
          cx={x}
          cy="88"
          r={focus === i ? 2.5 : 1.5}
          fill={focus === i ? "#E8A9C2" : "#6B4A87"}
        />
      ))}
    </svg>
  );
}

function BeaconAccent({
  reducedMotion,
  track,
}: {
  reducedMotion: boolean;
  track: number;
}) {
  const rings = [18, 28, 38];
  return (
    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
      <circle cx="50" cy="50" r="6" fill="#F8F6FB" />
      <circle cx="50" cy="50" r="4" fill="#E8A9C2" />
      {rings.map((r, i) => (
        <motion.circle
          key={r}
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke={i === track % 3 ? "#E8A9C2" : "#6B4A87"}
          strokeWidth={i === track % 3 ? 2.2 : 1.2}
          opacity={i === track % 3 ? 0.95 : 0.45}
          animate={
            reducedMotion
              ? undefined
              : { r: [r, r + 3, r], opacity: [0.45, 0.9, 0.45] }
          }
          transition={{
            duration: 2.2 + i * 0.4,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </svg>
  );
}
