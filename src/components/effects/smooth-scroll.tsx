"use client";

import Lenis from "lenis";
import { useEffect, type ReactNode } from "react";

let instance: Lenis | null = null;

export function getLenis() {
  return instance;
}

export function lockScroll(locked: boolean) {
  if (instance) {
    if (locked) instance.stop();
    else instance.start();
  } else {
    document.documentElement.style.overflow = locked ? "hidden" : "";
  }
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true, autoRaf: true });
    instance = lenis;
    return () => {
      lenis.destroy();
      instance = null;
    };
  }, []);

  return <>{children}</>;
}
