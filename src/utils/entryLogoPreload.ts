import { media } from "../config/media";

let started = false;

/** Warm the entry logo MP4 once so route changes don't flash an empty loader. */
export function ensureEntryLogoPreload(): void {
  if (started || typeof document === "undefined") return;
  started = true;

  try {
    fetch(media.entryLogoAnimation, { priority: "high" } as RequestInit).catch(
      () => {},
    );
  } catch {
    /* ignore */
  }

  const video = document.createElement("video");
  video.muted = true;
  video.playsInline = true;
  video.preload = "auto";
  video.src = media.entryLogoAnimation;
  video.load();
}
