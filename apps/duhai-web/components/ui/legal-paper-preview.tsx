import type { ReactNode } from "react";

export function LegalPaperPreview({ children }: { children: ReactNode }) {
  return (
    <div className="paper-texture min-h-[520px] rounded-md border border-border bg-paper p-8 font-serif text-sm leading-7 text-ink shadow-paper">
      {children}
    </div>
  );
}
