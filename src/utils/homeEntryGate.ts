export function isHomePath(pathname: string): boolean {
  return pathname === "/" || pathname === "";
}

export function shouldGateHomeEntry(pathname: string): boolean {
  if (!isHomePath(pathname)) return false;
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem("trevyk-home-video-warm-v2") !== "1";
  } catch {
    return true;
  }
}
