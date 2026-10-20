import React from 'react';
import { motion } from 'motion/react';
import { GitBranch, Sparkles } from 'lucide-react';

interface ProductProcessTransitionProps {
  scrollProgress: number;
  reducedMotion?: boolean;
}

export const ProductProcessTransition: React.FC<ProductProcessTransitionProps> = ({
  scrollProgress,
  reducedMotion = false,
}) => {
  return (
    <div
      id="product-process-conduit"
      className="relative w-full h-36 sm:h-48 flex items-center justify-center overflow-hidden pointer-events-none select-none bg-gradient-to-b from-[#1E1024] via-[#201026] to-[#2A1830]"
    >
      {/* Background Soft Glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[520px] h-24 bg-gradient-to-r from-[#E8A9C2]/15 via-[#B9A6D1]/25 to-[#6B4A87]/20 blur-3xl rounded-full" />
      </div>

      {/* SVG Stepped Isometric Pipeline */}
      <svg
        viewBox="0 0 1000 200"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="processTransitionGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E8A9C2" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#B9A6D1" stopOpacity="1" />
            <stop offset="100%" stopColor="#6B4A87" stopOpacity="0.8" />
          </linearGradient>

          <filter id="transitionGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Stepped Architectural Pathway */}
        <path
          d="M 300,0 L 300,60 L 500,100 L 500,200"
          fill="none"
          stroke="#6B4A87"
          strokeWidth="1.5"
          strokeDasharray="4 8"
          opacity="0.35"
        />
        <path
          d="M 700,0 L 700,60 L 500,100 L 500,200"
          fill="none"
          stroke="#6B4A87"
          strokeWidth="1.5"
          strokeDasharray="4 8"
          opacity="0.35"
        />

        {/* Central Direct Line */}
        <path
          d="M 500,0 L 500,200"
          fill="none"
          stroke="#6B4A87"
          strokeWidth="2"
          opacity="0.4"
        />

        <motion.path
          d="M 500,0 L 500,200"
          fill="none"
          stroke="url(#processTransitionGrad)"
          strokeWidth="3.5"
          filter="url(#transitionGlow)"
          strokeDasharray="30 150"
          animate={{
            strokeDashoffset: reducedMotion ? 0 : [0, -360],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Stepped Left Pipeline Pulse */}
        <motion.path
          d="M 300,0 L 300,60 L 500,100 L 500,200"
          fill="none"
          stroke="#E8A9C2"
          strokeWidth="2"
          strokeDasharray="20 120"
          filter="url(#transitionGlow)"
          animate={{
            strokeDashoffset: reducedMotion ? 0 : [0, -300],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </svg>

      <div className="absolute z-10 flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#1E1024]/90 border border-[#6B4A87]/60 shadow-[0_4px_16px_rgba(107,74,135,0.12)]">
        <GitBranch className="w-3.5 h-3.5 text-[#E8A9C2]" />
        <span className="font-mono-accent text-[10px] text-[#B9A6D1] uppercase tracking-widest font-medium">
          PIPELINE TO METHODOLOGY
        </span>
      </div>
    </div>
  );
};

