import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Cpu, 
  Server, 
  Layers, 
  Zap, 
  ExternalLink,
  Code2,
  Workflow,
  Sparkles
} from 'lucide-react';
import { ServiceItem } from '../types';
import { MagneticButton } from './MagneticButton';
import { soundEngine } from '../utils/audioEngine';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onOpenArchitecture: () => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onOpenArchitecture,
}) => {
  if (!service) return null;

  return (
    <AnimatePresence>
      <div
        id="service-detail-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#1E1024]/85 backdrop-blur-xl"
        onClick={onClose}
      >
        <motion.div
          id="service-detail-card"
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#1E1024] border border-[#6B4A87]/50 rounded-2xl sm:rounded-3xl shadow-[0_25px_60px_rgba(107,74,135,0.18)] flex flex-col relative"
        >
          {/* Header */}
          <div className="flex items-start justify-between p-6 sm:p-8 border-b border-[#6B4A87]/20 bg-[#1E1024]/70">
            <div className="flex items-start space-x-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border"
                style={{
                  backgroundColor: `${service.color}20`,
                  borderColor: `${service.color}60`,
                  color: service.color === '#3D224E' ? '#E8A9C2' : service.color,
                }}
              >
                <Layers className="w-6 h-6" />
              </div>

              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-mono-accent text-xs uppercase tracking-widest text-[#E8A9C2] font-bold">
                    SERVICE {service.number} • {service.badge}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#F8F6FB] mt-1">
                  {service.title}
                </h3>
              </div>
            </div>

            <button
              onClick={() => {
                soundEngine.playClick('soft');
                onClose();
              }}
              className="p-2 rounded-full text-[#B9A6D1] hover:text-[#F8F6FB] hover:bg-[#2A1830] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Tagline Box */}
            <div className="p-4 rounded-xl bg-[#2A1830]/60 border border-[#6B4A87]/30 text-sm sm:text-base text-[#B9A6D1] font-medium leading-relaxed">
              "{service.tagline}"
            </div>

            {/* Description */}
            <div>
              <h4 className="font-mono-accent text-xs uppercase tracking-wider text-[#B9A6D1] mb-2">
                Scope of Work & Architectural Strategy
              </h4>
              <p className="text-sm sm:text-base text-[#B9A6D1]/90 leading-relaxed">
                {service.description}
              </p>
            </div>

            {/* What It Includes */}
            {service.includes && service.includes.length > 0 && (
              <div>
                <h4 className="font-mono-accent text-xs uppercase tracking-wider text-[#E8A9C2] mb-2.5 font-semibold">
                  What It Includes
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-[#B9A6D1]/90">
                  {service.includes.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#E8A9C2] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Ideal Client & Problem Fit */}
            {service.fitsFor && (
              <div className="p-4 rounded-xl bg-[#1E1024] border border-[#6B4A87]/40">
                <span className="text-[11px] font-mono-accent text-[#B9A6D1] uppercase tracking-wider block mb-1">
                  Ideal Client & Problem Fit
                </span>
                <p className="text-xs sm:text-sm text-[#B9A6D1] leading-relaxed">
                  {service.fitsFor}
                </p>
              </div>
            )}

            {/* Core Deliverables */}
            {service.deliverables && service.deliverables.length > 0 && (
              <div>
                <h4 className="font-mono-accent text-xs uppercase tracking-wider text-[#B9A6D1] mb-2">
                  Verified Deliverables
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono-accent text-[#F8F6FB]">
                  {service.deliverables.map((item, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-[#2A1830] border border-[#6B4A87]/30 flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E8A9C2]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack Grid */}
            <div>
              <h4 className="font-mono-accent text-xs uppercase tracking-wider text-[#B9A6D1] mb-3">
                Core Technology Stack & Protocols
              </h4>
              <div className="flex flex-wrap gap-2">
                {service.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono-accent bg-[#2A1830] border border-[#6B4A87]/40 text-[#F8F6FB] flex items-center space-x-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#E8A9C2]" />
                    <span>{t}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Performance Metric SLA Card */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-[#2A1830]/40 border border-[#6B4A87]/30">
              <div>
                <span className="text-[11px] font-mono-accent uppercase tracking-wider text-[#B9A6D1]">
                  Target Metric
                </span>
                <div className="font-mono-accent font-bold text-base sm:text-lg text-[#F8F6FB] mt-0.5">
                  {service.metrics.label}
                </div>
              </div>

              <div>
                <span className="text-[11px] font-mono-accent uppercase tracking-wider text-[#B9A6D1]">
                  Typical signal
                </span>
                <div className="font-mono-accent font-bold text-base sm:text-lg text-[#E8A9C2] mt-0.5">
                  {service.metrics.value}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-[#6B4A87]/20 flex flex-wrap items-center justify-between gap-4">
              <button
                onClick={() => {
                  soundEngine.playClick('soft');
                  onClose();
                  onOpenArchitecture();
                }}
                className="text-xs font-mono-accent text-[#B9A6D1] hover:text-[#E8A9C2] flex items-center space-x-1.5 transition-colors"
              >
                <Workflow className="w-4 h-4 text-[#E8A9C2]" />
                <span>Inspect in 3D Architecture Blueprint</span>
              </button>

              <MagneticButton
                variant="primary"
                onClick={() => {
                  soundEngine.playClick('soft');
                  onClose();
                }}
                className="!py-2 !px-6 !text-xs"
              >
                <span>Close Details</span>
              </MagneticButton>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
