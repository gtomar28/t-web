import express from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { handleChat, listChatRoles } from "./server/lib/chat";
import { handleContact } from "./server/lib/contact";
import { getHealthPayload } from "./server/lib/health";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json(getHealthPayload());
});

app.post("/api/contact", async (req, res) => {
  const result = await handleContact((req.body || {}) as Record<string, unknown>);
  if (result.ok === false) {
    return res.status(result.status).json({ error: result.error });
  }
  return res.json({ ok: true });
});

app.get("/api/chat/roles", (_req, res) => {
  res.json({ roles: listChatRoles() });
});

app.post("/api/chat", async (req, res) => {
  const result = await handleChat(req.body || {});
  if (result.ok === false) {
    return res.status(result.status).json({ error: result.error });
  }
  return res.json({
    role: result.role,
    content: result.content,
    modelUsed: result.modelUsed,
    roleId: result.roleId,
  });
});

function resolveSpaHtml(distPath: string, urlPath: string): string {
  const fallback = path.join(distPath, "index.html");
  let pathname = "/";
  try {
    pathname = decodeURIComponent(urlPath.split("?")[0] || "/");
  } catch {
    return fallback;
  }
  if (!pathname.startsWith("/")) return fallback;
  const trimmed = pathname.replace(/\/+$/, "") || "/";
  const relative = trimmed === "/" ? "" : trimmed.slice(1);
  const candidates = relative
    ? [
        path.resolve(distPath, relative, "index.html"),
        path.resolve(distPath, `${relative}.html`),
      ]
    : [fallback];
  for (const file of candidates) {
    const inside = file === fallback || file.startsWith(distPath + path.sep);
    if (!inside) continue;
    if (fs.existsSync(file) && fs.statSync(file).isFile()) return file;
  }
  return fallback;
}

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), "dist");
    app.use(express.static(distPath, { index: false }));
    app.get("*", (req, res, next) => {
      if (req.path.startsWith("/api")) return next();
      const file = resolveSpaHtml(distPath, req.path);
      const home = path.join(distPath, "index.html");
      const notFound = path.join(distPath, "404.html");
      const trimmed = (req.path.split("?")[0] || "/").replace(/\/+$/, "") || "/";
      if (file === home && trimmed !== "/" && fs.existsSync(notFound)) {
        res.status(404);
        return res.sendFile(notFound, (err) => {
          if (err) next(err);
        });
      }
      res.sendFile(file, (err) => {
        if (err) next(err);
      });
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Trevyk server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
