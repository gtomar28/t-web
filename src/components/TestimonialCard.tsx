import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Quote, Star, CheckCircle2, School, Building2, TrendingUp } from 'lucide-react';

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  organization: string;
  type: 'school' | 'enterprise' | 'network';
  quote: string;
  highlightMetric: {
    value: string;
    label: string;
  };
  verifiedStatus: string;
  rating: number;
  initials: string;
  accentColor: string;
}

interface TestimonialCardProps {
  testimonial: TestimonialItem;
  reducedMotion?: boolean;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  testimonial,
  reducedMotion = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotX = ((y / rect.height) - 0.5) * -14;
    const rotY = ((x / rect.width) - 0.5) * 14;

    setRotate({ x: rotX, y: rotY });
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseEnter = () => {
    if (!reducedMotion) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  const IconOrg = testimonial.type === 'school' ? School : Building2;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full min-h-[380px] sm:min-h-[400px] select-none"
      style={{ perspective: 1200 }}
    >
      <motion.div
        animate={{
          rotateX: rotate.x,
          rotateY: rotate.y,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 24,
          stiffness: 240,
          mass: 0.15,
        }}
        style={{ transformStyle: 'preserve-3d' }}
        className="w-full h-full p-6 sm:p-8 rounded-3xl bg-[#1E1024] border border-[#6B4A87]/50 shadow-[0_20px_50px_rgba(107,74,135,0.14)] flex flex-col justify-between relative overflow-hidden group interactive-target"
        data-cursor-label="FEEDBACK"
      >
        {/* Dynamic Specular Glare Reflection on Hover */}
        {isHovered && !reducedMotion && (
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-25"
            style={{
              background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(232, 169, 194, 0.4), transparent 60%)`,
            }}
          />
        )}

        {/* Ambient Top Subtle Glow */}
        <div
          className="absolute -top-16 -right-16 w-36 h-36 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: testimonial.accentColor }}
        />

        {/* Top Meta: Verified Badge, Org Type, Rating */}
        <div>
          <div className="flex items-center justify-between gap-2 mb-5">
            <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#2A1830] border border-[#6B4A87]/40 text-xs font-mono-accent text-[#B9A6D1]">
              <IconOrg className="w-3.5 h-3.5 text-[#E8A9C2]" />
              <span className="truncate max-w-[170px]">{testimonial.organization}</span>
            </div>

            <div className="flex items-center space-x-0.5 text-amber-400">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
          </div>

          {/* Impact Metric Highlight Ribbon */}
          <div className="mb-5 p-3 rounded-xl bg-[#2A1830]/70 border border-[#6B4A87]/30 flex items-center justify-between text-xs font-mono-accent">
            <span className="text-[#B9A6D1]">{testimonial.highlightMetric.label}:</span>
            <div className="flex items-center text-[#E8A9C2] font-bold font-mono-accent">
              <TrendingUp className="w-3 h-3 mr-1 text-emerald-400" />
              {testimonial.highlightMetric.value}
            </div>
          </div>

          {/* Quote Text */}
          <div className="relative">
            <Quote className="w-6 h-6 text-[#6B4A87]/50 mb-2 rotate-180" />
            <p className="text-sm sm:text-base text-[#F8F6FB]/90 leading-relaxed font-sans italic">
              "{testimonial.quote}"
            </p>
          </div>
        </div>

        {/* Bottom Profile: Initials Monogram, Name, Role, Verified Tick */}
        <div className="mt-6 pt-5 border-t border-[#6B4A87]/30 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center font-mono-accent font-bold text-sm shrink-0 border"
              style={{
                backgroundColor: `${testimonial.accentColor}25`,
                borderColor: `${testimonial.accentColor}50`,
                color: testimonial.accentColor,
              }}
            >
              {testimonial.initials}
            </div>

            <div>
              <div className="font-heading font-bold text-sm sm:text-base text-[#F8F6FB] flex items-center space-x-1.5">
                <span>{testimonial.name}</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              </div>
              <div className="text-xs text-[#B9A6D1] font-sans truncate max-w-[200px]">
                {testimonial.role}
              </div>
            </div>
          </div>

          <span className="text-[10px] font-mono-accent text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 hidden sm:inline-block">
            {testimonial.verifiedStatus}
          </span>
        </div>
      </motion.div>
    </div>
  );
};
