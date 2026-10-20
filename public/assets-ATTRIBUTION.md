# Asset attribution

Licenses and sources for third-party / generated motion and 3D assets used on trevyk.in.

## HDRI

| File | Source | License |
|------|--------|---------|
| `hdr/studio_small_03_1k.hdr` | Poly Haven *Studio Small 03* (1k), distributed via the drei/react-three-fiber asset CDN mirror | **CC0** (public domain) — commercial use OK |

Used only on the home Hero R3F canvas (`Environment`), not as a full-screen background plate.

## Lottie (custom brand JSON)

| File | Notes | License |
|------|--------|---------|
| `lottie/signal-rings.json` | Brand abstract signal rings (plum / lavender / blush) | Original for Trevyk — free to use with the site |
| `lottie/nodes-pulse.json` | Node pulse for Kiduart journey | Original for Trevyk |
| `lottie/progress-token.json` | Process token travel | Original for Trevyk |
| `lottie/module-dock.json` | Services module dock icons | Original for Trevyk |
| `lottie/brand-pulse.json` | About / Contact Y pulse | Original for Trevyk |

These are lightweight JSON animations authored for brand fit (not stock SaaS kits). Runtime: `lottie-react`.

## Growth offer card art (light plum)

| File | Notes | License |
|------|--------|---------|
| `images/growth-card-*-plum.jpg` (+ `-640` variants) | Home “For startups…” service cards — light plum / mauve set | Generated for Trevyk — free to use with the site |

Legacy dark-purple cards (`growth-card-*.jpg` without `-plum`) remain on disk for rollback.

## Kiduart campus illustration

| File | Notes | License |
|------|--------|---------|
| `images/kiduart/campus-graph.jpg` | Isometric connected-campus hero for home Kiduart teaser (plum / lavender / blush palette) | Generated for Trevyk — free to use with the site |

## Spline

| Surface | Scene | Notes |
|---------|-------|--------|
| Technology page (`SplineMount`) | Default: public Spline demo scene URL, or override with `VITE_SPLINE_TECH_SCENE` | Lazy-loaded via `@splinetool/react-spline`; falls back to SVG `WowAccent` on error / `prefers-reduced-motion` |

Replace the default URL with a brand-authored abstract stack scene when ready; credit the Spline author in this file when swapped.

## Rive

Not shipped in this round (Lottie-only for process / teasers).

## Home About teaser

| File | Notes | License |
|------|--------|---------|
| `about.png` | Product / Systems / Delivery pillar art (plum/lavender/blush theme) | Original for Trevyk |
| `about-neon-backup.png` | Previous about art with brighter neon accents (backup) | Original for Trevyk |
| `capacities.png` | Hub-and-spoke capability lattice (Products & Services row 2) | Original for Trevyk — themed from team layout reference |
| `images/architecture/layer-*.jpg` | Architecture stack layer visuals (edge, shield, code, database, server) | Generated for Trevyk — plum 3D layer icons |
| `images/architecture/glass-slab-plum-{0,20,40,60,80}.jpg` | Empty glass slabs (0–80% plum tint) | Generated for Trevyk |
| `images/architecture/glass-slab-plum-{0,20,40,60,80}-transparent.png` | Glass slabs with alpha background (glass only) | Derived from matching `glass-slab-plum-*.jpg` via matting |

## Home growth cards (photography-style)

| File pattern | Notes | License |
|--------------|--------|---------|
| `images/growth-card-*.jpg` (+ `-640` variants) | AI-generated hero art for home service cards; plum / lavender grade matched to site wave background | Original for Trevyk — use with the site |

## Runtime libraries

- `@react-three/fiber` / `@react-three/drei` — Hero core + Environment
- `lottie-react` — section micro-motion
- `@splinetool/react-spline` + `@splinetool/runtime` — single Technology wow scene
