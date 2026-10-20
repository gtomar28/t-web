import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface ConnectiveStreamProps {
  scrollProgress: number;
  reducedMotion?: boolean;
}

export const ConnectiveStream: React.FC<ConnectiveStreamProps> = ({
  scrollProgress,
  reducedMotion = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lineLength, setLineLength] = useState(600);

  return (
    <div
      ref={containerRef}
      id="connective-stream-conduit"
      className="relative w-full h-32 sm:h-44 flex items-center justify-center overflow-hidden pointer-events-none select-none"
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-96 h-20 bg-gradient-to-r from-[#6B4A87]/20 via-[#B9A6D1]/30 to-[#E8A9C2]/20 blur-2xl rounded-full" />
      </div>

      {/* SVG Connecting Spline Conduit */}
      <svg
        viewBox="0 0 1000 200"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="streamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6B4A87" stopOpacity="0.3" />
            <stop offset="30%" stopColor="#B9A6D1" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#E8A9C2" stopOpacity="1" />
            <stop offset="100%" stopColor="#6B4A87" stopOpacity="0.4" />
          </linearGradient>

          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Base Background Track Line */}
        <path
          d="M 50,20 C 300,20 200,180 500,180 C 800,180 700,20 950,20"
          fill="none"
          stroke="#6B4A87"
          strokeWidth="1.5"
          strokeDasharray="4 6"
          opacity="0.35"
        />

        {/* Active Animated Energy Path */}
        <motion.path
          d="M 50,20 C 300,20 200,180 500,180 C 800,180 700,20 950,20"
          fill="none"
          stroke="url(#streamGrad)"
          strokeWidth="3"
          filter="url(#glow)"
          strokeDasharray="20 180"
          animate={{
            strokeDashoffset: reducedMotion ? 0 : [0, -400],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Pulsing Hand-Off Node at Center */}
        <circle cx="500" cy="180" r="4" fill="#E8A9C2" filter="url(#glow)">
          <animate
            attributeName="r"
            values="3;6;3"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>

      {/* Floating Modular Particle Cubes on Conduit */}
      {!reducedMotion && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            animate={{
              x: [-120, 120],
              y: [10, -10, 10],
              rotate: [0, 180],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-3 h-3 border border-[#E8A9C2] bg-[#E8A9C2]/30 transform rotate-45 shadow-[0_0_12px_#E8A9C2]"
          />
        </div>
      )}
    </div>
  );
};
