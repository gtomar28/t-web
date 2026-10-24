import { useCallback, useEffect, useRef, useState } from "react";
import { lerp } from "../../../lib/motion";
import { HeroPosterPicture } from "../../media/HeroPosterPicture";
import { media } from "../../../config/media";
import { scheduleDeferredMediaLoad } from "../../../utils/deferMediaLoad";
import { markReactHeroPosterReady } from "../../../utils/heroVideoPreload";

type ScrollScrubVideoProps = {
  src: string;
  progress: number;
  className?: string;
  scrub?: boolean;
  loop?: boolean;
  zoomMin?: number;
  zoomMax?: number;
  zoom?: number;
  zoomOrigin?: string;
  objectPosition?: string;
  /** Fallback poster on the video element (non-LCP sections). */
  poster?: string;
  /** High-priority still for LCP; video fades in after `canplay`. */
  staticLcpPoster?: string;
  staticLcpSrcSet?: string;
  staticLcpSizes?: string;
  label?: string;
  onPosterReady?: () => void;
  /** When set with `staticLcpPoster`, MP4 loads after scroll / interaction / idle — not on first paint. */
  deferVideoLoad?: boolean;
};

export function ScrollScrubVideo({
  src,
  progress,
  className = "",
  scrub = false,
  loop = true,
  zoomMin = 1,
  zoomMax = 1.18,
  zoom,
  zoomOrigin = "50% 50%",
  objectPosition = "50% 50%",
  poster,
  staticLcpPoster,
  staticLcpSrcSet,
  staticLcpSizes = "100vw",
  label = "Section animation",
  onPosterReady,
  deferVideoLoad = false,
}: ScrollScrubVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [videoVisible, setVideoVisible] = useState(false);
  const [missing, setMissing] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string | undefined>(
    deferVideoLoad && staticLcpPoster ? undefined : src,
  );

  useEffect(() => {
    if (!deferVideoLoad || !staticLcpPoster) {
      setVideoSrc(src);
      return;
    }
    return scheduleDeferredMediaLoad(() => setVideoSrc(src), {
      scrollMinY: 48,
      idleTimeoutMs: 8000,
    });
  }, [deferVideoLoad, staticLcpPoster, src]);

  const scale = zoom ?? lerp(zoomMin, zoomMax, progress);
  const useStaticLcp = Boolean(staticLcpPoster);

  const syncTime = useCallback(
    (p: number) => {
      const video = videoRef.current;
      if (!video || !scrub || !video.duration || Number.isNaN(video.duration)) return;
      const t = Math.min(video.duration - 0.04, Math.max(0, p * video.duration));
      if (Math.abs(video.currentTime - t) > 0.05) {
        video.currentTime = t;
      }
    },
    [scrub],
  );

  useEffect(() => {
    syncTime(progress);
  }, [progress, syncTime, ready]);

  useEffect(() => {
    if (!loop || !videoRef.current || missing || !videoSrc) return;
    const v = videoRef.current;
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        v.play().catch(() => {});
      });
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      v.pause();
    };
  }, [loop, ready, missing, videoSrc]);

  return (
    <div className={`overflow-hidden ${className || "relative h-full w-full"}`}>
      {!missing ? (
        <div
          className="relative h-full w-full will-change-transform"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: zoomOrigin,
          }}
        >
          {useStaticLcp ? (
            <HeroPosterPicture
              className={`absolute inset-0 transition-opacity duration-700 ${
                videoVisible ? "opacity-0" : "opacity-100"
              }`}
              style={{ objectPosition }}
              sizes={staticLcpSizes}
              posterJpg={staticLcpPoster ?? media.heroOfficePoster}
              posterJpg640={media.heroOfficePoster640}
              posterWebp={media.heroOfficePosterWebp}
              posterWebp640={media.heroOfficePoster640Webp}
              objectPosition={objectPosition}
              onLoad={() => {
                markReactHeroPosterReady();
                onPosterReady?.();
              }}
            />
          ) : null}
          <video
            ref={videoRef}
            className={`h-full w-full object-cover transition-opacity duration-700 ${
              useStaticLcp && !videoVisible ? "opacity-0" : "opacity-100"
            }`}
            style={{ objectPosition }}
            src={videoSrc}
            poster={useStaticLcp ? undefined : poster}
            muted
            playsInline
            preload={videoSrc ? (scrub ? "auto" : "metadata") : "none"}
            loop={loop}
            aria-label={label}
            onLoadedMetadata={() => {
              setReady(true);
              syncTime(progress);
            }}
            onCanPlay={() => {
              setReady(true);
              setVideoVisible(true);
            }}
            onError={() => setMissing(true)}
          />
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-[#0f0810] p-6 text-center">
          {staticLcpPoster ? (
            <img
              src={staticLcpPoster}
              srcSet={staticLcpSrcSet}
              sizes={staticLcpSizes}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition }}
            />
          ) : null}
          <p className="relative font-mono text-xs leading-relaxed text-plum-lavender">
            Add <span className="text-plum-accent">{src.replace("/videos/", "")}</span> under{" "}
            <span className="text-plum-neutral">public/videos/</span>
          </p>
        </div>
      )}
      <div className="grain pointer-events-none absolute inset-0" aria-hidden />
    </div>
  );
}
