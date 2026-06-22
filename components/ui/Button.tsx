import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-50 disabled:pointer-events-none",
        {
          "bg-accent text-white hover:bg-accent-hover shadow-sm active:scale-[0.98]":
            variant === "primary",
          "bg-navy text-white hover:bg-navy/80 shadow-sm active:scale-[0.98]":
            variant === "secondary",
          "bg-transparent text-foreground hover:bg-surface active:scale-[0.98]":
            variant === "ghost",
          "border border-border bg-transparent text-foreground hover:bg-surface active:scale-[0.98]":
            variant === "outline",
        },
        {
          "px-3 py-1.5 text-xs": size === "sm",
          "px-4 py-2 text-sm": size === "md",
          "px-6 py-3 text-base": size === "lg",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
