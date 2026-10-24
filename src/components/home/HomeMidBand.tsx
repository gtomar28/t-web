import React from "react";

/**
 * Grid/checkbox mid-band for home sections that stay transparent.
 * Full plum blocks (e.g. About teaser, client reviews) sit outside with `bg-background`.
 */
export function HomeMidBand({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="home-mid-atmosphere relative z-20 isolate text-plum-neutral"
      aria-label="Home content sections"
    >
      <div
        className="grain pointer-events-none absolute inset-0 z-0"
        aria-hidden
      />
      <div className="relative z-1">{children}</div>
    </div>
  );
}
