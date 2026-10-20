import React from "react";

export type AtmosphereVariant =
  | "home"
  | "services"
  | "technology"
  | "kiduart"
  | "process"
  | "about"
  | "contact";

export type RhythmBandTone = "lilac" | "ink" | "pink";

export interface RhythmBand {
  top: string;
  height: string;
  tone?: RhythmBandTone;
}

interface PageAtmosphereProps {
  variant: AtmosphereVariant;
  /** Mid-page lilac light band (legacy) */
  lightBand?: { top: string; height: string };
  /** Extra color-rhythm bands  ink / lilac / pink to break flat plum */
  bands?: RhythmBand[];
}

const VARIANT_GLOWS: Record<
  AtmosphereVariant,
  { left: string; right: string; bottom?: string; wash: string; accent: string }
> = {
  home: {
    left: "radial-gradient(ellipse 60% 48% at 18% 12%, rgba(107,74,135,0.32), transparent 58%)",
    right:
      "radial-gradient(ellipse 48% 42% at 88% 28%, rgba(232,169,194,0.14), transparent 55%)",
    bottom:
      "radial-gradient(ellipse 55% 38% at 45% 96%, rgba(185,166,209,0.12), transparent 58%)",
    wash: "linear-gradient(180deg, #160A1C 0%, #2A1830 22%, #241428 48%, #2A1830 72%, #1E1024 100%)",
    accent:
      "linear-gradient(115deg, transparent 38%, rgba(231,225,240,0.06) 50%, transparent 62%)",
  },
  services: {
    left: "radial-gradient(ellipse 55% 45% at 12% 18%, rgba(107,74,135,0.34), transparent 60%)",
    right:
      "radial-gradient(ellipse 42% 38% at 88% 22%, rgba(232,169,194,0.16), transparent 55%)",
    bottom:
      "radial-gradient(ellipse 50% 35% at 50% 95%, rgba(185,166,209,0.14), transparent 60%)",
    wash: "linear-gradient(180deg, #1A0D20 0%, #2A1830 28%, #241428 55%, #2A1830 78%, #1E1024 100%)",
    accent:
      "linear-gradient(90deg, transparent, rgba(232,169,194,0.06), transparent)",
  },
  technology: {
    left: "radial-gradient(ellipse 50% 42% at 8% 20%, rgba(107,74,135,0.36), transparent 58%)",
    right:
      "radial-gradient(ellipse 48% 40% at 92% 28%, rgba(196,176,224,0.18), transparent 55%)",
    bottom:
      "radial-gradient(ellipse 40% 30% at 70% 88%, rgba(232,169,194,0.12), transparent 55%)",
    wash: "linear-gradient(180deg, #160A1C 0%, #1E1024 30%, #2A1830 58%, #241428 82%, #1A0D20 100%)",
    accent:
      "linear-gradient(115deg, transparent 40%, rgba(185,166,209,0.08) 50%, transparent 60%)",
  },
  kiduart: {
    left: "radial-gradient(ellipse 52% 40% at 10% 16%, rgba(107,74,135,0.3), transparent 58%)",
    right:
      "radial-gradient(ellipse 45% 36% at 90% 20%, rgba(232,169,194,0.18), transparent 55%)",
    bottom:
      "radial-gradient(ellipse 60% 40% at 40% 100%, rgba(231,225,240,0.1), transparent 55%)",
    wash: "linear-gradient(180deg, #1E1024 0%, #2A1830 26%, #2E1A36 52%, #241428 78%, #1E1024 100%)",
    accent:
      "linear-gradient(180deg, transparent, rgba(231,225,240,0.05), transparent)",
  },
  process: {
    left: "radial-gradient(ellipse 48% 40% at 14% 22%, rgba(107,74,135,0.32), transparent 58%)",
    right:
      "radial-gradient(ellipse 40% 34% at 86% 18%, rgba(185,166,209,0.16), transparent 55%)",
    bottom:
      "radial-gradient(ellipse 45% 32% at 55% 92%, rgba(232,169,194,0.12), transparent 55%)",
    wash: "linear-gradient(180deg, #1A0D20 0%, #241428 34%, #2A1830 62%, #1E1024 100%)",
    accent:
      "linear-gradient(90deg, rgba(107,74,135,0.08), transparent 40%, rgba(232,169,194,0.07))",
  },
  about: {
    left: "radial-gradient(ellipse 55% 42% at 12% 14%, rgba(107,74,135,0.34), transparent 58%)",
    right:
      "radial-gradient(ellipse 44% 36% at 90% 24%, rgba(232,169,194,0.14), transparent 55%)",
    bottom:
      "radial-gradient(ellipse 50% 30% at 30% 90%, rgba(185,166,209,0.12), transparent 55%)",
    wash: "linear-gradient(180deg, #160A1C 0%, #2A1830 32%, #241428 68%, #1E1024 100%)",
    accent:
      "linear-gradient(125deg, transparent 30%, rgba(231,225,240,0.07) 50%, transparent 70%)",
  },
  contact: {
    left: "radial-gradient(ellipse 50% 40% at 10% 18%, rgba(107,74,135,0.3), transparent 58%)",
    right:
      "radial-gradient(ellipse 42% 34% at 88% 16%, rgba(232,169,194,0.16), transparent 55%)",
    bottom:
      "radial-gradient(ellipse 55% 36% at 60% 95%, rgba(107,74,135,0.2), transparent 55%)",
    wash: "linear-gradient(180deg, #1E1024 0%, #2A1830 36%, #241428 70%, #1A0D20 100%)",
    accent: "linear-gradient(180deg, rgba(232,169,194,0.05), transparent 45%)",
  },
};

const BAND_FILL: Record<RhythmBandTone, string> = {
  lilac:
    "linear-gradient(180deg, transparent 0%, rgba(231,225,240,0.08) 22%, rgba(231,225,240,0.14) 50%, rgba(231,225,240,0.08) 78%, transparent 100%)",
  ink: "linear-gradient(180deg, transparent 0%, rgba(26,13,32,0.55) 20%, rgba(20,8,26,0.72) 50%, rgba(26,13,32,0.55) 80%, transparent 100%)",
  pink: "linear-gradient(180deg, transparent 0%, rgba(232,169,194,0.05) 25%, rgba(232,169,194,0.11) 50%, rgba(232,169,194,0.05) 75%, transparent 100%)",
};

/**
 * Shared page-depth atmosphere  layered washes, mesh, orbs,
 * and multi-tone rhythm bands so pages never read as flat plum.
 */
export const PageAtmosphere: React.FC<PageAtmosphereProps> = ({
  variant,
  lightBand,
  bands = [],
}) => {
  const g = VARIANT_GLOWS[variant];
  const rhythmBands: RhythmBand[] = [
    ...(lightBand ? [{ ...lightBand, tone: "lilac" as const }] : []),
    ...bands,
  ];

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0" style={{ background: g.wash }} />
      <div className="absolute inset-0" style={{ background: g.left }} />
      <div className="absolute inset-0" style={{ background: g.right }} />
      {g.bottom ? (
        <div className="absolute inset-0" style={{ background: g.bottom }} />
      ) : null}
      <div className="absolute inset-0" style={{ background: g.accent }} />

      {/* Soft mesh grid  fades on the right so 3D companion stays clear */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(#B9A6D1 1px, transparent 1px), linear-gradient(90deg, #B9A6D1 1px, transparent 1px)",
          backgroundSize: "52px 52px",
          maskImage:
            "linear-gradient(90deg, black 0%, black 52%, transparent 92%)",
        }}
      />

      {/* Diagonal sheen  breaks flat color */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          background:
            "linear-gradient(125deg, transparent 35%, rgba(231,225,240,0.38) 48%, transparent 62%)",
        }}
      />

      {/* Horizontal ink hairline rhythm */}
      <div
        className="absolute inset-x-0 top-[28%] h-px opacity-30"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(185,166,209,0.45), transparent)",
        }}
      />
      <div
        className="absolute inset-x-0 top-[68%] h-px opacity-25"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(232,169,194,0.4), transparent)",
        }}
      />

      {/* Floating depth orbs */}
      <div className="absolute top-[18%] left-[6%] w-40 h-40 rounded-full bg-[#6B4A87]/22 blur-3xl" />
      <div className="absolute top-[42%] right-[8%] w-56 h-56 rounded-full bg-[#E8A9C2]/14 blur-3xl" />
      <div className="absolute bottom-[12%] left-[28%] w-48 h-48 rounded-full bg-[#B9A6D1]/12 blur-3xl" />
      <div className="absolute top-[62%] left-[55%] w-36 h-36 rounded-full bg-[#E7E1F0]/06 blur-3xl" />

      {rhythmBands.map((band, i) => (
        <div
          key={`${band.tone ?? "lilac"}-${band.top}-${i}`}
          className="absolute left-0 right-0"
          style={{
            top: band.top,
            height: band.height,
            background: BAND_FILL[band.tone ?? "lilac"],
          }}
        />
      ))}

      {/* Corner frames  continuity with home hero */}
      <div className="absolute top-24 left-4 sm:left-8 w-8 h-8 border-l border-t border-[#E8A9C2]/35" />
      <div className="absolute top-24 right-4 sm:right-10 w-8 h-8 border-r border-t border-[#B9A6D1]/30" />
      <div className="absolute bottom-10 left-4 sm:left-8 w-8 h-8 border-l border-b border-[#B9A6D1]/25" />
      <div className="absolute bottom-10 right-4 sm:right-10 w-8 h-8 border-r border-b border-[#E8A9C2]/25" />
    </div>
  );
};
