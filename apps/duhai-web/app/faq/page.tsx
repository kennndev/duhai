import { SiteHeader } from "@/components/marketing/site-header";

const faqs = [
  ["Is Duhai a lawyer marketplace?", "No. Duhai prepares legal notices and routes MVP notices through lawyer review."],
  ["Does Duhai file court cases?", "No. Court filing and legal representation are outside the MVP scope."],
  ["Can AI send my final notice?", "No. Final PDF delivery requires lawyer approval."],
  ["What should I prepare?", "Basic party details, dates, amounts, facts, and any evidence screenshots or documents."]
];

export default function FAQPage() {
  return (
    <main>
      <SiteHeader />
      <section className="mx-auto max-w-4xl px-4 py-14">
        <h1 className="font-serif text-5xl font-bold">FAQ</h1>
        <div className="mt-8 grid gap-4">
          {faqs.map(([question, answer]) => (
            <article key={question} className="rounded-md border border-border bg-paper p-5">
              <h2 className="font-serif text-2xl font-bold">{question}</h2>
              <p className="mt-3 leading-7 text-mutedInk">{answer}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
