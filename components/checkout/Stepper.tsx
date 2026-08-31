"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Step {
  id: number;
  label: string;
}

export function Stepper({ steps, current }: { steps: Step[]; current: number }) {
  return (
    <div className="flex items-center">
      {steps.map((step, i) => {
        const isDone = step.id < current;
        const isActive = step.id === current;
        return (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center gap-2">
              <div
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors",
                  isDone && "border-accent bg-accent text-white",
                  isActive && "border-accent text-accent-light",
                  !isDone && !isActive && "border-border text-muted-2"
                )}
              >
                {isDone ? <Check className="h-4 w-4" /> : step.id}
              </div>
              <span
                className={cn(
                  "hidden text-[11px] font-medium sm:block",
                  isActive || isDone ? "text-white" : "text-muted-2"
                )}
              >
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={cn(
                  "mx-2 h-0.5 w-8 shrink-0 sm:w-16 md:w-24 transition-colors",
                  isDone ? "bg-accent" : "bg-border"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
