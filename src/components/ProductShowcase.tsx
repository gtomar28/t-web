import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  GraduationCap,
  CreditCard,
  Users,
  Smartphone,
  Calendar,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Zap,
  School,
  ChevronRight,
  TrendingUp,
  Radio,
  ExternalLink,
  ShieldCheck,
  MapPin,
  FileSpreadsheet,
  Layers,
} from "lucide-react";
import { CountUpNumber } from "./CountUpNumber";
import { MagneticButton } from "./MagneticButton";
import { SiteSettings } from "../types";
import { soundEngine } from "../utils/audioEngine";

interface ProductShowcaseProps {
  settings: SiteSettings;
  scrollProgress: number;
  onRequestDemo?: () => void;
}

type ErpTab =
  | "fee"
  | "attendance"
  | "ai-signals"
  | "academics"
  | "parent"
  | "admissions";

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({
  settings,
  onRequestDemo,
}) => {
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [activeErpTab, setActiveErpTab] = useState<ErpTab>("fee");
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const stories = [
    {
      id: "zero-setup",
      badge: "Transparent Onboarding",
      title: "Zero Setup Cost & Free Data Migration",
      tagline:
        "No upfront capital fees. Seamless transition from spreadsheets or legacy software.",
      description:
        "Kiduart School ERP (kiduart.com) operates with an honest, zero-hidden-cost pricing policy. Schools get full data onboarding, student record migration, and comprehensive staff training without heavy upfront licensing charges.",
      statNumber: 0,
      statPrefix: "₹",
      statSuffix: " Setup",
      statLabel: "Upfront Licensing Fee",
      icon: CreditCard,
      color: "#E8A9C2",
    },
    {
      id: "private-ai",
      badge: "On-Instance AI",
      title: "Private On-Instance Predictive Signals",
      tagline:
        "Attendance risk forecasting, fee-default risk scoring, and school health scores.",
      description:
        "Unlike generic AI tools that export student data to third-party servers, Kiduart runs predictive analytics directly inside each school’s private instance. Identify students at academic risk or forecast term fee collection curves with complete data privacy.",
      statNumber: 100,
      statPrefix: "",
      statSuffix: "%",
      statLabel: "On-Prem / Private Cloud AI Privacy",
      icon: Sparkles,
      color: "#B9A6D1",
    },
    {
      id: "core-modules",
      badge: "All-In-One Campus Suite",
      title: "Admissions, Fees, Transport & Multi-HQ",
      tagline:
        "Admissions pipeline, live dues, bus tracking, hostel, library, and HR payroll.",
      description:
        "A comprehensive platform managing the entire student lifecycle: online enquiry-to-registration, automated fee desks with live dues, same-day attendance alerts, GPS fleet tracking, and consolidated multi-campus governance.",
      statNumber: 12,
      statPrefix: "",
      statSuffix: " Core Modules",
      statLabel: "Integrated Campus Systems",
      icon: School,
      color: "#6B4A87",
    },
    {
      id: "live-integrations",
      badge: "Payment & Gateway Mesh",
      title: "Razorpay & Stripe Live Integrations",
      tagline:
        "Instant online fee collections, automated digital receipts, and split payouts.",
      description:
        "Integrated with certified payment gateways (Razorpay & Stripe live) for UPI, net banking, and cards. Automated receipts, instant WhatsApp/SMS notifications with verifiable delivery trails, and multi-bank settlement.",
      statNumber: 2,
      statPrefix: "",
      statSuffix: "+",
      decimals: 0,
      statLabel: "Payment gateway options",
      icon: Zap,
      color: "#E8A9C2",
    },
  ];

  const handleMouseMoveMockup = (e: React.MouseEvent<HTMLDivElement>) => {
    if (settings.reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    setMouseOffset({ x, y });
  };

  return (
    <section
      id="school-erp"
      ref={containerRef}
      className="relative w-full py-24 sm:py-32 lg:py-36 bg-[#1E1024] text-[#F8F6FB] overflow-hidden"
    >
      {/* 1. Services → Product Connective Reassembly Anchor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center pointer-events-none">
        <div className="px-4 py-1.5 rounded-full bg-[#1E1024] border border-[#E8A9C2]/50 text-[#6B4A87] font-mono-accent text-[10px] sm:text-[11px] uppercase tracking-widest shadow-[0_0_20px_rgba(232,169,194,0.3)] flex items-center space-x-2">
          <svg
            viewBox="0 0 24 24"
            className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-pulse fill-none stroke-current"
            strokeWidth="2"
          >
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
          <span>CORE BLOCKS REASSEMBLED INTO KIDUART ERP</span>
        </div>
      </div>

      {/* 2. Deep Aubergine Spotlight Lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[350px] sm:w-[600px] lg:w-[800px] h-[500px] bg-gradient-to-b from-[#6B4A87]/30 via-[#2A1830]/40 to-transparent blur-[120px]" />
        <div className="absolute bottom-10 right-10 w-[300px] sm:w-[450px] h-[450px] bg-gradient-to-tl from-[#E8A9C2]/15 via-[#6B4A87]/15 to-transparent blur-3xl" />
        <div className="absolute top-1/2 left-0 w-[300px] sm:w-[400px] h-[400px] bg-gradient-to-tr from-[#5A3875]/20 to-transparent blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#B9A6D1 1px, transparent 1px), linear-gradient(90deg, #B9A6D1 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-[#2A1830] border border-[#E8A9C2]/50 text-[#6B4A87] font-mono-accent text-xs mb-4 shadow-[0_4px_20px_rgba(232,169,194,0.15)]">
            <GraduationCap className="w-4 h-4" />
            <span>FLAGSHIP PRODUCT • KIDUART.COM</span>
          </div>

          <h2 className="font-heading font-bold text-3xl sm:text-5xl lg:text-6xl text-[#F8F6FB] tracking-tight leading-[1.15]">
            Kiduart School ERP: Built For{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E8A9C2] via-[#B9A6D1] to-[#241428]">
              Indian Schools & Colleges
            </span>
          </h2>

          <p className="mt-5 text-sm sm:text-base text-[#B9A6D1]/80 leading-relaxed max-w-2xl mx-auto">
            A comprehensive, cloud-based school management system engineered by
            Trevyk Technologies. Crafted specifically for CBSE, ICSE, IB, and
            State Board schools with zero upfront licensing friction and
            on-instance private AI signals.
          </p>

          {/* Quick link badge to official Kiduart site */}
          <div className="mt-4 flex items-center justify-center space-x-3">
            <a
              id="kiduart-official-link-badge"
              href="https://kiduart.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundEngine.playClick("soft")}
              className="inline-flex items-center space-x-1.5 text-xs font-mono-accent text-[#6B4A87] hover:text-[#F8F6FB] bg-[#2A1830]/80 hover:bg-[#1E1024] border border-[#6B4A87]/50 hover:border-[#E8A9C2] px-3.5 py-1.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A9C2]"
            >
              <span>Explore official product at</span>
              <strong className="underline underline-offset-2">
                kiduart.com
              </strong>
              <ExternalLink className="w-3 h-3 ml-0.5" />
            </a>
          </div>
        </div>

        {/* Real Proof Metrics Ribbon (Accurate & Grounded) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-6 mb-14 sm:mb-20">
          <div className="p-5 sm:p-6 rounded-2xl bg-[#1E1024]/90 border border-[#6B4A87]/40 shadow-[0_10px_30px_rgba(107,74,135,0.10)] flex flex-col justify-between">
            <span className="text-[10px] sm:text-[11px] font-mono-accent uppercase tracking-wider text-[#B9A6D1]">
              Core Modules
            </span>
            <div className="font-heading font-bold text-2xl sm:text-4xl text-[#F8F6FB] mt-2 mb-1">
              <CountUpNumber end={12} suffix="+" />
            </div>
            <span className="text-[11px] sm:text-xs text-[#B9A6D1]/70">
              Admissions to Transport
            </span>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-[#1E1024]/90 border border-[#6B4A87]/40 shadow-[0_10px_30px_rgba(107,74,135,0.10)] flex flex-col justify-between">
            <span className="text-[10px] sm:text-[11px] font-mono-accent uppercase tracking-wider text-[#B9A6D1]">
              Private AI Privacy
            </span>
            <div className="font-heading font-bold text-2xl sm:text-4xl text-[#E8A9C2] mt-2 mb-1">
              <CountUpNumber end={100} suffix="%" />
            </div>
            <span className="text-[11px] sm:text-xs text-[#B9A6D1]/70">
              On-Instance Processing
            </span>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-[#1E1024]/90 border border-[#6B4A87]/40 shadow-[0_10px_30px_rgba(107,74,135,0.10)] flex flex-col justify-between">
            <span className="text-[10px] sm:text-[11px] font-mono-accent uppercase tracking-wider text-[#B9A6D1]">
              Setup Policy
            </span>
            <div className="font-heading font-bold text-2xl sm:text-4xl text-[#F8F6FB] mt-2 mb-1">
              <CountUpNumber end={0} prefix="₹" suffix=" Setup" />
            </div>
            <span className="text-[11px] sm:text-xs text-[#B9A6D1]/70">
              Zero Upfront Licensing
            </span>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-[#1E1024]/90 border border-[#6B4A87]/40 shadow-[0_10px_30px_rgba(107,74,135,0.10)] flex flex-col justify-between">
            <span className="text-[10px] sm:text-[11px] font-mono-accent uppercase tracking-wider text-[#B9A6D1]">
              Live Gateways
            </span>
            <div className="font-heading font-bold text-2xl sm:text-4xl text-[#B9A6D1] mt-2 mb-1">
              <span>Razorpay & Stripe</span>
            </div>
            <span className="text-[11px] sm:text-xs text-[#B9A6D1]/70">
              Instant UPI & Auto Receipts
            </span>
          </div>
        </div>

        {/* Founding School Charter Banner (Honest & No-Hype) */}
        <div className="mb-12 p-4 sm:p-5 rounded-2xl bg-[#2A1830]/90 border border-[#6B4A87]/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-[#6B4A87]/30 border border-[#E8A9C2]/40 flex items-center justify-center text-[#E8A9C2] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono-accent font-bold text-[#E8A9C2] uppercase tracking-wider">
                FOUNDING SCHOOL CHARTER • DIRECT ARCHITECT ACCESS
              </div>
              <div className="text-xs text-[#B9A6D1]/80 mt-0.5">
                We believe in total integrity: founding partners get direct
                attention, careful migration planning, and clear commercial
                terms without invented SLA theatre.
              </div>
            </div>
          </div>
          <a
            href="#contact"
            onClick={() => soundEngine.playClick("soft")}
            className="text-xs font-mono-accent text-[#F8F6FB] hover:text-[#E8A9C2] bg-[#1E1024] px-3.5 py-2 rounded-xl border border-[#6B4A87]/50 hover:border-[#E8A9C2] shrink-0 transition-all"
          >
            Apply For Founding Cohort →
          </a>
        </div>

        {/* Pinned Scroll-Storytelling Interactive Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Story Navigator */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            <div className="font-mono-accent text-xs uppercase tracking-widest text-[#E8A9C2] font-semibold mb-1 flex items-center space-x-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CORE ARCHITECTURAL PILLARS</span>
            </div>

            {stories.map((story, index) => {
              const isActive = activeStoryIndex === index;
              const IconComp = story.icon;

              return (
                <div
                  key={story.id}
                  id={`product-story-item-${story.id}`}
                  onClick={() => {
                    soundEngine.playClick("soft");
                    setActiveStoryIndex(index);
                    if (index === 0) setActiveErpTab("fee");
                    if (index === 1) setActiveErpTab("ai-signals");
                    if (index === 2) setActiveErpTab("attendance");
                    if (index === 3) setActiveErpTab("admissions");
                  }}
                  className={`p-4 sm:p-6 rounded-2xl border transition-all duration-300 cursor-pointer interactive-target text-left ${
                    isActive
                      ? "bg-[#2A1830] border-[#E8A9C2]/70 shadow-[0_10px_30px_rgba(232,169,194,0.15)] ring-1 ring-[#E8A9C2]/30"
                      : "bg-[#1E1024]/70 border-[#6B4A87]/30 hover:border-[#B9A6D1]/50 hover:bg-[#1E1024]"
                  }`}
                  data-cursor-label="EXPLORE"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 border"
                        style={{
                          backgroundColor: `${story.color}20`,
                          borderColor: `${story.color}50`,
                          color: story.color,
                        }}
                      >
                        <IconComp className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>

                      <div>
                        <span className="text-[10px] font-mono-accent uppercase tracking-wider text-[#B9A6D1]">
                          0{index + 1} • {story.badge}
                        </span>
                        <h3 className="font-heading font-bold text-sm sm:text-base lg:text-lg text-[#F8F6FB]">
                          {story.title}
                        </h3>
                      </div>
                    </div>

                    <ChevronRight
                      className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform shrink-0 mt-1 ${
                        isActive ? "rotate-90 text-[#E8A9C2]" : "text-[#6B4A87]"
                      }`}
                    />
                  </div>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-3 pt-3 border-t border-[#6B4A87]/30 space-y-3"
                      >
                        <p className="text-xs sm:text-sm text-[#B9A6D1]/85 leading-relaxed">
                          {story.description}
                        </p>

                        <div className="p-2.5 rounded-lg bg-[#1E1024] border border-[#6B4A87]/40 flex items-center justify-between text-xs font-mono-accent">
                          <span className="text-[#B9A6D1]">
                            {story.statLabel}:
                          </span>
                          <span className="font-bold text-[#E8A9C2]">
                            <CountUpNumber
                              end={story.statNumber}
                              prefix={story.statPrefix}
                              suffix={story.statSuffix}
                              decimals={story.decimals || 0}
                            />
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            {/* CTAs: Request Demo + Visit Kiduart.com */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <MagneticButton
                id="kiduart-request-demo-btn"
                variant="primary"
                onClick={() => {
                  soundEngine.playClick("hero");
                  const contactEl = document.getElementById("contact");
                  if (contactEl) {
                    contactEl.scrollIntoView({ behavior: "smooth" });
                  } else if (onRequestDemo) {
                    onRequestDemo();
                  }
                }}
                className="w-full !py-3.5 !justify-center"
                cursorLabel="BOOK DEMO"
                reducedMotion={settings.reducedMotion}
              >
                <span>Request Live Kiduart Demo</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </MagneticButton>

              <a
                id="kiduart-direct-visit-btn"
                href="https://kiduart.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundEngine.playClick("soft")}
                className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-3 rounded-xl bg-[#2A1830] border border-[#6B4A87]/60 hover:border-[#E8A9C2] text-[#F8F6FB] hover:text-[#E8A9C2] text-xs font-mono-accent transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A9C2] interactive-target"
                data-cursor-label="KIDUART"
              >
                <span>Visit kiduart.com</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1.5 text-[#E8A9C2]" />
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Live Kiduart ERP Dashboard Mockup */}
          <div
            className="lg:col-span-7 w-full lg:sticky lg:top-24"
            onMouseMove={handleMouseMoveMockup}
            onMouseLeave={() => setMouseOffset({ x: 0, y: 0 })}
            style={{ perspective: 1200 }}
          >
            <motion.div
              animate={{
                rotateX: mouseOffset.y,
                rotateY: mouseOffset.x,
              }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 200,
                mass: 0.2,
              }}
              style={{ transformStyle: "preserve-3d" }}
              className="relative w-full rounded-2xl sm:rounded-3xl bg-[#1E1024] border border-[#6B4A87]/60 shadow-[0_25px_60px_rgba(107,74,135,0.18)] overflow-hidden"
            >
              {/* Window Title Bar */}
              <div className="flex items-center justify-between px-3.5 sm:px-6 py-3 bg-[#2A1830] border-b border-[#6B4A87]/40">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#E8A9C2]/60" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#B9A6D1]/60" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#6B4A87]/60" />
                  <span className="font-mono-accent text-[11px] sm:text-xs text-[#B9A6D1] ml-2 truncate max-w-[140px] sm:max-w-none">
                    app.kiduart.com/dashboard/campus
                  </span>
                </div>

                <div className="flex items-center space-x-1.5 sm:space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[9px] sm:text-[10px] font-mono-accent uppercase tracking-wider text-emerald-400 font-bold">
                    SECURE SCHOOL WORKSPACE
                  </span>
                </div>
              </div>

              {/* ERP Module Navigation Tabs */}
              <div className="flex items-center border-b border-[#6B4A87]/30 bg-[#1E1024]/90 overflow-x-auto scrollbar-thin">
                {[
                  { id: "fee", label: "Fees & Payments", icon: CreditCard },
                  { id: "ai-signals", label: "Campus Signals", icon: Sparkles },
                  {
                    id: "attendance",
                    label: "Attendance & Transport",
                    icon: Radio,
                  },
                  {
                    id: "academics",
                    label: "Student Records & Exams",
                    icon: Calendar,
                  },
                  {
                    id: "parent",
                    label: "Parent App & Notices",
                    icon: Smartphone,
                  },
                  {
                    id: "admissions",
                    label: "Admissions & Multi-HQ",
                    icon: Layers,
                  },
                ].map((tab) => {
                  const isActive = activeErpTab === tab.id;
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        soundEngine.playClick("soft");
                        setActiveErpTab(tab.id as ErpTab);
                      }}
                      className={`px-3.5 sm:px-4 py-2.5 sm:py-3 text-[11px] sm:text-xs font-mono-accent flex items-center space-x-1.5 sm:space-x-2 whitespace-nowrap transition-colors border-b-2 shrink-0 ${
                        isActive
                          ? "border-[#E8A9C2] text-[#F8F6FB] bg-[#2A1830]"
                          : "border-transparent text-[#B9A6D1]/70 hover:text-[#F8F6FB] hover:bg-[#1E1024]"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 text-[#E8A9C2]" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Simulated ERP Screen Content */}
              <div className="p-4 sm:p-6 lg:p-7 min-h-[360px] sm:min-h-[380px] bg-gradient-to-b from-[#1E1024] to-[#2A1830]">
                {activeErpTab === "fee" && (
                  <motion.div
                    key="fee-tab"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4 sm:space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-3 sm:p-3.5 rounded-xl bg-[#2A1830]/80 border border-[#6B4A87]/40">
                        <span className="text-[10px] font-mono-accent text-[#B9A6D1]">
                          TODAY RECONCILED (UPI / RAZORPAY)
                        </span>
                        <div className="text-lg sm:text-xl font-bold font-mono-accent text-[#F8F6FB] mt-0.5">
                          ₹14,82,500.00
                        </div>
                        <div className="text-[10px] text-emerald-400 font-mono-accent flex items-center mt-1">
                          <TrendingUp className="w-3 h-3 mr-1" /> Auto-settled
                          to school bank
                        </div>
                      </div>

                      <div className="p-3 sm:p-3.5 rounded-xl bg-[#2A1830]/80 border border-[#6B4A87]/40">
                        <span className="text-[10px] font-mono-accent text-[#B9A6D1]">
                          GATEWAY STATUS
                        </span>
                        <div className="text-lg sm:text-xl font-bold font-mono-accent text-[#6B4A87] mt-0.5">
                          Razorpay & Stripe
                        </div>
                        <div className="text-[10px] text-[#B9A6D1] font-mono-accent mt-1">
                          Auto-generated PDF receipts
                        </div>
                      </div>

                      <div className="p-3 sm:p-3.5 rounded-xl bg-[#2A1830]/80 border border-[#6B4A87]/40">
                        <span className="text-[10px] font-mono-accent text-[#B9A6D1]">
                          LIVE OUTSTANDING DUES
                        </span>
                        <div className="text-lg sm:text-xl font-bold font-mono-accent text-[#F8F6FB] mt-0.5">
                          ₹1,42,000.00
                        </div>
                        <div className="text-[10px] text-emerald-400 font-mono-accent mt-1">
                          Delivery trail: SMS & WhatsApp
                        </div>
                      </div>
                    </div>

                    <div className="rounded-xl border border-[#6B4A87]/30 bg-[#1E1024]/80 overflow-hidden">
                      <div className="px-3.5 sm:px-4 py-2.5 bg-[#2A1830]/80 border-b border-[#6B4A87]/30 flex items-center justify-between text-xs font-mono-accent text-[#B9A6D1]">
                        <span>KIDUART LIVE INR TRANSACTION STREAM</span>
                        <span className="text-emerald-400 text-[10px] sm:text-xs">
                          ● INSTANT RECEIPT GENERATED
                        </span>
                      </div>

                      <div className="divide-y divide-[#6B4A87]/20 text-xs font-mono-accent">
                        {[
                          {
                            id: "TX-9042",
                            name: "Aarav Sharma (Class 10-A)",
                            type: "Term 2 Tuition + Lab Fee",
                            amt: "₹42,500.00",
                            status: "Reconciled (UPI)",
                          },
                          {
                            id: "TX-9041",
                            name: "Zoya Khan (Class 8-C)",
                            type: "Annual Transport & Sports Kit",
                            amt: "₹18,200.00",
                            status: "Reconciled (NetBanking)",
                          },
                          {
                            id: "TX-9040",
                            name: "Rohan Mehta (Class 12-Sci)",
                            type: "Board Exam & Lab Maintenance",
                            amt: "₹34,000.00",
                            status: "Reconciled (Card)",
                          },
                        ].map((row) => (
                          <div
                            key={row.id}
                            className="p-3 flex items-center justify-between hover:bg-[#2A1830]/40 transition-colors"
                          >
                            <div className="min-w-0 pr-2">
                              <div className="font-semibold text-[#F8F6FB] truncate">
                                {row.name}
                              </div>
                              <div className="text-[10px] text-[#B9A6D1] truncate">
                                {row.id} • {row.type}
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <div className="font-bold text-[#E8A9C2]">
                                {row.amt}
                              </div>
                              <div className="text-[10px] text-emerald-400 flex items-center justify-end">
                                <CheckCircle2 className="w-2.5 h-2.5 mr-1" />{" "}
                                {row.status}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeErpTab === "ai-signals" && (
                  <motion.div
                    key="ai-tab"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4 sm:space-y-5"
                  >
                    <div className="p-4 rounded-xl bg-[#2A1830]/90 border border-[#E8A9C2]/40">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Sparkles className="w-4 h-4 text-[#E8A9C2]" />
                          <span className="text-xs font-mono-accent font-bold text-[#F8F6FB]">
                            OVERALL SCHOOL HEALTH SCORE
                          </span>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono-accent text-xs font-bold">
                          94.2 / 100 • EXCELLENT
                        </span>
                      </div>
                      <p className="text-xs text-[#B9A6D1]/80">
                        Computed entirely inside your campus instance from
                        attendance trends, fee collection velocity, and exam
                        progress. Zero student data is sent to external AI
                        servers.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3.5 rounded-xl bg-[#1E1024] border border-[#6B4A87]/40">
                        <div className="text-[10px] font-mono-accent text-[#B9A6D1]">
                          ATTENDANCE RISK SIGNALS
                        </div>
                        <div className="text-sm font-bold text-[#F8F6FB] mt-1">
                          3 Students Flagged
                        </div>
                        <div className="text-[11px] text-[#E8A9C2] mt-1">
                          Consecutive Friday absence pattern identified →
                          Counselor alert dispatched
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-[#1E1024] border border-[#6B4A87]/40">
                        <div className="text-[10px] font-mono-accent text-[#B9A6D1]">
                          FEE-DEFAULT RISK SCORING
                        </div>
                        <div className="text-sm font-bold text-[#F8F6FB] mt-1">
                          98.6% Projected On-Time
                        </div>
                        <div className="text-[11px] text-emerald-400 mt-1">
                          Smart reminders scheduled 3 days before due date
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeErpTab === "attendance" && (
                  <motion.div
                    key="attendance-tab"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4 sm:space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div className="p-4 rounded-xl bg-[#2A1830]/80 border border-[#6B4A87]/40">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono-accent text-[#B9A6D1]">
                            SAME-DAY ATTENDANCE LOG
                          </span>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono-accent">
                            LIVE
                          </span>
                        </div>
                        <div className="text-xl sm:text-2xl font-bold font-mono-accent text-[#F8F6FB] mt-2">
                          98.2% Present
                        </div>
                        <div className="text-xs text-[#B9A6D1]/70 mt-1">
                          Same-day automated alerts dispatched to parents
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-[#2A1830]/80 border border-[#6B4A87]/40">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono-accent text-[#B9A6D1]">
                            TRANSPORT & FLEET GPS
                          </span>
                          <span className="px-2 py-0.5 rounded bg-[#6B4A87]/30 text-[#E8A9C2] text-[10px] font-mono-accent">
                            ACTIVE
                          </span>
                        </div>
                        <div className="text-xl sm:text-2xl font-bold font-mono-accent text-[#6B4A87] mt-2">
                          Live Vehicle Tracking
                        </div>
                        <div className="text-xs text-[#B9A6D1]/70 mt-1">
                          Routes, stoppages & driver telematics
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#1E1024]/85 border border-[#6B4A87]/30">
                      <div className="text-xs font-mono-accent text-[#B9A6D1] mb-2">
                        HOSTEL & LIBRARY MODULE EXTENSIONS
                      </div>
                      <div className="text-xs text-[#B9A6D1]/80">
                        Unified check-in for boarders, automated curfew alerts,
                        barcode library cataloging, and fine automation.
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeErpTab === "academics" && (
                  <motion.div
                    key="academics-tab"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="p-4 rounded-xl bg-[#2A1830]/80 border border-[#6B4A87]/40">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-mono-accent text-[#B9A6D1]">
                          STUDENT RECORDS (360° PROFILE)
                        </span>
                        <span className="text-xs font-mono-accent text-[#6B4A87]">
                          Single Profile Per Student
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs font-mono-accent">
                        <div className="p-2 rounded bg-[#1E1024] border border-[#6B4A87]/40">
                          <div className="text-[#B9A6D1] text-[10px]">
                            RECORDS
                          </div>
                          <div className="font-bold text-[#F8F6FB] mt-0.5 truncate">
                            Academic History
                          </div>
                          <div className="text-[9px] text-[#E8A9C2]">
                            CBSE / ICSE Grades
                          </div>
                        </div>
                        <div className="p-2 rounded bg-[#1E1024] border border-[#6B4A87]/40">
                          <div className="text-[#B9A6D1] text-[10px]">
                            MEDICAL
                          </div>
                          <div className="font-bold text-[#F8F6FB] mt-0.5 truncate">
                            Health Records
                          </div>
                          <div className="text-[9px] text-[#E8A9C2]">
                            Allergies & Blood Grp
                          </div>
                        </div>
                        <div className="p-2 rounded bg-[#1E1024] border border-[#6B4A87]/40">
                          <div className="text-[#B9A6D1] text-[10px]">DOCS</div>
                          <div className="font-bold text-[#F8F6FB] mt-0.5 truncate">
                            Aadhar & Birth Cert
                          </div>
                          <div className="text-[9px] text-[#E8A9C2]">
                            Secure Vault
                          </div>
                        </div>
                        <div className="p-2 rounded bg-[#1E1024] border border-[#6B4A87]/40">
                          <div className="text-[#B9A6D1] text-[10px]">FEES</div>
                          <div className="font-bold text-[#F8F6FB] mt-0.5 truncate">
                            Ledger Summary
                          </div>
                          <div className="text-[9px] text-emerald-400">
                            100% Cleared
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#1E1024]/80 border border-[#6B4A87]/30 flex items-center justify-between text-xs font-mono-accent text-[#B9A6D1]">
                      <span>HR & PAYROLL SYSTEM</span>
                      <span className="text-[#F8F6FB] font-bold">
                        Staff Leaves, Biometrics & Form 16 Automation
                      </span>
                    </div>
                  </motion.div>
                )}

                {activeErpTab === "parent" && (
                  <motion.div
                    key="parent-tab"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="p-4 rounded-xl bg-[#2A1830]/80 border border-[#6B4A87]/40 flex items-center space-x-3.5">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#6B4A87]/30 border border-[#E8A9C2]/40 flex items-center justify-center text-[#E8A9C2] shrink-0">
                        <Smartphone className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm font-heading font-bold text-[#F8F6FB]">
                          Targeted Parent Notices with Delivery Trail
                        </div>
                        <div className="text-[11px] sm:text-xs text-[#B9A6D1]/75 mt-0.5">
                          Verifiable read receipts, homework updates, and
                          instant one-tap fee payment links.
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono-accent">
                      <div className="p-3 rounded-lg bg-[#1E1024] border border-[#6B4A87]/30">
                        <div className="text-[#B9A6D1]">NOTICE CHANNELS</div>
                        <div className="text-base sm:text-lg font-bold text-[#E8A9C2] mt-0.5">
                          In-App, WhatsApp, SMS
                        </div>
                      </div>
                      <div className="p-3 rounded-lg bg-[#1E1024] border border-[#6B4A87]/30">
                        <div className="text-[#B9A6D1]">DELIVERY AUDIT LOG</div>
                        <div className="text-base sm:text-lg font-bold text-emerald-400 mt-0.5">
                          100% Timestamped Trail
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeErpTab === "admissions" && (
                  <motion.div
                    key="admissions-tab"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-4 rounded-xl bg-[#2A1830]/80 border border-[#6B4A87]/40">
                        <div className="text-[10px] font-mono-accent text-[#B9A6D1]">
                          ENQUIRY-TO-REGISTRATION PIPELINE
                        </div>
                        <div className="text-lg sm:text-xl font-bold font-mono-accent text-[#F8F6FB] mt-1">
                          Admissions CRM
                        </div>
                        <div className="text-xs text-emerald-400 mt-1">
                          Online form, document upload & token generation
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-[#2A1830]/80 border border-[#6B4A87]/40">
                        <div className="text-[10px] font-mono-accent text-[#B9A6D1]">
                          MULTI-CAMPUS HQ CONSOLE
                        </div>
                        <div className="text-lg sm:text-xl font-bold font-mono-accent text-[#6B4A87] mt-1">
                          Multi-Branch Groups
                        </div>
                        <div className="text-xs text-[#B9A6D1] mt-1">
                          Consolidated finance, fee audits & campus comparisons
                        </div>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#1E1024]/80 border border-[#6B4A87]/30 flex items-center justify-between text-xs font-mono-accent text-[#B9A6D1]">
                      <span className="flex items-center space-x-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Security: Granular RBAC, Audit Logs & MFA</span>
                      </span>
                      <span className="text-[#E8A9C2]">
                        Cloud-Native Architecture
                      </span>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
