import { useEffect, useRef, useState } from "react";
import { media } from "../../../config/media";
import { useIntersectionMediaSrc } from "../../../utils/deferMediaLoad";

type FooterSolarVideoProps = {
  className?: string;
  showGrain?: boolean;
};

export function FooterSolarVideo({
  className = "absolute inset-0",
  showGrain = true,
}: FooterSolarVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [missing, setMissing] = useState(false);
  const { containerRef, src: videoSrc } = useIntersectionMediaSrc(media.footerSolar, "320px 0px");

  useEffect(() => {
    const v = ref.current;
    if (!v || missing || !videoSrc) return;

    const play = () => {
      v.muted = true;
      v.play().catch(() => {});
    };
    play();
  }, [missing, videoSrc]);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      {!missing ? (
        <video
          ref={ref}
          className="h-full w-full object-cover object-center"
          src={videoSrc}
          muted
          autoPlay={Boolean(videoSrc)}
          loop
          playsInline
          preload="none"
          aria-hidden
          onLoadedData={() => ref.current?.play().catch(() => {})}
          onError={() => setMissing(true)}
        />
      ) : (
        <div
          className="h-full w-full bg-[#0f0810]"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 65% 45%, color-mix(in srgb, #85627E 35%, transparent), transparent 65%), radial-gradient(circle at 70% 50%, color-mix(in srgb, #F6CDCE 12%, transparent), transparent 40%), #0f0810",
          }}
        />
      )}
      <div
        className="pointer-events-none absolute inset-0 bg-[color-mix(in_srgb,#1a0f18_32%,transparent)]"
        aria-hidden
      />
      {showGrain ? (
        <div className="grain pointer-events-none absolute inset-0 opacity-[0.04]" aria-hidden />
      ) : null}
    </div>
  );
}
