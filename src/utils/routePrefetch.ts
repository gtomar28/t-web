/** Warm route chunks on nav hover (Vite dynamic imports). */
const PREFETCH: Record<string, () => Promise<unknown>> = {
  "/": () => import("../pages/HomePage"),
  "/what-we-do": () => import("../pages/ServicesPage"),
  "/ai": () => import("../pages/AiPage"),
  "/technology": () => import("../pages/TechnologyPage"),
  "/our-products": () => import("../pages/KiduartPage"),
  "/process": () => import("../pages/ProcessPage"),
  "/who-we-are": () => import("../pages/AboutPage"),
  "/contact": () => import("../pages/ContactPage"),
};

const warmed = new Set<string>();

export function prefetchRoute(pathname: string): void {
  const path = pathname.split("?")[0]?.split("#")[0] || "/";
  if (path.startsWith("/work/")) {
    if (warmed.has("/work/:slug")) return;
    warmed.add("/work/:slug");
    void import("../pages/GuidePage");
    return;
  }
  const load = PREFETCH[path];
  if (!load || warmed.has(path)) return;
  warmed.add(path);
  void load();
}

export function prefetchCommonRoutesIdle(): void {
  const run = () => {
    prefetchRoute("/what-we-do");
    prefetchRoute("/ai");
    prefetchRoute("/contact");
  };
  if (typeof requestIdleCallback !== "undefined") {
    requestIdleCallback(run, { timeout: 4000 });
  } else {
    window.setTimeout(run, 2500);
  }
}
