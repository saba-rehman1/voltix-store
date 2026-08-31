"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { ReactNode, useEffect } from "react";
import { cn } from "@/lib/utils";

export function Modal({
  open,
  onClose,
  children,
  widthClass = "max-w-4xl",
  showClose = true,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  widthClass?: string;
  showClose?: boolean;
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
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: "spring", stiffness: 340, damping: 30 }}
            className={cn(
              "relative w-full max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-bg-secondary shadow-2xl",
              widthClass
            )}
          >
            {showClose && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 rounded-full p-2 bg-black/40 hover:bg-black/60 text-white transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            )}
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
