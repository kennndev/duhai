import { z } from "zod";

export const NoticeDraftOutputSchema = z.object({
  title: z.string().min(1),
  subject: z.string().min(1),
  notice_body: z.string().min(1),
  relief_demanded: z.string().min(1),
  deadline_days: z.number().int().positive(),
  legal_references_used: z.array(z.string()),
  missing_information: z.array(z.string()),
  manual_review_flags: z.array(z.string())
});

export type NoticeDraftOutput = z.infer<typeof NoticeDraftOutputSchema>;

export function parseNoticeOutput(raw: string): NoticeDraftOutput {
  const parsed = JSON.parse(raw) as unknown;
  return NoticeDraftOutputSchema.parse(parsed);
}
