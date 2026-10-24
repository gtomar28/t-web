/**
 * Injects hero copy from src/content/home.ts into index.html static shell markers.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { execSync } from "node:child_process";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const indexPath = path.join(root, "index.html");

const tmpTs = path.join(root, "scripts", ".static-home-export.mjs");
fs.writeFileSync(
  tmpTs,
  `
import { staticHomeHtml } from "../src/content/staticHomeHtml.ts";
console.log(JSON.stringify(staticHomeHtml));
`,
);

const json = execSync(`npx tsx ${JSON.stringify(tmpTs)}`, { cwd: root, encoding: "utf8" }).trim();
const data = JSON.parse(json);
fs.unlinkSync(tmpTs);

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;");

let html = fs.readFileSync(indexPath, "utf8");
const block = `<!-- trevyk-static-home-start -->
    <div id="trevyk-static-home" class="trevyk-static-home">
      <div class="trevyk-static-home__media" aria-hidden="true">
        <picture>
          <source
            type="image/webp"
            srcset="/images/hero-office-poster-640.webp 640w, /images/hero-office-poster.webp 1920w"
            sizes="100vw"
          />
          <img
            id="trevyk-lcp-hero"
            src="/images/hero-office-poster-640.jpg"
            srcset="/images/hero-office-poster-640.jpg 640w, /images/hero-office-poster.jpg 1920w"
            sizes="100vw"
            alt=""
            width="640"
            height="360"
            decoding="async"
            fetchpriority="high"
          />
        </picture>
      </div>
      <div class="trevyk-static-home__gradient" aria-hidden="true"></div>
      <div class="trevyk-static-home__stage">
        <div class="trevyk-static-home__container">
          <div class="trevyk-static-home__content" aria-busy="true" aria-label="Loading hero content">
            <div class="trevyk-skeleton-bar trevyk-skeleton-bar--pill" style="height: 0.75rem; width: 11rem"></div>
            <div class="trevyk-skeleton-title" aria-hidden="true">
              <div class="trevyk-skeleton-bar"></div>
              <div class="trevyk-skeleton-bar"></div>
              <div class="trevyk-skeleton-bar"></div>
            </div>
            <div class="trevyk-skeleton-bar" style="height: 1.25rem; width: 13rem; margin-top: 1rem"></div>
            <div class="trevyk-skeleton-stack" aria-hidden="true">
              <div class="trevyk-skeleton-bar" style="height: 0.875rem; width: 100%"></div>
              <div class="trevyk-skeleton-bar" style="height: 0.875rem; width: 88%"></div>
            </div>
            <div class="trevyk-skeleton-stack" aria-hidden="true">
              <div class="trevyk-skeleton-bar" style="height: 0.875rem; width: 100%"></div>
              <div class="trevyk-skeleton-bar" style="height: 0.875rem; width: 94%"></div>
              <div class="trevyk-skeleton-bar" style="height: 0.875rem; width: 76%"></div>
            </div>
            <div class="trevyk-skeleton-actions" aria-hidden="true">
              <div class="trevyk-skeleton-bar trevyk-skeleton-bar--pill" style="height: 2.5rem; width: 9rem"></div>
              <div class="trevyk-skeleton-bar trevyk-skeleton-bar--pill" style="height: 2.5rem; width: 8rem"></div>
              <div class="trevyk-skeleton-bar trevyk-skeleton-bar--pill" style="height: 2.5rem; width: 7rem"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- trevyk-static-home-end -->`;

const re = /<!-- trevyk-static-home-start -->[\s\S]*?<!-- trevyk-static-home-end -->/;
if (!re.test(html)) {
  throw new Error("static home markers missing in index.html");
}
html = html.replace(re, block);
fs.writeFileSync(indexPath, html);
console.log("synced static home HTML from content/home.ts");
