import React from "react";
import { Server, Terminal, Workflow } from "lucide-react";
import { SiteSettings } from "../types";
import { WowAccent } from "../components/WowAccent";
import { ScrollReveal } from "../components/ScrollReveal";
import { ProcessHeroSection } from "../components/process/ProcessHeroSection";
import { ProcessStagesSection } from "../components/process/ProcessStagesSection";
import { WhatYouCanExpectSection } from "../components/process/WhatYouCanExpectSection";
import { HaveAProjectInMindSection } from "../components/process/HaveAProjectInMindSection";

interface ProcessPageProps {
  settings: SiteSettings;
}

/** Archived — habits block kept for reference, not rendered. */
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
  return (
    <div id="process-page" className="relative w-full min-h-screen overflow-hidden">
      <ProcessHeroSection />
      <ProcessStagesSection />
      <WhatYouCanExpectSection />
      <HaveAProjectInMindSection />

      {false ? (
        <div className="relative z-10 mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
          <ScrollReveal className="mt-2" reducedMotion={settings.reducedMotion}>
            <div className="mb-8 grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
              <div className="max-w-2xl lg:col-span-8">
                <h2 className="font-heading text-2xl font-bold text-[#F8F6FB] sm:text-3xl">
                  Habits we keep on every engagement
                </h2>
                <p className="mt-2 text-sm text-[#B9A6D1]">
                  Practical quality not theatre.
                </p>
              </div>
              <div className="hidden justify-end lg:col-span-4 lg:flex">
                <WowAccent
                  kind="layers"
                  reducedMotion={settings.reducedMotion}
                  className="h-40 w-48"
                  caption="Quality stack"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {HABITS.map((h) => {
                const Icon = h.icon;
                return (
                  <div
                    key={h.title}
                    className="relative overflow-hidden rounded-2xl border border-[#B9A6D1]/30 bg-[#1E1024]/95 p-5 pl-5"
                  >
                    <div
                      className="absolute bottom-0 left-0 top-0 w-1 bg-gradient-to-b from-[#6B4A87] to-[#E8A9C2]"
                      aria-hidden
                    />
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-[#B9A6D1]/30 bg-[#2A1830] text-[#E8A9C2]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-heading text-base font-bold text-[#F8F6FB]">
                      {h.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-[#B9A6D1]">
                      {h.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      ) : null}
    </div>
  );
};
