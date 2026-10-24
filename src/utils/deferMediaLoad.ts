import { useEffect, useRef, useState } from "react";

/** Defer heavy video/image network until scroll, interaction, or idle (PageSpeed / payload). */

export type DeferMediaOptions = {
  /** Activate after vertical scroll passes this (px). 0 = disabled. */
  scrollMinY?: number;
  /** `requestIdleCallback` timeout (ms). */
  idleTimeoutMs?: number;
};

export function scheduleDeferredMediaLoad(
  activate: () => void,
  options: DeferMediaOptions = {},
): () => void {
  let done = false;
  const run = () => {
    if (done) return;
    done = true;
    activate();
  };

  const scrollMin = options.scrollMinY ?? 0;
  const onScroll = () => {
    if (scrollMin <= 0 || window.scrollY >= scrollMin) run();
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  if (scrollMin > 0) onScroll();

  window.addEventListener("pointerdown", run, { once: true, passive: true });
  window.addEventListener("keydown", run, { once: true });

  let idleId: number | undefined;
  let timeoutId: number | undefined;
  const idleMs = options.idleTimeoutMs ?? 6000;

  if ("requestIdleCallback" in window) {
    idleId = window.requestIdleCallback(run, { timeout: idleMs });
  } else {
    timeoutId = window.setTimeout(run, idleMs);
  }

  return () => {
    window.removeEventListener("scroll", onScroll);
    if (idleId !== undefined) window.cancelIdleCallback(idleId);
    if (timeoutId !== undefined) window.clearTimeout(timeoutId);
  };
}

/** Attach `src` when the container enters (or nears) the viewport. */
export function useIntersectionMediaSrc(
  mediaSrc: string,
  rootMargin = "240px 0px",
): { containerRef: React.RefObject<HTMLDivElement | null>; src: string | undefined } {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [src, setSrc] = useState<string | undefined>();

  useEffect(() => {
    const el = containerRef.current;
    if (!el || src) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSrc(mediaSrc);
          io.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [mediaSrc, src]);

  return { containerRef, src };
}
