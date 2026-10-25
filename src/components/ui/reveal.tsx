"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode, type RefObject } from "react";

let observer: IntersectionObserver | null = null;

function getObserver() {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        (entry.target as HTMLElement).dataset.in = "";
        observer?.unobserve(entry.target);
      }
    },
    { rootMargin: "-60px" },
  );
  return observer;
}

export function useRevealOnce(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = getObserver();
    io.observe(el);
    return () => io.unobserve(el);
  }, [ref]);
}

export function Reveal({ delay = 0, y = 24, className, children }: { delay?: number; y?: number; className?: string; children?: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useRevealOnce(ref);

  return (
    <div ref={ref} data-reveal="" className={className} style={{ "--enter-y": `${y}px`, animationDelay: `${delay}s` } as CSSProperties}>
      {children}
    </div>
  );
}

export function RevealGroup({ as: Tag = "div", className, children }: { as?: "div" | "span"; className?: string; children?: ReactNode }) {
  const ref = useRef<HTMLDivElement & HTMLSpanElement>(null);
  useRevealOnce(ref);

  return (
    <Tag ref={ref} data-reveal-group="" className={className}>
      {children}
    </Tag>
  );
}
