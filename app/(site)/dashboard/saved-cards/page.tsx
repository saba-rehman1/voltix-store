"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Plus, Trash2, Star, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { mockCards } from "@/data/orders";
import type { SavedCard } from "@/types";
import { cn } from "@/lib/utils";
import { useDocumentTitle } from "@/lib/useDocumentTitle";

const BRAND_COLORS: Record<SavedCard["brand"], string> = {
  Visa: "from-[#1A56DB] to-[#3B82F6]",
  Mastercard: "from-[#EB5E28] to-[#F59E0B]",
  Amex: "from-[#0F766E] to-[#14B8A6]",
};

export default function SavedCardsPage() {
  useDocumentTitle("Saved Cards", "My Account");
  const [cards, setCards] = useState<SavedCard[]>(mockCards);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ number: "", holder: "", expiry: "" });

  const handleDelete = (id: string) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
    toast.success("Card removed");
  };

  const setDefault = (id: string) => {
    setCards((prev) => prev.map((c) => ({ ...c, isDefault: c.id === id })));
    toast.success("Default card updated");
  };

  const handleAdd = () => {
    const digits = form.number.replace(/\D/g, "");
    if (digits.length < 12 || !form.holder || !form.expiry) {
      toast.error("Please enter valid card details");
      return;
    }
    const brand: SavedCard["brand"] = digits.startsWith("4") ? "Visa" : digits.startsWith("5") ? "Mastercard" : "Amex";
    setCards((prev) => [
      ...prev,
      { id: `card-${Date.now()}`, brand, last4: digits.slice(-4), expiry: form.expiry, holder: form.holder },
    ]);
    setForm({ number: "", holder: "", expiry: "" });
    setModalOpen(false);
    toast.success("Card added successfully");
  };

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm text-muted">{cards.length} saved payment methods</p>
        <Button size="sm" onClick={() => setModalOpen(true)}>
          <Plus className="h-3.5 w-3.5" /> Add Card
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {cards.map((card) => (
          <div key={card.id} className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className={cn("relative h-32 bg-gradient-to-br p-5", BRAND_COLORS[card.brand])}>
              <div className="flex items-center justify-between">
                <CreditCard className="h-6 w-6 text-white/90" />
                {card.isDefault && (
                  <span className="flex items-center gap-1 rounded-full bg-black/20 px-2 py-1 text-[10px] font-semibold text-white">
                    <Star className="h-2.5 w-2.5 fill-white" /> Default
                  </span>
                )}
              </div>
              <p className="mt-6 font-mono text-lg tracking-widest text-white">•••• •••• •••• {card.last4}</p>
              <div className="mt-2 flex items-center justify-between text-xs text-white/80">
                <span>{card.holder}</span>
                <span>{card.expiry}</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-3.5">
              <p className="text-xs font-semibold text-white">{card.brand}</p>
              <div className="flex items-center gap-3">
                {!card.isDefault && (
                  <button onClick={() => setDefault(card.id)} className="text-xs font-medium text-accent-light hover:text-accent-cyan cursor-pointer">
                    Set default
                  </button>
                )}
                <button onClick={() => handleDelete(card.id)} className="text-muted-2 hover:text-danger cursor-pointer">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} widthClass="max-w-md">
        <div className="p-6">
          <h2 className="mb-5 font-display text-lg font-semibold text-white">Add New Card</h2>
          <div className="flex flex-col gap-3.5">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted">Card Number</label>
              <input
                value={form.number}
                onChange={(e) => setForm({ ...form, number: e.target.value })}
                placeholder="1234 5678 9012 3456"
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted">Cardholder Name</label>
              <input
                value={form.holder}
                onChange={(e) => setForm({ ...form, holder: e.target.value })}
                placeholder="Jordan Blake"
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted">Expiry (MM/YY)</label>
              <input
                value={form.expiry}
                onChange={(e) => setForm({ ...form, expiry: e.target.value })}
                placeholder="09/28"
                className={inputClass}
              />
            </div>
          </div>
          <div className="mt-6 flex gap-2.5">
            <Button onClick={handleAdd}>Save Card</Button>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
          </div>
          <p className="mt-4 text-[11px] text-muted-2">
            Your card details are encrypted and tokenized. Voltix Store never stores raw card numbers.
          </p>
        </div>
      </Modal>
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-border bg-bg-secondary px-3.5 py-2.5 text-sm text-white placeholder:text-muted-2 outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/20";
