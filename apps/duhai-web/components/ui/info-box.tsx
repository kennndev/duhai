import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export function InfoBox({ children, tone = "info" }: { children: ReactNode; tone?: "info" | "error" }) {
  return (
    <div
      className={cn(
        "rounded-md border px-4 py-3 text-sm leading-6",
        tone === "error" ? "border-danger/30 bg-danger/10 text-danger" : "border-gold/30 bg-paper text-mutedInk"
      )}
    >
      {children}
    </div>
  );
}
