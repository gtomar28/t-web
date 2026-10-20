import React from 'react';
import { motion } from 'motion/react';

interface ProcessStatsTransitionProps {
  scrollProgress: number;
  reducedMotion?: boolean;
}

export const ProcessStatsTransition: React.FC<ProcessStatsTransitionProps> = ({
  scrollProgress,
  reducedMotion = false,
}) => {
  return (
    <div
      id="process-stats-conduit"
      className="relative w-full h-36 sm:h-48 flex items-center justify-center overflow-hidden pointer-events-none select-none bg-gradient-to-b from-[#1E1024] via-[#1E1024] to-[#2A1830]"
    >
      {/* Background Soft Glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-28 bg-gradient-to-r from-[#6B4A87]/20 via-[#E8A9C2]/25 to-[#B9A6D1]/20 blur-3xl rounded-full" />
      </div>

      {/* SVG Connecting Flow with Geometric Isometric Shards (Varied from earlier transitions) */}
      <svg
        viewBox="0 0 1000 200"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="statsTransitionGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6B4A87" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#E8A9C2" stopOpacity="1" />
            <stop offset="100%" stopColor="#B9A6D1" stopOpacity="0.9" />
          </linearGradient>

          <filter id="shardGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Conduit Curves */}
        <path
          d="M 200,0 C 350,70 420,130 500,200"
          fill="none"
          stroke="#6B4A87"
          strokeWidth="1.5"
          strokeDasharray="4 8"
          opacity="0.3"
        />
        <path
          d="M 800,0 C 650,70 580,130 500,200"
          fill="none"
          stroke="#6B4A87"
          strokeWidth="1.5"
          strokeDasharray="4 8"
          opacity="0.3"
        />

        {/* Central Energy Stream */}
        <path
          d="M 500,0 L 500,200"
          fill="none"
          stroke="#6B4A87"
          strokeWidth="2"
          strokeDasharray="6 10"
          opacity="0.5"
        />

        <motion.path
          d="M 500,0 L 500,200"
          fill="none"
          stroke="url(#statsTransitionGrad)"
          strokeWidth="4"
          filter="url(#shardGlow)"
          strokeDasharray="40 140"
          animate={{
            strokeDashoffset: reducedMotion ? 0 : [0, -360],
          }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Floating Isometric Shards traveling down */}
        {!reducedMotion && (
          <>
            <motion.polygon
              points="495,15 500,8 505,15 500,22"
              fill="#E8A9C2"
              filter="url(#shardGlow)"
              animate={{
                y: [0, 180],
                opacity: [0, 1, 0.8, 0],
                scale: [0.8, 1.2, 0.9],
              }}
              transition={{
                duration: 3.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.polygon
              points="494,45 500,37 506,45 500,53"
              fill="#B9A6D1"
              filter="url(#shardGlow)"
              animate={{
                y: [0, 160],
                opacity: [0, 1, 0.7, 0],
                scale: [0.7, 1.1, 0.8],
              }}
              transition={{
                duration: 2.5,
                delay: 1.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </>
        )}
      </svg>

      {/* Center Reassurance Node Badge */}
      <div className="absolute z-10 flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#1E1024]/90 border border-[#E8A9C2]/40 shadow-[0_4px_20px_rgba(232,169,194,0.2)]">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="font-mono-accent text-[10px] text-[#E8A9C2] uppercase tracking-widest font-semibold">
          METHOD → COMPANY
        </span>
      </div>
    </div>
  );
};
