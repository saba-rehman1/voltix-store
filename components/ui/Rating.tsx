import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Rating({
  value,
  count,
  size = 14,
  showValue = false,
  className,
}: {
  value: number;
  count?: number;
  size?: number;
  showValue?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => {
          const fillPercent = clampFill(value - i);
          return (
            <span key={i} className="relative inline-block" style={{ width: size, height: size }}>
              <Star size={size} className="absolute inset-0 text-white/15" />
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${fillPercent * 100}%` }}
              >
                <Star size={size} className="text-warning fill-warning" />
              </span>
            </span>
          );
        })}
      </div>
      {showValue && (
        <span className="text-sm font-semibold text-white">{value.toFixed(1)}</span>
      )}
      {typeof count === "number" && (
        <span className="text-xs text-muted">({count.toLocaleString()})</span>
      )}
    </div>
  );
}

function clampFill(n: number) {
  return Math.max(0, Math.min(1, n));
}
