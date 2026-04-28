import { CheckCircle2, Lock, Mail, Scale } from "lucide-react";

const items = [
  { icon: Scale, label: "Lawyer-reviewed before final delivery" },
  { icon: CheckCircle2, label: "Built for Pakistani disputes" },
  { icon: Lock, label: "Private submission" },
  { icon: Mail, label: "PDF delivered by email" }
];

export function TrustStrip() {
  return (
    <div className="grid gap-3 border-y border-border bg-paper px-4 py-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="mx-auto flex w-full max-w-6xl items-center gap-3 text-sm font-semibold">
          <item.icon className="h-5 w-5 text-forest" aria-hidden />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}
