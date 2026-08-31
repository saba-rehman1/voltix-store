"use client";

import { CreditCard, Wallet, Smartphone, Fingerprint } from "lucide-react";
import { cn } from "@/lib/utils";

export type PaymentMethodId = "visa" | "mastercard" | "paypal" | "apple-pay" | "google-pay" | "stripe";

export const PAYMENT_METHODS: {
  id: PaymentMethodId;
  label: string;
  sub: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
  requiresCard?: boolean;
}[] = [
  { id: "visa", label: "Visa", sub: "Credit / Debit", icon: CreditCard, accent: "#1A56DB", requiresCard: true },
  { id: "mastercard", label: "Mastercard", sub: "Credit / Debit", icon: CreditCard, accent: "#EB5E28", requiresCard: true },
  { id: "paypal", label: "PayPal", sub: "Pay with balance", icon: Wallet, accent: "#00457C" },
  { id: "apple-pay", label: "Apple Pay", sub: "Touch or Face ID", icon: Fingerprint, accent: "#E5E7EB" },
  { id: "google-pay", label: "Google Pay", sub: "Quick checkout", icon: Smartphone, accent: "#34A853" },
  { id: "stripe", label: "Stripe", sub: "Secure checkout", icon: Wallet, accent: "#635BFF" },
];

export function PaymentMethodCard({
  method,
  selected,
  onSelect,
}: {
  method: (typeof PAYMENT_METHODS)[number];
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "flex items-center gap-3 rounded-xl border p-4 text-left transition-colors cursor-pointer",
        selected ? "border-accent bg-accent/10" : "border-border bg-card hover:border-white/25"
      )}
    >
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
        style={{ backgroundColor: `${method.accent}22`, color: method.accent }}
      >
        <method.icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-white">{method.label}</p>
        <p className="text-xs text-muted-2">{method.sub}</p>
      </div>
      <div
        className={cn(
          "flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-2 transition-colors",
          selected ? "border-accent" : "border-border"
        )}
      >
        {selected && <div className="h-2 w-2 rounded-full bg-accent" />}
      </div>
    </button>
  );
}
