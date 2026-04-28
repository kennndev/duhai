import { SiteHeader } from "@/components/marketing/site-header";
import { ButtonLink } from "@/components/ui/button";

export default function PricingPage() {
  return (
    <main>
      <SiteHeader />
      <section className="mx-auto max-w-4xl px-4 py-14">
        <h1 className="font-serif text-5xl font-bold">Pricing</h1>
        <div className="mt-8 rounded-md border border-border bg-paper p-6 shadow-paper">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-oxblood">Launch offer</p>
          <h2 className="mt-3 font-serif text-3xl font-bold">First 100 lawyer-reviewed notices are free.</h2>
          <p className="mt-4 leading-7 text-mutedInk">
            Payment automation is intentionally deferred for MVP. Paid plans can be added after the cheque-bounce flow
            is proven end to end.
          </p>
          <div className="mt-6">
            <ButtonLink href="/start">Start your notice</ButtonLink>
          </div>
        </div>
      </section>
    </main>
  );
}
