"use client";

import { useRef, type HTMLAttributes, type PointerEvent } from "react";
import { cn } from "@/lib/utils";

type GlassCardProps = HTMLAttributes<HTMLDivElement> & {
  strong?: boolean;
};

export function GlassCard({ className, strong, children, onPointerMove, ...props }: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(e: PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (el && e.pointerType === "mouse") {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--x", `${e.clientX - rect.left}px`);
      el.style.setProperty("--y", `${e.clientY - rect.top}px`);
    }
    onPointerMove?.(e);
  }

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      className={cn(strong ? "glass-strong" : "glass", "glass-card glass-edge spotlight rounded-3xl", className)}
      {...props}
    >
      {children}
    </div>
  );
}
