import "server-only";
import { callAnthropic } from "@/lib/ai/client";
import { buildGenerateNoticePrompt, NOTICE_PROMPT_VERSION } from "@/lib/ai/prompts/generate-notice";
import { parseNoticeOutput } from "@/lib/ai/parse-notice-output";
import { retrieveLegalContext } from "@/lib/ai/retrieve-legal-context";

export async function generateNoticeDraft(input: {
  practiceAreaSlug: string;
  language: string;
  province?: string | null;
  facts: Record<string, unknown>;
}) {
  const context = await retrieveLegalContext(input);
  if (!context.template) {
    return {
      source: "system" as const,
      promptVersion: NOTICE_PROMPT_VERSION,
      context,
      draft: {
        title: "Manual lawyer drafting required",
        subject: "Manual lawyer drafting required",
        notice_body: "",
        relief_demanded: "",
        deadline_days: 15,
        legal_references_used: [],
        missing_information: ["No active approved template was found."],
        manual_review_flags: ["manual_template_missing"]
      }
    };
  }

  const prompt = buildGenerateNoticePrompt({ facts: input.facts, context });
  const result = await callAnthropic(prompt);
  const draft = parseNoticeOutput(result.text);

  return {
    source: "ai" as const,
    promptVersion: NOTICE_PROMPT_VERSION,
    modelName: result.model,
    tokensInput: result.inputTokens,
    tokensOutput: result.outputTokens,
    context,
    draft
  };
}
