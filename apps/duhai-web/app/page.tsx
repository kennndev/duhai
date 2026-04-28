import { ArrowRight, FileText, ShieldCheck, Timer } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { CategoryCards } from "@/components/marketing/category-cards";
import { SiteHeader } from "@/components/marketing/site-header";
import { TrustStrip } from "@/components/marketing/trust-strip";

export default function LandingPage() {
  return (
    <main>
      <SiteHeader />
      <section className="paper-texture border-b border-border bg-ivory">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-oxblood">Legal notices for Pakistan</p>
            <h1 className="font-serif text-5xl font-bold leading-tight text-ink sm:text-6xl">
              A legal notice for Pakistan, without waiting a week.
            </h1>
            <p className="mt-6 text-lg leading-8 text-mutedInk">
              Tell us what happened in a few minutes. Duhai prepares a structured legal notice and routes it for lawyer
              review before delivery.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/start" className="gap-2">
                Start your notice <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href="/how-it-works" variant="secondary">
                See how it works
              </ButtonLink>
            </div>
          </div>
          <div className="rounded-md border border-border bg-paper p-6 shadow-paper">
            <div className="border-b border-border pb-4 font-serif text-2xl font-bold">Legal Notice Preview</div>
            <div className="mt-6 space-y-5 font-serif text-sm leading-7">
              <p className="text-right">Reference: DUH-20260428-XXXXX</p>
              <p className="font-bold uppercase">Subject: Notice for recovery of payment against dishonoured cheque</p>
              <p>
                On the basis of facts submitted by the claimant, this notice calls upon the respondent to resolve the
                matter within the stated period. Final wording is reviewed by a lawyer before delivery.
              </p>
              <p className="pt-4 font-bold">Reviewed by: Advocate, High Court</p>
            </div>
          </div>
        </div>
      </section>
      <TrustStrip />
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="mb-8 max-w-2xl">
          <h2 className="font-serif text-3xl font-bold">Choose the dispute type</h2>
          <p className="mt-3 leading-7 text-mutedInk">Start with cheque bounce, then route other disputes for review.</p>
        </div>
        <CategoryCards />
      </section>
      <section className="border-y border-border bg-paper">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-14 md:grid-cols-3">
          {[
            { icon: FileText, title: "Guided facts", body: "A focused wizard structures the details lawyers need." },
            { icon: ShieldCheck, title: "Lawyer review", body: "No final notice is delivered without human approval." },
            { icon: Timer, title: "Clear delivery", body: "Track the review stage and receive the final PDF by email." }
          ].map((item) => (
            <div key={item.title}>
              <item.icon className="mb-4 h-8 w-8 text-forest" />
              <h3 className="font-serif text-2xl font-bold">{item.title}</h3>
              <p className="mt-3 leading-7 text-mutedInk">{item.body}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <h2 className="font-serif text-3xl font-bold">Free launch review for the first 100 notices.</h2>
          <div className="space-y-4 text-mutedInk">
            <p className="leading-7">
              Duhai is built for people who need a serious first step, not a guarantee of outcome. Court filing,
              representation, and follow-up services are separate from this MVP workflow.
            </p>
            <ButtonLink href="/start">Start your notice</ButtonLink>
          </div>
        </div>
      </section>
    </main>
  );
}
