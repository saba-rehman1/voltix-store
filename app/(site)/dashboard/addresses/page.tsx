"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { mockAddresses } from "@/data/orders";
import type { Address } from "@/types";
import { cn } from "@/lib/utils";
import { useDocumentTitle } from "@/lib/useDocumentTitle";

const EMPTY: Omit<Address, "id"> = {
  label: "",
  fullName: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  zip: "",
  country: "United States",
  phone: "",
};

export default function AddressesPage() {
  useDocumentTitle("Addresses", "My Account");
  const [addresses, setAddresses] = useState<Address[]>(mockAddresses);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Address, "id">>(EMPTY);

  const openAdd = () => {
    setEditingId(null);
    setForm(EMPTY);
    setModalOpen(true);
  };

  const openEdit = (addr: Address) => {
    setEditingId(addr.id);
    const { id: _id, ...rest } = addr;
    setForm(rest);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    toast.success("Address removed");
  };

  const setDefault = (id: string) => {
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));
    toast.success("Default address updated");
  };

  const handleSave = () => {
    if (!form.fullName || !form.line1 || !form.city || !form.zip) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (editingId) {
      setAddresses((prev) => prev.map((a) => (a.id === editingId ? { ...form, id: editingId, isDefault: a.isDefault } : a)));
      toast.success("Address updated");
    } else {
      setAddresses((prev) => [...prev, { ...form, id: `addr-${Date.now()}` }]);
      toast.success("Address added");
    }
    setModalOpen(false);
  };

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm text-muted">{addresses.length} saved addresses</p>
        <Button size="sm" onClick={openAdd}>
          <Plus className="h-3.5 w-3.5" /> Add Address
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className={cn(
              "relative rounded-2xl border bg-card p-5",
              addr.isDefault ? "border-accent/50" : "border-border"
            )}
          >
            {addr.isDefault && (
              <span className="absolute right-4 top-4">
                <Star className="h-4 w-4 fill-warning text-warning" />
              </span>
            )}
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-accent-light" />
              <p className="text-sm font-semibold text-white">{addr.label}</p>
            </div>
            <p className="mt-3 text-sm text-white">{addr.fullName}</p>
            <p className="mt-1 text-xs leading-relaxed text-muted">
              {addr.line1}{addr.line2 ? `, ${addr.line2}` : ""}<br />
              {addr.city}, {addr.state} {addr.zip}<br />
              {addr.country}
            </p>
            <p className="mt-1 text-xs text-muted-2">{addr.phone}</p>

            <div className="mt-4 flex items-center gap-2">
              <Button size="sm" variant="outline" onClick={() => openEdit(addr)}>
                <Pencil className="h-3.5 w-3.5" /> Edit
              </Button>
              <Button size="sm" variant="ghost" onClick={() => handleDelete(addr.id)}>
                <Trash2 className="h-3.5 w-3.5" /> Delete
              </Button>
              {!addr.isDefault && (
                <button
                  onClick={() => setDefault(addr.id)}
                  className="ml-auto text-xs font-medium text-accent-light hover:text-accent-cyan cursor-pointer"
                >
                  Set as default
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} widthClass="max-w-lg">
        <div className="p-6">
          <h2 className="mb-5 font-display text-lg font-semibold text-white">
            {editingId ? "Edit Address" : "Add New Address"}
          </h2>
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            <Field label="Label" className="sm:col-span-2">
              <input value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} className={inputClass} placeholder="Home, Office..." />
            </Field>
            <Field label="Full Name" className="sm:col-span-2">
              <input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className={inputClass} />
            </Field>
            <Field label="Address Line 1" className="sm:col-span-2">
              <input value={form.line1} onChange={(e) => setForm({ ...form, line1: e.target.value })} className={inputClass} />
            </Field>
            <Field label="Address Line 2" className="sm:col-span-2">
              <input value={form.line2} onChange={(e) => setForm({ ...form, line2: e.target.value })} className={inputClass} />
            </Field>
            <Field label="City">
              <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className={inputClass} />
            </Field>
            <Field label="State">
              <input value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} className={inputClass} />
            </Field>
            <Field label="ZIP Code">
              <input value={form.zip} onChange={(e) => setForm({ ...form, zip: e.target.value })} className={inputClass} />
            </Field>
            <Field label="Phone">
              <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} />
            </Field>
          </div>
          <div className="mt-6 flex gap-2.5">
            <Button onClick={handleSave}>Save Address</Button>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-border bg-bg-secondary px-3.5 py-2.5 text-sm text-white placeholder:text-muted-2 outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/20";

function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-xs font-medium text-muted">{label}</label>
      {children}
    </div>
  );
}
