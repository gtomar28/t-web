import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';

interface MagneticButtonProps {
  id?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'custom';
  cursorLabel?: string;
  reducedMotion?: boolean;
  magneticStrength?: number;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  id,
  type = 'button',
  disabled = false,
  children,
  onClick,
  className = '',
  variant = 'primary',
  cursorLabel,
  reducedMotion = false,
  magneticStrength = 0.32,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (reducedMotion || !buttonRef.current || disabled) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Magnetic pull strength
    const strength = magneticStrength;
    setPosition({
      x: distanceX * strength,
      y: distanceY * strength,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseEnter = () => {
    if (!disabled) setIsHovered(true);
  };

  // Base styling per variant
  const variantStyles = {
    primary:
      'bg-gradient-to-r from-[#6B4A87] via-[#8558A5] to-[#B9A6D1] text-white border border-[#6B4A87]/40 shadow-[0_0_35px_rgba(232,169,194,0.35)] hover:shadow-[0_0_42px_rgba(232,169,194,0.45)]',
    secondary:
      'bg-[#1E1024] text-[#F8F6FB] border border-[#6B4A87]/30 hover:border-[#6B4A87]/60 shadow-[0_4px_20px_rgba(107,74,135,0.08)]',
    ghost:
      'bg-transparent text-[#B9A6D1] hover:text-[#F8F6FB] border border-transparent hover:border-[#6B4A87]/30',
    custom: '',
  };

  return (
    <motion.button
      ref={buttonRef}
      id={id}
      type={type}
      disabled={disabled}
      data-cursor-label={cursorLabel}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: 'spring',
        damping: 18,
        stiffness: 240,
        mass: 0.15,
      }}
      whileTap={{ scale: disabled ? 1 : 0.96 }}
      className={`group relative inline-flex items-center justify-center rounded-full font-heading font-medium tracking-wide text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-3.5 transition-colors overflow-hidden ${variantStyles[variant]} ${className}`}
    >
      {/* Dynamic specular light reflection inside button */}
      {variant === 'primary' && (
        <span
          className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
        />
      )}

      {/* Button content with gentle offset */}
      <motion.span
        animate={{
          x: position.x * 0.4,
          y: position.y * 0.4,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 260 }}
        className="relative z-10 flex items-center space-x-2"
      >
        {children}
      </motion.span>
    </motion.button>
  );
};
