"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  User,
  Package,
  Heart,
  MapPin,
  CreditCard,
  Bell,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SmartImage } from "@/components/ui/SmartImage";

const NAV = [
  { href: "/dashboard", label: "Profile", icon: User },
  { href: "/dashboard/orders", label: "Orders", icon: Package },
  { href: "/dashboard/wishlist", label: "Wishlist", icon: Heart },
  { href: "/dashboard/addresses", label: "Addresses", icon: MapPin },
  { href: "/dashboard/saved-cards", label: "Saved Cards", icon: CreditCard },
  { href: "/dashboard/notifications", label: "Notifications", icon: Bell },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full shrink-0 lg:w-64">
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-accent/30">
            <SmartImage
              src="https://ui-avatars.com/api/?name=Jordan+Blake&background=2563EB&color=fff&bold=true&size=100"
              alt="Jordan Blake"
              fill
              sizes="48px"
              className="object-cover"
            />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">Jordan Blake</p>
            <p className="truncate text-xs text-muted-2">jordan.blake@email.com</p>
          </div>
        </div>
      </div>

      <nav className="mt-3 flex flex-row gap-1.5 overflow-x-auto rounded-2xl border border-border bg-card p-2 lg:mt-4 lg:flex-col lg:overflow-visible">
        {NAV.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex shrink-0 items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors",
                active ? "text-white" : "text-muted hover:text-white hover:bg-white/5"
              )}
            >
              {active && (
                <motion.div
                  layoutId="dashboard-nav-active"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent/20 to-accent-cyan/10 border border-accent/30"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <item.icon className="relative z-10 h-4 w-4" />
              <span className="relative z-10 whitespace-nowrap">{item.label}</span>
            </Link>
          );
        })}
        <button className="relative flex shrink-0 items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium text-muted hover:bg-white/5 hover:text-danger cursor-pointer lg:mt-2 lg:border-t lg:border-border lg:pt-4">
          <LogOut className="h-4 w-4" /> Sign Out
        </button>
      </nav>
    </aside>
  );
}
