import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Layers, ArrowDown } from 'lucide-react';

interface TestimonialsCtaTransitionProps {
  scrollProgress: number;
  reducedMotion?: boolean;
}

export const TestimonialsCtaTransition: React.FC<TestimonialsCtaTransitionProps> = ({
  scrollProgress,
  reducedMotion = false,
}) => {
  return (
    <div
      id="testimonials-cta-transition"
      className="relative w-full h-44 sm:h-56 flex items-center justify-center overflow-hidden pointer-events-none select-none bg-gradient-to-b from-[#1E1024] via-[#341C3C] to-[#1E1024]"
    >
      {/* Background Radiance & Horizon Glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[700px] h-32 bg-gradient-to-r from-[#6B4A87]/30 via-[#E8A9C2]/35 to-[#B9A6D1]/30 blur-3xl rounded-full" />
      </div>

      {/* SVG Convergence Rays & Final Reassembly Wave */}
      <svg
        viewBox="0 0 1000 240"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="ctaConvergenceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E8A9C2" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#B9A6D1" stopOpacity="1" />
            <stop offset="100%" stopColor="#6B4A87" stopOpacity="0.8" />
          </linearGradient>

          <filter id="ctaGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Converging Outer Beziers (5 trails representing the 5 Core Cubes merging back into 1) */}
        <path
          d="M 120,0 C 260,80 420,160 500,240"
          fill="none"
          stroke="#E8A9C2"
          strokeWidth="1.5"
          strokeDasharray="4 8"
          opacity="0.35"
        />
        <path
          d="M 310,0 C 380,80 460,160 500,240"
          fill="none"
          stroke="#B9A6D1"
          strokeWidth="2"
          strokeDasharray="6 10"
          opacity="0.45"
        />
        <path
          d="M 500,0 L 500,240"
          fill="none"
          stroke="#6B4A87"
          strokeWidth="2.5"
          opacity="0.6"
        />
        <path
          d="M 690,0 C 620,80 540,160 500,240"
          fill="none"
          stroke="#B9A6D1"
          strokeWidth="2"
          strokeDasharray="6 10"
          opacity="0.45"
        />
        <path
          d="M 880,0 C 740,80 580,160 500,240"
          fill="none"
          stroke="#E8A9C2"
          strokeWidth="1.5"
          strokeDasharray="4 8"
          opacity="0.35"
        />

        {/* Central Pulsing Convergence Beam */}
        <motion.path
          d="M 500,0 L 500,240"
          fill="none"
          stroke="url(#ctaConvergenceGrad)"
          strokeWidth="4"
          filter="url(#ctaGlow)"
          strokeDasharray="45 160"
          animate={{
            strokeDashoffset: reducedMotion ? 0 : [0, -410],
          }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* 5 Traveling Cube Shards converging to center (Full Circle Reassembly) */}
        {!reducedMotion && (
          <>
            {/* Shard 1 (from left) */}
            <motion.polygon
              points="488,110 496,102 504,110 496,118"
              fill="#E8A9C2"
              filter="url(#ctaGlow)"
              animate={{
                x: [-120, 0],
                y: [-50, 60],
                opacity: [0, 1, 0.9, 0],
                scale: [0.6, 1.2, 0.8],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            {/* Shard 2 (from right) */}
            <motion.polygon
              points="496,110 504,102 512,110 504,118"
              fill="#B9A6D1"
              filter="url(#ctaGlow)"
              animate={{
                x: [120, 0],
                y: [-50, 60],
                opacity: [0, 1, 0.9, 0],
                scale: [0.6, 1.2, 0.8],
              }}
              transition={{
                duration: 2.8,
                delay: 0.4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </>
        )}
      </svg>

      {/* Central "Full-Circle Reassembly" Isometric Badge */}
      <div className="absolute z-10 flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-[#1E1024]/95 border border-[#E8A9C2]/50 shadow-[0_0_30px_rgba(232,169,194,0.3)] backdrop-blur-md">
        <Layers className="w-3.5 h-3.5 text-[#E8A9C2]" />
        <span className="font-mono-accent text-[11px] text-[#F8F6FB] uppercase tracking-widest font-semibold">
          READY TO ENGAGE
        </span>
        <Sparkles className="w-3.5 h-3.5 text-[#E8A9C2] animate-pulse" />
      </div>
    </div>
  );
};
