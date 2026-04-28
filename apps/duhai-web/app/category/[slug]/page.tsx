import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/marketing/site-header";
import { ButtonLink } from "@/components/ui/button";
import { getPracticeArea, practiceAreas } from "@/lib/legal/practice-areas";

export function generateStaticParams() {
  return practiceAreas.map((area) => ({ slug: area.slug }));
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const area = getPracticeArea(slug);
  if (!area) notFound();

  return (
    <main>
      <SiteHeader />
      <section className="mx-auto max-w-5xl px-4 py-14">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-oxblood">Practice area</p>
        <h1 className="mt-3 font-serif text-5xl font-bold">{area.title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-mutedInk">{area.description}</p>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {[
            ["What this notice is for", area.userProblem],
            ["Information needed", "Names, contact details, addresses, dates, amounts, facts, and supporting files."],
            ["Expected process", "Submit facts, accept declaration, draft generation, lawyer review, then PDF delivery."],
            [
              "What Duhai cannot do",
              "Duhai does not guarantee recovery, file court cases, or provide representation through this MVP flow."
            ]
          ].map(([title, body]) => (
            <article key={title} className="rounded-md border border-border bg-paper p-5">
              <h2 className="font-serif text-2xl font-bold">{title}</h2>
              <p className="mt-3 leading-7 text-mutedInk">{body}</p>
            </article>
          ))}
        </div>
        <div className="mt-8">
          <ButtonLink href={`/start?category=${area.slug}`}>Start wizard</ButtonLink>
        </div>
      </section>
    </main>
  );
}
