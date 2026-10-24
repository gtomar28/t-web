import type Lenis from "lenis";

export type SmoothScrollHandle = {
  lenis: Lenis;
  cancelRaf: () => void;
};

/** Load Lenis + GSAP ScrollTrigger after first paint (smaller initial bundle). */
export async function initSmoothScroll(): Promise<SmoothScrollHandle> {
  const [{ default: LenisCtor }, gsapMod, scrollTriggerMod] = await Promise.all([
    import("lenis"),
    import("gsap"),
    import("gsap/ScrollTrigger"),
  ]);

  const gsap = gsapMod.default;
  const { ScrollTrigger } = scrollTriggerMod;
  gsap.registerPlugin(ScrollTrigger);

  const lenis = new LenisCtor({
    duration: 1.1,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    smoothWheel: true,
    wheelMultiplier: 0.95,
  });

  lenis.on("scroll", () => {
    ScrollTrigger.update();
    window.dispatchEvent(new Event("scroll"));
  });

  let animId = 0;
  const raf = (time: number) => {
    lenis.raf(time);
    animId = requestAnimationFrame(raf);
  };
  animId = requestAnimationFrame(raf);

  return {
    lenis,
    cancelRaf: () => {
      cancelAnimationFrame(animId);
      lenis.destroy();
    },
  };
}
