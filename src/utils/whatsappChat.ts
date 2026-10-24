import { whatsappContact } from "../content/home";

export function buildWhatsAppChatUrl(
  message: string = whatsappContact.prefilledMessage,
): string {
  const phone = whatsappContact.phoneE164Digits.replace(/\D/g, "");
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
