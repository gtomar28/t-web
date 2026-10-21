import { useLayoutEffect, useEffect, useRef, useSyncExternalStore } from "react";
import { ensureEntryLogoPreload } from "../utils/entryLogoPreload";
import { ensureHeroVideoPreload } from "../utils/heroVideoPreload";
import { media } from "../config/media";
import {
  isRouteOverlayVisible,
  markRouteOverlayShownNow,
  resetRouteContentReady,
  setRouteOverlayPathname,
  setRouteOverlayVisible,
  subscribeRouteOverlay,
} from "../utils/routeTransitionOverlay";

const MAX_WAIT_MS = 20000;

export function useRouteTransitionOverlay(pathname: string) {
  const overlayVisible = useSyncExternalStore(
    subscribeRouteOverlay,
    isRouteOverlayVisible,
    () => true,
  );

  const pathnameRef = useRef(pathname);

  useLayoutEffect(() => {
    ensureEntryLogoPreload();
  }, []);

  useLayoutEffect(() => {
    setRouteOverlayPathname(pathname);
    if (pathnameRef.current === pathname) return;
    pathnameRef.current = pathname;
    resetRouteContentReady();
    setRouteOverlayVisible(true);
    markRouteOverlayShownNow();
  }, [pathname]);

  useEffect(() => {
    ensureHeroVideoPreload(media.heroOffice);
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

  return { overlayVisible };
}
