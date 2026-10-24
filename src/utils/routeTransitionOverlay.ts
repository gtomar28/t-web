/** Sync route-transition overlay — show before React paints the next route. */

import { entryLoader } from "../config/media";
import {
  dismissTrevykBoot,
  markHomeHeroVideoWarm,
} from "./heroVideoPreload";
import { isHomePath } from "./homeEntryGate";

export const ROUTE_LOADER_ID = "trevyk-route-loader";

type Listener = (visible: boolean) => void;

/** First document paint must not sit under the route loader (was 95%+ LCP render delay). */
let visible = false;
let contentReady = true;
let shownAt = Date.now();
let activePathname = "/";
const listeners = new Set<Listener>();

type OverlayHmrState = {
  visible?: boolean;
  contentReady?: boolean;
  shownAt?: number;
  activePathname?: string;
};

/** Preserve overlay flags across Vite HMR so dev edits don't leave a blank shell. */
if (import.meta.hot) {
  const hot = import.meta.hot;
  const saved = hot.data as OverlayHmrState;
  if (saved.visible !== undefined) {
    visible = saved.visible;
    contentReady = saved.contentReady ?? false;
    shownAt = saved.shownAt ?? Date.now();
    activePathname = saved.activePathname ?? activePathname;
  }
  hot.dispose((data) => {
    const next = data as OverlayHmrState;
    next.visible = visible;
    next.contentReady = contentReady;
    next.shownAt = shownAt;
    next.activePathname = activePathname;
  });
}

function syncRouteOverlayDom(show: boolean) {
  if (typeof document === "undefined") return;
  const el = document.getElementById(ROUTE_LOADER_ID);
  if (!el) return;
  el.style.opacity = show ? "1" : "0";
  el.style.pointerEvents = show ? "auto" : "none";
  el.setAttribute("aria-hidden", show ? "false" : "true");
  if (show) {
    el.style.backgroundColor = entryLoader.background;
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
  if (visible === next) {
    if (!next) dismissTrevykBoot();
    return;
  }
  visible = next;
  if (next) {
    contentReady = false;
    shownAt = Date.now();
  } else {
    dismissTrevykBoot();
  }
  notify();
}

export function markRouteOverlayShownNow(): void {
  shownAt = Date.now();
  contentReady = false;
}

export function setRouteOverlayPathname(pathname: string): void {
  activePathname = pathname;
}

/** Dev / recovery: page is already mounted but overlay state was reset (e.g. HMR). */
export function reconcileRouteOverlayAfterUpdate(pathname: string): void {
  activePathname = pathname;
  if (typeof document === "undefined") return;
  const app = document.getElementById("trevyk-app");
  const main = document.getElementById("main-content");
  if (!app || !main) return;

  dismissTrevykBoot();

  const routeMounted = main.querySelector(
    `[data-trevyk-route-page="${CSS.escape(pathname)}"]`,
  );
  if (!routeMounted) return;

  contentReady = true;
  if (visible) {
    tryFinishOverlay(pathname);
  }
}

/** Fired when the target route component has mounted (after Suspense). */
export function markRouteContentReadyForPath(pathname: string): void {
  if (pathname !== activePathname) return;
  contentReady = true;
  tryFinishOverlay(pathname);
}
