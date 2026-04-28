import { SiteHeader } from "@/components/marketing/site-header";
import { Button } from "@/components/ui/button";
import { Field, Textarea } from "@/components/ui/field";
import { InfoBox } from "@/components/ui/info-box";
import { LegalPaperPreview } from "@/components/ui/legal-paper-preview";
import { approveNoticeDraft, rejectNotice, requestMoreInformation, startLawyerReview } from "@/lib/wizard/actions";

export default async function ReviewDetailPage({ params }: { params: Promise<{ reviewId: string }> }) {
  const { reviewId } = await params;
  return (
    <main>
      <SiteHeader />
      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-oxblood">Review {reviewId}</p>
            <h1 className="mt-2 font-serif text-4xl font-bold">Cheque bounce draft review</h1>
          </div>
          <form action={startLawyerReview}>
            <Button type="submit" variant="secondary">Start review</Button>
          </form>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="grid gap-5">
            <section className="rounded-md border border-border bg-paper p-5">
              <h2 className="font-serif text-2xl font-bold">User facts</h2>
              <dl className="mt-4 grid gap-3 text-sm">
                <div><dt className="font-bold">Claimant</dt><dd className="text-mutedInk">Visible to reviewer in production</dd></div>
                <div><dt className="font-bold">Respondent</dt><dd className="text-mutedInk">Visible to reviewer in production</dd></div>
                <div><dt className="font-bold">Cheque</dt><dd className="text-mutedInk">Number, bank, amount, dates, dishonour reason</dd></div>
              </dl>
            </section>
            <section className="rounded-md border border-border bg-paper p-5">
              <h2 className="font-serif text-2xl font-bold">Legal context</h2>
              <InfoBox>
                AI drafts may use only active templates, verified statutes, and verified citations retrieved from the
                database. Unverified citations stay out of generated text.
              </InfoBox>
              <p className="mt-4 text-sm leading-6 text-mutedInk">Template: Cheque dishonour payment recovery notice v1</p>
              <p className="mt-2 text-sm leading-6 text-mutedInk">Statute: PPC 489-F context, subject to lawyer review.</p>
            </section>
          </aside>
          <section className="grid gap-5">
            <Field label="Editable draft">
              <Textarea
                name="draft"
                defaultValue="LEGAL NOTICE: This draft is generated only from submitted facts and approved legal context. Reviewer must verify facts, references, placeholders, and final tone before approval."
                className="min-h-56 font-serif"
              />
            </Field>
            <LegalPaperPreview>
              <p className="text-right">Reference: DUH-20260428-A1B2C3</p>
              <h2 className="mt-8 text-center text-lg font-bold uppercase">Legal Notice</h2>
              <p className="mt-8 font-bold">Subject: Recovery of payment against dishonoured cheque</p>
              <p className="mt-5">
                This preview is generated after reviewer edits. Final PDF generation remains disabled until approval
                checks pass.
              </p>
              <p className="mt-12">Reviewed by: Advocate, High Court</p>
            </LegalPaperPreview>
            <div className="flex flex-col gap-3 rounded-md border border-border bg-paper p-4 sm:flex-row">
              <form action={approveNoticeDraft}><Button type="submit">Approve draft</Button></form>
              <form action={requestMoreInformation}><Button type="submit" variant="secondary">Request info</Button></form>
              <form action={rejectNotice}><Button type="submit" variant="danger">Reject</Button></form>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
