import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  GitMerge,
  Search,
  Code2,
  Rocket,
  CheckCircle2,
  ArrowRight,
  FileCode,
  Server,
  Activity,
  Workflow,
  Terminal,
  Play,
  Pause,
} from "lucide-react";
import { SiteSettings } from "../types";
import { PageAtmosphere } from "../components/PageAtmosphere";
import { SectionBridge } from "../components/SectionBridge";
import { WowAccent } from "../components/WowAccent";
import { ScrollReveal } from "../components/ScrollReveal";
import { soundEngine } from "../utils/audioEngine";
import { Link } from "react-router-dom";
import { StudioFrame } from "../components/StudioFrame";

interface ProcessPageProps {
  settings: SiteSettings;
}

const STEPS = [
  {
    number: "01",
    title: "Listen & scope",
    shortName: "Listen",
    timeline: "Start",
    tagline:
      "Understand the school or business problem before proposing software.",
    details: [
      "Clarify who will use the system day to day",
      "Separate must-haves from nice-to-haves",
      "Decide product (Kiduart) vs custom build vs both",
      "Capture constraints: data, roles, timelines, budget band",
    ],
    output: "Short written scope + recommended path",
    icon: Search,
  },
  {
    number: "02",
    title: "Agree the plan",
    shortName: "Plan",
    timeline: "Next",
    tagline: "A clear plan with stages, owners, and what “done” means.",
    details: [
      "Milestones you can review without jargon",
      "Roles and access model sketched early",
      "Parallel-run plan when replacing spreadsheets or legacy tools",
      "Honest risks and open questions listed up front",
    ],
    output: "Agreed plan & kickoff checklist",
    icon: Workflow,
  },
  {
    number: "03",
    title: "Build in stages",
    shortName: "Build",
    timeline: "Delivery",
    tagline: "Ship usable slices  not a big-bang dump at the end.",
    details: [
      "Working increments you can click through",
      "Regular demos with your real workflows in mind",
      "Tests where they protect fees, attendance, or access",
      "Change notes so staff know what moved",
    ],
    output: "Staging environment + review notes",
    icon: Code2,
  },
  {
    number: "04",
    title: "Launch carefully",
    shortName: "Launch",
    timeline: "Go-live",
    tagline: "Go live only when numbers and roles match what you expect.",
    details: [
      "Parallel check for fees / attendance when switching systems",
      "Staff walkthrough before full cutover",
      "Rollback / pause option if something does not reconcile",
      "Privacy basics: roles, export, audit trail",
    ],
    output: "Go-live checklist + support contact",
    icon: Rocket,
  },
  {
    number: "05",
    title: "Support & iterate",
    shortName: "Support",
    timeline: "Ongoing",
    tagline: "Stay available after launch  improve what daily use reveals.",
    details: [
      "Business-day response for product and project questions",
      "Prioritised fixes from real operator feedback",
      "Optional next modules once the baseline is stable",
      "No invented MTTR or uptime warranty theatre",
    ],
    output: "Support channel + improvement backlog",
    icon: Activity,
  },
];

const HABITS = [
  {
    icon: Terminal,
    title: "Review before release",
    body: "Changes that touch fees, attendance, or access get an extra check. We do not ship “trust us” updates into live school data.",
  },
  {
    icon: Server,
    title: "Parallel when it matters",
    body: "For school cutovers we prefer running old and new methods side by side until numbers agree  the same idea Kiduart publishes publicly.",
  },
  {
    icon: Workflow,
    title: "Written handoff",
    body: "You leave with docs, access, and a named contact  not a black box. Custom work includes source ownership.",
  },
];

export const ProcessPage: React.FC<ProcessPageProps> = ({ settings }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const playRef = useRef(false);
  const active = STEPS[activeStep];
  const ActiveIcon = active.icon;
  const progress = ((activeStep + 1) / STEPS.length) * 100;

  useEffect(() => {
    playRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying || settings.reducedMotion) return;
    const id = window.setInterval(() => {
      if (!playRef.current) return;
      setActiveStep((prev) => {
        if (prev >= STEPS.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        soundEngine.playClick("soft");
        return prev + 1;
      });
    }, 2800);
    return () => window.clearInterval(id);
  }, [isPlaying, settings.reducedMotion]);

  return (
    <div
      id="process-page"
      className="relative w-full min-h-screen pt-36 sm:pt-44 pb-28 overflow-hidden"
    >
      <PageAtmosphere
        variant="process"
        lightBand={{ top: "45%", height: "14%" }}
        bands={[
          { top: "20%", height: "10%", tone: "ink" },
          { top: "76%", height: "12%", tone: "pink" },
        ]}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal reducedMotion={settings.reducedMotion}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8 max-w-3xl">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#1E1024]/95 border border-[#B9A6D1]/40 text-[#E8A9C2] font-mono-accent text-xs mb-5">
                <GitMerge className="w-3.5 h-3.5" />
                <span>HOW WE DELIVER · 5 STAGES</span>
              </div>
              <h1 className="font-heading font-bold text-3xl sm:text-5xl lg:text-[3.15rem] text-[#F8F6FB] leading-[1.12] tracking-tight">
                Delivery that stays{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F8F6FB] via-[#B9A6D1] to-[#E8A9C2]">
                  clear from day one
                </span>
              </h1>
              <p className="mt-5 text-[#B9A6D1] text-base sm:text-lg leading-relaxed max-w-2xl">
                The same practical path whether you adopt{" "}
                <Link
                  to="/kiduart"
                  className="text-[#E8A9C2] font-semibold underline underline-offset-2"
                >
                  Kiduart
                </Link>{" "}
                or commission a website, a web app, SEO, or a campaign. Listen,
                plan, build in slices, launch carefully, then support.
              </p>
            </div>
            <div className="lg:col-span-4 hidden lg:flex flex-col items-end gap-5 pb-1">
              <WowAccent
                kind="pipeline"
                reducedMotion={settings.reducedMotion}
                className="w-48 h-40"
                focus={activeStep}
                caption="Delivery signal"
              />
              <div className="text-right">
                <div className="font-mono-accent text-[10px] tracking-[0.25em] uppercase text-[#E8A9C2]/80">
                  Stages
                </div>
                <div className="font-heading font-bold text-4xl text-[#F8F6FB]">
                  05
                </div>
                <div className="text-xs text-[#B9A6D1] text-right">
                  no invented SLA theatre
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7 lg:order-2">
            <StudioFrame
              src="/images/studio-process.jpg"
              alt="Gouache painting of a garden path used as a picture of delivery stages"
              caption="Five stages, written so a founder can follow them without a diagram legend."
              kicker="Process"
            />
          </div>
          <div className="lg:col-span-5 lg:order-1">
            <h2 className="font-heading text-2xl font-bold text-[#F8F6FB] sm:text-3xl">
              The same path for a website, an app, or a campaign
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#E7E1F0] sm:text-base">
              Listen, plan, build in slices, launch, then support. That applies
              to a starter website, a web application, SEO, or a social
              calendar. You see a working piece before the whole engagement
              is called done.
            </p>
            <Link to="/contact" className="mt-4 inline-block text-sm text-[#E8A9C2] underline underline-offset-2">
              Start with a scoped plan
            </Link>
          </div>
        </div>

        <SectionBridge
          className="mt-8"
          label="Stages"
          reducedMotion={settings.reducedMotion}
        />

        <ScrollReveal
          className="mt-2"
          delay={0.05}
          reducedMotion={settings.reducedMotion}
        >
          <div className="mb-6">
            <div className="flex items-center justify-between gap-3 text-[10px] font-mono-accent text-[#B9A6D1] mb-2">
              <span>
                Stage {active.number} / {STEPS.length}
              </span>
              <div className="flex items-center gap-3">
                <span className="hidden sm:inline">{active.title}</span>
                {!settings.reducedMotion && (
                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playClick("soft");
                      if (!isPlaying && activeStep >= STEPS.length - 1) {
                        setActiveStep(0);
                      }
                      setIsPlaying((p) => !p);
                    }}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[#B9A6D1]/35 text-[#E8A9C2] hover:border-[#E8A9C2] hover:text-[#F8F6FB] transition-colors"
                    aria-pressed={isPlaying}
                    aria-label={isPlaying ? "Pause timeline" : "Play timeline"}
                  >
                    {isPlaying ? (
                      <Pause className="w-3 h-3" />
                    ) : (
                      <Play className="w-3 h-3" />
                    )}
                    <span>{isPlaying ? "Pause" : "Play stages"}</span>
                  </button>
                )}
              </div>
            </div>
            <div className="h-1.5 rounded-full bg-[#1E1024] border border-[#B9A6D1]/20 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#6B4A87] via-[#B9A6D1] to-[#E8A9C2]"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-8">
            {STEPS.map((step, idx) => (
              <button
                key={step.number}
                type="button"
                onClick={() => {
                  soundEngine.playClick("soft");
                  setIsPlaying(false);
                  setActiveStep(idx);
                }}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  activeStep === idx
                    ? "bg-[#1E1024] border-[#E8A9C2] shadow-[0_0_20px_rgba(232,169,194,0.18)]"
                    : "bg-[#1E1024]/80 border-[#B9A6D1]/25 hover:border-[#E8A9C2]/45"
                }`}
              >
                <span
                  className={`inline-flex w-7 h-7 rounded-full items-center justify-center font-mono-accent font-bold text-[10px] mb-1.5 ${
                    activeStep === idx
                      ? "bg-[#E8A9C2] text-[#241428]"
                      : "bg-[#2A1830] text-[#B9A6D1]"
                  }`}
                >
                  {step.number}
                </span>
                <div className="text-[11px] font-heading font-semibold text-[#F8F6FB]">
                  {step.shortName}
                </div>
                <div className="text-[10px] font-mono-accent text-[#B9A6D1]">
                  {step.timeline}
                </div>
              </button>
            ))}
          </div>

          <div className="relative p-6 sm:p-8 rounded-3xl surface-ink border border-[#B9A6D1]/35 shadow-[0_24px_50px_rgba(0,0,0,0.35)] overflow-hidden">
            <div
              className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#6B4A87] via-[#B9A6D1] to-[#E8A9C2]"
              aria-hidden
            />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#6B4A87] to-[#8558A5] text-[#F8F6FB] flex items-center justify-center">
                  <ActiveIcon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[10px] font-mono-accent text-[#E8A9C2] uppercase tracking-wider">
                    Stage {active.number} · {active.timeline}
                  </div>
                  <h2 className="font-heading font-bold text-xl sm:text-2xl text-[#F8F6FB]">
                    {active.title}
                  </h2>
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm text-[#B9A6D1] leading-relaxed max-w-3xl">
              {active.tagline}
            </p>

            <AnimatePresence mode="wait">
              <motion.div
                key={active.number}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.28 }}
                className="mt-6 pt-6 border-t border-[#B9A6D1]/20 space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {active.details.map((detail) => (
                    <div
                      key={detail}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-[#2A1830]/90 border border-[#B9A6D1]/25 text-xs text-[#B9A6D1]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#E8A9C2] shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
                <div className="p-4 rounded-xl bg-[#2A1830] border border-[#B9A6D1]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-[#E8A9C2]" />
                    <span className="text-[10px] font-mono-accent text-[#B9A6D1] uppercase tracking-wider">
                      Stage artifact
                    </span>
                  </div>
                  <span className="text-xs font-mono-accent text-[#E8A9C2]">
                    {active.output}
                  </span>
                </div>
                {activeStep < STEPS.length - 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playClick("soft");
                      setIsPlaying(false);
                      setActiveStep((s) => s + 1);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-mono-accent text-[#E8A9C2] hover:text-[#F8F6FB]"
                  >
                    Next: {STEPS[activeStep + 1].title}{" "}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </ScrollReveal>

        <SectionBridge
          className="mt-10"
          label="Habits"
          tone="lilac"
          reducedMotion={settings.reducedMotion}
        />

        <ScrollReveal className="mt-2" reducedMotion={settings.reducedMotion}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-8">
            <div className="lg:col-span-8 max-w-2xl">
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#F8F6FB]">
                Habits we keep on every engagement
              </h2>
              <p className="mt-2 text-sm text-[#B9A6D1]">
                Practical quality not theatre.
              </p>
            </div>
            <div className="lg:col-span-4 hidden lg:flex justify-end">
              <WowAccent
                kind="layers"
                reducedMotion={settings.reducedMotion}
                className="w-48 h-40"
                caption="Quality stack"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {HABITS.map((h) => {
              const Icon = h.icon;
              return (
                <div
                  key={h.title}
                  className="relative overflow-hidden p-5 pl-5 rounded-2xl bg-[#1E1024]/95 border border-[#B9A6D1]/30"
                >
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#6B4A87] to-[#E8A9C2]"
                    aria-hidden
                  />
                  <div className="w-10 h-10 rounded-xl bg-[#2A1830] border border-[#B9A6D1]/30 flex items-center justify-center text-[#E8A9C2] mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-bold text-base text-[#F8F6FB]">
                    {h.title}
                  </h3>
                  <p className="mt-2 text-xs text-[#B9A6D1] leading-relaxed">
                    {h.body}
                  </p>
                </div>
              );
            })}
          </div>
        </ScrollReveal>

        <ScrollReveal className="mt-16" reducedMotion={settings.reducedMotion}>
          <div className="relative rounded-3xl border border-[#B9A6D1]/35 bg-[#1E1024]/95 p-8 sm:p-10 overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.4)] text-center">
            <div
              className="absolute -right-16 -top-16 w-64 h-64 rounded-full blur-3xl opacity-35 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(232,169,194,0.4), transparent 70%)",
              }}
              aria-hidden
            />
            <h2 className="relative font-heading font-bold text-2xl sm:text-3xl text-[#F8F6FB]">
              Ready to start with a clear scope?
            </h2>
            <p className="relative text-sm text-[#B9A6D1] max-w-xl mx-auto mt-3 leading-relaxed">
              Book a Kiduart demo or tell us about a custom build. We reply with
              next steps not a jargon deck.
            </p>
            <div className="relative pt-6">
              <Link
                to="/contact"
                onClick={() => soundEngine.playClick("hero")}
                className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-[#6B4A87] text-[#F8F6FB] font-heading text-xs sm:text-sm font-semibold hover:bg-[#8558A5] border border-[#E8A9C2]/25 shadow-[0_12px_28px_rgba(107,74,135,0.35)]"
              >
                <span>Contact Trevyk</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};
