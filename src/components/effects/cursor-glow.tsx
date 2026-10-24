"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState, useSyncExternalStore } from "react";

const query = "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

function subscribe(callback: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

export function CursorGlow() {
  const enabled = useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => false);
  const [active, setActive] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.3 });
  const ry = useSpring(y, { stiffness: 500, damping: 40, mass: 0.3 });
  const gx = useSpring(x, { stiffness: 80, damping: 20 });
  const gy = useSpring(y, { stiffness: 80, damping: 20 });

  useEffect(() => {
    if (!enabled) return;

    function move(e: PointerEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement | null;
      setActive(Boolean(target?.closest("a, button, [role='button'], input, textarea, [data-cursor]")));
    }

    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-0 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.06),transparent_65%)]"
        style={{ x: gx, y: gy }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 mix-blend-difference"
        style={{ x: rx, y: ry }}
        animate={{ width: active ? 56 : 28, height: active ? 56 : 28, backgroundColor: active ? "rgba(255,255,255,1)" : "rgba(255,255,255,0)" }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
    </>
  );
}
