import { Scale } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-ivory/95">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <a href="/" className="flex items-center gap-2 font-serif text-2xl font-bold text-forest">
          <Scale aria-hidden className="h-6 w-6" />
          Duhai
        </a>
        <nav className="hidden items-center gap-6 text-sm font-semibold text-mutedInk sm:flex">
          <a href="/how-it-works">How it works</a>
          <a href="/pricing">Pricing</a>
          <a href="/faq">FAQ</a>
        </nav>
        <ButtonLink href="/start" className="min-h-10 px-4">
          Start
        </ButtonLink>
      </div>
    </header>
  );
}
