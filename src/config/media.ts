/** Video assets in `public/videos/`. */
export const media = {
  /** Hero — office zoom-in then zoom-out (forward + reverse) */
  heroOffice: "/videos/hero-office-loop.mp4",
  /** Reversed-only export (ends → starts, zoom-out) */
  heroOfficeReverse: "/videos/hero-office-reverse.mp4",
  /** How we work — full-section rotating earth background */
  processGlobe: "/videos/process-globe-bg.mp4",
  footerSolar: "/videos/solar.mp4",
  /** Full-screen centered loader while the home hero video buffers */
  entryLogoAnimation:
    "/images/kiduart/Trevyk_Technologies_logo_animation_1080p_20261020233711.mp4",
} as const;

/** Route-change logo loader (matches site shell `#2A1830`). */
export const entryLoader = {
  background: "#2A1830",
  /** ≥2× playback on route loader (never slower than 2). */
  playbackRate: 8,
  /** Keep loader up at least this long on redirect so logo video can load/play. */
  minVisibleMs: 1000,
  /** Logo video box vs full viewport (2/3 = ~67% width/height). */
  videoViewportRatio: 2 / 3,
  /** Subtle center zoom while the loader is visible (sync with route overlay min time). */
  zoomScaleStart: 1,
  zoomScaleMid: 1.08,
  zoomScaleEnd: 1.14,
  zoomDurationMs: 1800,
} as const;

/**
 * Scroll zoom focal points (% of the video frame).
 * Tune `heroOffice` if the Trevyk logo sits elsewhere in your export.
 */
export const mediaZoom = {
  heroOffice: {
    min: 1,
    max: 1.34,
    /** Zoom toward logo on the office wall */
    origin: "52% 46%",
    objectPosition: "52% 46%",
  },
  processGlobe: {
    min: 1,
    max: 1.38,
    /** Earth focal point in export (tune if needed) */
    origin: "75% 48%",
    objectPosition: "75% 48%",
  },
} as const;
