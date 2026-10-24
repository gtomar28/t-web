import { useLayoutEffect, useRef } from "react";

const WORDMARK = "TREVYK TECHNOLOGIES";
const MAX_FONT_PX = 164;
const MIN_FONT_PX = 18;

function fitWordmarkFontSize(container: HTMLElement, text: HTMLElement) {
  const available = container.clientWidth;
  if (available <= 0) return;

  let low = MIN_FONT_PX;
  let high = MAX_FONT_PX;
  let best = MIN_FONT_PX;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    text.style.fontSize = `${mid}px`;
    if (text.scrollWidth <= available) {
      best = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  text.style.fontSize = `${best}px`;
}

export function FooterWordmark() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    if (!container || !text) return;

    const fit = () => fitWordmarkFontSize(container, text);

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(container);

    const fonts = document.fonts;
    let cancelled = false;
    fonts?.ready.then(() => {
      if (!cancelled) fit();
    });

    return () => {
      cancelled = true;
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full min-w-0">
      <p
        ref={textRef}
        className="trevyk-footer-wordmark font-display text-center font-bold uppercase"
        aria-hidden
      >
        {WORDMARK}
      </p>
    </div>
  );
}
