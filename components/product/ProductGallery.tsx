"use client";

import { useState, useRef, MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn, X, ChevronLeft, ChevronRight } from "lucide-react";
import { SmartImage } from "@/components/ui/SmartImage";
import { cn } from "@/lib/utils";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [zooming, setZooming] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <div>
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setZooming(true)}
        onMouseLeave={() => setZooming(false)}
        onClick={() => setLightboxOpen(true)}
        className="group relative aspect-square w-full cursor-zoom-in overflow-hidden rounded-2xl border border-border bg-bg-secondary"
      >
        <SmartImage
          src={images[active]}
          alt={name}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 560px"
          className={cn(
            "object-cover transition-transform duration-200 ease-out",
            zooming && "scale-[1.9]"
          )}
          style={zooming ? { transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` } : undefined}
        />
        <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100">
          <ZoomIn className="h-4 w-4" />
        </div>
      </div>

      <div className="mt-3 grid grid-cols-5 gap-2.5 sm:grid-cols-6">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={cn(
              "relative aspect-square overflow-hidden rounded-xl border transition-colors cursor-pointer",
              active === i ? "border-accent ring-1 ring-accent/40" : "border-border hover:border-white/30"
            )}
          >
            <SmartImage src={img} alt={`${name} ${i + 1}`} fill sizes="90px" className="object-cover" />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90 p-6"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute right-5 top-5 rounded-full bg-white/10 p-2.5 text-white hover:bg-white/20 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActive((a) => (a - 1 + images.length) % images.length);
              }}
              className="absolute left-4 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 cursor-pointer"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="relative h-[75vh] w-full max-w-3xl"
            >
              <SmartImage src={images[active]} alt={name} fill sizes="800px" className="object-contain" />
            </motion.div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActive((a) => (a + 1) % images.length);
              }}
              className="absolute right-4 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 cursor-pointer"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
