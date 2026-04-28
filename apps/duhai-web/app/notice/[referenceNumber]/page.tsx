import { Download } from "lucide-react";
import { SiteHeader } from "@/components/marketing/site-header";
import { ButtonLink } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { getNoticeStatus } from "@/lib/wizard/actions";

export default async function NoticeStatusPage({ params }: { params: Promise<{ referenceNumber: string }> }) {
  const { referenceNumber } = await params;
  const notice = await getNoticeStatus(referenceNumber);

  return (
    <main>
      <SiteHeader />
      <section className="mx-auto max-w-4xl px-4 py-12">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-oxblood">Notice status</p>
        <h1 className="mt-2 font-serif text-4xl font-bold">{notice.referenceNumber}</h1>
        <div className="mt-8 rounded-md border border-border bg-paper p-6 shadow-paper">
          <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="font-serif text-2xl font-bold">{notice.category}</h2>
              <p className="mt-2 text-sm text-mutedInk">Submitted {new Date(notice.submittedAt).toLocaleDateString()}</p>
            </div>
            <StatusBadge status={notice.status} />
          </div>
          <dl className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-bold text-mutedInk">Current stage</dt>
              <dd className="mt-1 text-lg font-semibold">{notice.currentStage}</dd>
            </div>
            <div>
              <dt className="text-sm font-bold text-mutedInk">Expected next step</dt>
              <dd className="mt-1 leading-7">{notice.nextStep}</dd>
            </div>
          </dl>
          <div className="mt-8 rounded-md border border-border bg-ivory p-4">
            {notice.pdfUrl ? (
              <ButtonLink href={notice.pdfUrl} className="gap-2">
                <Download className="h-4 w-4" /> Download PDF
              </ButtonLink>
            ) : (
              <p className="text-sm leading-6 text-mutedInk">
                The final PDF appears here only after lawyer approval and private signed URL generation.
              </p>
            )}
          </div>
          <p className="mt-6 text-sm text-mutedInk">Support: hello@duhai.pk</p>
        </div>
      </section>
    </main>
  );
}
