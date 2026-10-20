import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Compass,
  MessageSquare,
  Code2,
  Rocket,
  RefreshCw,
  Pause,
  Play,
} from "lucide-react";
import { SiteSettings } from "../../types";
import { soundEngine } from "../../utils/audioEngine";
import { ScrollReveal } from "../ScrollReveal";
import { DeliveryPipelineRail } from "./DeliveryPipelineRail";

interface ProcessTeaserProps {
  settings: SiteSettings;
}

const STAGES = [
  {
    num: "01",
    title: "Discovery & scope",
    desc: "Map operators, constraints, and success criteria before any build starts.",
    icon: Compass,
  },
  {
    num: "02",
    title: "Solution agreement",
    desc: "Architecture, milestones, and ownership written into a shared plan.",
    icon: MessageSquare,
  },
  {
    num: "03",
    title: "Incremental build",
    desc: "Ship in reviewable stages with demos your stakeholders can validate.",
    icon: Code2,
  },
  {
    num: "04",
    title: "Controlled release",
    desc: "Handover, training, and cutover paced to protect live operations.",
    icon: Rocket,
  },
  {
    num: "05",
    title: "Operate & evolve",
    desc: "Accountable support, iteration backlog, and measured improvements.",
    icon: RefreshCw,
  },
];

export const ProcessTeaser: React.FC<ProcessTeaserProps> = ({ settings }) => {
  const [active, setActive] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const playRef = useRef(false);

  useEffect(() => {
    playRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    if (settings.reducedMotion) return;
    const id = window.setInterval(() => {
      if (!playRef.current) return;
      setActive((s) => (s + 1) % STAGES.length);
      soundEngine.playHover();
    }, 2800);
    return () => window.clearInterval(id);
  }, [settings.reducedMotion]);

  return (
    <section
      id="process-teaser"
      className="relative overflow-x-clip overflow-y-visible px-4 sm:px-6 lg:px-8 mt-4 "
    >
      <div className="max-w-7xl mx-auto">
        <ScrollReveal
          className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6"
          reducedMotion={settings.reducedMotion}
        >
          <div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#1E1024] border border-[#B9A6D1]/45 text-[#E8A9C2] font-mono-accent text-xs mb-4">
              <span className="font-semibold text-[#F8F6FB]/50">05</span>
              <span>HOW WE DELIVER</span>
            </div>
            <h2 className="font-heading font-bold text-2xl sm:text-4xl text-[#F8F6FB] leading-tight">
              A delivery path institutions can follow.
            </h2>
            <p className="mt-3 text-[#B9A6D1] text-sm sm:text-base max-w-2xl leading-relaxed">
              Play the five-stage rail same method for Kiduart and custom work.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {!settings.reducedMotion && (
              <button
                type="button"
                onClick={() => {
                  setIsPlaying((p) => !p);
                  soundEngine.playClick("soft");
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1E1024] border border-[#B9A6D1]/45 text-[#E8A9C2] text-xs font-mono-accent"
              >
                {isPlaying ? (
                  <Pause className="w-3.5 h-3.5" />
                ) : (
                  <Play className="w-3.5 h-3.5" />
                )}
                {isPlaying ? "Pause" : "Play stages"}
              </button>
            )}
            <Link
              to="/process"
              onClick={() => soundEngine.playClick("soft")}
              className="inline-flex items-center space-x-2 text-xs font-mono-accent text-[#E8A9C2]"
            >
              <span>See full process</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>

        <div className="overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="mx-auto min-w-[720px] max-w-7xl pt-12 sm:min-w-[880px] sm:pt-14">
            <DeliveryPipelineRail stages={STAGES} activeIndex={active} />

            <div className="grid grid-cols-5 gap-0">
            {STAGES.map((stage, idx) => {
              const Icon = stage.icon;
              const on = active === idx;
              return (
                <button
                  key={stage.num}
                  type="button"
                  onClick={() => {
                    setActive(idx);
                    setIsPlaying(false);
                    soundEngine.playClick("soft");
                  }}
                  className={`mx-1 text-left h-full rounded-2xl border p-4 backdrop-blur-sm transition-all sm:mx-1.5 sm:p-5 ${
                    on
                      ? "border-[#E8A9C2]/70 bg-[#24132B]/95 shadow-[0_12px_32px_rgba(107,74,135,0.28)]"
                      : "border-[#B9A6D1]/35 bg-[#1E1024]/90 hover:border-[#E8A9C2]/55"
                  }`}
                >
                  <div className="mb-3 flex items-center justify-between sm:mb-4">
                    <span className="font-mono-accent text-[10px] font-bold text-[#E8A9C2] sm:text-xs">
                      STEP {stage.num}
                    </span>
                    <Icon className="h-3.5 w-3.5 text-[#B9A6D1]" aria-hidden />
                  </div>
                  <h3 className="font-heading text-xs font-semibold text-[#F8F6FB] sm:text-sm">
                    {stage.title}
                  </h3>
                  <p className="mt-1.5 text-[10px] leading-relaxed text-[#B9A6D1] sm:mt-2 sm:text-[11px]">
                    {stage.desc}
                  </p>
                </button>
              );
            })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
