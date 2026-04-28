import { ArrowRight } from "lucide-react";
import { practiceAreas } from "@/lib/legal/practice-areas";

export function CategoryCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {practiceAreas.map((area) => (
        <a
          key={area.slug}
          href={`/category/${area.slug}`}
          className="group rounded-md border border-border bg-paper p-5 transition hover:-translate-y-0.5 hover:border-forest hover:shadow-paper"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-serif text-xl font-bold text-ink">{area.title}</h3>
              <p className="mt-3 text-sm leading-6 text-mutedInk">{area.userProblem}</p>
            </div>
            <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-gold transition group-hover:translate-x-1" />
          </div>
        </a>
      ))}
    </div>
  );
}
