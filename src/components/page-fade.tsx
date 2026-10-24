"use client";

import { motion } from "motion/react";
import { useState, type ReactNode } from "react";

const key = "__fzLocaleSwitch";

type SwitchWindow = Window & { [key]?: number };

export function markLocaleSwitch() {
  (window as SwitchWindow)[key] = performance.now();
}

export function PageFade({ children, className }: { children: ReactNode; className?: string }) {
  const [animateIn] = useState(() => {
    if (typeof window === "undefined") return false;
    const at = (window as SwitchWindow)[key];
    return at !== undefined && performance.now() - at < 3000;
  });

  return (
    <motion.div
      className={className}
      initial={animateIn ? { opacity: 0, y: 10 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
