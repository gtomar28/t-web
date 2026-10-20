export function escapeHtml(value: string) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function getSmtpPass() {
  return (process.env.SMTP_PASS || "").replace(/\s+/g, "");
}

export function isSmtpConfigured() {
  return Boolean(process.env.SMTP_USER && getSmtpPass());
}

export function normalizeContactPayload(body: Record<string, unknown>) {
  const type =
    body.type === "kiduart" || body.type === "demo"
      ? String(body.type)
      : "services";
  const name = String(body.name || body.contactName || "").trim();
  const email = String(body.email || "").trim();
  const organization = String(
    body.organization || body.institution || "",
  ).trim();
  const phone = String(body.phone || "").trim();
  const scope = String(body.scope || body.message || "").trim();

  return { type, name, email, organization, phone, scope };
}
