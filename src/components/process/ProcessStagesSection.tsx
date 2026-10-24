import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Calendar,
  Code2,
  FileText,
  Headphones,
  Lightbulb,
  Rocket,
  Target,
  Users,
} from "lucide-react";
import { soundEngine } from "../../utils/audioEngine";

type ProcessStage = {
  number: string;
  title: string;
  summary: string;
  icon: LucideIcon;
  detailLead: string;
  detailFollowUp: string;
  outcome: string;
  bullets: { icon: LucideIcon; text: string }[];
};

const STAGE_ICON_BOX =
  "flex h-11 w-11 items-center justify-center rounded-xl border border-[#E8A9C2]/30 bg-[#6B4A87] text-[#F8F6FB] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_0_22px_rgba(107,74,135,0.55)]";

const STAGE_ICON_BOX_ACTIVE =
  "flex h-11 w-11 items-center justify-center rounded-xl border border-[#E8A9C2]/45 bg-[#8558A5] text-[#F8F6FB] shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_0_28px_rgba(232,169,194,0.35)]";

const DETAIL_HERO_ICON =
  "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#E8A9C2]/40 bg-[#6B4A87] text-[#F8F6FB] shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_0_24px_rgba(107,74,135,0.5)]";

const BULLET_ICON_BOX =
  "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#E8A9C2]/35 bg-[#55356a] text-[#F8F6FB] shadow-[0_0_16px_rgba(107,74,135,0.4)]";

const PROCESS_STAGES: ProcessStage[] = [
  {
    number: "01",
    title: "Listen & Scope",
    summary: "Understand your goals, requirements and constraints.",
    icon: Lightbulb,
    detailLead:
      "We start by understanding your business, goals and challenges. We discuss your requirements, constraints and success metrics to define a clear and realistic scope for the project.",
    detailFollowUp:
      "Whether you need Kiduart, a custom website, a web app, or growth work, we clarify who uses the system day to day, what must ship first, and what can wait — so everyone agrees before design or code begins.",
    outcome: "You receive a short written scope and a recommended path forward.",
    bullets: [
      { icon: Users, text: "Understand your business and objectives" },
      { icon: FileText, text: "Discuss requirements and constraints" },
      { icon: Target, text: "Define scope and success metrics" },
      { icon: Lightbulb, text: "Align on product vs custom build where relevant" },
    ],
  },
  {
    number: "02",
    title: "Plan",
    summary: "Define scope, priorities, timeline and deliverables.",
    icon: Calendar,
    detailLead:
      "We translate scope into a plan you can review without jargon — milestones, owners, and what “done” means at each step.",
    detailFollowUp:
      "Roles and access are sketched early. If you are replacing spreadsheets or legacy tools, we map a parallel-run period so cutover is not a guess.",
    outcome: "Agreed plan, kickoff checklist, and visible risks up front.",
    bullets: [
      { icon: Target, text: "Priorities and milestones agreed" },
      { icon: Calendar, text: "Timeline and deliverables mapped" },
      { icon: FileText, text: "Written plan before build starts" },
      { icon: Users, text: "Owners and review points named" },
    ],
  },
  {
    number: "03",
    title: "Build",
    summary: "Develop your solution with regular updates and reviews.",
    icon: Code2,
    detailLead:
      "We ship usable slices, not a big-bang dump at the end. You see working increments and join demos built around your real workflows.",
    detailFollowUp:
      "Tests focus where they protect fees, attendance, or access. You get change notes so staff know what moved between reviews.",
    outcome: "Staging environment, review notes, and demos you can share internally.",
    bullets: [
      { icon: Code2, text: "Regular demos and review checkpoints" },
      { icon: Users, text: "Collaboration with your team" },
      { icon: FileText, text: "Staging environment you can click through" },
      { icon: Target, text: "Quality checks on critical paths" },
    ],
  },
  {
    number: "04",
    title: "Launch",
    summary: "Test, refine and deploy with confidence.",
    icon: Rocket,
    detailLead:
      "Go-live happens when numbers and roles match what you expect — not when a calendar date says so.",
    detailFollowUp:
      "We run parallel checks where it matters, walk staff through the live system, and keep a rollback path if something does not reconcile.",
    outcome: "Go-live checklist, support contact, and confidence the baseline is right.",
    bullets: [
      { icon: Target, text: "Testing against real workflows" },
      { icon: Rocket, text: "Controlled deployment" },
      { icon: FileText, text: "Go-live checklist and support contact" },
      { icon: Users, text: "Staff walkthrough before full cutover" },
    ],
  },
  {
    number: "05",
    title: "Support",
    summary: "Ongoing support and future improvements.",
    icon: Headphones,
    detailLead:
      "We stay available after launch — fixes from daily use, prioritised improvements, and optional next modules once the baseline is stable.",
    detailFollowUp:
      "You get business-day response for product and project questions, without invented MTTR or uptime theatre.",
    outcome: "Named support channel and a backlog shaped by real operator feedback.",
    bullets: [
      { icon: Headphones, text: "Business-day support channel" },
      { icon: Users, text: "Improvements from operator feedback" },
      { icon: Target, text: "Backlog for what comes next" },
      { icon: FileText, text: "Clear handoff docs and access" },
    ],
  },
];

/** Line + dots between step columns (same grid as stage cards). */
function StageConnectorRail() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-[1.75rem] z-[1] hidden h-8 lg:grid lg:grid-cols-5 lg:gap-4"
      aria-hidden
    >
      {PROCESS_STAGES.map((stage, index) => (
        <div key={stage.number} className="relative h-full">
          {index > 0 ? (
            <div className="absolute left-[-0.5rem] top-1/2 h-[2px] w-[calc(50%-0.5rem)] -translate-y-1/2 rounded-full bg-[#B9A6D1]/80 shadow-[0_0_10px_rgba(185,166,209,0.45)]" />
          ) : null}
          {index < PROCESS_STAGES.length - 1 ? (
            <>
              <div className="absolute left-[calc(50%+1rem)] top-1/2 h-[2px] w-[calc(50%+0.5rem)] -translate-y-1/2 rounded-full bg-[#B9A6D1]/80 shadow-[0_0_10px_rgba(185,166,209,0.45)]" />
              <span className="absolute left-[calc(100%+0.5rem)] top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#F8F6FB]/20 bg-[#E8A9C2] shadow-[0_0_14px_rgba(232,169,194,0.85)]" />
            </>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export function ProcessStagesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = PROCESS_STAGES[activeIndex];
  const ActiveIcon = active.icon;

  return (
    <section
      id="process-stages"
      aria-labelledby="process-stages-heading"
      className="trevyk-viewport-section trevyk-viewport-section--center relative border-t border-[#6B4A87]/30"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 70% 45% at 50% 0%, rgba(107,74,135,0.24) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#B9A6D1]/40 bg-[#1E1024]/90 px-4 py-1.5 font-mono-accent text-[11px] uppercase tracking-[0.2em] text-[#E8A9C2] sm:text-xs">
            <span
              className="h-2 w-2 shrink-0 rounded-full bg-[#E8A9C2] shadow-[0_0_10px_rgba(232,169,194,0.85)]"
              aria-hidden
            />
            Our process
          </div>

          <h2
            id="process-stages-heading"
            className="mt-5 font-heading text-[clamp(1.75rem,4vw,2.65rem)] font-bold leading-[1.12] tracking-tight text-[#F8F6FB]"
          >
            Our five-stage{" "}
            <span className="bg-gradient-to-r from-[#F8F6FB] via-[#D4C4DC] to-[#E8A9C2] bg-clip-text text-transparent">
              process
            </span>
          </h2>

          <p className="mt-4 text-base leading-relaxed text-[#C4B4D8] sm:text-[17px]">
            A structured and transparent approach to turn your ideas into
            reliable, well-built digital products.
          </p>
        </div>

        <div className="relative mt-10 sm:mt-12">
          <StageConnectorRail />

          <ul
            className="relative z-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4"
            role="tablist"
            aria-label="Process stages"
          >
            {PROCESS_STAGES.map((stage, index) => {
              const Icon = stage.icon;
              const isActive = index === activeIndex;
              return (
                <li key={stage.number} className="relative">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`process-stage-panel-${stage.number}`}
                    id={`process-stage-tab-${stage.number}`}
                    onClick={() => {
                      soundEngine.playClick("soft");
                      setActiveIndex(index);
                    }}
                    className={`relative flex w-full flex-col items-center rounded-2xl border px-3 pb-4 pt-3 text-center transition sm:px-4 ${
                      isActive
                        ? "border-[#E8A9C2]/55 bg-[#241428]/95 shadow-[0_0_32px_rgba(232,169,194,0.22),0_12px_32px_rgba(0,0,0,0.35)]"
                        : "border-[#B9A6D1]/26 bg-[#1E1024]/88 hover:border-[#B9A6D1]/45"
                    }`}
                  >
                    <span
                      className={`relative z-10 inline-flex h-8 w-8 items-center justify-center rounded-full font-mono-accent text-[11px] font-bold ${
                        isActive
                          ? "bg-[#E8A9C2] text-[#1E1024] ring-2 ring-[#1E1024]"
                          : "border border-[#B9A6D1]/35 bg-[#2A1830] text-[#B9A6D1] ring-2 ring-[#1E1024]"
                      }`}
                    >
                      {stage.number}
                    </span>
                    <div
                      className={`mt-3 ${isActive ? STAGE_ICON_BOX_ACTIVE : STAGE_ICON_BOX}`}
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.65} aria-hidden />
                    </div>
                    <h3 className="mt-3 font-heading text-sm font-bold leading-snug text-[#F8F6FB]">
                      {stage.title}
                    </h3>
                    <p className="mt-2 text-[11px] leading-relaxed text-[#B9A6D1] sm:text-xs">
                      {stage.summary}
                    </p>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <article
          id={`process-stage-panel-${active.number}`}
          role="tabpanel"
          aria-labelledby={`process-stage-tab-${active.number}`}
          className="relative mt-8 overflow-hidden rounded-2xl border border-[#B9A6D1]/30 bg-[#1E1024]/92 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.38)] sm:mt-10 sm:p-8 lg:p-10"
        >
          <div
            className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-[#8558A5]/25 blur-3xl"
            aria-hidden
          />

          <div className="relative grid gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-lg border border-[#6B4A87]/50 bg-[#2A1830]/90 px-3 py-1 font-mono-accent text-[10px] uppercase tracking-[0.14em] text-[#E8A9C2]">
                Stage {active.number}
              </div>
              <div className="mt-4 flex items-center gap-3">
                <div className={DETAIL_HERO_ICON}>
                  <ActiveIcon className="h-6 w-6" strokeWidth={1.65} aria-hidden />
                </div>
                <h3 className="font-heading text-2xl font-bold text-[#F8F6FB] sm:text-[1.65rem]">
                  {active.title}
                </h3>
              </div>
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#D8CCE6] sm:text-base">
                {active.detailLead}
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#C4B4D8] sm:text-[15px]">
                {active.detailFollowUp}
              </p>
              <div className="mt-6 rounded-xl border border-[#B9A6D1]/28 bg-[#2A1830]/75 px-4 py-3.5 sm:max-w-xl">
                <p className="font-mono-accent text-[10px] uppercase tracking-[0.12em] text-[#E8A9C2]">
                  What you leave with
                </p>
                <p className="mt-1.5 text-sm font-medium leading-snug text-[#F8F6FB]">
                  {active.outcome}
                </p>
              </div>
            </div>

            <ul className="flex flex-col justify-center gap-4 lg:col-span-5 lg:border-l lg:border-[#B9A6D1]/22 lg:pl-8">
              {active.bullets.map(({ icon: BulletIcon, text }) => (
                <li key={text} className="flex items-start gap-3">
                  <div className={BULLET_ICON_BOX}>
                    <BulletIcon className="h-4 w-4" strokeWidth={1.65} aria-hidden />
                  </div>
                  <p className="pt-1.5 text-sm leading-snug text-[#E7E1F0]">{text}</p>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </div>
    </section>
  );
}
