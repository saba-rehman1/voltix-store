"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

type SmartImageProps = Omit<ImageProps, "onError" | "src"> & {
  src: string;
  wrapperClassName?: string;
};

export function SmartImage({
  src,
  alt,
  className,
  wrapperClassName,
  fill,
  ...props
}: SmartImageProps) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-gradient-to-br from-card to-bg-secondary text-muted-2",
          fill ? "absolute inset-0" : "w-full h-full",
          wrapperClassName
        )}
      >
        <div className="flex flex-col items-center gap-2 p-6 text-center">
          <ImageOff className="h-8 w-8 opacity-40" />
          <span className="text-[11px] uppercase tracking-wide opacity-50">
            {alt || "Image unavailable"}
          </span>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      className={className}
      onError={() => setErrored(true)}
      {...props}
    />
  );
}
