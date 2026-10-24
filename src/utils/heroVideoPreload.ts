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

  const video = document.createElement("video");
  video.muted = true;
  video.playsInline = true;
  video.preload = "none";

  const onBuffer = () => {
    const duration = video.duration;
    if (!duration || !Number.isFinite(duration)) return;
    if (video.buffered.length === 0) return;
    const end = video.buffered.end(video.buffered.length - 1);
    emit(Math.min(92, (end / duration) * 100));
  };

  const attach = () => {
    video.src = src;
    video.addEventListener("loadstart", () => emit(4));
    video.addEventListener("loadedmetadata", () => emit(18));
    video.addEventListener("progress", onBuffer);
    video.addEventListener("loadeddata", () => emit(52));
    video.addEventListener("canplay", () => emit(76));
    video.addEventListener("canplaythrough", () => emit(100), { once: true });
    video.addEventListener("error", () => emit(100), { once: true });
    video.load();
  };

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(attach, { timeout: 10000 });
  } else {
    window.setTimeout(attach, 8000);
  }
}

let reactHeroPosterReady = false;
let documentLoadComplete =
  typeof document !== "undefined" && document.readyState === "complete";
let handoffScheduled = false;

const HANDOFF_SESSION_KEY = "trevyk-home-handoff-v2";

function isRepeatHomeVisit(): boolean {
  try {
    return sessionStorage.getItem(HANDOFF_SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

/** PSI / first paint: hold static LCP shell. Repeat visits: hand off quickly. */
function handoffDelayMs(): number {
  if (import.meta.env.DEV) return 0;
  if (isRepeatHomeVisit()) return 48;
  return 1200;
}

function markHandoffSession(): void {
  try {
    sessionStorage.setItem(HANDOFF_SESSION_KEY, "1");
  } catch {
    /* ignore */
  }
}

function staticHeroPosterReady(): boolean {
  if (typeof window !== "undefined" && window.__trevykStaticHeroReady) return true;
  const img = document.getElementById("trevyk-lcp-hero") as HTMLImageElement | null;
  return Boolean(img?.complete && img.naturalWidth > 0);
}

function posterReadyForHandoff(): boolean {
  return reactHeroPosterReady || staticHeroPosterReady();
}

function documentReadyForHandoff(): boolean {
  if (typeof document === "undefined") return false;
  if (import.meta.env.DEV) {
    return document.readyState === "interactive" || document.readyState === "complete";
  }
  if (isRepeatHomeVisit()) {
    return document.readyState === "interactive" || document.readyState === "complete";
  }
  return documentLoadComplete;
}

function removeLcpShellNodes(): void {
  document.getElementById("trevyk-boot")?.remove();
  if (typeof window !== "undefined" && typeof window.__trevykRemoveLcpShell === "function") {
    window.__trevykRemoveLcpShell();
    return;
  }
  document.getElementById("trevyk-static-home")?.remove();
  document.getElementById("trevyk-lcp-shell")?.remove();
  if (typeof document !== "undefined") {
    document.body.style.backgroundImage = "";
    document.body.style.backgroundColor = "";
  }
}

/** Hand off static LCP shell → React hero after LCP-friendly delay (lab / first visit). */
function tryHandoffHtmlLcpShell(): void {
  if (!posterReadyForHandoff() || !documentReadyForHandoff() || handoffScheduled) return;
  handoffScheduled = true;

  const delay = handoffDelayMs();
  window.setTimeout(() => {
    requestAnimationFrame(() => {
      window.dispatchEvent(new Event("trevyk-lcp-handoff"));
      markHandoffSession();
      requestAnimationFrame(() => {
        removeLcpShellNodes();
      });
    });
  }, delay);
}

if (typeof window !== "undefined") {
  const bump = () => tryHandoffHtmlLcpShell();
  window.addEventListener(
    "load",
    () => {
      documentLoadComplete = true;
      bump();
    },
    { once: true },
  );
  window.addEventListener("trevyk-static-hero-ready", bump);
  if (import.meta.env.DEV || isRepeatHomeVisit()) {
    if (document.readyState === "interactive" || document.readyState === "complete") {
      bump();
    } else {
      document.addEventListener("DOMContentLoaded", bump, { once: true });
    }
  }
}

/** Call when the in-app hero poster `img` has loaded (home LCP handoff). */
export function markReactHeroPosterReady(): void {
  reactHeroPosterReady = true;
  tryHandoffHtmlLcpShell();
}

/** Immediate teardown (route changes, non-home, legacy boot). */
export function dismissTrevykBoot(): void {
  removeLcpShellNodes();
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
