import React, { useEffect, useRef } from "react";
import { entryLoader, media } from "../config/media";
import { ROUTE_LOADER_ID } from "../utils/routeTransitionOverlay";

interface RouteLoaderProps {
  visible: boolean;
  reducedMotion?: boolean;
}

function applyLoaderVideoSettings(video: HTMLVideoElement, restart: boolean) {
  video.playbackRate = Math.max(2, entryLoader.playbackRate);
  if (restart) {
    try {
      video.currentTime = 0;
    } catch {
      /* ignore */
    }
  }
  video.play().catch(() => {});
}

function restartZoomAnimation(video: HTMLVideoElement) {
  video.classList.remove("entry-loader-video--active");
  void video.offsetWidth;
  video.classList.add("entry-loader-video--active");
}

export const RouteLoader: React.FC<RouteLoaderProps> = ({
  visible,
  reducedMotion = false,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const bg = entryLoader.background;
  const videoSizePct = `${entryLoader.videoViewportRatio * 100}%`;

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    applyLoaderVideoSettings(v, false);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !visible) return;
    restartZoomAnimation(v);
    applyLoaderVideoSettings(v, true);
  }, [visible]);

  if (reducedMotion) {
    return (
      <div
        id={ROUTE_LOADER_ID}
        className={`fixed inset-0 z-[9999] transition-opacity duration-150 ${
          visible ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        style={{ backgroundColor: bg }}
        aria-hidden={!visible}
        aria-busy={visible}
      />
    );
  }

  return (
    <div
      id={ROUTE_LOADER_ID}
      className={`fixed inset-0 z-[9999] transition-opacity duration-150 ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      style={{ backgroundColor: bg }}
      aria-hidden={!visible}
      aria-busy={visible}
      aria-live="polite"
      aria-label={visible ? "Loading page" : undefined}
    >
      <video
        ref={videoRef}
        className={`entry-loader-video pointer-events-none absolute inset-0 m-auto object-contain object-center ${
          visible ? "entry-loader-video--active" : ""
        }`}
        style={{
          backgroundColor: bg,
          width: videoSizePct,
          height: videoSizePct,
          animationDuration: `${entryLoader.zoomDurationMs}ms`,
        }}
        src={media.entryLogoAnimation}
        muted
        playsInline
        autoPlay
        loop
        preload={visible ? "auto" : "metadata"}
      />
    </div>
  );
};
