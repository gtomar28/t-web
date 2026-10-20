import { listChatRoles } from "../lib/chat";

type ApiRes = {
  setHeader: (name: string, value: string) => void;
  status: (code: number) => { json: (body: unknown) => unknown };
};

export default function handler(_req: unknown, res: ApiRes) {
  res.setHeader("Cache-Control", "no-store");
  return res.status(200).json({ roles: listChatRoles() });
}
