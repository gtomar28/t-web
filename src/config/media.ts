/** Video assets in `public/videos/`. */
export const media = {
  /** Hero — office background (home) */
  heroOffice: "/videos/hero-office-loop.mp4",
  heroOfficeReverse: "/videos/hero-office-reverse.mp4",
  /** LCP still — extracted from hero video; video loads after first paint. */
  heroOfficePoster: "/images/hero-office-poster.jpg",
  heroOfficePoster640: "/images/hero-office-poster-640.jpg",
  /** How we work — full-section rotating earth background */
  processGlobe: "/videos/process-globe-bg.mp4",
  footerSolar: "/videos/solar.mp4",
  /** Route-change loader (short logo loop). */
  entryLogoAnimation:
    "/images/kiduart/Trevyk_Technologies_logo_animation_1080p_20261020233711.mp4",
} as const;

/** Route-change logo loader — fast playback, short minimum visible time. */
export const entryLoader = {
  background: "#2A1830",
  playbackRate: 8,
  minVisibleMs: 280,
  videoViewportRatio: 2 / 3,
  zoomScaleStart: 1,
  zoomScaleEnd: 1.14,
  zoomDurationMs: 420,
} as const;

/**
 * Who we are — hero (`/companyIntro.png`) overlays. Tune here only.
 */
export const whoWeAreHeroBackdrop = {
  washOpacity: 0.38,
  washRgb: "26, 15, 24",
  vignetteLayers: [
    "linear-gradient(90deg, rgba(26,15,24,0.92) 0%, rgba(26,15,24,0.78) 38%, rgba(26,15,24,0.35) 58%, transparent 78%)",
    "linear-gradient(180deg, rgba(15,8,16,0.55) 0%, transparent 38%, rgba(15,8,16,0.72) 100%)",
  ],
} as const;

/** Process — hero (`/images/process/processhero.png`). */
export const processHeroBackdrop = {
  image: "/images/process/processhero.png",
} as const;

/** Contact — full-page split backdrop (`/images/contact/hero-backdrop.jpg`). */
export const contactHeroBackdrop = {
  image: "/images/contact/hero-backdrop.jpg",
  washOpacity: 0.28,
  washRgb: "26, 16, 36",
  vignetteLayers: [
    "linear-gradient(90deg, rgba(26,16,36,0.32) 0%, rgba(26,16,36,0.52) 40%, rgba(15,8,16,0.93) 56%, rgba(15,8,16,0.98) 100%)",
    "linear-gradient(180deg, rgba(15,8,16,0.5) 0%, transparent 38%, rgba(15,8,16,0.72) 100%)",
  ],
} as const;

/** Our products — hero (`/images/our-products/hero-backdrop.jpg`) overlays. */
export const ourProductsHeroBackdrop = {
  image: "/images/our-products/hero-backdrop.jpg",
  washOpacity: 0.32,
  washRgb: "26, 16, 36",
  vignetteLayers: [
    "linear-gradient(90deg, rgba(26,16,36,0.96) 0%, rgba(26,16,36,0.88) 36%, rgba(26,16,36,0.42) 52%, rgba(26,16,36,0.06) 72%)",
    "linear-gradient(180deg, rgba(15,8,16,0.62) 0%, transparent 40%, rgba(15,8,16,0.55) 100%)",
  ],
} as const;

/** Technology — modular architecture diagram (`/images/modulararchitechture.png`). */
export const technologyModularArchitecture = {
  image: "/images/modulararchitechture.png",
} as const;

/** Work guides — hero backdrop overlays (`/images/work/{slug}-hero.jpg`). */
export const workHeroBackdrop = {
  washOpacity: 0.35,
  washRgb: "26, 16, 36",
  vignetteLayers: [
    "linear-gradient(90deg, rgba(26,16,36,0.96) 0%, rgba(26,16,36,0.88) 42%, rgba(26,16,36,0.45) 62%, rgba(26,16,36,0.12) 88%)",
    "linear-gradient(180deg, rgba(15,8,16,0.55) 0%, transparent 40%, rgba(15,8,16,0.65) 100%)",
  ],
} as const;

/** Technology — “Build with Trevyk” dark plum band. */
export const technologyBuildBand = {
  base: "#120a14",
} as const;

/** Stack + modular band — matches diagram PNG edge color (~#070510). */
export const technologyDarkBand = {
  base: "#070510",
  gridOpacity: 0.04,
  gridSizePx: 48,
} as const;

/** Technology — hero (`/images/technology/hero-backdrop.jpg`). Art on the right; copy on the left. */
export const technologyHeroBackdrop = {
  image: "/images/technology/hero-backdrop.jpg",
  washOpacity: 0.22,
  washRgb: "26, 16, 36",
  vignetteLayers: [
    "linear-gradient(90deg, rgba(26,16,36,0.97) 0%, rgba(26,16,36,0.88) 38%, rgba(26,16,36,0.35) 58%, rgba(26,16,36,0.05) 78%)",
    "linear-gradient(180deg, rgba(15,8,16,0.55) 0%, transparent 40%, rgba(15,8,16,0.65) 100%)",
  ],
} as const;

/** What we do — hero (`/images/what-we-do/hero-backdrop.jpg`) overlays. */
export const whatWeDoHeroBackdrop = {
  image: "/images/what-we-do/hero-backdrop.jpg",
  washOpacity: 0.42,
  washRgb: "26, 16, 36",
  vignetteLayers: [
    "linear-gradient(90deg, rgba(26,16,36,0.94) 0%, rgba(26,16,36,0.82) 42%, rgba(26,16,36,0.45) 62%, rgba(26,16,36,0.12) 88%)",
    "linear-gradient(180deg, rgba(15,8,16,0.65) 0%, transparent 42%, rgba(15,8,16,0.55) 100%)",
  ],
} as const;

/**
 * Scroll zoom focal points (% of the video frame).
 * Tune `heroOffice` if the Trevyk logo sits elsewhere in your export.
 */
export const mediaZoom = {
  heroOffice: {
    min: 1,
    max: 1.34,
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
