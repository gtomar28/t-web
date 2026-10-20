import React from "react";

interface BrandGradientBarProps {
  /** Height in pixels (default 4px) */
  height?: number | string;
  /** Whether this is the pinned top viewport bar */
  pinnedTop?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Optional subtle shimmer effect */
  shimmer?: boolean;
}

/**
 * Trevyk Brand Gradient Furniture Device
 * Sweeps left to right: Deep Plum (#2A1830) → Royal Purple (#6B4A87) → Dusty Rose (#C89B6C / #A87088) → Blush Pink (#E8A9C2)
 */
export const BrandGradientBar: React.FC<BrandGradientBarProps> = ({
  height = 5,
  pinnedTop = true,
  className = "",
  shimmer = true,
}) => {
  const barStyle: React.CSSProperties = {
    height: typeof height === "number" ? `${height}px` : height,
    background:
      "linear-gradient(90deg, #2A1830 0%, #6B4A87 18%, #6B4A87 45%, #9E6B8E 68%, #C89B6C 82%, #E8A9C2 100%)",
  };

  if (pinnedTop) {
    return (
      <div
        id="trevyk-persistent-gradient-topbar"
        className={`fixed top-0 left-0 right-0 z-50 pointer-events-none shadow-[0_1px_12px_rgba(232,169,194,0.35)] ${className}`}
        style={barStyle}
        aria-hidden="true"
      >
        {shimmer && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-[shimmer_4s_infinite_linear] opacity-60 pointer-events-none" />
        )}
      </div>
    );
  }

  return (
    <div
      className={`w-full relative overflow-hidden rounded-full shadow-[0_1px_8px_rgba(107,74,135,0.25)] ${className}`}
      style={barStyle}
      aria-hidden="true"
    >
      {shimmer && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_4s_infinite_linear] opacity-40 pointer-events-none" />
      )}
    </div>
  );
};

/**
 * Reusable Divider Strip echoing the brand gradient  acts as a section bridge
 */
export const BrandGradientDivider: React.FC<{
  className?: string;
  label?: string;
  reducedMotion?: boolean;
  /** Tighter vertical padding for dense pages */
  compact?: boolean;
}> = ({ className = "", label, reducedMotion = false, compact = false }) => {
  return (
    <div
      className={`relative flex items-center justify-center ${
        compact ? "py-4 sm:py-5" : "py-10 sm:py-12"
      } ${className}`}
    >
      {/* Soft vertical pulse  ties sections into one scroll narrative */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 opacity-50"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, #6B4A87 30%, #E8A9C2 55%, #E7E1F0 70%, transparent 100%)",
        }}
        aria-hidden
      />
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3 sm:gap-5">
        <div
          className="h-px flex-1 rounded-full relative overflow-hidden"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, #6B4A87 35%, #B9A6D1 70%, #E8A9C2 100%)",
          }}
        >
          {!reducedMotion && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F8F6FB]/35 to-transparent animate-[shimmer_3.5s_infinite_linear] opacity-70" />
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="w-1 h-1 rounded-full bg-[#B9A6D1]/60" aria-hidden />
          <span
            className={`w-2.5 h-2.5 rounded-full bg-[#E8A9C2] shadow-[0_0_16px_rgba(232,169,194,0.85)] ${
              reducedMotion ? "" : "animate-pulse-soft"
            }`}
            aria-hidden
          />
          <span className="w-1 h-1 rounded-full bg-[#E7E1F0]/50" aria-hidden />
        </div>
        {label ? (
          <span className="font-mono-accent text-[10px] tracking-[0.28em] uppercase text-[#E8A9C2]/80 shrink-0">
            {label}
          </span>
        ) : null}
        <div
          className="h-px flex-1 rounded-full relative overflow-hidden"
          style={{
            background:
              "linear-gradient(90deg, #E8A9C2 0%, #B9A6D1 30%, #6B4A87 65%, transparent 100%)",
          }}
        >
          {!reducedMotion && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#E8A9C2]/40 to-transparent animate-[shimmer_4s_infinite_linear] opacity-60" />
          )}
        </div>
      </div>
    </div>
  );
};
