import { cn } from "@/lib/utils/cn";

export function ProgressSteps({ current, steps }: { current: number; steps: string[] }) {
  return (
    <ol className="grid grid-cols-4 gap-2" aria-label="Wizard progress">
      {steps.map((step, index) => {
        const position = index + 1;
        return (
          <li key={step} className="grid gap-2">
            <div className={cn("h-1.5 rounded-full", position <= current ? "bg-forest" : "bg-border")} />
            <span className={cn("text-xs font-semibold", position === current ? "text-forest" : "text-mutedInk")}>
              {step}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
