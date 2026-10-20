import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Layers, GraduationCap, Clock } from "lucide-react";
import { ScrollReveal } from "../ScrollReveal";
import { SiteSettings } from "../../types";

interface ProofStripProps {
  settings: SiteSettings;
}

const ITEMS = [
  {
    icon: GraduationCap,
    label: "Kiduart",
    detail: "School ERP in production",
    href: "/kiduart",
  },
  {
    icon: Layers,
    label: "Modular architecture",
    detail: "Five isolated system tiers",
    href: "/technology",
  },
  {
    icon: MapPin,
    label: "Noida, India",
    detail: "Headquarters & delivery base",
    href: "/about",
  },
  {
    icon: Clock,
    label: "1 business day",
    detail: "Typical reply commitment",
    href: "/contact",
  },
] as const;

/**
 * Real proof only  replaces empty testimonials conduit on home.
 */
export const ProofStrip: React.FC<ProofStripProps> = ({ settings }) => {
  return (
    <section
      id="home-proof-strip"
      className="relative py-10 sm:py-12 px-4 sm:px-6 lg:px-8"
      aria-label="Company proof points"
    >
      <ScrollReveal
        className="max-w-7xl mx-auto"
        reducedMotion={settings.reducedMotion}
      >
        <div className="rounded-2xl border border-[#B9A6D1]/35 bg-[#1E1024]/80 px-4 sm:px-6 py-5 sm:py-6">
          <div className="text-[10px] font-mono-accent uppercase tracking-[0.28em] text-[#E8A9C2] mb-4 text-center sm:text-left">
            What we stand on
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className="flex items-start gap-3 p-3 rounded-xl border border-[#6B4A87]/30 bg-[#2A1830]/60 hover:border-[#E8A9C2]/50 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#1E1024] border border-[#B9A6D1]/35 flex items-center justify-center text-[#E8A9C2] shrink-0">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-heading font-semibold text-[#F8F6FB] group-hover:text-[#E8A9C2] transition-colors">
                      {item.label}
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-[#B9A6D1] mt-0.5 leading-snug">
                      {item.detail}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};
