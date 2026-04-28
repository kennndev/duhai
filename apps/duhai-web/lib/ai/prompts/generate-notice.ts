import type { NoticeLegalContext } from "@/lib/ai/retrieve-legal-context";

export const NOTICE_PROMPT_VERSION = "duhai-notice-v1";

const hardRule = `Use only the legal references, templates, and facts provided below.
Do not invent statutes, sections, case names, citations, court names, facts, dates, addresses, or payment amounts.
If the supplied legal context is insufficient, mark the draft as requiring manual lawyer drafting.`;

export function buildGenerateNoticePrompt(input: {
  facts: Record<string, unknown>;
  context: NoticeLegalContext;
}) {
  return `${hardRule}

Return only valid JSON with this shape:
{
  "title": "",
  "subject": "",
  "notice_body": "",
  "relief_demanded": "",
  "deadline_days": 15,
  "legal_references_used": [],
  "missing_information": [],
  "manual_review_flags": []
}

Template:
${JSON.stringify(input.context.template)}

Statutes:
${JSON.stringify(input.context.statutes)}

Verified case citations:
${JSON.stringify(input.context.caseCitations)}

Facts:
${JSON.stringify(input.facts)}`;
}
