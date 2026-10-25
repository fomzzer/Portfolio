"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef } from "react";

export function Counter({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : null;
  const suffix = match ? match[2] : "";

  useEffect(() => {
    if (!inView || target === null) return;
    const node = ref.current?.firstChild;
    if (!node) return;
    const controls = animate(0, target, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        node.nodeValue = `${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, target, suffix]);

  return (
    <span ref={ref} className={className}>
      {target === null ? value : `0${suffix}`}
    </span>
  );
}
