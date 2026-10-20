/**
 * Site-wide SEO / URL config.
 *
 * Production canonical host is https://www.trevyk.in (apex trevyk.in 308s here).
 * Set VITE_SITE_URL in .env / Vercel. Apex values are normalized to www so
 * hydrated canonicals never point at the redirecting host.
 * Preview / alternate hosts are left unchanged.
 */
export const CANONICAL_SITE_URL = "https://www.trevyk.in";

function readConfiguredSiteUrl(): string | undefined {
  const viteEnv = import.meta.env as { VITE_SITE_URL?: string } | undefined;
  const fromVite = viteEnv?.VITE_SITE_URL?.trim();
  if (fromVite) return fromVite;

  // tsx prerender and other Node runners do not get Vite's import.meta.env inject.
  if (typeof process !== "undefined") {
    const fromProcess = process.env?.VITE_SITE_URL?.trim();
    if (fromProcess) return fromProcess;
  }

  return undefined;
}

/**
 * Normalize the public site origin used for canonicals, OG, and JSON-LD.
 * Throws only on clearly invalid absolute-URL configuration.
 */
export function normalizeSiteUrl(raw: string): string {
  const trimmed = raw.trim().replace(/\/$/, "");
  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    throw new Error(
      `Invalid VITE_SITE_URL "${raw}". Use an absolute URL such as ${CANONICAL_SITE_URL}`,
    );
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    throw new Error(
      `Invalid VITE_SITE_URL "${raw}". Use http(s), e.g. ${CANONICAL_SITE_URL}`,
    );
  }

  const host = parsed.hostname.toLowerCase();
  // Apex redirects to www in production — never emit apex in canonicals.
  if (host === "trevyk.in" || host === "www.trevyk.in") {
    return CANONICAL_SITE_URL;
  }

  return `${parsed.protocol}//${parsed.host}`.replace(/\/$/, "");
}

export const SITE_URL = normalizeSiteUrl(
  readConfiguredSiteUrl() || CANONICAL_SITE_URL,
);

export const SITE_NAME = "TREVYK Technologies";
export const SITE_TAGLINE = "Turning Vision Into Progress.";
export const KIDUART_URL = "https://kiduart.com";
export const KIDUART_ABOUT_URL = "https://kiduart.com/about";

export const SITE_ROUTES = [
  "/",
  "/services",
  "/ai",
  "/technology",
  "/kiduart",
  "/process",
  "/about",
  "/contact",
  "/sitemap",
] as const;

export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}
