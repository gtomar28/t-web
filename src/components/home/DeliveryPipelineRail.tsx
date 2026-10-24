import React from "react";
import type { LucideIcon } from "lucide-react";

export type PipelineStage = {
  num: string;
  title: string;
  desc: string;
  icon: LucideIcon;
};

type DeliveryPipelineRailProps = {
  stages: PipelineStage[];
  activeIndex: number;
};

const VIEW_W = 100;
const VIEW_H = 90;

/** Column centers at 10%, 30%, … — use gap-0 on the 5-col grid */
function stageX(index: number, count: number) {
  const pad = 10;
  const span = VIEW_W - pad * 2;
  return pad + (span * index) / (count - 1);
}

/** Smaller amplitude + lower peaks → less top overflow */
function stageWaveY(index: number) {
  return index % 2 === 0 ? 54 : 42;
}

function buildWavePath(count: number) {
  const points = Array.from({ length: count }, (_, i) => ({
    x: stageX(i, count),
    y: stageWaveY(i),
  }));

  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const mx = (prev.x + curr.x) / 2;
    d += ` C ${mx} ${prev.y}, ${mx} ${curr.y}, ${curr.x} ${curr.y}`;
  }
  return { d, points };
}

/** Glass cube + platform — matches Products & Services lane icon treatment */
function PipelineGlassNode({
  active,
  icon: Icon,
}: {
  active: boolean;
  icon: LucideIcon;
}) {
  const glassIcon = active
    ? "border-[#E8A9C2]/75 bg-[#2A1830] shadow-[inset_0_1px_0_rgba(248,246,251,0.22),0_0_32px_rgba(232,169,194,0.55),0_0_64px_rgba(232,169,194,0.28),0_0_96px_rgba(185,166,209,0.18)] ring-1 ring-[#E8A9C2]/30"
    : "border-[#E8A9C2]/45 bg-[#2A1830] shadow-[inset_0_1px_0_rgba(248,246,251,0.12)] ring-1 ring-[#F8F6FB]/5";

  const glassPlate = active
    ? "border-[#E8A9C2]/50 bg-[#2A1830] shadow-[inset_0_1px_0_rgba(248,246,251,0.14)] ring-1 ring-[#E8A9C2]/15"
    : "border-[#E8A9C2]/40 bg-[#2A1830] shadow-[inset_0_1px_0_rgba(248,246,251,0.1)] ring-1 ring-[#F8F6FB]/5";

  return (
    <div className="relative isolate flex flex-col items-center">
      {active ? (
        <div
          className="pointer-events-none absolute left-1/2 top-[42%] z-0 h-[4.5rem] w-[4.5rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(232,169,194,0.62)_0%,rgba(185,166,209,0.34)_38%,rgba(107,74,135,0.12)_58%,transparent_74%)] blur-2xl sm:h-24 sm:w-24"
          aria-hidden
        />
      ) : null}

      <div
        className={`relative z-20 flex h-11 w-11 items-center justify-center rounded-xl border backdrop-blur-xl transition-all duration-300 sm:h-12 sm:w-12 ${glassIcon}`}
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-[#F8F6FB]/10 via-transparent to-[#6B4A87]/20"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-2 top-0 h-px bg-gradient-to-r from-transparent via-[#F8F6FB]/30 to-transparent"
          aria-hidden
        />
        <Icon
          className={`relative z-10 h-4 w-4 sm:h-[1.125rem] sm:w-[1.125rem] ${
            active ? "text-[#FFF6FB]" : "text-[#F8F6FB]"
          }`}
          aria-hidden
        />
      </div>

      <div
        className={`relative z-10 -mt-1 h-2.5 w-[2.85rem] border border-t-0 backdrop-blur-xl sm:w-[3.25rem] ${glassPlate}`}
        style={{ clipPath: "polygon(10% 0, 90% 0, 100% 100%, 0 100%)" }}
        aria-hidden
      >
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#B9A6D1]/25 via-[#1E1024]/40 to-[#160A1C]/55"
          style={{ clipPath: "polygon(10% 0, 90% 0, 100% 100%, 0 100%)" }}
        />
        <div
          className="pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-[#F8F6FB]/20 to-transparent"
          aria-hidden
        />
      </div>

      {active ? (
        <div
          className="relative z-[5] -mt-2.5 h-2 w-14 rounded-full bg-[#E8A9C2] blur-[10px] shadow-[0_0_28px_rgba(232,169,194,0.75),0_0_48px_rgba(232,169,194,0.35)] sm:w-16"
          aria-hidden
        />
      ) : (
        <div
          className="relative z-[5] -mt-2.5 h-1 w-8 rounded-full bg-[#B9A6D1]/40 blur-[3px] sm:w-9"
          aria-hidden
        />
      )}
    </div>
  );
}

const RAIL_H = "clamp(3rem, 10vw, 5rem)";

export const DeliveryPipelineRail: React.FC<DeliveryPipelineRailProps> = ({
  stages,
  activeIndex,
}) => {
  const { d: pathD, points } = buildWavePath(stages.length);

  return (
    <div className="mb-3 sm:mb-4">
      <div className="relative mx-auto w-full">
        <div className="relative w-full" style={{ height: RAIL_H }}>
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 h-full w-full"
            aria-hidden
          >
            <defs>
              <linearGradient id="delivery-pipe-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6B4A87" stopOpacity="0.4" />
                <stop offset="40%" stopColor="#E8A9C2" stopOpacity="0.9" />
                <stop offset="60%" stopColor="#B9A6D1" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#6B4A87" stopOpacity="0.45" />
              </linearGradient>
              <filter id="delivery-pipe-glow" x="-15%" y="-80%" width="130%" height="220%">
                <feGaussianBlur stdDeviation="0.8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path
              d={pathD}
              fill="none"
              stroke="url(#delivery-pipe-grad)"
              strokeWidth="1.25"
              strokeLinecap="round"
              filter="url(#delivery-pipe-glow)"
              vectorEffect="non-scaling-stroke"
            />
            {points.map((p, i) => {
              const on = activeIndex === i;
              return (
                <g key={stages[i].num}>
                  {on ? (
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={5.5}
                      fill="#E8A9C2"
                      fillOpacity={0.22}
                    />
                  ) : null}
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={on ? 1.85 : 1.2}
                    fill={on ? "#E8A9C2" : "#B9A6D1"}
                    fillOpacity={on ? 0.98 : 0.65}
                  />
                </g>
              );
            })}
          </svg>
        </div>

        {/* One column per step — icon + connector + badge share the same center line */}
        <div
          className="absolute inset-x-0 top-0 grid grid-cols-5 gap-0"
          style={{ height: RAIL_H }}
        >
          {stages.map((stage, idx) => {
            const p = points[idx];
            const on = idx === activeIndex;
            const topPct = (p.y / VIEW_H) * 100;
            return (
              <div key={stage.num} className="relative h-full">
                <div
                  className="absolute left-1/2 z-10"
                  style={{
                    top: `${topPct}%`,
                    transform: "translate(-50%, -100%)",
                  }}
                >
                  <PipelineGlassNode active={on} icon={stage.icon} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-5 gap-0">
        {stages.map((stage, idx) => {
          const on = idx === activeIndex;
          return (
            <div key={stage.num} className="flex flex-col items-center px-1 sm:px-1.5">
              <div
                className="h-7 w-px border-l border-dashed border-[#B9A6D1]/50 sm:h-8"
                aria-hidden
              />
              <span
                className={`mt-1 flex h-7 w-7 items-center justify-center rounded-full border font-mono-accent text-[10px] font-bold transition-colors sm:h-8 sm:w-8 sm:text-[11px] ${
                  on
                    ? "border-[#E8A9C2]/85 bg-[#E8A9C2]/15 text-[#F8F6FB] shadow-[0_0_16px_rgba(232,169,194,0.35)]"
                    : "border-[#B9A6D1]/40 bg-[#1E1024]/85 text-[#E8A9C2]"
                }`}
              >
                {stage.num}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
