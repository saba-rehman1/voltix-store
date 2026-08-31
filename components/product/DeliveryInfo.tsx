"use client";

import { useState } from "react";
import { Truck, RotateCcw, ShieldCheck, MapPin } from "lucide-react";

export function DeliveryInfo({ warranty }: { warranty: string }) {
  const [zip, setZip] = useState("");
  const [checked, setChecked] = useState<null | { eta: string; express: string }>(null);

  const handleCheck = () => {
    if (zip.trim().length < 3) return;
    const days = 2 + (zip.length % 3);
    const eta = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });
    setChecked({ eta, express: `${Math.max(1, days - 2)}-day express available` });
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center gap-2">
        <MapPin className="h-4 w-4 text-accent-cyan" />
        <p className="text-sm font-semibold text-white">Check delivery & availability</p>
      </div>
      <div className="mt-3 flex gap-2">
        <input
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleCheck()}
          placeholder="Enter ZIP / postal code"
          className="w-full rounded-lg border border-border bg-bg-secondary px-3.5 py-2.5 text-sm text-white placeholder:text-muted-2 outline-none focus:border-accent/60"
        />
        <button
          onClick={handleCheck}
          className="shrink-0 rounded-lg bg-white/10 px-4 text-sm font-medium text-white hover:bg-white/15 cursor-pointer"
        >
          Check
        </button>
      </div>
      {checked && (
        <p className="mt-2.5 text-xs text-success">
          Delivers by <span className="font-semibold">{checked.eta}</span> · {checked.express}
        </p>
      )}

      <div className="mt-5 flex flex-col gap-3 border-t border-border pt-4">
        <div className="flex items-start gap-3 text-xs text-muted">
          <Truck className="mt-0.5 h-4 w-4 shrink-0 text-accent-light" />
          Free express shipping on orders over $75
        </div>
        <div className="flex items-start gap-3 text-xs text-muted">
          <RotateCcw className="mt-0.5 h-4 w-4 shrink-0 text-accent-light" />
          30-day hassle-free returns & exchanges
        </div>
        <div className="flex items-start gap-3 text-xs text-muted">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent-light" />
          {warranty}
        </div>
      </div>
    </div>
  );
}
