import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { 
  Server, 
  GraduationCap, 
  Smartphone, 
  Cloud, 
  RefreshCw, 
  Sparkles, 
  Database, 
  ShieldCheck, 
  ArrowUpRight, 
  CheckCircle2, 
  Layers 
} from 'lucide-react';
import { ServiceItem, SiteSettings } from '../types';

interface ServiceCardProps {
  service: ServiceItem;
  index: number;
  onSelect: (service: ServiceItem) => void;
  reducedMotion?: boolean;
}

// Icon mapping helper
const getServiceIcon = (iconName: string, color: string) => {
  const iconProps = { className: 'w-6 h-6', style: { color } };
  switch (iconName) {
    case 'Server':
      return <Server {...iconProps} />;
    case 'GraduationCap':
      return <GraduationCap {...iconProps} />;
    case 'Smartphone':
      return <Smartphone {...iconProps} />;
    case 'Cloud':
      return <Cloud {...iconProps} />;
    case 'RefreshCw':
      return <RefreshCw {...iconProps} />;
    case 'Sparkles':
      return <Sparkles {...iconProps} />;
    case 'Database':
      return <Database {...iconProps} />;
    case 'ShieldCheck':
      return <ShieldCheck {...iconProps} />;
    default:
      return <Layers {...iconProps} />;
  }
};

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  index,
  onSelect,
  reducedMotion = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [sheenPos, setSheenPos] = useState({ x: 50, y: 50 });

  // 3D Tilt Card calculation (wow #17)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10; // max 10 deg tilt
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotate({ x: rotateX, y: rotateY });
    setSheenPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  const isFlagship = service.category === 'product';

  return (
    <div
      ref={cardRef}
      id={`service-card-${service.id}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(service)}
      style={{
        perspective: 1000,
      }}
      className="relative flex-shrink-0 w-[300px] sm:w-[360px] lg:w-[380px] h-[480px] cursor-pointer group select-none py-2"
      data-cursor-label="INSPECT"
    >
      <motion.div
        animate={{
          rotateX: rotate.x,
          rotateY: rotate.y,
          y: isHovered ? -8 : 0,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 260,
          mass: 0.15,
        }}
        style={{
          transformStyle: 'preserve-3d',
        }}
        className={`relative w-full h-full rounded-2xl sm:rounded-3xl p-6 sm:p-7 flex flex-col justify-between overflow-hidden transition-all duration-300 ${
          isFlagship
            ? 'bg-gradient-to-b from-[#2A1830] via-[#1E1024] to-[#1E1024] border-2 border-[#E8A9C2]/70 shadow-[0_15px_40px_rgba(232,169,194,0.18)]'
            : 'bg-gradient-to-b from-[#2A1830]/90 to-[#1E1024]/95 border border-[#6B4A87]/40 shadow-[0_10px_30px_rgba(107,74,135,0.10)] hover:border-[#B9A6D1]/70'
        }`}
      >
        {/* Dynamic Specular Glass Sheen layer */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${sheenPos.x}% ${sheenPos.y}%, rgba(232, 169, 194, 0.15) 0%, transparent 60%)`,
          }}
        />

        {/* Ambient Top Glow */}
        <div
          className="absolute -top-16 -right-16 w-36 h-36 rounded-full blur-2xl opacity-30 pointer-events-none"
          style={{ backgroundColor: service.color }}
        />

        {/* Card Header: Category Badge + Number */}
        <div className="relative z-10 flex items-center justify-between" style={{ transform: 'translateZ(30px)' }}>
          <div className="flex items-center space-x-2">
            <span
              className="px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-mono-accent font-bold uppercase tracking-wider"
              style={{
                backgroundColor: `${service.color}25`,
                color: service.color === '#3D224E' ? '#E8A9C2' : service.color,
                border: `1px solid ${service.color}40`,
              }}
            >
              {service.badge || service.category}
            </span>
          </div>

          <span className="font-mono-accent text-xs sm:text-sm font-bold text-[#B9A6D1]/70">
            {service.number}
          </span>
        </div>

        {/* Card Body: Icon, Title & Tagline */}
        <div className="relative z-10 my-auto pt-4" style={{ transform: 'translateZ(40px)' }}>
          {/* Icon with illuminated box */}
          <div className="w-12 h-12 rounded-xl bg-[#1E1024] border border-[#6B4A87]/50 flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
            {getServiceIcon(service.iconName, service.color)}
          </div>

          <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#F8F6FB] tracking-tight line-clamp-2 leading-snug group-hover:text-[#E8A9C2] transition-colors">
            {service.title}
          </h3>

          <p className="text-xs sm:text-sm text-[#B9A6D1]/80 mt-2.5 line-clamp-2 leading-relaxed">
            {service.tagline}
          </p>

          {/* Hover Reveal: 1-line description expansion (wow #17) */}
          <motion.div
            animate={{
              opacity: isHovered ? 1 : 0.75,
              height: 'auto',
            }}
            className="mt-3 pt-3 border-t border-[#6B4A87]/30 text-xs text-[#B9A6D1] line-clamp-2"
          >
            {service.description}
          </motion.div>
        </div>

        {/* Card Footer: Tech Stack Chips & Metric */}
        <div className="relative z-10 pt-4 border-t border-[#6B4A87]/30 flex flex-col space-y-3" style={{ transform: 'translateZ(25px)' }}>
          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 overflow-hidden max-h-12">
            {service.tech.slice(0, 3).map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded bg-[#1E1024] border border-[#6B4A87]/40 text-[10px] font-mono-accent text-[#B9A6D1]"
              >
                {t}
              </span>
            ))}
            {service.tech.length > 3 && (
              <span className="px-1.5 py-0.5 rounded bg-[#1E1024] text-[10px] font-mono-accent text-[#B9A6D1]/70">
                +{service.tech.length - 3}
              </span>
            )}
          </div>

          {/* Action indicator & Metric */}
          <div className="flex items-center justify-between pt-1">
            <div className="text-[11px] font-mono-accent text-[#B9A6D1]">
              <span>{service.metrics.label}: </span>
              <span className="font-bold text-[#F8F6FB]">{service.metrics.value}</span>
            </div>

            <div className="w-7 h-7 rounded-full bg-[#1E1024] border border-[#6B4A87]/40 flex items-center justify-center text-[#E8A9C2] group-hover:bg-[#E8A9C2] group-hover:text-[#FFFFFF] transition-colors">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
