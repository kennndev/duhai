import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-ink">
      <span>{label}</span>
      {children}
      {hint ? <span className="text-xs font-normal leading-5 text-mutedInk">{hint}</span> : null}
    </label>
  );
}

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "min-h-11 rounded-md border border-border bg-paper px-3 py-2 text-base text-ink outline-none transition placeholder:text-mutedInk/70 focus:border-forest focus:ring-2 focus:ring-gold/35",
        className
      )}
      {...props}
    />
  );
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-28 rounded-md border border-border bg-paper px-3 py-2 text-base text-ink outline-none transition placeholder:text-mutedInk/70 focus:border-forest focus:ring-2 focus:ring-gold/35",
        className
      )}
      {...props}
    />
  );
}

export function Select({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "min-h-11 rounded-md border border-border bg-paper px-3 py-2 text-base text-ink outline-none transition focus:border-forest focus:ring-2 focus:ring-gold/35",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}
