import * as esbuild from "esbuild";
import { readFileSync, writeFileSync } from "node:fs";

const result = await esbuild.build({
  entryPoints: {
    health: "server/entries/health.ts",
    contact: "server/entries/contact.ts",
    chat: "server/entries/chat.ts",
    "chat/roles": "server/entries/chat-roles.ts",
  },
  outdir: "api",
  bundle: true,
  platform: "node",
  format: "cjs",
  target: "node20",
  minify: true,
  legalComments: "none",
  sourcemap: false,
  logLevel: "info",
  metafile: true,
});

for (const file of Object.keys(result.metafile.outputs)) {
  if (!file.endsWith(".js")) continue;
  const source = readFileSync(file, "utf8");
  const cleaned = source.replaceAll("require('/path/to/key.json')", "null");
  if (cleaned !== source) writeFileSync(file, cleaned);
}
