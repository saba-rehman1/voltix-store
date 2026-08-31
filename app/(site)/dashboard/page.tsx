"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Camera, Save, Package, Heart, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SmartImage } from "@/components/ui/SmartImage";
import { mockOrders } from "@/data/orders";
import { useWishlistStore } from "@/store/wishlistStore";
import { useDocumentTitle } from "@/lib/useDocumentTitle";

const STATS = [
  { icon: Package, label: "Orders", value: (n: number) => n },
  { icon: Heart, label: "Wishlist", value: (n: number) => n },
  { icon: MapPin, label: "Addresses", value: () => 2 },
  { icon: Star, label: "Loyalty Points", value: () => "1,240" },
];

export default function ProfilePage() {
  useDocumentTitle("Profile", "My Account");
  const wishlistCount = useWishlistStore((s) => s.ids.length);
  const [form, setForm] = useState({
    firstName: "Jordan",
    lastName: "Blake",
    email: "jordan.blake@email.com",
    phone: "+1 (512) 555-0148",
  });

  const stats = [mockOrders.length, wishlistCount, 2, "1,240"];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile updated successfully");
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {STATS.map((s, i) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-4">
            <s.icon className="h-4 w-4 text-accent-light" />
            <p className="mt-2 font-display text-xl font-bold text-white">{stats[i]}</p>
            <p className="text-xs text-muted">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <h2 className="mb-5 font-display text-lg font-semibold text-white">Personal Information</h2>

        <div className="mb-6 flex items-center gap-4">
          <div className="relative h-20 w-20 overflow-hidden rounded-full ring-2 ring-accent/30">
            <SmartImage
              src="https://ui-avatars.com/api/?name=Jordan+Blake&background=2563EB&color=fff&bold=true&size=200"
              alt="Profile"
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>
          <div>
            <Button variant="secondary" size="sm" type="button" onClick={() => toast.success("Photo updated")}>
              <Camera className="h-3.5 w-3.5" /> Change Photo
            </Button>
            <p className="mt-1.5 text-[11px] text-muted-2">JPG or PNG, max 2MB</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="First Name">
            <input
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              className={inputClass}
            />
          </Field>
          <Field label="Last Name">
            <input
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              className={inputClass}
            />
          </Field>
          <Field label="Email Address">
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={inputClass}
            />
          </Field>
          <Field label="Phone Number">
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className={inputClass}
            />
          </Field>
          <div className="sm:col-span-2">
            <Button type="submit">
              <Save className="h-4 w-4" /> Save Changes
            </Button>
          </div>
        </form>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <h2 className="mb-4 font-display text-lg font-semibold text-white">Security</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Password updated successfully");
          }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          <Field label="Current Password" className="sm:col-span-2">
            <input type="password" placeholder="••••••••" className={inputClass} />
          </Field>
          <Field label="New Password">
            <input type="password" placeholder="••••••••" className={inputClass} />
          </Field>
          <Field label="Confirm New Password">
            <input type="password" placeholder="••••••••" className={inputClass} />
          </Field>
          <div className="sm:col-span-2">
            <Button type="submit" variant="secondary">
              Update Password
            </Button>
          </div>
        </form>
      </div>
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
