import { useState, type ComponentType } from "react";
import { Building2, Code2, GraduationCap, Target, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { ViewportSection } from "../ViewportSection";
import { soundEngine } from "../../utils/audioEngine";

const PURPOSE_LOGO = "/trevyk-icon.png";

const HUB = { x: 50, y: 50 };
const HUB_R = 12.8;

const PURPOSE_PILLARS = [
  {
    title: "Empower Education",
    description:
      "Provide schools with technology that simplifies operations and supports better learning environments.",
    icon: GraduationCap,
    anchor: { x: 26, y: 26 },
    side: "left" as const,
  },
  {
    title: "Enable Business Growth",
    description:
      "Build custom digital solutions that help businesses work smarter, reach further, and grow sustainably.",
    icon: Building2,
    anchor: { x: 74, y: 26 },
    side: "right" as const,
  },
  {
    title: "Thoughtful Engineering",
    description:
      "Focus on clean, maintainable and scalable solutions that solve real problems.",
    icon: Code2,
    anchor: { x: 26, y: 74 },
    side: "left" as const,
  },
  {
    title: "Create Lasting Impact",
    description:
      "Build long-term relationships and products that create meaningful value for people and communities.",
    icon: Users,
    anchor: { x: 74, y: 74 },
    side: "right" as const,
  },
] as const;

function hubRingPoint(target: { x: number; y: number }) {
  const angle = Math.atan2(target.y - HUB.y, target.x - HUB.x);
  return {
    x: HUB.x + Math.cos(angle) * HUB_R,
    y: HUB.y + Math.sin(angle) * HUB_R,
  };
}

/** Orthogonal “circuit” trace — hub to card (architecture-style elbows). */
function elbowPath(
  anchor: { x: number; y: number },
  side: "left" | "right",
): string {
  const start = hubRingPoint(anchor);
  const busX = side === "left" ? 46 : 54;
  const cardX = side === "left" ? anchor.x + 5.5 : anchor.x - 5.5;
  return [
    `M ${start.x} ${start.y}`,
    `L ${busX} ${start.y}`,
    `L ${busX} ${anchor.y}`,
    `L ${cardX} ${anchor.y}`,
  ].join(" ");
}

function PurposeCard({
  title,
  description,
  icon: Icon,
  active,
  onActivate,
  className = "",
}: {
  title: string;
  description: string;
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  active: boolean;
  onActivate: (on: boolean) => void;
  className?: string;
}) {
  return (
    <article
      onMouseEnter={() => onActivate(true)}
      onMouseLeave={() => onActivate(false)}
      onFocus={() => onActivate(true)}
      onBlur={() => onActivate(false)}
      className={`group relative w-[15.5rem] max-w-[calc(50vw-2rem)] shrink-0 sm:w-[16.75rem] lg:w-[17.25rem] ${className}`}
    >
      <div
        className={`pointer-events-none absolute -inset-1 rounded-[1.15rem] transition-opacity duration-300 ${
          active ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 85% 70% at 30% 20%, rgba(232,169,194,0.42), transparent 65%), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(107,74,135,0.35), transparent 70%)",
          filter: "blur(10px)",
        }}
      />
      <div
        className={`relative flex h-full items-start gap-3 rounded-2xl border px-4 py-3.5 transition-all duration-300 sm:gap-3.5 sm:px-4 sm:py-4 ${
          active
            ? "border-[#E8A9C2]/75 bg-[#2f1a38]/92 shadow-[0_0_28px_rgba(232,169,194,0.38),0_0_56px_rgba(107,74,135,0.28),inset_0_1px_0_rgba(248,246,251,0.08)]"
            : "border-[#6B4A87]/45 bg-[#2A1830]/78 shadow-[0_10px_36px_rgba(0,0,0,0.28)]"
        }`}
      >
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[0.7rem] border transition-colors duration-300 ${
            active
              ? "border-[#E8A9C2]/55 bg-[#6B4A87]/68 text-[#FCE4EC]"
              : "border-[#B9A6D1]/32 bg-[#6B4A87]/52 text-[#F3C9DC]"
          }`}
        >
          <Icon className="h-6 w-6" strokeWidth={1.55} aria-hidden />
        </div>
        <div className="min-w-0 flex-1 pt-0.5">
          <h3 className="font-heading text-base font-semibold leading-snug text-[#F8F6FB] sm:text-[17px]">
            {title}
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-[#C4B4D8] sm:text-[13px] sm:leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </article>
  );
}

function PurposeCircuitArt({ activeIndex }: { activeIndex: number | null }) {
  return (
    <svg
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <defs>
        <radialGradient id="purpose-hub-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(232,169,194,0.22)" />
          <stop offset="45%" stopColor="rgba(107,74,135,0.14)" />
          <stop offset="100%" stopColor="rgba(107,74,135,0)" />
        </radialGradient>
        <filter id="purpose-line-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="0.45" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <circle cx={HUB.x} cy={HUB.y} r={24} fill="url(#purpose-hub-glow)" />
      {PURPOSE_PILLARS.map((pillar, index) => {
        const d = elbowPath(pillar.anchor, pillar.side);
        const isActive = activeIndex === index;
        const dimmed = activeIndex !== null && !isActive;
        return (
          <g key={pillar.title}>
            {isActive ? (
              <path
                d={d}
                fill="none"
                stroke="rgba(232,169,194,0.55)"
                strokeWidth={1.1}
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#purpose-line-glow)"
              />
            ) : null}
            <path
              d={d}
              fill="none"
              stroke={isActive ? "rgba(248,220,232,0.95)" : "rgba(185,166,209,0.38)"}
              strokeWidth={isActive ? 0.55 : 0.38}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={dimmed ? 0.28 : isActive ? 1 : 0.72}
            />
            <circle
              cx={pillar.anchor.x + (pillar.side === "left" ? 5.5 : -5.5)}
              cy={pillar.anchor.y}
              r={isActive ? 0.72 : 0.45}
              fill={isActive ? "rgba(248,220,232,0.95)" : "rgba(185,166,209,0.55)"}
              opacity={dimmed ? 0.35 : 1}
            />
          </g>
        );
      })}
    </svg>
  );
}

function PurposeHubLogo({ active }: { active: boolean }) {
  return (
    <div className="relative flex h-[7.5rem] w-[7.5rem] items-center justify-center sm:h-[8.25rem] sm:w-[8.25rem] lg:h-[9rem] lg:w-[9rem]">
      <div
        className={`absolute inset-0 rounded-full border bg-transparent transition-all duration-300 ${
          active
            ? "border-[#E8A9C2]/65 shadow-[0_0_40px_rgba(232,169,194,0.45),0_0_72px_rgba(107,74,135,0.35)]"
            : "border-[#B9A6D1]/42 shadow-[0_0_48px_rgba(107,74,135,0.28)]"
        }`}
      />
      <div className="relative flex h-[82%] w-[82%] items-center justify-center rounded-full bg-[#1A0D20]/92">
        <img
          src={PURPOSE_LOGO}
          alt=""
          className="h-[48%] w-[48%] object-contain drop-shadow-[0_4px_22px_rgba(232,169,194,0.42)]"
          width={128}
          height={128}
          decoding="async"
        />
      </div>
    </div>
  );
}

function PurposeHubGraphic() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [tl, tr, bl, br] = PURPOSE_PILLARS;

  return (
    <div className="relative mx-auto w-full max-w-4xl" aria-hidden>
      <div className="relative min-h-[24rem] w-full sm:min-h-[28rem] lg:min-h-[32rem]">
        <PurposeCircuitArt activeIndex={activeIndex} />

        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          <PurposeHubLogo active={activeIndex !== null} />
        </div>

        <div className="absolute left-0 top-0 z-[1] sm:left-[2%]">
          <PurposeCard
            title={tl.title}
            description={tl.description}
            icon={tl.icon}
            active={activeIndex === 0}
            onActivate={(on) => setActiveIndex(on ? 0 : null)}
          />
        </div>
        <div className="absolute right-0 top-0 z-[1] sm:right-[2%]">
          <PurposeCard
            title={tr.title}
            description={tr.description}
            icon={tr.icon}
            active={activeIndex === 1}
            onActivate={(on) => setActiveIndex(on ? 1 : null)}
          />
        </div>
        <div className="absolute bottom-0 left-0 z-[1] sm:left-[2%]">
          <PurposeCard
            title={bl.title}
            description={bl.description}
            icon={bl.icon}
            active={activeIndex === 2}
            onActivate={(on) => setActiveIndex(on ? 2 : null)}
          />
        </div>
        <div className="absolute bottom-0 right-0 z-[1] sm:right-[2%]">
          <PurposeCard
            title={br.title}
            description={br.description}
            icon={br.icon}
            active={activeIndex === 3}
            onActivate={(on) => setActiveIndex(on ? 3 : null)}
          />
        </div>
      </div>
    </div>
  );
}

export function OurPurposeSection() {
  return (
    <ViewportSection
      id="our-purpose"
      aria-labelledby="our-purpose-heading"
      className="trevyk-viewport-section--center relative overflow-hidden"
      innerClassName="relative flex flex-col justify-center py-10 sm:py-12"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-80"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 72% 42%, rgba(107,74,135,0.2), transparent 70%), radial-gradient(ellipse 40% 35% at 18% 55%, rgba(232,169,194,0.08), transparent 65%)",
        }}
      />

      <div className="flex w-full flex-col gap-12 lg:gap-14">
        <div className="w-full max-w-3xl">
          <div className="inline-flex w-fit max-w-full items-center gap-2 rounded-full border border-[#B9A6D1]/40 bg-[#1E1024]/90 px-4 py-1.5 font-mono-accent text-[11px] uppercase tracking-[0.2em] text-[#E8A9C2] shadow-[0_0_24px_rgba(107,74,135,0.15)] sm:text-xs">
            <Target className="h-4 w-4" aria-hidden />
            <span>02 / Our purpose</span>
          </div>

          <p className="mt-5 font-mono-accent text-[11px] uppercase tracking-[0.22em] text-[#E8A9C2] sm:text-xs">
            Why we exist
          </p>

          <h2
            id="our-purpose-heading"
            className="mt-3 font-heading text-[clamp(1.85rem,4.8vw,3rem)] font-bold leading-[1.1] tracking-tight text-[#F8F6FB]"
          >
            Turning ideas into{" "}
            <span className="bg-gradient-to-r from-[#E8A9C2] via-[#F0B8CE] to-[#B9A6D1] bg-clip-text text-transparent">
              real progress.
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#E7E1F0] sm:text-[17px] sm:leading-relaxed">
            We exist to help schools and growing businesses turn their ideas
            into practical, reliable digital solutions. Whether it&apos;s a
            school managing its day-to-day operations or a business building
            something new, our focus is the same — thoughtful engineering,
            honest communication, and technology that actually creates real
            value.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              to="/contact"
              onClick={() => soundEngine.playClick("hero")}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#E8A9C2] to-[#d892ad] px-6 py-3 font-heading text-sm font-semibold text-[#1E1024] shadow-[0_8px_24px_rgba(232,169,194,0.32)] transition hover:brightness-105"
            >
              Talk to our team
              <span aria-hidden>↗</span>
            </Link>
            <Link
              to="/process"
              onClick={() => soundEngine.playClick("soft")}
              className="inline-flex items-center gap-2 rounded-full border border-[#B9A6D1]/45 bg-[#1E1024]/40 px-6 py-3 font-heading text-sm font-semibold text-[#F8F6FB] transition hover:border-[#E8A9C2]/55 hover:bg-[#2A1830]/60"
            >
              Our approach
              <span aria-hidden>↗</span>
            </Link>
          </div>
        </div>

        <div className="w-full">
          <PurposeHubGraphic />
        </div>
      </div>
    </ViewportSection>
  );
}
