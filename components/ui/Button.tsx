"use client";

import { ButtonHTMLAttributes, forwardRef, useState, MouseEvent } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger" | "success";
type Size = "sm" | "md" | "lg" | "icon";

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-accent to-accent-cyan text-white shadow-[0_0_0_1px_rgba(37,99,235,0.4)] hover:shadow-glow",
  secondary: "bg-card text-white border border-border hover:bg-card-hover",
  outline: "bg-transparent text-white border border-border hover:border-accent/60 hover:bg-white/5",
  ghost: "bg-transparent text-muted hover:text-white hover:bg-white/5",
  danger: "bg-danger text-white hover:brightness-110",
  success: "bg-success text-white hover:brightness-110",
};

const sizeStyles: Record<Size, string> = {
  sm: "text-xs px-3.5 py-2 rounded-lg gap-1.5",
  md: "text-sm px-5 py-2.5 rounded-xl gap-2",
  lg: "text-base px-7 py-3.5 rounded-xl gap-2.5",
  icon: "p-2.5 rounded-xl",
};

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading,
      fullWidth,
      children,
      onClick,
      disabled,
      ...props
    },
    ref
  ) => {
    const [ripples, setRipples] = useState<Ripple[]>([]);

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
      const button = e.currentTarget;
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      const id = Date.now();
      setRipples((prev) => [...prev, { id, x, y, size }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 650);
      onClick?.(e);
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.96 }}
        whileHover={disabled || loading ? undefined : { scale: 1.015 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        disabled={disabled || loading}
        onClick={handleClick}
        className={cn(
          "relative inline-flex items-center justify-center overflow-hidden font-medium transition-colors duration-200 cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap",
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && "w-full",
          className
        )}
        {...(props as HTMLMotionProps<"button">)}
      >
        <span className="relative z-10 inline-flex items-center gap-2">
          {loading ? (
            <>
              <svg
                className="animate-spin h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-90"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
              Loading
            </>
          ) : (
            children
          )}
        </span>
        {ripples.map((r) => (
          <span
            key={r.id}
            className="absolute rounded-full bg-white/30 pointer-events-none animate-ripple"
            style={{ left: r.x, top: r.y, width: r.size, height: r.size }}
          />
        ))}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
