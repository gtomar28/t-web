/** Sync route-transition overlay — show before React paints the next route. */

import { entryLoader } from "../config/media";
import {
  dismissTrevykBoot,
  markHomeHeroVideoWarm,
} from "./heroVideoPreload";
import { isHomePath } from "./homeEntryGate";

export const ROUTE_LOADER_ID = "trevyk-route-loader";

type Listener = (visible: boolean) => void;

let visible = true;
let contentReady = false;
let shownAt = Date.now();
const listeners = new Set<Listener>();

function syncRouteOverlayDom(show: boolean) {
  if (typeof document === "undefined") return;
  const el = document.getElementById(ROUTE_LOADER_ID);
  if (!el) return;
  el.style.opacity = show ? "1" : "0";
  el.style.pointerEvents = show ? "auto" : "none";
  el.setAttribute("aria-hidden", show ? "false" : "true");
  if (show) {
    const video = el.querySelector("video");
    if (video) {
      video.playbackRate = Math.max(2, entryLoader.playbackRate);
      try {
        video.currentTime = 0;
      } catch {
        /* ignore */
      }
      video.play().catch(() => {});
    }
  }
}

function notify() {
  syncRouteOverlayDom(visible);
  listeners.forEach((fn) => fn(visible));
}

function finishOverlay() {
  if (!visible) return;
  visible = false;
  dismissTrevykBoot();
  notify();
}

function tryFinishOverlay(pathname: string) {
  if (!visible || !contentReady) return;
  if (pathname !== activePathname) return;

  const minMs = entryLoader.minVisibleMs;
  const elapsed = Date.now() - shownAt;
  if (elapsed < minMs) {
    window.setTimeout(() => tryFinishOverlay(pathname), minMs - elapsed);
    return;
  }

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (!visible || !contentReady) return;
      if (pathname !== activePathname) return;
      finishOverlay();
      if (isHomePath(pathname)) markHomeHeroVideoWarm();
    });
  });
}

export function subscribeRouteOverlay(listener: Listener): () => void {
  listeners.add(listener);
  listener(visible);
  return () => listeners.delete(listener);
}

export function isRouteOverlayVisible(): boolean {
  return visible;
}

export function routeOverlayShownAt(): number {
  return shownAt;
}

export function resetRouteContentReady(): void {
  contentReady = false;
}

/** Call on internal link click (before the router updates). */
export function beginRouteTransition(): void {
  contentReady = false;
  visible = true;
  shownAt = Date.now();
  notify();
}

export function setRouteOverlayVisible(next: boolean): void {
  if (visible === next) return;
  visible = next;
  if (next) {
    contentReady = false;
    shownAt = Date.now();
  }
  notify();
}

export function markRouteOverlayShownNow(): void {
  shownAt = Date.now();
  contentReady = false;
}

let activePathname = "/";

export function setRouteOverlayPathname(pathname: string): void {
  activePathname = pathname;
}

/** Fired when the target route component has mounted (after Suspense). */
export function markRouteContentReadyForPath(pathname: string): void {
  if (pathname !== activePathname) return;
  contentReady = true;
  tryFinishOverlay(pathname);
}
