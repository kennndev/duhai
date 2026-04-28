import "server-only";
import { Resend } from "resend";

export async function sendFinalNoticeEmail(input: {
  to: string;
  referenceNumber: string;
  category: string;
  signedUrl: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL ?? "Duhai <notices@duhai.pk>";

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  const resend = new Resend(apiKey);
  return resend.emails.send({
    from,
    to: input.to,
    subject: `Your Duhai legal notice is ready - ${input.referenceNumber}`,
    text: `Your lawyer-reviewed legal notice is ready.

Reference: ${input.referenceNumber}
Category: ${input.category}
Download: ${input.signedUrl}

This link expires for your privacy.`
  });
}
