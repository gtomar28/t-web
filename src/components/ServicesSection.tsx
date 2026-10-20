import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Layers, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  ArrowRight, 
  SlidersHorizontal, 
  Compass, 
  GraduationCap 
} from 'lucide-react';
import { ServiceItem, SiteSettings } from '../types';
import { SERVICES_DATA } from '../data/services';
import { ServiceCard } from './ServiceCard';
import { ServiceDetailModal } from './ServiceDetailModal';
import { MagneticButton } from './MagneticButton';

interface ServicesSectionProps {
  settings: SiteSettings;
  scrollProgress: number;
  onOpenArchitecture: () => void;
}

type FilterCategory = 'all' | 'core' | 'product' | 'cloud' | 'data' | 'security';

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  settings,
  scrollProgress,
  onOpenArchitecture,
}) => {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredServices = SERVICES_DATA.filter((s) => {
    if (activeCategory === 'all') return true;
    return s.category === activeCategory;
  });

  const categories: { id: FilterCategory; label: string }[] = [
    { id: 'all', label: 'All 8 Services' },
    { id: 'product', label: 'Flagship ERP' },
    { id: 'core', label: 'Core Engineering' },
    { id: 'cloud', label: 'Cloud & DevOps' },
    { id: 'data', label: 'Data & Analytics' },
    { id: 'security', label: 'Cybersecurity' },
  ];

  // Scroll controls for horizontal strip (wow #15)
  const checkScroll = () => {
    if (trackRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
      setCanScrollLeft(scrollLeft > 20);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);
      
      const cardWidth = 380;
      const index = Math.round(scrollLeft / cardWidth);
      setCurrentIndex(Math.min(index, filteredServices.length - 1));
    }
  };

  useEffect(() => {
    const track = trackRef.current;
    if (track) {
      track.addEventListener('scroll', checkScroll, { passive: true });
      checkScroll();
      return () => track.removeEventListener('scroll', checkScroll);
    }
  }, [filteredServices.length]);

  const scrollByAmount = (direction: 'left' | 'right') => {
    if (trackRef.current) {
      const cardWidth = 380;
      const amount = direction === 'left' ? -cardWidth : cardWidth;
      trackRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="services"
      className="relative w-full py-24 sm:py-32 bg-[#1E1024] text-[#F8F6FB] overflow-hidden"
    >
      {/* Background ambient lighting and subtle grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft radial glow centers */}
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#6B4A87]/25 via-[#2A1830]/40 to-transparent blur-3xl" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-[#E8A9C2]/15 via-[#6B4A87]/20 to-transparent blur-3xl" />
        
        {/* Subtle noise grain */}
        <div className="absolute inset-0 bg-noise opacity-30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 sm:pb-12 border-b border-[#6B4A87]/30">
          <div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#2A1830] border border-[#6B4A87]/40 text-[#6B4A87] font-mono-accent text-xs mb-4">
              <span className="w-2 h-2 rounded-full bg-[#E8A9C2] animate-pulse" />
              <span>SERVICES & FLAGSHIP PRODUCTS</span>
            </div>

            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-[#F8F6FB] tracking-tight">
              Eight Specialized Vectors of{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#241428] via-[#B9A6D1] to-[#E8A9C2]">
                Software Excellence
              </span>
            </h2>
          </div>

          {/* Right Navigation & Horizontal Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Slide Index Indicator */}
            <div className="font-mono-accent text-xs text-[#B9A6D1] bg-[#2A1830]/80 px-3.5 py-2 rounded-xl border border-[#6B4A87]/40 flex items-center space-x-2">
              <span>ACTIVE CARD:</span>
              <span className="text-[#E8A9C2] font-bold">
                0{currentIndex + 1} / 0{filteredServices.length}
              </span>
            </div>

            {/* Prev / Next Track Buttons */}
            <div className="flex items-center space-x-2">
              <button
                id="services-prev-btn"
                onClick={() => scrollByAmount('left')}
                disabled={!canScrollLeft}
                aria-label="Scroll left"
                className={`p-3 rounded-xl border transition-all ${
                  canScrollLeft
                    ? 'bg-[#2A1830] border-[#6B4A87]/60 text-[#F8F6FB] hover:border-[#E8A9C2] hover:bg-[#6B4A87]/30'
                    : 'bg-[#1E1024] border-[#6B4A87]/20 text-[#B9A6D1]/30 cursor-not-allowed'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                id="services-next-btn"
                onClick={() => scrollByAmount('right')}
                disabled={!canScrollRight}
                aria-label="Scroll right"
                className={`p-3 rounded-xl border transition-all ${
                  canScrollRight
                    ? 'bg-[#2A1830] border-[#6B4A87]/60 text-[#F8F6FB] hover:border-[#E8A9C2] hover:bg-[#6B4A87]/30'
                    : 'bg-[#1E1024] border-[#6B4A87]/20 text-[#B9A6D1]/30 cursor-not-allowed'
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Filtering Strip */}
        <div className="flex items-center gap-2 overflow-x-auto py-6 scrollbar-none no-scrollbar">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-heading font-medium transition-all whitespace-nowrap interactive-target ${
                  isActive
                    ? 'bg-gradient-to-r from-[#6B4A87] to-[#B9A6D1] text-[#F8F6FB] shadow-[0_4px_16px_rgba(107,74,135,0.4)]'
                    : 'bg-[#2A1830]/70 text-[#B9A6D1] border border-[#6B4A87]/30 hover:border-[#B9A6D1]/60 hover:text-[#F8F6FB]'
                }`}
                data-cursor-label={cat.label.toUpperCase()}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Horizontal Scroll Strip Container (wow #15 & wow #17) */}
        <div
          ref={trackRef}
          id="services-horizontal-track"
          className="flex space-x-6 overflow-x-auto py-6 px-1 scroll-smooth snap-x snap-mandatory focus:outline-none no-scrollbar"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {filteredServices.map((service, index) => (
            <div key={service.id} className="snap-start">
              <ServiceCard
                service={service}
                index={index}
                onSelect={(s) => setSelectedService(s)}
                reducedMotion={settings.reducedMotion}
              />
            </div>
          ))}
        </div>

        {/* Horizontal Navigation Hint & Pagination Dots */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#6B4A87]/30">
          <div className="flex items-center space-x-2 text-xs font-mono-accent text-[#B9A6D1]">
            <Compass className="w-4 h-4 text-[#E8A9C2]" />
            <span>DRAG OR USE ARROWS TO BROWSE SERVICES • CLICK ANY CARD TO INSPECT SPECS</span>
          </div>

          {/* Dots */}
          <div className="flex items-center space-x-2">
            {filteredServices.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => {
                  if (trackRef.current) {
                    trackRef.current.scrollTo({
                      left: idx * 380,
                      behavior: 'smooth',
                    });
                  }
                }}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentIndex
                    ? 'w-8 bg-[#E8A9C2]'
                    : 'w-2 bg-[#6B4A87]/50 hover:bg-[#B9A6D1]'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

      </div>

      {/* Service Detail Deep Dive Drawer/Modal */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onOpenArchitecture={onOpenArchitecture}
      />
    </section>
  );
};
