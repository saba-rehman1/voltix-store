"use client";

import { useEffect } from "react";

/**
 * Sets document.title for client-rendered pages that can't export the
 * `metadata` object directly (Next.js disallows `export const metadata`
 * inside a "use client" file). Mirrors the root layout's title template
 * ("%s | Voltix Store") so tab titles stay consistent across the app.
 */
export function useDocumentTitle(title: string, suffix = "Voltix Store") {
  useEffect(() => {
    const previous = document.title;
    document.title = suffix ? `${title} | ${suffix}` : title;
    return () => {
      document.title = previous;
    };
  }, [title, suffix]);
}
