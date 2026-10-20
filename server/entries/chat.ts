import { handleChat } from "../lib/chat";

type ApiReq = { method?: string; body?: unknown };
type ApiRes = {
  setHeader: (name: string, value: string) => void;
  status: (code: number) => { json: (body: unknown) => unknown; end: () => unknown };
};

export default async function handler(req: ApiReq, res: ApiRes) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method === "OPTIONS") {
    res.setHeader("Allow", "POST, OPTIONS");
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST, OPTIONS");
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  const body =
    typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};

  const result = await handleChat(body);
  if (result.ok === false) {
    return res.status(result.status).json({ error: result.error });
  }

  return res.status(200).json({
    role: result.role,
    content: result.content,
    modelUsed: result.modelUsed,
    roleId: result.roleId,
  });
}
