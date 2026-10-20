import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Layers, 
  Cpu, 
  GraduationCap, 
  GitMerge, 
  ShieldCheck, 
  MessageSquareQuote, 
  Calendar,
  ChevronUp,
  LucideIcon
} from 'lucide-react';

interface ScrollProgressNavProps {
  scrollProgress: number;
  reducedMotion?: boolean;
}

interface SectionAnchor {
  id: string;
  label: string;
  shortLabel: string;
  icon: LucideIcon;
}

export const ScrollProgressNav: React.FC<ScrollProgressNavProps> = ({
  scrollProgress,
  reducedMotion = false,
}) => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  const sections: SectionAnchor[] = [
    { id: 'hero', label: 'Origin & 3D Core', shortLabel: 'Hero', icon: Home },
    { id: 'about', label: 'Modular Architecture', shortLabel: 'Architecture', icon: Layers },
    { id: 'services', label: 'IT & Cloud Services', shortLabel: 'Services', icon: Cpu },
    { id: 'school-erp', label: 'Kiduart School ERP', shortLabel: 'Kiduart', icon: GraduationCap },
    { id: 'process', label: '5-Phase Process', shortLabel: 'Process', icon: GitMerge },
    { id: 'trust', label: 'Proof & Scale Metrics', shortLabel: 'Trust', icon: ShieldCheck },
    { id: 'testimonials', label: 'Client Feedback', shortLabel: 'Feedback', icon: MessageSquareQuote },
    { id: 'contact', label: 'Book Demo / Contact', shortLabel: 'Contact', icon: Calendar },
  ];

  useEffect(() => {
    const handleScrollObserver = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.35;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(sections[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollObserver, { passive: true });
    handleScrollObserver();

    return () => window.removeEventListener('scroll', handleScrollObserver);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const percent = Math.round(scrollProgress * 100);
  const strokeDashoffset = 100 - percent;

  return (
    <div
      id="scroll-progress-nav"
      className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center select-none"
    >
      {/* Background Pill Rail */}
      <div className="p-2.5 rounded-full bg-[#1E1024]/85 border border-[#6B4A87]/40 shadow-[0_10px_35px_rgba(107,74,135,0.12)] backdrop-blur-md flex flex-col items-center space-y-3 relative">
        
        {/* Top Circular Progress Tracker Ring (wow #27) */}
        <div 
          className="relative w-8 h-8 flex items-center justify-center cursor-pointer group"
          onClick={() => scrollToSection('hero')}
          title="Scroll to Top"
        >
          <svg className="w-8 h-8 -rotate-90" viewBox="0 0 36 36">
            {/* Track */}
            <circle
              cx="18"
              cy="18"
              r="14"
              fill="none"
              stroke="#6B4A87"
              strokeWidth="2.5"
              opacity="0.3"
            />
            {/* Progress Bar */}
            <circle
              cx="18"
              cy="18"
              r="14"
              fill="none"
              stroke="#E8A9C2"
              strokeWidth="2.5"
              strokeDasharray="88"
              strokeDashoffset={88 - (88 * percent) / 100}
              strokeLinecap="round"
              className="transition-all duration-150"
            />
          </svg>

          {/* Percentage Text or Top Arrow on Hover */}
          <span className="absolute text-[9px] font-mono-accent text-[#F8F6FB] font-bold group-hover:hidden">
            {percent}%
          </span>
          <ChevronUp className="w-3.5 h-3.5 text-[#E8A9C2] absolute hidden group-hover:block transition-all" />
        </div>

        {/* Divider */}
        <div className="w-4 h-[1px] bg-[#6B4A87]/30" />

        {/* Section Dots List (wow #25) */}
        <div className="flex flex-col items-center space-y-3">
          {sections.map((sec) => {
            const isActive = activeSection === sec.id;
            const isHovered = hoveredSection === sec.id;
            const IconComp = sec.icon;

            return (
              <div
                key={sec.id}
                className="relative flex items-center justify-center"
                onMouseEnter={() => setHoveredSection(sec.id)}
                onMouseLeave={() => setHoveredSection(null)}
              >
                <button
                  onClick={() => scrollToSection(sec.id)}
                  aria-label={`Scroll to ${sec.label}`}
                  className={`w-3 h-3 rounded-full transition-all duration-300 flex items-center justify-center ${
                    isActive
                      ? 'scale-125 bg-[#E8A9C2] shadow-[0_0_12px_rgba(232,169,194,0.8)]'
                      : 'bg-[#6B4A87]/60 hover:bg-[#B9A6D1] hover:scale-110'
                  }`}
                />

                {/* Floating Tooltip Pill to the Left */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, x: 10, scale: 0.92 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 8, scale: 0.92 }}
                      transition={{ duration: 0.15, ease: 'easeOut' }}
                      className="absolute right-9 px-3 py-1.5 rounded-xl bg-[#1E1024]/95 border border-[#E8A9C2]/40 text-[#F8F6FB] shadow-[0_8px_25px_rgba(107,74,135,0.16)] backdrop-blur-md flex items-center space-x-2 whitespace-nowrap pointer-events-none"
                    >
                      <IconComp className="w-3.5 h-3.5 text-[#E8A9C2]" />
                      <span className="text-xs font-mono-accent font-medium">
                        {sec.label}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
