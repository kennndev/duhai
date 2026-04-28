import { CategoryCards } from "@/components/marketing/category-cards";
import { SiteHeader } from "@/components/marketing/site-header";
import { Button } from "@/components/ui/button";
import { practiceAreas } from "@/lib/legal/practice-areas";
import { startWizardSession } from "@/lib/wizard/actions";

export default async function StartPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams;
  const defaultCategory = category ?? "cheque-bounce";

  return (
    <main>
      <SiteHeader />
      <section className="mx-auto max-w-5xl px-4 py-12">
        <h1 className="font-serif text-4xl font-bold">Start your legal notice</h1>
        <p className="mt-4 max-w-2xl leading-7 text-mutedInk">
          Choose the issue that best matches your dispute. Cheque bounce is the first fully guided MVP flow.
        </p>
        <form action={startWizardSession} className="mt-8 rounded-md border border-border bg-paper p-5">
          <fieldset className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <legend className="sr-only">Practice area</legend>
            {practiceAreas.map((area) => (
              <label
                key={area.slug}
                className="cursor-pointer rounded-md border border-border bg-ivory p-4 has-[:checked]:border-forest has-[:checked]:ring-2 has-[:checked]:ring-gold/30"
              >
                <input
                  type="radio"
                  name="practiceAreaSlug"
                  value={area.slug}
                  defaultChecked={area.slug === defaultCategory}
                  className="sr-only"
                />
                <span className="block font-serif text-xl font-bold">{area.title}</span>
                <span className="mt-2 block text-sm leading-6 text-mutedInk">{area.description}</span>
              </label>
            ))}
          </fieldset>
          <div className="mt-6">
            <Button type="submit">Continue</Button>
          </div>
        </form>
        <div className="mt-12">
          <CategoryCards />
        </div>
      </section>
    </main>
  );
}
