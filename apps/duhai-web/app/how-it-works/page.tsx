import { SiteHeader } from "@/components/marketing/site-header";
import { ButtonLink } from "@/components/ui/button";

const steps = [
  "Choose your issue",
  "Answer guided questions",
  "Confirm the truth declaration",
  "Duhai prepares a structured draft",
  "A lawyer reviews the draft",
  "The final PDF is delivered",
  "Optional next steps can be discussed later"
];

export default function HowItWorksPage() {
  return (
    <main>
      <SiteHeader />
      <section className="mx-auto max-w-4xl px-4 py-14">
        <h1 className="font-serif text-5xl font-bold">How Duhai works</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-mutedInk">
          Duhai sits inside the existing legal workflow: it structures intake, prepares a draft from approved context,
          and keeps a lawyer responsible for final review.
        </p>
        <ol className="mt-10 grid gap-4">
          {steps.map((step, index) => (
            <li key={step} className="flex gap-4 rounded-md border border-border bg-paper p-5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest text-sm font-bold text-paper">
                {index + 1}
              </span>
              <span className="pt-1 font-serif text-xl font-bold">{step}</span>
            </li>
          ))}
        </ol>
        <div className="mt-8">
          <ButtonLink href="/start">Start your notice</ButtonLink>
        </div>
      </section>
    </main>
  );
}
