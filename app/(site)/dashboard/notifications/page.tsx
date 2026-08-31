"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Package, Tag, Bell, ShieldCheck, Check } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import { useDocumentTitle } from "@/lib/useDocumentTitle";

interface Notification {
  id: string;
  icon: typeof Package;
  title: string;
  body: string;
  date: string;
  read: boolean;
}

const INITIAL_NOTIFICATIONS: Notification[] = [
  { id: "n1", icon: Package, title: "Your order is out for delivery", body: "VLX-108551 will arrive today by 8 PM.", date: "2026-08-31", read: false },
  { id: "n2", icon: Tag, title: "Flash Sale starts now", body: "Up to 25% off select flagship gear — 24 hours only.", date: "2026-08-30", read: false },
  { id: "n3", icon: Package, title: "Order delivered", body: "VLX-108492 was delivered successfully.", date: "2026-08-27", read: true },
  { id: "n4", icon: ShieldCheck, title: "New sign-in detected", body: "A new device signed in to your Voltix account.", date: "2026-08-24", read: true },
  { id: "n5", icon: Tag, title: "Price drop alert", body: "An item on your wishlist just dropped in price.", date: "2026-08-20", read: true },
];

const PREFERENCES = [
  { id: "order-updates", label: "Order updates", desc: "Shipping, delivery, and order status changes" },
  { id: "promotions", label: "Promotions & deals", desc: "Flash sales, discounts and new arrivals" },
  { id: "price-alerts", label: "Price drop alerts", desc: "When wishlist items go on sale" },
  { id: "security", label: "Security alerts", desc: "New sign-ins and account changes" },
  { id: "newsletter", label: "Weekly newsletter", desc: "Curated guides and product roundups" },
];

export default function NotificationsPage() {
  useDocumentTitle("Notifications", "My Account");
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [prefs, setPrefs] = useState<Record<string, boolean>>({
    "order-updates": true,
    promotions: true,
    "price-alerts": true,
    security: true,
    newsletter: false,
  });

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-accent-light" />
            <h2 className="font-display text-base font-semibold text-white">
              Notifications {unreadCount > 0 && `(${unreadCount} unread)`}
            </h2>
          </div>
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="text-xs font-medium text-accent-light hover:text-accent-cyan cursor-pointer">
              Mark all read
            </button>
          )}
        </div>
        <div className="flex flex-col divide-y divide-border">
          {notifications.map((n) => (
            <button
              key={n.id}
              onClick={() => setNotifications((prev) => prev.map((x) => (x.id === n.id ? { ...x, read: true } : x)))}
              className="flex items-start gap-3 py-3.5 text-left cursor-pointer"
            >
              <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-full", n.read ? "bg-white/5 text-muted-2" : "bg-accent/15 text-accent-light")}>
                <n.icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className={cn("text-sm", n.read ? "text-muted" : "font-medium text-white")}>{n.title}</p>
                <p className="mt-0.5 text-xs text-muted-2">{n.body}</p>
                <p className="mt-1 text-[10px] text-muted-2">{formatDate(n.date)}</p>
              </div>
              {!n.read && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent-cyan" />}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5">
        <h2 className="mb-4 font-display text-base font-semibold text-white">Notification Preferences</h2>
        <div className="flex flex-col divide-y divide-border">
          {PREFERENCES.map((p) => (
            <div key={p.id} className="flex items-center justify-between gap-4 py-3.5">
              <div>
                <p className="text-sm font-medium text-white">{p.label}</p>
                <p className="text-xs text-muted-2">{p.desc}</p>
              </div>
              <button
                onClick={() => setPrefs((prev) => ({ ...prev, [p.id]: !prev[p.id] }))}
                className={cn(
                  "relative h-6 w-11 shrink-0 rounded-full transition-colors cursor-pointer",
                  prefs[p.id] ? "bg-accent" : "bg-white/10"
                )}
              >
                <span
                  className={cn(
                    "absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform flex items-center justify-center",
                    prefs[p.id] ? "translate-x-[22px]" : "translate-x-0.5"
                  )}
                >
                  {prefs[p.id] && <Check className="h-3 w-3 text-accent" />}
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
