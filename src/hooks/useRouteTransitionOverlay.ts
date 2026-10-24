import { useLayoutEffect, useEffect, useRef, useSyncExternalStore } from "react";
import { ensureHeroVideoPreload } from "../utils/heroVideoPreload";
import { media } from "../config/media";
import { isHomePath } from "../utils/homeEntryGate";
import {
  isRouteOverlayVisible,
  markRouteContentReadyForPath,
  markRouteOverlayShownNow,
  reconcileRouteOverlayAfterUpdate,
  resetRouteContentReady,
  setRouteOverlayPathname,
  setRouteOverlayVisible,
  subscribeRouteOverlay,
} from "../utils/routeTransitionOverlay";

const MAX_WAIT_MS = 3500;

export function useRouteTransitionOverlay(pathname: string) {
  const overlayVisible = useSyncExternalStore(
    subscribeRouteOverlay,
    isRouteOverlayVisible,
    () => true,
  );

  const pathnameRef = useRef(pathname);

  useEffect(() => {
    if (isHomePath(pathname)) {
      ensureHeroVideoPreload(media.heroOffice);
    }
  }, [pathname]);

  useLayoutEffect(() => {
    setRouteOverlayPathname(pathname);
    if (pathnameRef.current === pathname) return;
    pathnameRef.current = pathname;
    resetRouteContentReady();
    setRouteOverlayVisible(true);
    markRouteOverlayShownNow();
  }, [pathname]);

  useEffect(() => {
    if (!overlayVisible) return;

    const started = Date.now();
    const id = window.setInterval(() => {
      if (Date.now() - started >= MAX_WAIT_MS) {
        setRouteOverlayVisible(false);
      }
    }, 500);

    return () => window.clearInterval(id);
  }, [overlayVisible, pathname]);

  /** Re-assert ready when the target page is mounted but HMR skipped the route effect. */
  useEffect(() => {
    if (!overlayVisible) return;

    const attempt = () => {
      const main = document.getElementById("main-content");
      const mounted = main?.querySelector(
        `[data-trevyk-route-page="${CSS.escape(pathname)}"]`,
      );
      if (mounted) markRouteContentReadyForPath(pathname);
    };

    const t0 = window.setTimeout(attempt, 120);
    const t1 = window.setInterval(attempt, 400);
    const stop = window.setTimeout(() => window.clearInterval(t1), 8000);

    return () => {
      window.clearTimeout(t0);
      window.clearInterval(t1);
      window.clearTimeout(stop);
    };
  }, [overlayVisible, pathname]);

  useEffect(() => {
    if (!import.meta.env.DEV || !import.meta.hot) return;

    const onAfterUpdate = () => {
      window.requestAnimationFrame(() => {
        reconcileRouteOverlayAfterUpdate(pathname);
      });
    };

    import.meta.hot.on("vite:afterUpdate", onAfterUpdate);
    return () => {
      import.meta.hot?.off("vite:afterUpdate", onAfterUpdate);
    };
  }, [pathname]);

  return { overlayVisible };
}
