"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { ReactNode, useEffect } from "react";
import { cn } from "@/lib/utils";

export function Drawer({
  open,
  onClose,
  title,
  children,
  side = "right",
  widthClass = "max-w-md",
}: {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
  side?: "left" | "right";
  widthClass?: string;
}) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: side === "right" ? "100%" : "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: side === "right" ? "100%" : "-100%" }}
            transition={{ type: "spring", stiffness: 340, damping: 34 }}
            className={cn(
              "fixed top-0 bottom-0 z-[71] w-full bg-bg-secondary border-border flex flex-col",
              widthClass,
              side === "right" ? "right-0 border-l" : "left-0 border-r"
            )}
          >
            {title !== undefined && (
              <div className="flex items-center justify-between px-5 sm:px-6 py-5 border-b border-border shrink-0">
                <div className="text-lg font-display font-semibold">{title}</div>
                <button
                  onClick={onClose}
                  className="rounded-full p-2 hover:bg-white/5 text-muted hover:text-white transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}
            <div className="flex-1 overflow-y-auto">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
