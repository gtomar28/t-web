import type { ComponentType, CSSProperties } from "react";
import { Building2, Code2, GraduationCap, Target, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { ViewportSection } from "../ViewportSection";
import { soundEngine } from "../../utils/audioEngine";

const PURPOSE_LOGO = "/trevyk-icon.png";

/** Horizontal gap between corner cards and the center hub (half hub + gutter). */
const PURPOSE_HUB_SIDE_INSET = "7.25rem";

const HUB = { x: 50, y: 50 };
/** Outer hub ring radius (viewBox units). */
const HUB_R = 12.8;

const PURPOSE_PILLARS = [
  {
    title: "Empower Education",
    description:
      "Provide schools with technology that simplifies operations and supports better learning environments.",
    icon: GraduationCap,
    beamTo: { x: 24, y: 30 },
  },
  {
    title: "Enable Business Growth",
    description:
      "Build custom digital solutions that help businesses work smarter, reach further, and grow sustainably.",
    icon: Building2,
    beamTo: { x: 76, y: 30 },
  },
  {
    title: "Thoughtful Engineering",
    description:
      "Focus on clean, maintainable and scalable solutions that solve real problems.",
    icon: Code2,
    beamTo: { x: 24, y: 70 },
  },
  {
    title: "Create Lasting Impact",
    description:
      "Build long-term relationships and products that create meaningful value for people and communities.",
    icon: Users,
    beamTo: { x: 76, y: 70 },
  },
] as const;

/**
 * Fan of circuit traces: narrow at hub ring, bulges outward, lands on card edge (reference style).
 */
function circuitBeamPaths(target: { x: number; y: number }, lineCount = 11) {
  const dx = target.x - HUB.x;
  const dy = target.y - HUB.y;
  const base = Math.atan2(dy, dx);
  const nx = -Math.sin(base);
  const ny = Math.cos(base);

  return Array.from({ length: lineCount }, (_, i) => {
    const u = lineCount === 1 ? 0 : (i / (lineCount - 1)) * 2 - 1;
    const hubSpread = u * 0.035;
    const sx = HUB.x + Math.cos(base + hubSpread) * HUB_R;
    const sy = HUB.y + Math.sin(base + hubSpread) * HUB_R;
    const ex = target.x + nx * u * 1.15;
    const ey = target.y + ny * u * 1.15;
    const bulge = 2.8 + Math.abs(u) * 1.6;
    const mx = (sx + ex) / 2 + nx * bulge;
    const my = (sy + ey) / 2 + ny * bulge;
    return { d: `M ${sx} ${sy} Q ${mx} ${my} ${ex} ${ey}`, u };
  });
}

function PurposeCard({
  title,
  description,
  icon: Icon,
  className = "",
}: {
  title: string;
  description: string;
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  className?: string;
}) {
  return (
    <article
      className={`flex w-max max-w-48 items-start gap-3 rounded-2xl border border-[#6B4A87]/45 bg-[#2A1830]/78 px-4 py-3.5 shadow-[0_10px_36px_rgba(0,0,0,0.28)] sm:max-w-29 sm:gap-3.5 sm:px-4 sm:py-4 lg:max-w-88 ${className}`}
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[0.7rem] border border-[#B9A6D1]/32 bg-[#6B4A87]/52 text-[#F3C9DC]">
        <Icon className="h-6 w-6" strokeWidth={1.55} aria-hidden />
      </div>
      <div className="pt-0.5">
        <h3 className="font-heading text-base font-semibold leading-snug text-[#F8F6FB] sm:text-[17px]">
          {title}
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-[#C4B4D8] sm:text-[13px] sm:leading-relaxed">
          {description}
        </p>
      </div>
    </article>
  );
}

function PurposeCircuitArt() {
  const beams = PURPOSE_PILLARS.flatMap((p) =>
    circuitBeamPaths(p.beamTo).map((line, i) => ({
      ...line,
      key: `${p.title}-${i}`,
    })),
  );

  const nodes = beams.flatMap(({ d, key }) => {
    const parts = d.match(
      /M ([\d.]+) ([\d.]+) Q ([\d.]+) ([\d.]+), ([\d.]+) ([\d.]+)/,
    );
    if (!parts) return [];
    const sx = Number(parts[1]);
    const sy = Number(parts[2]);
    const mx = Number(parts[3]);
    const my = Number(parts[4]);
    const ex = Number(parts[5]);
    const ey = Number(parts[6]);
    const quad = (t: number) => {
      const u = 1 - t;
      return {
        x: u * u * sx + 2 * u * t * mx + t * t * ex,
        y: u * u * sy + 2 * u * t * my + t * t * ey,
      };
    };
    return [0.32, 0.52, 0.74].map((t, i) => ({
      key: `${key}-n${i}`,
      ...quad(t),
    }));
  });

  return (
    <svg
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <defs>
        <radialGradient id="purpose-hub-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(107,74,135,0.35)" />
          <stop offset="55%" stopColor="rgba(107,74,135,0.08)" />
          <stop offset="100%" stopColor="rgba(107,74,135,0)" />
        </radialGradient>
      </defs>
      <circle cx={HUB.x} cy={HUB.y} r={22} fill="url(#purpose-hub-glow)" />
      {beams.map(({ d, key, u }) => (
        <path
          key={key}
          d={d}
          fill="none"
          stroke="rgba(232,169,194,0.42)"
          strokeWidth={0.16 + Math.abs(u) * 0.04}
          strokeDasharray="0.35 0.75"
          strokeLinecap="round"
          opacity={0.55 + (1 - Math.abs(u)) * 0.35}
        />
      ))}
      {nodes.map(({ key, x, y }) => (
        <circle
          key={key}
          cx={x}
          cy={y}
          r={0.38}
          fill="rgba(232,169,194,0.88)"
        />
      ))}
    </svg>
  );
}

function PurposeHubLogo() {
  return (
    <div className="relative flex h-[7.5rem] w-[7.5rem] items-center justify-center sm:h-[8.25rem] sm:w-[8.25rem] lg:h-[8.75rem] lg:w-[8.75rem]">
      {/* Outer ring — border only, no fill */}
      <div className="absolute inset-0 rounded-full border border-[#B9A6D1]/42 bg-transparent shadow-[0_0_48px_rgba(107,74,135,0.28)]" />
      {/* Logo plate — only inner disk has background */}
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

function purposeSideSlotStyle(): CSSProperties {
  return {
    maxWidth: `min(100%, calc(50% - ${PURPOSE_HUB_SIDE_INSET}))`,
  };
}

function PurposeHubGraphic() {
  const [tl, tr, bl, br] = PURPOSE_PILLARS;
  const sideStyle = purposeSideSlotStyle();

  return (
    <div className="relative mx-auto w-full min-w-0 lg:max-w-none" aria-hidden>
      <div className="relative min-h-[22rem] w-full sm:min-h-[26rem] lg:min-h-[30rem]">
        <PurposeCircuitArt />

        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          <PurposeHubLogo />
        </div>

        <div className="absolute left-0 top-0 z-[1]" style={sideStyle}>
          <PurposeCard title={tl.title} description={tl.description} icon={tl.icon} />
        </div>
        <div
          className="absolute right-0 top-0 z-[1] flex justify-end"
          style={sideStyle}
        >
          <PurposeCard title={tr.title} description={tr.description} icon={tr.icon} />
        </div>
        <div className="absolute bottom-0 left-0 z-[1]" style={sideStyle}>
          <PurposeCard title={bl.title} description={bl.description} icon={bl.icon} />
        </div>
        <div
          className="absolute bottom-0 right-0 z-[1] flex justify-end"
          style={sideStyle}
        >
          <PurposeCard title={br.title} description={br.description} icon={br.icon} />
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
      className="trevyk-viewport-section--center"
      innerClassName="flex flex-col justify-center py-10 sm:py-12"
    >
      <div className="grid w-full items-center gap-10 lg:grid-cols-12 lg:gap-10 xl:gap-12">
        <div className="lg:col-span-5 xl:col-span-5">
          <div className="inline-flex w-fit max-w-full self-start items-center gap-2 rounded-full border border-[#B9A6D1]/40 bg-[#1E1024]/90 px-4 py-1.5 font-mono-accent text-[11px] uppercase tracking-[0.2em] text-[#E8A9C2] sm:text-xs">
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

          <p className="mt-6 max-w-xl text-base leading-relaxed text-[#E7E1F0] sm:text-[17px] sm:leading-relaxed">
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

        <div className="w-full lg:col-span-7 xl:col-span-7">
          <PurposeHubGraphic />
        </div>
      </div>
    </ViewportSection>
  );
}
