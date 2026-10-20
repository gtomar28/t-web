import React, { useEffect, useRef, useState } from "react";
import { Lottie, type LottieHandle } from "lottie-react";

export type LottiePreset =
  | "signal-rings"
  | "nodes-pulse"
  | "progress-token"
  | "module-dock"
  | "brand-pulse";

const PRESET_PATH: Record<LottiePreset, string> = {
  "signal-rings": "/lottie/signal-rings.json",
  "nodes-pulse": "/lottie/nodes-pulse.json",
  "progress-token": "/lottie/progress-token.json",
  "module-dock": "/lottie/module-dock.json",
  "brand-pulse": "/lottie/brand-pulse.json",
};

interface LottieAccentProps {
  preset: LottiePreset;
  className?: string;
  reducedMotion?: boolean;
  caption?: string;
  /** Restart / seek when this changes (e.g. scrubber step) */
  step?: number;
  loop?: boolean;
}

/**
 * Lightweight Lottie accent — loads JSON on demand, pauses offscreen.
 */
export const LottieAccent: React.FC<LottieAccentProps> = ({
  preset,
  className = "",
  reducedMotion = false,
  caption,
  step,
  loop = true,
}) => {
  const [visible, setVisible] = useState(true);
  const [failed, setFailed] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<LottieHandle>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "80px", threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (step === undefined || !lottieRef.current) return;
    const frames = 60;
    const frame = ((step % 6) / 6) * frames;
    lottieRef.current.seek({ frame });
    lottieRef.current.pause();
  }, [step]);

  useEffect(() => {
    const handle = lottieRef.current;
    if (!handle || step !== undefined) return;
    if (reducedMotion || !visible) {
      handle.pause();
    } else {
      handle.play();
    }
  }, [visible, reducedMotion, step]);

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      {caption ? (
        <div className="text-[10px] font-mono-accent uppercase tracking-[0.2em] text-[#E8A9C2] mb-2 text-center">
          {caption}
        </div>
      ) : null}
      <div className="w-full aspect-square max-h-[200px] mx-auto rounded-2xl border border-[#B9A6D1]/25 bg-gradient-to-br from-[#1E1024]/90 to-[#2A1830]/70 overflow-hidden flex items-center justify-center">
        {failed ? (
          <div className="w-10 h-10 rounded-full border border-[#E8A9C2]/35" />
        ) : (
          <Lottie
            lottieRef={lottieRef}
            src={PRESET_PATH[preset]}
            loop={loop && !reducedMotion && step === undefined}
            autoplay={!reducedMotion && visible && step === undefined}
            className="w-full h-full"
            style={{
              mixBlendMode: "screen",
              opacity: reducedMotion ? 0.85 : 1,
            }}
            subscriptions={{
              error: () => setFailed(true),
              ready: () => {
                if (step !== undefined && lottieRef.current) {
                  const frames = 60;
                  const frame = ((step % 6) / 6) * frames;
                  lottieRef.current.seek({ frame });
                  lottieRef.current.pause();
                }
              },
            }}
          />
        )}
      </div>
    </div>
  );
};
