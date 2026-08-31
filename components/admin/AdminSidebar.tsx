"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  BarChart3,
  Zap,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
];

export function AdminSidebar({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname();

  return (
    <aside
      className={
        mobile
          ? "flex w-64 shrink-0 flex-col bg-bg-secondary h-full"
          : "hidden w-64 shrink-0 border-r border-border bg-bg-secondary lg:flex lg:flex-col"
      }
    >
      <div className="flex h-16 items-center gap-2 border-b border-border px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-cyan">
          <Zap className="h-4 w-4 fill-white text-white" />
        </div>
        <span className="font-display text-base font-bold text-white">
          VOLTIX<span className="text-accent-cyan">.</span> <span className="font-normal text-muted-2">Admin</span>
        </span>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-4">
        {NAV.map((item) => {
          const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors",
                active ? "text-white" : "text-muted hover:text-white hover:bg-white/5"
              )}
            >
              {active && (
                <motion.div
                  layoutId="admin-nav-active"
                  className="absolute inset-0 rounded-xl border border-accent/30 bg-gradient-to-r from-accent/20 to-accent-cyan/10"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <item.icon className="relative z-10 h-4 w-4" />
              <span className="relative z-10">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-4">
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium text-muted hover:bg-white/5 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Store
        </Link>
      </div>
    </aside>
  );
}
