import { statusLabels, type NoticeStatus } from "@/lib/legal/status";
import { cn } from "@/lib/utils/cn";

export function StatusBadge({ status }: { status: NoticeStatus | "pending" | "in_review" | "approved" | "rejected" }) {
  const label = status in statusLabels ? statusLabels[status as NoticeStatus] : status.replaceAll("_", " ");
  const tone =
    status === "approved" || status === "pdf_generated" || status === "sent"
      ? "border-success/25 bg-success/10 text-success"
      : status === "rejected" || status === "rejected_out_of_scope"
        ? "border-danger/25 bg-danger/10 text-danger"
        : "border-gold/30 bg-gold/10 text-ink";

  return (
    <span className={cn("inline-flex rounded-full border px-3 py-1 text-xs font-semibold capitalize", tone)}>
      {label}
    </span>
  );
}
