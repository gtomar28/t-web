/** Map maansuk hash routes to Trevyk SPA paths */
export function resolvePlumHref(href: string): string {
  if (href.startsWith("http") || href.startsWith("mailto:")) return href;
  const map: Record<string, string> = {
    "#contact": "/contact",
    "#work": "/what-we-do",
    "#services": "/what-we-do",
    "#process": "/process",
  };
  if (href.startsWith("#")) return map[href] ?? "/";
  return href.startsWith("/") ? href : `/${href}`;
}

export function isExternalPlumHref(href: string): boolean {
  return href.startsWith("http");
}
