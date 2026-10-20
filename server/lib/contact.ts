import nodemailer from "nodemailer";
import {
  escapeHtml,
  getSmtpPass,
  isSmtpConfigured,
  normalizeContactPayload,
} from "./common";

function createMailTransport() {
  if (!isSmtpConfigured()) {
    throw new Error("SMTP is not configured");
  }
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: getSmtpPass(),
    },
  });
}

export type ContactResult =
  | { ok: true }
  | { ok: false; status: number; error: string };

export async function handleContact(
  body: Record<string, unknown>,
): Promise<ContactResult> {
  if (!isSmtpConfigured()) {
    return {
      ok: false,
      status: 503,
      error: "Email delivery is not configured on this server yet.",
    };
  }

  const { type, name, email, organization, phone, scope } =
    normalizeContactPayload(body || {});

  if (!name || !email || !organization) {
    return {
      ok: false,
      status: 400,
      error: "Name, email, and organisation are required.",
    };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      ok: false,
      status: 400,
      error: "Please provide a valid email.",
    };
  }

  const inbox =
    process.env.MAIL_TO ||
    (type === "kiduart" || type === "demo"
      ? "support@kiduart.com"
      : "contact@trevyk.com");
  const fromAddress = process.env.SMTP_USER as string;
  const subjectPrefix =
    type === "kiduart" || type === "demo"
      ? "[Kiduart demo]"
      : "[Trevyk contact]";
  const subject = `${subjectPrefix} ${organization}  ${name}`;

  const textBody = [
    `Type: ${type}`,
    `Name: ${name}`,
    `Email: ${email}`,
    `Organisation: ${organization}`,
    `Phone: ${phone || ""}`,
    "",
    "Message / scope:",
    scope || "(none provided)",
    "",
    `Submitted: ${new Date().toISOString()}`,
    `Site: ${process.env.VITE_SITE_URL || "https://www.trevyk.in"}`,
  ].join("\n");

  const htmlBody = `
      <div style="font-family:Arial,sans-serif;line-height:1.5;color:#241428">
        <h2 style="margin:0 0 12px">${escapeHtml(subjectPrefix)} New enquiry</h2>
        <p><strong>Type:</strong> ${escapeHtml(type)}</p>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Organisation:</strong> ${escapeHtml(organization)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone || "")}</p>
        <p><strong>Message / scope:</strong></p>
        <pre style="white-space:pre-wrap;background:#f6f2f8;padding:12px;border-radius:8px">${escapeHtml(scope || "(none provided)")}</pre>
        <p style="color:#666;font-size:12px">Submitted ${escapeHtml(new Date().toISOString())}</p>
      </div>
    `;

  try {
    const transport = createMailTransport();
    await transport.sendMail({
      from: `"Trevyk Website" <${fromAddress}>`,
      to: inbox,
      replyTo: email,
      subject,
      text: textBody,
      html: htmlBody,
    });

    try {
      await transport.sendMail({
        from: `"Trevyk Technologies" <${fromAddress}>`,
        to: email,
        subject: "We received your message  Trevyk",
        text: [
          `Hi ${name},`,
          "",
          "Thanks for writing to Trevyk. We received your enquiry and will reply within one business day.",
          "",
          type === "kiduart" || type === "demo"
            ? "You can also book a product demo anytime at https://kiduart.com"
            : "Meanwhile you can explore https://www.trevyk.in",
          "",
          " Trevyk Technologies",
        ].join("\n"),
      });
    } catch (ackErr) {
      console.warn("Contact ack email failed (inbox mail still sent):", ackErr);
    }

    return { ok: true };
  } catch (error: unknown) {
    console.error("Contact mail error:", error);
    const raw =
      error instanceof Error
        ? error.message
        : "Could not send your message right now. Please email contact@trevyk.com.";
    const isBadCreds =
      /Invalid login|BadCredentials|535-5\.7\.8/i.test(raw) ||
      /Username and Password not accepted/i.test(raw);
    return {
      ok: false,
      status: 500,
      error: isBadCreds
        ? "Gmail rejected SMTP login (535 BadCredentials). Create a new App Password for tech.trevyk@gmail.com at https://myaccount.google.com/apppasswords (2-Step Verification must be on), put it in SMTP_PASS, restart the server, and try again. Do not use your normal Gmail password."
        : raw,
    };
  }
}
