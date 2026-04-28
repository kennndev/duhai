import { SiteHeader } from "@/components/marketing/site-header";
import { ButtonLink } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";

const reviews = [
  {
    id: "review-cheque-001",
    referenceNumber: "DUH-20260428-A1B2C3",
    category: "Cheque Bounce",
    submittedAt: "2026-04-28T09:00:00.000Z",
    language: "English",
    status: "pending" as const,
    assignedLawyer: "Unassigned",
    sla: "Due today"
  }
];

export default function ReviewsPage() {
  return (
    <main>
      <SiteHeader />
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="font-serif text-4xl font-bold">Lawyer review queue</h1>
        <div className="mt-8 overflow-x-auto rounded-md border border-border bg-paper">
          <table className="w-full min-w-[860px] border-collapse text-left text-sm">
            <thead className="border-b border-border bg-ivory text-mutedInk">
              <tr>
                {["Reference", "Category", "Submitted", "Language", "Status", "Assigned lawyer", "SLA", "Action"].map(
                  (header) => (
                    <th key={header} className="px-4 py-3 font-semibold">
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-4 font-semibold">{review.referenceNumber}</td>
                  <td className="px-4 py-4">{review.category}</td>
                  <td className="px-4 py-4">{new Date(review.submittedAt).toLocaleString()}</td>
                  <td className="px-4 py-4">{review.language}</td>
                  <td className="px-4 py-4">
                    <StatusBadge status={review.status} />
                  </td>
                  <td className="px-4 py-4">{review.assignedLawyer}</td>
                  <td className="px-4 py-4 text-warning">{review.sla}</td>
                  <td className="px-4 py-4">
                    <ButtonLink href={`/reviews/${review.id}`} className="min-h-9 px-3">
                      Open
                    </ButtonLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
