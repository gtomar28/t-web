import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDisplayFontsReady } from "../../../hooks/useDisplayFontsReady";
import { SkeletonHeroTitle } from "../../ui/Skeleton";

const SWITCH_MS = 5000;
const FADE_MS = 420;

/** Minimum slot height (~3 lines at hero clamp) — prevents clip if measure is early. */
const TITLE_SLOT_MIN_CLASS =
  "min-h-[calc(3*1.12*clamp(2rem,5.5vw,3.75rem))]";

type HeroTitleRollProps = {
  lines: readonly string[];
};

const lineClass =
  "font-display text-[clamp(2rem,5.5vw,3.75rem)] font-semibold leading-[1.12] tracking-tight text-plum-neutral [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]";

function readLineHeights(refs: (HTMLSpanElement | null)[]): number[] {
  return refs.map((el) => (el ? Math.ceil(el.getBoundingClientRect().height) : 0));
}

export function HeroTitleRoll({ lines }: HeroTitleRollProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const measureRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [heights, setHeights] = useState<number[]>([]);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const fontsReady = useDisplayFontsReady();

  const remeasure = useCallback(() => {
    if (!fontsReady) return;
    const next = readLineHeights(measureRefs.current);
    if (next.length === lines.length && next.every((h) => h > 0)) {
      setHeights(next);
    }
  }, [lines.length, fontsReady]);

  useLayoutEffect(() => {
    remeasure();
  }, [remeasure]);

  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => remeasure());
    ro.observe(el);
    return () => ro.disconnect();
  }, [remeasure]);

  useEffect(() => {
    if (lines.length <= 1 || !fontsReady) return;

    let swapTimer = 0;
    let showTimer = 0;

    const interval = window.setInterval(() => {
      setVisible(false);

      swapTimer = window.setTimeout(() => {
        setIndex((current) => (current + 1) % lines.length);
        showTimer = window.setTimeout(() => setVisible(true), 40);
      }, FADE_MS);
    }, SWITCH_MS);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(swapTimer);
      window.clearTimeout(showTimer);
    };
  }, [lines.length, fontsReady]);

  const heightsReady =
    lines.length > 0 &&
    heights.length === lines.length &&
    heights.every((h) => h > 0);
  const rollReady = heightsReady && fontsReady && lines.length > 1;
  const displayReady =
    lines.length > 0 && fontsReady && (lines.length === 1 ? true : heightsReady);
  const viewportHeight = rollReady ? Math.max(...heights) : 0;

  if (lines.length === 0) return null;

  if (!fontsReady) {
    return (
      <div className="relative mt-5 w-full max-w-xl">
        <SkeletonHeroTitle />
      </div>
    );
  }

  return (
    <div ref={wrapRef} className="relative mt-5 w-full max-w-xl">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 w-full opacity-0"
      >
        {lines.map((line, i) => (
          <span
            key={line}
            ref={(el) => {
              measureRefs.current[i] = el;
            }}
            className={`${lineClass} block w-full max-w-xl`}
          >
            {line}
          </span>
        ))}
      </div>

      {!displayReady ? (
        <SkeletonHeroTitle />
      ) : rollReady ? (
        <h1
          className={`relative overflow-hidden transition-[opacity] duration-500 ease-out ${TITLE_SLOT_MIN_CLASS}`}
          style={{
            height: `${viewportHeight}px`,
            opacity: visible ? 1 : 0,
          }}
          aria-live="polite"
        >
          <span className={`${lineClass} block w-full max-w-xl`}>{lines[index]}</span>
        </h1>
      ) : (
        <h1 className={`${lineClass} w-full max-w-xl`}>{lines[0]}</h1>
      )}
    </div>
  );
}
