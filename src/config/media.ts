/** Video assets in `public/videos/`. */
export const media = {
  /** Hero — office zoom-in then zoom-out (forward + reverse) */
  heroOffice: "/videos/hero-office-loop.mp4",
  /** Reversed-only export (ends → starts, zoom-out) */
  heroOfficeReverse: "/videos/hero-office-reverse.mp4",
  /** How we work — full-section rotating earth background */
  processGlobe: "/videos/process-globe-bg.mp4",
  footerSolar: "/videos/solar.mp4",
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
