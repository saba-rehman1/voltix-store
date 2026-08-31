import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Variant = "accent" | "success" | "danger" | "warning" | "neutral" | "cyan";

const styles: Record<Variant, string> = {
  accent: "bg-accent/15 text-accent-light border-accent/30",
  success: "bg-success/15 text-success border-success/30",
  danger: "bg-danger/15 text-danger border-danger/30",
  warning: "bg-warning/15 text-warning border-warning/30",
  neutral: "bg-white/8 text-muted border-white/10",
  cyan: "bg-accent-cyan/15 text-accent-cyan border-accent-cyan/30",
};

export function Badge({
  children,
  variant = "neutral",
  className,
}: {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide",
        styles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
