import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Enter({ delay = 0, y = 24, className, children }: { delay?: number; y?: number; className?: string; children: ReactNode }) {
  return (
    <div className={cn("animate-enter", className)} style={{ "--enter-y": `${y}px`, "--enter-duration": "0.8s", animationDelay: `${delay}s` } as CSSProperties}>
      {children}
    </div>
  );
}
