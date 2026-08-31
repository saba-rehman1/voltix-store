"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Zap } from "lucide-react";

export function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let alreadySeen = false;
    try {
      alreadySeen = sessionStorage.getItem("voltix-loaded") === "1";
    } catch {}

    if (alreadySeen) {
      setVisible(false);
      setHidden(true);
      return;
    }

    const timer = setTimeout(() => {
      setVisible(false);
      try {
        sessionStorage.setItem("voltix-loaded", "1");
      } catch {}
    }, 1400);

    return () => clearTimeout(timer);
  }, []);

  if (hidden) return null;

  return (
    <AnimatePresence onExitComplete={() => setHidden(true)}>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-bg"
        >
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col items-center gap-5"
          >
            <div className="relative flex h-16 w-16 items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-transparent border-t-accent border-r-accent-cyan"
              />
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-cyan shadow-glow">
                <Zap className="h-5 w-5 fill-white text-white" />
              </div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="font-display text-xl font-bold tracking-tight text-white">
                VOLTIX<span className="text-accent-cyan">.</span>
              </span>
              <span className="text-[11px] uppercase tracking-[0.3em] text-muted-2">
                Premium Tech
              </span>
            </div>
            <div className="h-[2px] w-40 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
                className="h-full w-1/2 bg-gradient-to-r from-transparent via-accent-cyan to-transparent"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
