type GtagFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: GtagFn;
  }
}

/** Prefer env; fall back to production GA4 property so live builds always track. */
const GA_ID = (
  import.meta.env.VITE_GA_MEASUREMENT_ID || "G-CH828R29RV"
).trim();

export function isAnalyticsEnabled() {
  return Boolean(GA_ID) && typeof window !== "undefined";
}

export function getGaMeasurementId() {
  return GA_ID;
}

/** Inject GA4 once (safe to call repeatedly). */
export function initAnalytics() {
  if (!GA_ID || typeof document === "undefined") return;
  if (document.getElementById("ga4-gtag")) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };

  window.gtag("js", new Date());
  window.gtag("config", GA_ID, {
    send_page_view: false,
    anonymize_ip: true,
  });

  const script = document.createElement("script");
  script.id = "ga4-gtag";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
}

export function trackPageView(pathname: string) {
  if (!isAnalyticsEnabled()) return;
  initAnalytics();
  if (!window.gtag) return;
  // HTML snippet already sends the first hit. SPA navigations still need this.
  window.gtag("event", "page_view", {
    page_path: pathname,
    page_location: window.location.href,
    page_title: document.title,
  });
}

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean | undefined>,
) {
  if (!isAnalyticsEnabled() || !window.gtag) return;
  window.gtag("event", eventName, params);
}

export function trackContactSubmit(lane: string) {
  trackEvent("generate_lead", {
    method: "contact_form",
    lane,
  });
}

export function trackDemoSubmit() {
  trackEvent("generate_lead", {
    method: "kiduart_demo",
    lane: "kiduart",
  });
}

export function trackChatOpen(roleId?: string) {
  trackEvent("chat_open", {
    role_id: roleId || "default",
  });
}

export function trackOutbound(url: string, label?: string) {
  trackEvent("click", {
    event_category: "outbound",
    event_label: label || url,
    link_url: url,
  });
}
