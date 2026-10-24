/**
 * Single source for the visible static home shell in index.html.
 * Run `npm run sync:static-home` after editing hero copy.
 */
import { hero } from "./home";

export const staticHomeHtml = {
  eyebrow: hero.eyebrow,
  title: hero.titleLines[0]!,
  subtitle: hero.subtitle,
  lead: hero.lead,
  primaryCta: hero.primaryCta,
  secondaryCta: hero.secondaryCta,
  tertiaryCta: hero.tertiaryCta,
} as const;
