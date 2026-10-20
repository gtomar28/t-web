import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Layers,
  ShieldCheck,
  Server,
  Lock,
  Globe2,
  Terminal,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Workflow,
  Boxes,
  Eye,
} from "lucide-react";
import { SiteSettings, TechCategory } from "../types";
import { ARCHITECTURE_CUBES } from "../data/architecture";
import { CAPABILITIES_DATA } from "../data/capabilities";
import { PageAtmosphere } from "../components/PageAtmosphere";
import { SectionBridge } from "../components/SectionBridge";
import { WowAccent } from "../components/WowAccent";
import { SplineMount } from "../components/3d/SplineMount";
import { ScrollReveal } from "../components/ScrollReveal";
import { MagneticCard } from "../components/MagneticCard";
import { soundEngine } from "../utils/audioEngine";
import { Link } from "react-router-dom";
import { StudioFrame } from "../components/StudioFrame";

interface TechnologyPageProps {
  settings: SiteSettings;
  onOpenArchitectureModal: (cubeIndex?: number | null) => void;
  hoveredCube: number | null;
  onCubeHover: (index: number | null) => void;
}

const ENGINEERING_PRINCIPLES = [
  {
    title: "Modular by default",
    body: "Separate domains so a fees change does not force an attendance rewrite  the same idea behind our Core Block metaphor.",
    icon: Boxes,
  },
  {
    title: "Contracts over folklore",
    body: "Typed APIs, clear ownership of services, and documented handoffs so teams can extend systems without tribal knowledge.",
    icon: Workflow,
  },
  {
    title: "Observable in production",
    body: "Logging, error paths, and audit trails where sensitive actions happen  so support can answer what changed, and when.",
    icon: Eye,
  },
  {
    title: "Honest security claims",
    body: "RBAC, encryption where configured, export paths  published as shipped controls, not borrowed certification badges.",
    icon: ShieldCheck,
  },
];

export const TechnologyPage: React.FC<TechnologyPageProps> = ({
  settings,
  onOpenArchitectureModal,
  onCubeHover,
}) => {
  const [selectedCube, setSelectedCube] = useState<number>(0);
  const [activeCategory, setActiveCategory] = useState<TechCategory>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [focusedCapability, setFocusedCapability] = useState<string | null>(
    null,
  );

  const filterTabs: { id: TechCategory; label: string }[] = [
    { id: "all", label: "All" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "cloud", label: "Cloud" },
    { id: "testing", label: "Quality" },
    { id: "ai", label: "Data & AI" },
    { id: "databases", label: "Databases" },
  ];

  const filteredCapabilities = CAPABILITIES_DATA.filter((item) => {
    const matchesCategory =
      activeCategory === "all" ||
      item.category === activeCategory ||
      (activeCategory === "ai" && item.category === "data");
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      item.name.toLowerCase().includes(q) ||
      item.usageNote.toLowerCase().includes(q) ||
      item.tag.toLowerCase().includes(q) ||
      item.badge.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const focusedItem =
    CAPABILITIES_DATA.find((c) => c.id === focusedCapability) || null;

  const activeCubeData =
    ARCHITECTURE_CUBES[selectedCube] || ARCHITECTURE_CUBES[0];

  return (
    <div
      id="technology-page"
      className="relative w-full min-h-screen pt-36 sm:pt-44 pb-28 overflow-hidden"
    >
      <PageAtmosphere
        variant="technology"
        lightBand={{ top: "48%", height: "16%" }}
        bands={[
          { top: "22%", height: "10%", tone: "ink" },
          { top: "74%", height: "12%", tone: "pink" },
        ]}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <ScrollReveal reducedMotion={settings.reducedMotion}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8 max-w-3xl">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#1E1024]/95 border border-[#B9A6D1]/40 text-[#E8A9C2] font-mono-accent text-xs mb-5">
                <Terminal className="w-3.5 h-3.5" />
                <span>ENGINEERING & ARCHITECTURE</span>
              </div>

              <h1 className="font-heading font-bold text-3xl sm:text-5xl lg:text-[3.15rem] text-[#F8F6FB] leading-[1.12] tracking-tight">
                How we design systems{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F8F6FB] via-[#B9A6D1] to-[#E8A9C2]">
                  that stay maintainable
                </span>
              </h1>

              <p className="mt-5 text-[#B9A6D1] text-base sm:text-lg leading-relaxed max-w-2xl">
                A practical map of Trevyk’s engineering approach the tools we
                reach for, the modular architecture behind products like{" "}
                <Link
                  to="/kiduart"
                  className="text-[#E8A9C2] font-semibold underline underline-offset-2 hover:text-[#F8F6FB]"
                >
                  Kiduart
                </Link>
                , and the security controls we actually ship.
              </p>
            </div>

            <div className="lg:col-span-4 hidden lg:flex flex-col items-end gap-5 pb-1">
              <SplineMount
                reducedMotion={settings.reducedMotion}
                className="w-full max-w-[280px]"
                caption="Interactive stack"
              />
              <div className="text-right">
                <div className="font-mono-accent text-[10px] tracking-[0.25em] uppercase text-[#E8A9C2]/80">
                  Atlas
                </div>
                <div className="font-heading font-bold text-4xl text-[#F8F6FB]">
                  {CAPABILITIES_DATA.length}
                </div>
                <div className="text-xs text-[#B9A6D1] text-right">
                  capabilities · {ARCHITECTURE_CUBES.length} architecture layers
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-mono-accent text-[11px] uppercase tracking-[0.22em] text-[#E8A9C2]">
              Same standard on every page
            </p>
            <h2 className="mt-3 font-heading text-2xl font-bold text-[#F8F6FB] sm:text-3xl">
              Systems a growing company can keep running
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#E7E1F0] sm:text-base">
              Technology here means the stack behind a website, a web app, or
              Kiduart: modular pieces, documented handoff, and security claims
              we actually ship. The painting is the same studio language as the
              rest of the site, not a stock screenshot.
            </p>
            <Link to="/work/web-applications" className="mt-4 inline-block text-sm text-[#E8A9C2] underline underline-offset-2">
              Read how web applications are scoped
            </Link>
          </div>
          <div className="lg:col-span-7">
            <StudioFrame
              src="/images/studio-technology.jpg"
              alt="Gouache painting of stacked blocks suggesting software layers"
              caption="Architecture stays visible. The customer should still understand the offer."
              kicker="Technology"
            />
          </div>
        </div>

        {/* Principles bridge */}
        <ScrollReveal
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
          delay={0.05}
          reducedMotion={settings.reducedMotion}
        >
          {ENGINEERING_PRINCIPLES.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="relative overflow-hidden p-4 pl-5 rounded-2xl bg-[#1E1024]/90 border border-[#B9A6D1]/30"
              >
                <div
                  className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#6B4A87] to-[#E8A9C2]"
                  aria-hidden
                />
                <Icon className="w-4 h-4 text-[#E8A9C2] mb-2" />
                <div className="font-heading font-bold text-sm text-[#F8F6FB]">
                  {p.title}
                </div>
                <p className="mt-1.5 text-[11px] text-[#B9A6D1] leading-relaxed">
                  {p.body}
                </p>
              </div>
            );
          })}
        </ScrollReveal>

        <SectionBridge
          className="mt-10"
          label="Stack"
          reducedMotion={settings.reducedMotion}
        />

        <div className="mt-2 mb-8 hidden lg:flex justify-end pr-6">
          <WowAccent
            kind="pipeline"
            reducedMotion={settings.reducedMotion}
            className="w-48 h-40"
            caption="In → core → out"
          />
        </div>

        {/* Capability atlas */}
        <div id="capability-atlas" className="mt-2">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#1E1024] border border-[#B9A6D1]/40 text-[#E8A9C2] font-mono-accent text-xs mb-3">
              <span className="font-semibold text-[#F8F6FB]/50">01</span>
              <span>CAPABILITY ATLAS</span>
            </div>
            <h2 className="font-heading font-bold text-2xl sm:text-4xl text-[#F8F6FB]">
              Technologies we put to work
            </h2>
            <p className="mt-3 text-sm text-[#B9A6D1] leading-relaxed">
              Filter by layer. Each card explains where the tool fits in real
              product and custom delivery not a buzzword wall.
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-[#B9A6D1]/25">
            <div className="flex flex-wrap gap-2">
              {filterTabs.map((tab) => {
                const isActive = activeCategory === tab.id;
                const count =
                  tab.id === "all"
                    ? CAPABILITIES_DATA.length
                    : CAPABILITIES_DATA.filter(
                        (c) =>
                          c.category === tab.id ||
                          (tab.id === "ai" && c.category === "data"),
                      ).length;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      soundEngine.playClick("soft");
                      setActiveCategory(tab.id);
                    }}
                    className={`relative px-3.5 py-2 rounded-full text-xs font-mono-accent transition-all flex items-center space-x-1.5 ${
                      isActive
                        ? "text-[#F8F6FB] font-semibold bg-[#6B4A87] border border-[#E8A9C2]/40 shadow-[0_8px_20px_rgba(107,74,135,0.35)]"
                        : "bg-[#1E1024]/90 text-[#B9A6D1] border border-[#B9A6D1]/30 hover:text-[#F8F6FB] hover:border-[#E8A9C2]/45"
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`text-[10px] px-1.5 rounded-full ${
                        isActive
                          ? "bg-[#1E1024] text-[#E8A9C2]"
                          : "bg-[#2A1830] text-[#B9A6D1]"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="relative w-full md:w-64">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search stack…"
                className="w-full bg-[#1E1024]/95 border border-[#B9A6D1]/35 focus:border-[#E8A9C2] rounded-xl px-3.5 py-2 text-xs font-mono-accent text-[#F8F6FB] placeholder-[#B9A6D1]/50 outline-none transition-colors"
              />
            </div>
          </div>

          <motion.div
            layout
            className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredCapabilities.map((item) => {
                const isFocused = focusedCapability === item.id;
                return (
                  <MagneticCard
                    key={item.id}
                    reducedMotion={settings.reducedMotion}
                    className="h-full"
                  >
                    <motion.button
                      type="button"
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{
                        opacity: focusedCapability && !isFocused ? 0.45 : 1,
                        y: 0,
                      }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      onClick={() => {
                        soundEngine.playClick("soft");
                        setFocusedCapability((prev) =>
                          prev === item.id ? null : item.id,
                        );
                      }}
                      className={`relative overflow-hidden p-5 pl-6 rounded-2xl bg-[#1E1024]/95 border text-left w-full h-full transition-colors flex flex-col justify-between group shadow-[0_12px_30px_rgba(0,0,0,0.25)] ${
                        isFocused
                          ? "border-[#E8A9C2] bg-[#24132B]"
                          : "border-[#B9A6D1]/30 hover:border-[#E8A9C2]/55 hover:bg-[#24132B]"
                      }`}
                    >
                      <div
                        className="absolute left-0 top-0 bottom-0 w-1"
                        style={{
                          background: `linear-gradient(180deg, ${item.color}, #E8A9C2)`,
                        }}
                        aria-hidden
                      />
                      <div>
                        <div className="flex items-center justify-between mb-3 gap-2">
                          <span className="text-[10px] font-mono-accent px-2 py-0.5 rounded bg-[#2A1830] text-[#E8A9C2] border border-[#B9A6D1]/25 uppercase tracking-wide">
                            {item.category}
                          </span>
                          <span className="text-[10px] font-mono-accent text-[#B9A6D1] truncate">
                            {item.tag}
                          </span>
                        </div>

                        <h3 className="font-heading font-bold text-base sm:text-lg text-[#F8F6FB] group-hover:text-[#E8A9C2] transition-colors flex items-center gap-2">
                          <span
                            className="w-2.5 h-2.5 rounded-full shrink-0"
                            style={{ backgroundColor: item.color }}
                          />
                          <span>{item.name}</span>
                        </h3>

                        <p className="mt-2.5 text-xs text-[#B9A6D1] leading-relaxed">
                          {item.usageNote}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#B9A6D1]/20 flex items-center justify-between text-[11px] font-mono-accent text-[#B9A6D1]">
                        <span>{item.badge}</span>
                        <span className="text-[#E8A9C2]">
                          {isFocused ? "Pinned" : "Pin"}
                        </span>
                      </div>
                    </motion.button>
                  </MagneticCard>
                );
              })}
            </AnimatePresence>
          </motion.div>

          <AnimatePresence>
            {focusedItem && (
              <motion.div
                key={focusedItem.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="mt-6 p-5 sm:p-6 rounded-2xl border border-[#E8A9C2]/45 bg-[#1E1024]/95 shadow-[0_16px_40px_rgba(0,0,0,0.3)]"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <div className="text-[10px] font-mono-accent text-[#E8A9C2] uppercase tracking-widest">
                      Stack explorer · focused
                    </div>
                    <h3 className="font-heading font-bold text-xl text-[#F8F6FB] mt-1">
                      {focusedItem.name}
                    </h3>
                    <p className="mt-2 text-sm text-[#B9A6D1] leading-relaxed max-w-2xl">
                      {focusedItem.usageNote}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFocusedCapability(null)}
                    className="text-xs font-mono-accent text-[#E8A9C2] hover:text-[#F8F6FB] shrink-0"
                  >
                    Clear focus
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {filteredCapabilities.length === 0 && (
            <div className="text-center py-14 bg-[#1E1024]/70 rounded-2xl border border-[#B9A6D1]/25 mt-6">
              <p className="text-sm font-mono-accent text-[#B9A6D1]">
                No matches for “{searchQuery}”.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className="mt-3 text-xs font-mono-accent text-[#E8A9C2] hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        <SectionBridge
          className="mt-10"
          label="Architecture"
          tone="lilac"
          reducedMotion={settings.reducedMotion}
        />

        {/* 5-cube inspector */}
        <div id="architecture-tiers" className="mt-2">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#1E1024] border border-[#B9A6D1]/40 text-[#E8A9C2] font-mono-accent text-xs mb-3">
              <span className="font-semibold text-[#F8F6FB]/50">02</span>
              <span>MODULAR TIERS</span>
            </div>
            <h2 className="font-heading font-bold text-2xl sm:text-4xl text-[#F8F6FB]">
              Five layers. One coherent system.
            </h2>
            <p className="mt-3 text-sm text-[#B9A6D1] leading-relaxed">
              Select a tier to inspect responsibilities and stack. The
              persistent 3D Core Block highlights the active layer as you
              explore.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            <div className="lg:col-span-5 space-y-2.5">
              {ARCHITECTURE_CUBES.map((cube, index) => {
                const isSelected = selectedCube === index;
                return (
                  <button
                    key={cube.id}
                    type="button"
                    onClick={() => {
                      soundEngine.playClick("soft");
                      setSelectedCube(index);
                    }}
                    onMouseEnter={() => {
                      soundEngine.playHover();
                      onCubeHover(index);
                    }}
                    onMouseLeave={() => onCubeHover(null)}
                    className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 group ${
                      isSelected
                        ? "bg-[#1E1024] border-[#E8A9C2] shadow-[0_0_24px_rgba(232,169,194,0.18)]"
                        : "bg-[#1E1024]/80 border-[#B9A6D1]/25 hover:border-[#E8A9C2]/45"
                    }`}
                  >
                    <div className="flex items-center space-x-3.5 min-w-0">
                      <div
                        className="w-3.5 h-3.5 rounded-full shrink-0 transition-transform group-hover:scale-125"
                        style={{ backgroundColor: cube.color }}
                      />
                      <div className="min-w-0">
                        <div className="text-[10px] font-mono-accent text-[#B9A6D1]">
                          LAYER 0{index + 1}
                        </div>
                        <div className="font-heading font-bold text-sm text-[#F8F6FB] group-hover:text-[#E8A9C2] transition-colors truncate">
                          {cube.name}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono-accent px-2 py-0.5 rounded bg-[#2A1830] text-[#B9A6D1] border border-[#B9A6D1]/25 shrink-0">
                      {cube.role}
                    </span>
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => onOpenArchitectureModal(selectedCube)}
                className="w-full mt-2 py-3 rounded-xl bg-[#2A1830] border border-[#B9A6D1]/40 text-[#E8A9C2] hover:border-[#E8A9C2] text-xs font-mono-accent flex items-center justify-center space-x-2 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Open full architecture blueprint</span>
              </button>
            </div>

            <div className="lg:col-span-7 relative p-6 sm:p-8 rounded-3xl bg-[#1E1024]/95 border border-[#B9A6D1]/35 shadow-[0_24px_50px_rgba(0,0,0,0.35)] space-y-6 overflow-hidden">
              <div
                className="absolute -right-10 -top-10 w-40 h-40 rounded-full blur-3xl opacity-40 pointer-events-none"
                style={{
                  background: `radial-gradient(circle, ${activeCubeData.color}55, transparent 70%)`,
                }}
                aria-hidden
              />

              <div className="relative flex items-center justify-between pb-4 border-b border-[#B9A6D1]/25 gap-3">
                <div className="flex items-center space-x-3 min-w-0">
                  <div
                    className="w-4 h-4 rounded-full shrink-0"
                    style={{ backgroundColor: activeCubeData.color }}
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono-accent text-[#E8A9C2] tracking-wider">
                      ACTIVE SPEC
                    </span>
                    <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#F8F6FB] truncate">
                      {activeCubeData.name}
                    </h3>
                  </div>
                </div>
                <span className="text-xs font-mono-accent text-[#E8A9C2] bg-[#2A1830] px-3 py-1 rounded-full border border-[#B9A6D1]/30 shrink-0">
                  Cube 0{selectedCube + 1}
                </span>
              </div>

              <p className="relative text-sm text-[#B9A6D1] leading-relaxed">
                {activeCubeData.description}
              </p>

              <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-[#2A1830]/90 border border-[#B9A6D1]/25">
                  <div className="text-[10px] font-mono-accent text-[#E8A9C2] uppercase tracking-wider">
                    Protocols
                  </div>
                  <div className="mt-1 text-xs text-[#F8F6FB] font-mono-accent">
                    {activeCubeData.specs?.protocol || "HTTPS / REST"}
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-[#2A1830]/90 border border-[#B9A6D1]/25">
                  <div className="text-[10px] font-mono-accent text-[#E8A9C2] uppercase tracking-wider">
                    Design intent
                  </div>
                  <div className="mt-1 text-xs text-[#B9A6D1] font-mono-accent">
                    {activeCubeData.specs?.latency || "Responsive product UX"}
                  </div>
                </div>
              </div>

              <div className="relative space-y-2.5">
                <div className="text-[10px] font-mono-accent text-[#E8A9C2] uppercase tracking-wider">
                  Responsibilities
                </div>
                {activeCubeData.responsibilities?.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-2 text-xs text-[#B9A6D1]"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#E8A9C2] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="relative">
                <div className="text-[10px] font-mono-accent text-[#E8A9C2] uppercase tracking-wider mb-2">
                  Typical stack
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeCubeData.techStack?.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono-accent bg-[#2A1830] text-[#E8A9C2] border border-[#B9A6D1]/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <SectionBridge
          className="mt-10"
          label="Trust"
          tone="pink"
          reducedMotion={settings.reducedMotion}
        />

        {/* Security */}
        <div id="security-practices" className="mt-2">
          <div className="max-w-2xl mb-10">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#1E1024] border border-[#B9A6D1]/40 text-[#E8A9C2] font-mono-accent text-xs mb-3">
              <span className="font-semibold text-[#F8F6FB]/50">03</span>
              <span>SECURITY PRACTICES</span>
            </div>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#F8F6FB]">
              Controls we ship not badges we borrow
            </h2>
            <p className="mt-3 text-sm text-[#B9A6D1] leading-relaxed">
              The same honesty standard as Kiduart: publish what exists.
              Anything not audited stays unpublished.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: ShieldCheck,
                title: "Role-based access",
                body: "Each role sees only the work it needs  teachers, accountants, leadership, parents.",
              },
              {
                icon: Lock,
                title: "Encrypted storage",
                body: "Sensitive records protected in transit and at rest where encryption is configured.",
              },
              {
                icon: Globe2,
                title: "Data export",
                body: "School data can leave with the school  CSV, Excel, or PDF on request.",
              },
              {
                icon: Server,
                title: "Audit logging",
                body: "Sensitive admin actions leave a trail: who changed what, and when.",
              },
            ].map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="relative overflow-hidden p-5 rounded-2xl bg-[#1E1024]/95 border border-[#B9A6D1]/30 text-left space-y-2"
                >
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#6B4A87] to-[#E8A9C2]"
                    aria-hidden
                  />
                  <div className="w-10 h-10 rounded-xl bg-[#2A1830] border border-[#B9A6D1]/30 flex items-center justify-center text-[#E8A9C2]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="font-heading font-bold text-sm text-[#F8F6FB]">
                    {card.title}
                  </div>
                  <div className="text-[11px] text-[#B9A6D1] leading-relaxed">
                    {card.body}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 relative rounded-3xl border border-[#B9A6D1]/35 bg-[#1E1024]/95 p-8 sm:p-10 overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.4)]">
          <div
            className="absolute -right-16 -top-16 w-64 h-64 rounded-full blur-3xl opacity-40 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(232,169,194,0.35), transparent 70%)",
            }}
            aria-hidden
          />
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <span className="text-[10px] font-mono-accent text-[#E8A9C2] uppercase tracking-widest">
                Next step
              </span>
              <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#F8F6FB] mt-2">
                Need a stack recommendation for your build?
              </h3>
              <p className="text-sm text-[#B9A6D1] mt-2 max-w-xl leading-relaxed">
                Walk through architecture tradeoffs for your scale or see how
                the same modular thinking powers Kiduart.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
              <Link
                to="/contact"
                onClick={() => soundEngine.playClick("hero")}
                className="inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#6B4A87] to-[#8558A5] text-[#F8F6FB] font-heading text-xs font-semibold border border-[#E8A9C2]/25 shadow-[0_10px_28px_rgba(107,74,135,0.35)]"
              >
                <span>Talk architecture</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/kiduart"
                onClick={() => soundEngine.playClick("soft")}
                className="inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-full bg-[#2A1830] border border-[#B9A6D1]/40 text-[#B9A6D1] hover:text-[#F8F6FB] text-xs font-mono-accent"
              >
                <Layers className="w-3.5 h-3.5 text-[#E8A9C2]" />
                <span>Explore Kiduart ERP</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
