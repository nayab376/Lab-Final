import { cn } from "@/lib/utils";
import { type HTMLAttributes, forwardRef } from "react";

export const GlassCard = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("glass glass-hover rounded-2xl p-6", className)}
      {...props}
    />
  ),
);
GlassCard.displayName = "GlassCard";
