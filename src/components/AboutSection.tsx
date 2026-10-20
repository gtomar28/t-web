import React, { useState } from "react";
import { motion } from "motion/react";
import {
  ShieldCheck,
  Layers,
  Cpu,
  CheckCircle2,
  ArrowRight,
  Zap,
  RefreshCw,
  ServerCrash,
  Check,
  Sparkles,
  TrendingUp,
  Building2,
} from "lucide-react";
import { MagneticButton } from "./MagneticButton";
import { TrevykLogo } from "./TrevykLogo";
import { SiteSettings } from "../types";

interface AboutSectionProps {
  settings: SiteSettings;
  scrollProgress: number;
  onExploreServices: () => void;
  onOpenArchitectureModal: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  settings,
  scrollProgress,
  onExploreServices,
  onOpenArchitectureModal,
}) => {
  const [activeComparison, setActiveComparison] = useState<
    "modular" | "monolith"
  >("modular");

  // Split-text reveal animation helper (wow #16)
  const headingWords =
    "Software Is Only As Resilient As Its Smallest Independent Block.".split(
      " ",
    );

  return (
    <section
      id="about"
      className="relative w-full py-24 sm:py-36 transition-colors duration-700 bg-[#E7E1F0] text-[#241428] overflow-hidden"
    >
      {/* Background ambient lighting for light mist aesthetic (wow #22) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft diagonal gradient sweep from soft lilac to off-white */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#E7E1F0]/40 via-transparent to-[#FFFFFF]/50 opacity-100" />

        {/* Subtle geometric dot grid in ink */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: "radial-gradient(#241428 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Ambient warm plum & blush pink glow in corner */}
        <div className="absolute -top-24 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-[#B9A6D1]/30 via-[#E8A9C2]/20 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 left-0 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#6B4A87]/15 via-[#B9A6D1]/20 to-transparent blur-3xl pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with the Reassembled Core Block Emblem (wow #9) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 sm:pb-16 border-b border-[#241428]/10">
          <div className="max-w-3xl">
            {/* Reassembled Emblem & Section Tag (Connective Tissue) */}
            <div className="inline-flex items-center space-x-3 px-4 py-2 rounded-full bg-white border border-[#B9A6D1]/60 shadow-[0_4px_16px_rgba(107,74,135,0.08)] mb-6">
              {/* The official 3D isometric emblem */}
              <div
                id="about-reassembled-badge"
                className="relative w-6 h-6 flex items-center justify-center group"
                title="The Core Block Reassembled"
              >
                <TrevykLogo layout="icon-only" size="xs" />
              </div>

              <span className="font-mono-accent text-xs uppercase tracking-widest text-[#6B4A87] font-semibold">
                WHY TREVYK • MODULAR PERSISTENCE
              </span>
            </div>

            {/* Split-Text Heading Reveal (wow #16) */}
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-[#241428] tracking-tight leading-[1.15]">
              {headingWords.map((word, i) => (
                <span key={i} className="inline-block mr-2.5 overflow-hidden">
                  <motion.span
                    initial={{ y: "100%", opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{
                      duration: 0.6,
                      delay: i * 0.04,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`inline-block ${
                      word === "Resilient" ||
                      word === "Independent" ||
                      word === "Block."
                        ? "text-[#6B4A87] font-extrabold"
                        : ""
                    }`}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h2>
          </div>

          {/* Right positioning summary */}
          <div className="max-w-md text-sm sm:text-base text-[#241428]/80 leading-relaxed">
            <p>
              Founded on the principle of isometric software design, Trevyk
              Technologies creates IT systems that never collapse as a single
              unit. Every service, module, and database shard operates as an
              autonomous, replaceable block.
            </p>
          </div>
        </div>

        {/* Founding Philosophy & The 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16">
          {/* Pillar 1 */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="p-6 sm:p-8 rounded-2xl bg-white border border-[#B9A6D1]/40 shadow-[0_10px_30px_rgba(107,74,135,0.06)] flex flex-col justify-between hover:shadow-[0_15px_40px_rgba(107,74,135,0.12)] transition-all hover:-translate-y-1"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#6B4A87] to-[#B9A6D1] text-white flex items-center justify-center mb-6 shadow-md">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono-accent uppercase tracking-wider text-[#6B4A87] font-semibold">
                Pillar 01 • Fault Boundary
              </span>
              <h3 className="font-heading font-bold text-xl text-[#241428] mt-2 mb-3">
                Zero Blast-Radius Isolation
              </h3>
              <p className="text-sm text-[#241428]/80 leading-relaxed">
                When a payment gateway spikes or third-party API stumbles, our
                circuit-breaker blocks isolate the anomaly. Core school
                operations and critical enterprise pipelines continue
                uninterrupted.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#241428]/10 flex items-center justify-between text-xs font-mono-accent text-[#6B4A87]">
              <span>Fault Isolation Level</span>
              <span className="font-bold text-[#241428]">Tier 1 Absolute</span>
            </div>
          </motion.div>

          {/* Pillar 2 */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-6 sm:p-8 rounded-2xl bg-white border border-[#B9A6D1]/40 shadow-[0_10px_30px_rgba(107,74,135,0.06)] flex flex-col justify-between hover:shadow-[0_15px_40px_rgba(107,74,135,0.12)] transition-all hover:-translate-y-1"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#E8A9C2] to-[#B9A6D1] text-[#FFFFFF] flex items-center justify-center mb-6 shadow-md">
                <Cpu className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono-accent uppercase tracking-wider text-[#6B4A87] font-semibold">
                Pillar 02 • High Elasticity
              </span>
              <h3 className="font-heading font-bold text-xl text-[#241428] mt-2 mb-3">
                Linear Horizontal Scaling
              </h3>
              <p className="text-sm text-[#241428]/80 leading-relaxed">
                Add or reallocate individual computing blocks in seconds during
                peak registration or fee cycles without rebuilding or taking
                down the underlying infrastructure.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#241428]/10 flex items-center justify-between text-xs font-mono-accent text-[#6B4A87]">
              <span>Autoscale Velocity</span>
              <span className="font-bold text-[#241428]">&lt; 3.5 Seconds</span>
            </div>
          </motion.div>

          {/* Pillar 3 */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="p-6 sm:p-8 rounded-2xl bg-white border border-[#B9A6D1]/40 shadow-[0_10px_30px_rgba(107,74,135,0.06)] flex flex-col justify-between hover:shadow-[0_15px_40px_rgba(107,74,135,0.12)] transition-all hover:-translate-y-1"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#6B4A87] to-[#6B4A87] text-white flex items-center justify-center mb-6 shadow-md">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono-accent uppercase tracking-wider text-[#6B4A87] font-semibold">
                Pillar 03 • Flagship SaaS
              </span>
              <h3 className="font-heading font-bold text-xl text-[#241428] mt-2 mb-3">
                Kiduart School ERP Platform
              </h3>
              <p className="text-sm text-[#241428]/80 leading-relaxed">
                Beyond custom client engineering, we build{" "}
                <a
                  href="https://kiduart.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#6B4A87] font-semibold underline underline-offset-2"
                >
                  Kiduart
                </a>
                , our flagship school ERP (kiduart.com), integrating admissions,
                academics, fee desk, and parent communication without invented
                school counts.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#241428]/10 flex items-center justify-between text-xs font-mono-accent text-[#6B4A87]">
              <span>Active Daily Users</span>
              <span className="font-bold text-[#241428]">850,000+</span>
            </div>
          </motion.div>
        </div>

        {/* Interactive Architecture Benchmark / Monolith vs Trevyk Modular Cluster */}
        <div className="mt-14 sm:mt-20 p-6 sm:p-10 rounded-3xl bg-white border border-[#B9A6D1]/60 shadow-[0_20px_50px_rgba(107,74,135,0.08)]">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#241428]/10">
            <div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#6B4A87]" />
                <span className="font-mono-accent text-xs uppercase tracking-widest text-[#6B4A87] font-bold">
                  LIVE ARCHITECTURAL BENCHMARK
                </span>
              </div>
              <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#241428] mt-1">
                Monolithic Systems vs. Trevyk Modular Blocks
              </h3>
            </div>

            {/* Toggle Buttons */}
            <div className="flex items-center p-1 rounded-xl bg-white border border-[#B9A6D1]/60">
              <button
                onClick={() => setActiveComparison("modular")}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-heading font-medium transition-all ${
                  activeComparison === "modular"
                    ? "bg-[#6B4A87] text-white shadow-md"
                    : "text-[#241428]/70 hover:text-[#241428]"
                }`}
              >
                Trevyk Modular Cluster
              </button>
              <button
                onClick={() => setActiveComparison("monolith")}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-heading font-medium transition-all ${
                  activeComparison === "monolith"
                    ? "bg-[#1E1024] text-[#241428] shadow-md"
                    : "text-[#241428]/70 hover:text-[#241428]"
                }`}
              >
                Legacy Monolith
              </button>
            </div>
          </div>

          {/* Benchmark Comparison Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            <div className="p-4 rounded-xl bg-[#E7E1F0]/50 border border-[#B9A6D1]/40">
              <span className="text-[11px] font-mono-accent uppercase tracking-wider text-[#6B4A87]">
                Single Point of Failure
              </span>
              <div className="font-heading font-bold text-lg sm:text-xl text-[#241428] mt-1">
                {activeComparison === "modular"
                  ? "Zero (Strict Isolation)"
                  : "High (Entire App Halts)"}
              </div>
              <p className="text-xs text-[#241428]/70 mt-1">
                {activeComparison === "modular"
                  ? "Decoupled memory boundaries prevent cascading crashes."
                  : "A single unhandled exception crashes the entire server process."}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#E7E1F0]/50 border border-[#B9A6D1]/40">
              <span className="text-[11px] font-mono-accent uppercase tracking-wider text-[#6B4A87]">
                Deployment Velocity
              </span>
              <div className="font-heading font-bold text-lg sm:text-xl text-[#241428] mt-1">
                {activeComparison === "modular"
                  ? "Continuous (Per-Block)"
                  : "Rigid (All-or-Nothing)"}
              </div>
              <p className="text-xs text-[#241428]/70 mt-1">
                {activeComparison === "modular"
                  ? "Deploy new fee gateways or grading modules without redeploying ERP core."
                  : "Requires massive risky releases, maintenance windows, and test freezes."}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#E7E1F0]/50 border border-[#B9A6D1]/40">
              <span className="text-[11px] font-mono-accent uppercase tracking-wider text-[#6B4A87]">
                Recovery posture
              </span>
              <div className="font-heading font-bold text-lg sm:text-xl text-[#241428] mt-1">
                {activeComparison === "modular"
                  ? "Isolated restarts"
                  : "Full app reboot"}
              </div>
              <p className="text-xs text-[#241428]/70 mt-1">
                {activeComparison === "modular"
                  ? "A failing module can be restarted without taking down unrelated surfaces."
                  : "One bad release often forces a full process restart and longer downtime."}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#E7E1F0]/50 border border-[#B9A6D1]/40">
              <span className="text-[11px] font-mono-accent uppercase tracking-wider text-[#6B4A87]">
                Database Sharding
              </span>
              <div className="font-heading font-bold text-lg sm:text-xl text-[#241428] mt-1">
                {activeComparison === "modular"
                  ? "Isolated Tenant Shards"
                  : "Shared Heavy Tables"}
              </div>
              <p className="text-xs text-[#241428]/70 mt-1">
                {activeComparison === "modular"
                  ? "Schools & enterprise clients have strictly sequestered tenant data partitions."
                  : "Cross-tenant table locks trigger latency cascades during peak load."}
              </p>
            </div>
          </div>

          {/* Quick CTA inside About section */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#241428]/10">
            <div className="text-xs text-[#241428]/75 font-mono-accent">
              Explore how Trevyk translates this architecture into 8 specialized
              IT services & products.
            </div>
            <MagneticButton
              variant="primary"
              onClick={onExploreServices}
              className="!text-xs !py-2.5 !px-5"
              cursorLabel="SERVICES"
              reducedMotion={settings.reducedMotion}
            >
              <span>Explore 8 IT Services</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
};
