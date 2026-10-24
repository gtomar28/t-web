/** Post-build HTML tweaks for Lighthouse (all prerendered routes). */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dist = path.join(path.resolve(path.dirname(fileURLToPath(import.meta.url)), ".."), "dist");

function walkHtml(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walkHtml(p, out);
    else if (name.endsWith(".html")) out.push(p);
  }
  return out;
}

function optimize(html) {
  if (!html.includes('rel="stylesheet"')) return html;

  html = html.replace(
    /<link rel="stylesheet" crossorigin href="(\/assets\/index-[^"]+\.css)">/g,
    `<link rel="stylesheet" crossorigin href="$1" media="print" onload="this.media='all'"><noscript><link rel="stylesheet" href="$1"></noscript>`,
  );

  html = html.replace(/<link rel="modulepreload" crossorigin href="\/assets\/[^"]+">\s*/g, "");

  const moduleScripts = [...html.matchAll(/<script type="module" crossorigin src="(\/assets\/index-[^"]+\.js)"><\/script>/g)];
  if (moduleScripts.length) {
    const tag = moduleScripts.map((m) => m[0]).join("\n    ");
    html = html.replace(/<script type="module" crossorigin src="\/assets\/index-[^"]+\.js"><\/script>\s*/g, "");
    html = html.replace("</body>", `    ${tag}\n  </body>`);
  }

  return html;
}

const files = walkHtml(dist);
for (const file of files) {
  const next = optimize(fs.readFileSync(file, "utf8"));
  fs.writeFileSync(file, next);
}
console.log(`optimized ${files.length} HTML files (defer CSS, drop modulepreload, JS at body end)`);
