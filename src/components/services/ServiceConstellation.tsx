import React, { useMemo, useState } from "react";
import { motion } from "motion/react";
import { SERVICES_DATA } from "../../data/services";
import { soundEngine } from "../../utils/audioEngine";

export interface ConstellationCategory {
  id: string;
  label: string;
  short: string;
}

interface ServiceConstellationProps {
  categories: ConstellationCategory[];
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
  reducedMotion?: boolean;
  className?: string;
}

/**
 * Interactive catalogue constellation  click a node to filter services.
 * Fills the empty right rail beside the offerings grid.
 */
export const ServiceConstellation: React.FC<ServiceConstellationProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  reducedMotion = false,
  className = "",
}) => {
  const [hovered, setHovered] = useState<string | null>(null);

  const nodes = useMemo(() => {
    const ring = categories.filter((c) => c.id !== "all");
    return ring.map((cat, i) => {
      const angle = (i / ring.length) * Math.PI * 2 - Math.PI / 2;
      const radius = 78;
      return {
        ...cat,
        count: SERVICES_DATA.filter((s) => s.category === cat.id).length,
        x: 50 + Math.cos(angle) * (radius / 1.6),
        y: 50 + Math.sin(angle) * (radius / 1.6),
      };
    });
  }, [categories]);

  const activeId = hovered || selectedCategory;
  const activeNode =
    nodes.find((n) => n.id === activeId) ||
    (selectedCategory === "all"
      ? null
      : nodes.find((n) => n.id === selectedCategory));

  return (
    <div className={`relative select-none ${className}`}>
      <div className="text-[10px] font-mono-accent uppercase tracking-[0.22em] text-[#E8A9C2] mb-3 text-center lg:text-right">
        Catalogue constellation
      </div>

      <div
        className="relative mx-auto lg:ml-auto lg:mr-0 w-[220px] h-[220px]"
        onMouseLeave={() => setHovered(null)}
      >
        {/* Rings */}
        <motion.div
          className="absolute inset-4 rounded-full border border-[#B9A6D1]/30"
          animate={reducedMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-10 rounded-full border border-dashed border-[#E8A9C2]/35"
          animate={reducedMotion ? undefined : { rotate: -360 }}
          transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
        />

        {/* Connector lines from center */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          aria-hidden
        >
          <defs>
            <linearGradient id="constellLine" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6B4A87" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#E8A9C2" stopOpacity="0.7" />
            </linearGradient>
          </defs>
          {nodes.map((n) => (
            <line
              key={`line-${n.id}`}
              x1="50"
              y1="50"
              x2={n.x}
              y2={n.y}
              stroke="url(#constellLine)"
              strokeWidth={
                selectedCategory === n.id || hovered === n.id ? 0.9 : 0.4
              }
              opacity={
                selectedCategory === "all" ||
                selectedCategory === n.id ||
                hovered === n.id
                  ? 1
                  : 0.35
              }
            />
          ))}
        </svg>

        {/* Center = All */}
        <button
          type="button"
          aria-pressed={selectedCategory === "all"}
          aria-label="Show all services"
          onClick={() => {
            soundEngine.playClick("soft");
            onSelectCategory("all");
          }}
          onMouseEnter={() => setHovered("all")}
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-14 h-14 rounded-2xl border flex flex-col items-center justify-center transition-all ${
            selectedCategory === "all"
              ? "bg-gradient-to-br from-[#6B4A87] to-[#E8A9C2] border-[#F8F6FB]/40 shadow-[0_0_24px_rgba(232,169,194,0.45)] scale-105"
              : "bg-[#1E1024]/95 border-[#B9A6D1]/40 hover:border-[#E8A9C2]"
          }`}
        >
          <span
            className={`font-heading font-bold text-sm ${
              selectedCategory === "all" ? "text-[#F8F6FB]" : "text-[#F8F6FB]"
            }`}
          >
            {SERVICES_DATA.length}
          </span>
          <span
            className={`text-[8px] font-mono-accent uppercase tracking-wider ${
              selectedCategory === "all"
                ? "text-[#F8F6FB]/90"
                : "text-[#B9A6D1]"
            }`}
          >
            All
          </span>
        </button>

        {/* Category nodes */}
        {nodes.map((n) => {
          const isActive = selectedCategory === n.id;
          const isHot = hovered === n.id || isActive;
          return (
            <button
              key={n.id}
              type="button"
              aria-pressed={isActive}
              aria-label={`Filter ${n.label}`}
              title={`${n.label} (${n.count})`}
              onClick={() => {
                soundEngine.playClick("soft");
                onSelectCategory(n.id);
              }}
              onMouseEnter={() => {
                setHovered(n.id);
                soundEngine.playHover();
              }}
              className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all flex items-center justify-center ${
                isHot
                  ? "w-11 h-11 bg-[#2A1830] border-[#E8A9C2] shadow-[0_0_16px_rgba(232,169,194,0.4)] scale-110"
                  : "w-9 h-9 bg-[#1E1024]/95 border-[#B9A6D1]/40 hover:border-[#E8A9C2]/70"
              }`}
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
            >
              <span
                className={`text-[9px] font-mono-accent font-semibold ${
                  isHot ? "text-[#E8A9C2]" : "text-[#E7E1F0]"
                }`}
              >
                {n.short}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-4 text-center lg:text-right min-h-[3.25rem]">
        <div className="text-xs font-heading font-semibold text-[#F8F6FB]">
          {selectedCategory === "all"
            ? "Full catalogue"
            : activeNode?.label || "Selected lane"}
        </div>
        <div className="text-[11px] font-mono-accent text-[#B9A6D1] mt-0.5">
          {selectedCategory === "all"
            ? `${SERVICES_DATA.length} offerings · click a node to focus`
            : `${activeNode?.count ?? 0} offering${
                (activeNode?.count ?? 0) === 1 ? "" : "s"
              } in this lane`}
        </div>
      </div>
    </div>
  );
};
