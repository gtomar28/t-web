import { useEffect, useLayoutEffect, useRef, useState } from "react";

const SWITCH_MS = 5000;
const FADE_MS = 420;

type HeroTitleRollProps = {
  lines: readonly string[];
};

const lineClass =
  "font-display text-[clamp(2rem,5.5vw,3.75rem)] font-semibold leading-[1.12] tracking-tight text-plum-neutral [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]";

export function HeroTitleRoll({ lines }: HeroTitleRollProps) {
  const measureRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [heights, setHeights] = useState<number[]>([]);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useLayoutEffect(() => {
    const next = measureRefs.current.map((el) =>
      el ? Math.ceil(el.getBoundingClientRect().height) : 0,
    );
    if (next.length === lines.length && next.every((h) => h > 0)) {
      setHeights(next);
    }
  }, [lines]);

  useLayoutEffect(() => {
    const onResize = () => {
      const next = measureRefs.current.map((el) =>
        el ? Math.ceil(el.getBoundingClientRect().height) : 0,
      );
      if (next.every((h) => h > 0)) setHeights(next);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (lines.length <= 1) return;

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
  }, [lines.length]);

  if (lines.length === 0) return null;

  const viewportHeight = heights[index];

  return (
    <>
      <div aria-hidden className="pointer-events-none absolute left-0 top-0 -z-10 w-full max-w-xl opacity-0">
        {lines.map((line, i) => (
          <span
            key={line}
            ref={(el) => {
              measureRefs.current[i] = el;
            }}
            className={`${lineClass} block max-w-xl`}
          >
            {line}
          </span>
        ))}
      </div>

      <h1
        className="relative mt-5 overflow-hidden transition-[height,opacity] duration-500 ease-out"
        style={{
          height: viewportHeight ? `${viewportHeight}px` : undefined,
          minHeight: viewportHeight ? undefined : "4.5rem",
          opacity: visible ? 1 : 0,
        }}
        aria-live="polite"
      >
        <span className={`${lineClass} block max-w-xl`}>{lines[index]}</span>
      </h1>
    </>
  );
}
