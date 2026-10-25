"use client";

import { useEffect, useRef, type HTMLAttributes } from "react";

export function PauseOffscreen(props: HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) delete el.dataset.paused;
      else el.dataset.paused = "";
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} {...props} />;
}
