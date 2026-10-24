/** Refresh `<lastmod>` in public/sitemap.xml on each production build. */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sitemapPath = path.join(root, "public", "sitemap.xml");
const today = new Date().toISOString().slice(0, 10);

let xml = fs.readFileSync(sitemapPath, "utf8");
xml = xml.replace(/<lastmod>[^<]+<\/lastmod>/g, `<lastmod>${today}</lastmod>`);
fs.writeFileSync(sitemapPath, xml);
console.log(`sitemap.xml lastmod → ${today}`);
