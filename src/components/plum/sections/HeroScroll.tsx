import { useEffect, useRef, useState } from "react";
import { hero } from "../../../content/home";
import { HeroPosterPicture } from "../../media/HeroPosterPicture";
import { media, mediaZoom } from "../../../config/media";
import { clamp } from "../../../lib/motion";
import { ScrollScrubVideo } from "../media/ScrollScrubVideo";
import { HeroTitleRoll } from "./HeroTitleRoll";
import { HeroCopySkeleton } from "./HeroCopySkeleton";
import { PageContainer } from "../ui/PageContainer";
import { PlumLink } from "../ui/PlumLink";
import { markReactHeroPosterReady } from "../../../utils/heroVideoPreload";
import { useDisplayFontsReady } from "../../../hooks/useDisplayFontsReady";

export function HeroScroll() {
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [heroCopyVisible, setHeroCopyVisible] = useState(
    () => typeof document === "undefined" || !document.getElementById("trevyk-static-home"),
  );
  const fontsReady = useDisplayFontsReady();
  const heroContentReady = heroCopyVisible && fontsReady;

  const onHeroPosterReady = () => {
    markReactHeroPosterReady();
  };

  useEffect(() => {
    const show = () => setHeroCopyVisible(true);
    window.addEventListener("trevyk-lcp-handoff", show);
    if (
      !document.getElementById("trevyk-static-home") ||
      document.documentElement.classList.contains("trevyk-app-ready")
    ) {
      show();
    }
    return () => window.removeEventListener("trevyk-lcp-handoff", show);
  }, []);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const hint = scrollHintRef.current;
    if (!hint) return;

    const update = () => {
      hint.style.opacity = String(clamp(1 - window.scrollY / 140, 0, 1));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const z = mediaZoom.heroOffice;

  return (
    <div className="relative z-0 h-[100svh] min-h-[32rem] overflow-hidden bg-[#0f0810]">
        {reducedMotion ? (
          <HeroPosterPicture
            className="absolute inset-0 z-0 size-full"
            sizes="100vw"
            posterJpg={media.heroOfficePoster}
            posterJpg640={media.heroOfficePoster640}
            posterWebp={media.heroOfficePosterWebp}
            posterWebp640={media.heroOfficePoster640Webp}
            objectPosition={z.objectPosition}
            onLoad={onHeroPosterReady}
          />
        ) : (
          <ScrollScrubVideo
            src={media.heroOffice}
            progress={0}
            loop
            scrub={false}
            zoom={1}
            zoomOrigin={z.origin}
            objectPosition={z.objectPosition}
            staticLcpPoster={media.heroOfficePoster}
            staticLcpSizes="100vw"
            className="absolute inset-0 z-0 size-full"
            label="Hero office background"
            onPosterReady={onHeroPosterReady}
            deferVideoLoad
          />
        )}

        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background: [
              "linear-gradient(90deg, rgba(26,15,24,0.92) 0%, rgba(26,15,24,0.78) 38%, rgba(26,15,24,0.35) 58%, transparent 78%)",
              "linear-gradient(180deg, rgba(15,8,16,0.55) 0%, transparent 38%, rgba(15,8,16,0.72) 100%)",
            ].join(", "),
          }}
          aria-hidden
        />

        <div
          className={`absolute inset-0 z-20 flex items-center pt-[4.5rem] pb-14 md:pt-24 md:pb-16 ${
            heroCopyVisible ? "visible opacity-100" : "invisible opacity-0"
          }`}
          aria-hidden={!heroCopyVisible}
        >
          <PageContainer
            className={`w-full ${heroContentReady ? "pointer-events-auto" : "pointer-events-none"}`}
          >
            {!heroContentReady ? (
              <HeroCopySkeleton />
            ) : (
              <>
                <div className="max-w-xl">
                  <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-plum-lavender md:text-[11px]">
                    {hero.eyebrow}
                  </p>

                  {reducedMotion ? (
                    <h1 className="font-display mt-5 text-[clamp(2rem,5.5vw,3.75rem)] font-semibold leading-[1.12] tracking-tight text-plum-neutral [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]">
                      {hero.titleLines[0]}
                    </h1>
                  ) : (
                    <HeroTitleRoll lines={hero.titleLines} />
                  )}

                  <p className="mt-4 text-lg font-medium text-plum-accent md:text-xl">{hero.subtitle}</p>
                  <p className="mt-6 text-sm font-semibold leading-relaxed text-plum-neutral md:text-base">
                    {hero.lead}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-plum-lavender md:text-[15px]">
                    {hero.description}
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-3 md:gap-4">
                    <PlumLink
                      href={hero.primaryCta.href}
                      className="inline-flex items-center gap-2 rounded-full bg-plum-accent px-5 py-2.5 text-sm font-semibold text-plum-primary shadow-sm transition hover:bg-plum-neutral"
                    >
                      {hero.primaryCta.label}
                      <span aria-hidden>→</span>
                    </PlumLink>
                    <PlumLink
                      href={hero.secondaryCta.href}
                      className="inline-flex items-center gap-2 rounded-full border border-plum-neutral/40 px-5 py-2.5 text-sm font-medium text-plum-neutral transition hover:border-plum-accent/60 hover:bg-plum-primary/35"
                    >
                      {hero.secondaryCta.label}
                    </PlumLink>
                    <PlumLink
                      href={hero.tertiaryCta.href}
                      className="inline-flex items-center gap-1.5 px-1 py-2.5 text-sm text-plum-lavender underline-offset-4 transition hover:text-plum-neutral hover:underline"
                    >
                      {hero.tertiaryCta.label}
                      <span aria-hidden>→</span>
                    </PlumLink>
                  </div>
                </div>

                <div className="mt-10 max-w-2xl shrink-0 border-t border-plum-lavender/25 pt-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-4">
                    {hero.meta.map((item) => (
                      <div key={item.label}>
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-plum-secondary">
                          {item.label}
                        </p>
                        <p className="mt-2 text-sm font-medium text-plum-neutral">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </PageContainer>
        </div>

        <div
          ref={scrollHintRef}
          className="pointer-events-none absolute inset-x-0 bottom-3 z-30 flex flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.35em] text-plum-lavender md:bottom-4"
        >
          Scroll
          <span className="h-8 w-px bg-plum-lavender/50" />
        </div>
    </div>
  );
}
