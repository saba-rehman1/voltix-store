"use client";

import { useState } from "react";
import { Bell, Search, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SmartImage } from "@/components/ui/SmartImage";
import { AdminSidebar } from "./AdminSidebar";
import { AnimatePresence, motion } from "framer-motion";

const TITLES: Record<string, string> = {
  "/admin": "Dashboard Overview",
  "/admin/orders": "Orders",
  "/admin/products": "Products",
  "/admin/customers": "Customers",
  "/admin/analytics": "Analytics",
};

export function AdminTopbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const title = TITLES[pathname] ?? "Admin";

  return (
    <>
      <header className="flex h-16 items-center gap-4 border-b border-border bg-bg-secondary px-4 sm:px-6">
        <button
          onClick={() => setMobileOpen(true)}
          className="rounded-lg p-2 text-white hover:bg-white/5 lg:hidden cursor-pointer"
        >
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="font-display text-lg font-semibold text-white">{title}</h1>

        <div className="ml-auto flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 sm:flex">
            <Search className="h-3.5 w-3.5 text-muted-2" />
            <input
              placeholder="Search..."
              className="w-40 bg-transparent text-xs text-white placeholder:text-muted-2 outline-none"
            />
          </div>
          <button className="relative rounded-lg p-2 text-white hover:bg-white/5 cursor-pointer">
            <Bell className="h-[18px] w-[18px]" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-danger" />
          </button>
          <div className="relative h-8 w-8 overflow-hidden rounded-full">
            <SmartImage
              src="https://ui-avatars.com/api/?name=Admin+User&background=2563EB&color=fff&bold=true&size=64"
              alt="Admin"
              fill
              sizes="32px"
              className="object-cover"
            />
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-[70] bg-black/60 lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 340, damping: 34 }}
              className="fixed left-0 top-0 z-[71] h-full lg:hidden"
            >
              <div className="relative h-full">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="absolute right-3 top-4 z-10 rounded-full bg-white/10 p-1.5 text-white cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="h-full w-64">
                  <AdminSidebar mobile />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
