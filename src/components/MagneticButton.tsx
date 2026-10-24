import React, { useRef } from "react";

interface MagneticButtonProps {
  id?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "ghost" | "custom";
  cursorLabel?: string;
  reducedMotion?: boolean;
  magneticStrength?: number;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  id,
  type = "button",
  disabled = false,
  children,
  onClick,
  className = "",
  variant = "primary",
  cursorLabel,
  reducedMotion = false,
  magneticStrength = 0.32,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (reducedMotion || !buttonRef.current || disabled) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const x = distanceX * magneticStrength;
    const y = distanceY * magneticStrength;

    buttonRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    if (innerRef.current) {
      innerRef.current.style.transform = `translate3d(${x * 0.4}px, ${y * 0.4}px, 0)`;
    }
  };

  const handleMouseLeave = () => {
    if (buttonRef.current) {
      buttonRef.current.style.transform = "translate3d(0, 0, 0)";
    }
    if (innerRef.current) {
      innerRef.current.style.transform = "translate3d(0, 0, 0)";
    }
  };

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-[#6B4A87] via-[#8558A5] to-[#B9A6D1] text-white border border-[#6B4A87]/40 shadow-[0_0_35px_rgba(232,169,194,0.35)] hover:shadow-[0_0_42px_rgba(232,169,194,0.45)]",
    secondary:
      "bg-[#1E1024] text-[#F8F6FB] border border-[#6B4A87]/30 hover:border-[#6B4A87]/60 shadow-[0_4px_20px_rgba(107,74,135,0.08)]",
    ghost:
      "bg-transparent text-[#B9A6D1] hover:text-[#F8F6FB] border border-transparent hover:border-[#6B4A87]/30",
    custom: "",
  };

  return (
    <button
      ref={buttonRef}
      id={id}
      type={type}
      disabled={disabled}
      data-cursor-label={cursorLabel}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative inline-flex items-center justify-center rounded-full font-heading font-medium tracking-wide text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-3.5 transition-[colors,transform] active:scale-[0.96] overflow-hidden will-change-transform ${variantStyles[variant]} ${className}`}
    >
      {variant === "primary" && (
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
      )}

      <span
        ref={innerRef}
        className="relative z-10 flex items-center space-x-2 will-change-transform"
      >
        {children}
      </span>
    </button>
  );
};
