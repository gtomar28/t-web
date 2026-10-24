import { useEffect, useState } from "react";

/** Hero headline + body — keep list short so ready resolves fast. */
const HERO_DISPLAY_FACES = [
  '600 1em "Space Grotesk"',
  '700 1em "Space Grotesk"',
  '600 1em "Plus Jakarta Sans"',
] as const;

function heroFontsCheck(): boolean {
  if (typeof document === "undefined" || !document.fonts) return false;
  return HERO_DISPLAY_FACES.every((face) => document.fonts.check(face));
}

async function ensureHeroFonts(): Promise<boolean> {
  if (typeof document === "undefined" || !document.fonts) return true;
  if (heroFontsCheck()) return true;
  await Promise.all(HERO_DISPLAY_FACES.map((face) => document.fonts.load(face)));
  return heroFontsCheck();
}

/** True once hero display fonts are active (avoids title reflow). */
export function useDisplayFontsReady(): boolean {
  const [ready, setReady] = useState(heroFontsCheck);

  useEffect(() => {
    let cancelled = false;
    const resolve = () => {
      if (!cancelled && heroFontsCheck()) setReady(true);
    };

    if (heroFontsCheck()) {
      resolve();
      return;
    }

    void ensureHeroFonts().then((ok) => {
      if (!cancelled && ok) setReady(true);
    });

    const link = document.getElementById("trevyk-fonts");
    link?.addEventListener("load", resolve);
    document.fonts?.addEventListener("loadingdone", resolve);

    return () => {
      cancelled = true;
      link?.removeEventListener("load", resolve);
      document.fonts?.removeEventListener("loadingdone", resolve);
    };
  }, []);

  return ready;
}
