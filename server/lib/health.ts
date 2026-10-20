import { isSmtpConfigured } from "./common";

/** Missing key only. AQ.… and AIza keys are both valid Google credential shapes. */
export function describeGeminiKeyIssue(
  apiKey: string | undefined,
): string | null {
  if (!apiKey?.trim()) {
    return "GEMINI_API_KEY is missing on the server.";
  }
  if (apiKey.trim().length < 20) {
    return "GEMINI_API_KEY looks too short to be valid.";
  }
  return null;
}

export function getHealthPayload() {
  const keyIssue = describeGeminiKeyIssue(process.env.GEMINI_API_KEY);
  return {
    status: "ok",
    runtime: "cjs-bundle",
    timestamp: new Date().toISOString(),
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
    geminiKeyLooksValid: !keyIssue,
    geminiKeyIssue: keyIssue,
    smtpConfigured: isSmtpConfigured(),
  };
}
