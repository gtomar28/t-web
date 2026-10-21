/** Shared hero background preload — one fetch + one hidden video for progress. */

type ProgressListener = (percent: number) => void;

let started = false;
let lastPercent = 0;
const listeners = new Set<ProgressListener>();

function emit(next: number) {
  const clamped = Math.min(100, Math.max(lastPercent, Math.round(next)));
  if (clamped === lastPercent) return;
  lastPercent = clamped;
  listeners.forEach((fn) => fn(clamped));
}

export function watchHeroVideoProgress(
  src: string,
  onProgress: ProgressListener,
): () => void {
  listeners.add(onProgress);
  onProgress(lastPercent);
  ensureHeroVideoPreload(src);
  return () => {
    listeners.delete(onProgress);
  };
}

export function ensureHeroVideoPreload(src: string): void {
  if (started || typeof document === "undefined") return;
  started = true;

  // Warm HTTP cache (Range-friendly on most CDNs).
  try {
    fetch(src, { priority: "high" } as RequestInit).catch(() => {});
  } catch {
    /* ignore */
  }

  const video = document.createElement("video");
  video.muted = true;
  video.playsInline = true;
  video.preload = "auto";
  video.setAttribute("fetchpriority", "high");
  video.src = src;

  const onBuffer = () => {
    const duration = video.duration;
    if (!duration || !Number.isFinite(duration)) return;
    if (video.buffered.length === 0) return;
    const end = video.buffered.end(video.buffered.length - 1);
    emit(Math.min(92, (end / duration) * 100));
  };

  video.addEventListener("loadstart", () => emit(4));
  video.addEventListener("loadedmetadata", () => emit(18));
  video.addEventListener("progress", onBuffer);
  video.addEventListener("loadeddata", () => emit(52));
  video.addEventListener("canplay", () => emit(76));
  video.addEventListener("canplaythrough", () => emit(100), { once: true });
  video.addEventListener("error", () => emit(100), { once: true });

  video.load();
}

export function dismissTrevykBoot(): void {
  document.getElementById("trevyk-boot")?.remove();
}

const HOME_VIDEO_WARM_KEY = "trevyk-home-video-warm-v2";

export function isHomeHeroVideoWarm(): boolean {
  try {
    return sessionStorage.getItem(HOME_VIDEO_WARM_KEY) === "1";
  } catch {
    return false;
  }
}

export function markHomeHeroVideoWarm(): void {
  try {
    sessionStorage.setItem(HOME_VIDEO_WARM_KEY, "1");
  } catch {
    /* private mode */
  }
}
