import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  Layers,
  Cpu,
  Rocket,
  LifeBuoy,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Clock,
  FileCode,
  Sparkles,
  GitBranch,
  Terminal,
  Activity,
} from "lucide-react";
import { MagneticButton } from "./MagneticButton";
import { SiteSettings } from "../types";

interface ProcessSectionProps {
  settings: SiteSettings;
  scrollProgress: number;
  onOpenArchitectureModal?: () => void;
  onContactClick?: () => void;
}

interface ProcessStep {
  number: string;
  phase: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  duration: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  metrics: { label: string; value: string };
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({
  settings,
  scrollProgress,
  onOpenArchitectureModal,
  onContactClick,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const steps: ProcessStep[] = [
    {
      number: "01",
      phase: "DISCOVER & AUDIT",
      title: "Architecture Discovery & Threat Modeling",
      tagline:
        "Uncover hidden bottlenecks, security vulnerabilities, and domain boundaries before writing code.",
      description:
        "We conduct rigorous technical audits of your existing infrastructure, data flow schemas, and compliance requisites. We define strict blast-radius boundaries so every future service operates autonomously.",
      deliverables: [
        "Domain-Driven Service Boundary Map",
        "Security Threat Model & SOC2 Gap Audit",
        "Throughput & Concurrency Projections",
      ],
      duration: "Week 1 – 2",
      icon: Search,
      color: "#E8A9C2",
      metrics: { label: "Audit Rigor", value: "100% Surface Check" },
    },
    {
      number: "02",
      phase: "ISOMETRIC DESIGN",
      title: "Distributed System Blueprint & Sharding",
      tagline:
        "Crafting the 3D isometric blueprints of your database shards, APIs, and event streams.",
      description:
        "We engineer low-latency gRPC schemas, Kafka topic partitions, and multi-tenant database sharding strategies. You receive interactive architecture diagrams and verifiable interface contracts before implementation.",
      deliverables: [
        "OpenAPI & Proto Contract Repository",
        "Database Sharding & Replication Topology",
        "Interactive Figma & 3D UI Prototypes",
      ],
      duration: "Week 2 – 4",
      icon: Layers,
      color: "#B9A6D1",
      metrics: { label: "Blueprint Precision", value: "Zero Ambiguity" },
    },
    {
      number: "03",
      phase: "MODULAR BUILD",
      title: "High-Velocity Iterative Engineering",
      tagline:
        "Decoupled, containerized micro-blocks developed with strict zero-regression test gates.",
      description:
        "Engineering teams build autonomous services in parallel. Every pull request runs through automated integration suites, security SAST/DAST scans, and performance load benchmarks before staging merges.",
      deliverables: [
        "Production Container Images (Docker/OCI)",
        "Automated CI/CD Test Pipeline",
        "Offline-First Synchronous Data Engines",
      ],
      duration: "Week 4 – 10",
      icon: Cpu,
      color: "#6B4A87",
      metrics: { label: "Code Test Coverage", value: "> 94% Automated" },
    },
    {
      number: "04",
      phase: "CANARY LAUNCH",
      title: "Zero-Downtime Deployment & Shadow Traffic",
      tagline:
        "Deploy without user disruption using blue-green routing and instant rollback gates.",
      description:
        "We mirror live user traffic into staging containers to verify performance at scale before flipping DNS routes. Real-time telemetry validates memory curves and query latency in sub-second intervals.",
      deliverables: [
        "Kubernetes Helm / Terraform Scripts",
        "Canary Release & Traffic Splitting Policy",
        "Sub-Second Rollback Circuit Breakers",
      ],
      duration: "Week 10 – 12",
      icon: Rocket,
      color: "#E8A9C2",
      metrics: { label: "Launch Downtime", value: "0.00 Seconds" },
    },
    {
      number: "05",
      phase: "HANDOFF & SUPPORT",
      title: "Handoff, monitoring & honest support",
      tagline: "Clear ownership after launch  reply within one business day.",
      description:
        "Engagement continues with documentation, basic monitoring where scoped, and a human support path. No invented 15-minute SRE or 99.99% warranty badges.",
      deliverables: [
        "Runbooks & source handoff (custom work)",
        "Monitoring alerts when included in scope",
        "Business-day support cadence",
      ],
      duration: "As scoped",
      icon: LifeBuoy,
      color: "#B9A6D1",
      metrics: { label: "Support reply", value: "1 business day" },
    },
  ];

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative w-full py-28 sm:py-36 bg-[#E7E1F0] text-[#241428] overflow-hidden transition-colors duration-700"
    >
      {/* Background Calm Ambient Atmosphere (Light contrast rhythm after Product peak) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft diagonal gradient sweep matching About section */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#E7E1F0]/40 via-transparent to-[#FFFFFF]/50 opacity-100" />

        {/* Subtle engineering coordinate grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: "radial-gradient(#241428 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Soft, wide ambient lilac mist */}
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[450px] bg-gradient-to-bl from-[#B9A6D1]/30 via-[#E8A9C2]/20 to-transparent blur-[120px]" />
        <div className="absolute bottom-10 left-10 w-[500px] h-[450px] bg-gradient-to-tr from-[#6B4A87]/15 via-[#B9A6D1]/20 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: Calm, Clear, High-Contrast */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 sm:pb-16 border-b border-[#241428]/10">
          <div>
            <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-white border border-[#B9A6D1]/60 text-[#6B4A87] font-mono-accent text-xs mb-4 shadow-[0_4px_16px_rgba(107,74,135,0.08)] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#6B4A87] animate-pulse" />
              <span>HOW WE WORK • PROVEN LIFECYCLE</span>
            </div>

            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-[#241428] tracking-tight">
              A Structured Engineering Journey From{" "}
              <span className="text-[#6B4A87]">
                Discovery to Honest Handoff
              </span>
            </h2>
          </div>

          <div className="max-w-md text-xs sm:text-sm text-[#241428]/80 leading-relaxed font-sans">
            <p>
              We don't believe in chaotic development sprints or guesswork.
              Every phase follows an isometric protocol to ensure total
              architectural integrity, predictable velocity, and zero production
              regressions.
            </p>
          </div>
        </div>

        {/* Process Diagram: Dual-Purpose SVG Step Connector (wow #19) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 mt-12 sm:mt-16 items-start">
          {/* Left Column: Interactive Step Spine & Navigators */}
          <div className="lg:col-span-5 relative">
            {/* SVG Connecting Spine (wow #19) */}
            <div className="absolute top-6 bottom-6 left-6 w-1 -translate-x-1/2 pointer-events-none hidden sm:block">
              {/* Static Track */}
              <div className="absolute inset-0 bg-[#B9A6D1]/40 rounded-full" />

              {/* Dynamic Active Filled Line */}
              <motion.div
                className="absolute top-0 w-full bg-gradient-to-b from-[#6B4A87] via-[#B9A6D1] to-[#E8A9C2] rounded-full shadow-[0_0_8px_rgba(107,74,135,0.4)]"
                animate={{
                  height: `${((activeStep + 1) / steps.length) * 100}%`,
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>

            {/* Step Pills */}
            <div className="flex flex-col space-y-4 relative z-10">
              {steps.map((step, index) => {
                const isActive = activeStep === index;
                const isPassed = index < activeStep;
                const IconComp = step.icon;

                return (
                  <button
                    key={step.number}
                    id={`process-step-btn-${step.number}`}
                    onClick={() => setActiveStep(index)}
                    className={`w-full p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex items-center space-x-4 text-left interactive-target ${
                      isActive
                        ? "bg-[#1E1024] border-[#6B4A87] shadow-[0_10px_25px_rgba(107,74,135,0.15)] ring-1 ring-[#6B4A87]/30 sm:translate-x-2"
                        : isPassed
                          ? "bg-[#1E1024]/90 border-[#B9A6D1]/60 hover:bg-[#1E1024]"
                          : "bg-[#1E1024]/80 border-[#B9A6D1]/30 hover:border-[#6B4A87]/40"
                    }`}
                    data-cursor-label={`STEP ${step.number}`}
                  >
                    {/* Node Dot / Icon */}
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-all ${
                        isActive
                          ? "bg-[#6B4A87] text-white border-[#6B4A87] shadow-[0_0_15px_rgba(107,74,135,0.35)]"
                          : isPassed
                            ? "bg-white text-[#6B4A87] border-[#B9A6D1]"
                            : "bg-[#1E1024] text-[#241428]/50 border-[#B9A6D1]/40"
                      }`}
                    >
                      {isPassed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <IconComp className="w-5 h-5" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-mono-accent uppercase tracking-wider text-[#6B4A87] font-semibold">
                          STEP {step.number} • {step.phase}
                        </span>
                      </div>
                      <div className="font-heading font-bold text-sm sm:text-base text-[#241428] truncate">
                        {step.title}
                      </div>
                    </div>

                    <div className="text-[11px] font-mono-accent text-[#241428]/60 hidden sm:block">
                      {step.duration}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Active Step Stage Deep-Dive Card */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={steps[activeStep].number}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="p-6 sm:p-9 rounded-3xl bg-white border border-[#B9A6D1]/60 shadow-[0_20px_50px_rgba(107,74,135,0.08)] flex flex-col justify-between relative overflow-hidden"
              >
                {/* Ambient Corner Flare */}
                <div
                  className="absolute -top-24 -right-24 w-60 h-60 rounded-full blur-3xl opacity-25 pointer-events-none"
                  style={{ backgroundColor: steps[activeStep].color }}
                />

                <div>
                  {/* Step Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-[#241428]/10">
                    <div className="flex items-center space-x-3">
                      <span className="px-3 py-1 rounded-full text-xs font-mono-accent font-bold uppercase tracking-wider bg-white text-[#6B4A87] border border-[#B9A6D1]/60">
                        PHASE {steps[activeStep].number}
                      </span>
                      <span className="font-mono-accent text-xs text-[#241428]/70 font-semibold">
                        {steps[activeStep].duration}
                      </span>
                    </div>

                    <div className="text-xs font-mono-accent text-[#6B4A87] bg-white px-3 py-1 rounded-lg border border-[#B9A6D1]/60 font-semibold">
                      <span>{steps[activeStep].metrics.label}: </span>
                      <span className="font-bold text-[#241428]">
                        {steps[activeStep].metrics.value}
                      </span>
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <div className="mt-6">
                    <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#241428] tracking-tight">
                      {steps[activeStep].title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#6B4A87] font-semibold mt-2 leading-relaxed">
                      "{steps[activeStep].tagline}"
                    </p>
                    <p className="text-xs sm:text-sm text-[#241428]/80 mt-4 leading-relaxed font-sans">
                      {steps[activeStep].description}
                    </p>
                  </div>

                  {/* Concrete Engineering Deliverables */}
                  <div className="mt-8">
                    <div className="font-mono-accent text-xs uppercase tracking-wider text-[#6B4A87] mb-3 flex items-center space-x-2 font-semibold">
                      <FileCode className="w-3.5 h-3.5 text-[#6B4A87]" />
                      <span>CONCRETE TANGIBLE DELIVERABLES</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {steps[activeStep].deliverables.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl bg-white/70 border border-[#B9A6D1]/50 text-xs text-[#241428] flex flex-col justify-between shadow-sm"
                        >
                          <div className="font-mono-accent text-[10px] text-[#6B4A87] font-bold mb-1">
                            ARTIFACT 0{idx + 1}
                          </div>
                          <div className="font-medium leading-snug">{item}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Navigation between Steps */}
                <div className="mt-8 pt-6 border-t border-[#241428]/10 flex flex-wrap items-center justify-between gap-4">
                  <button
                    onClick={() =>
                      setActiveStep((prev) => Math.max(0, prev - 1))
                    }
                    disabled={activeStep === 0}
                    className={`text-xs font-mono-accent px-4 py-2 rounded-xl border transition-all ${
                      activeStep === 0
                        ? "opacity-30 border-transparent cursor-not-allowed"
                        : "border-[#B9A6D1]/60 text-[#241428] hover:bg-white"
                    }`}
                  >
                    ← Previous Phase
                  </button>

                  <div className="flex items-center space-x-1.5">
                    {steps.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveStep(i)}
                        className={`h-1.5 rounded-full transition-all ${
                          i === activeStep
                            ? "w-6 bg-[#6B4A87]"
                            : "w-2 bg-[#B9A6D1]"
                        }`}
                        aria-label={`Step ${i + 1}`}
                      />
                    ))}
                  </div>

                  {activeStep < steps.length - 1 ? (
                    <button
                      onClick={() =>
                        setActiveStep((prev) =>
                          Math.min(steps.length - 1, prev + 1),
                        )
                      }
                      className="text-xs font-mono-accent px-4 py-2 rounded-xl bg-[#6B4A87] text-white hover:bg-[#6B4A87] transition-all flex items-center space-x-1 shadow-sm"
                    >
                      <span>Next Phase</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </button>
                  ) : (
                    <MagneticButton
                      variant="primary"
                      onClick={() => {
                        const contactEl = document.getElementById("contact");
                        if (contactEl) {
                          contactEl.scrollIntoView({ behavior: "smooth" });
                        } else if (onContactClick) {
                          onContactClick();
                        }
                      }}
                      className="!py-2 !px-4 !text-xs"
                    >
                      <span>Initiate Step 01 Discovery</span>
                    </MagneticButton>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
