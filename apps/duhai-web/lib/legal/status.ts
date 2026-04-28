export const noticeStatuses = [
  "submitted",
  "draft_generating",
  "draft_ready",
  "lawyer_review_pending",
  "lawyer_review_in_progress",
  "changes_requested",
  "approved",
  "pdf_generated",
  "sent",
  "rejected_out_of_scope",
  "needs_more_information"
] as const;

export type NoticeStatus = (typeof noticeStatuses)[number];

export const statusLabels: Record<NoticeStatus, string> = {
  submitted: "Submitted",
  draft_generating: "Draft generating",
  draft_ready: "Draft ready",
  lawyer_review_pending: "Lawyer review pending",
  lawyer_review_in_progress: "Lawyer review in progress",
  changes_requested: "Changes requested",
  approved: "Approved",
  pdf_generated: "PDF generated",
  sent: "Sent",
  rejected_out_of_scope: "Rejected",
  needs_more_information: "Needs more information"
};

export const reviewDecisions = ["pending", "in_review", "approved", "changes_requested", "rejected"] as const;
