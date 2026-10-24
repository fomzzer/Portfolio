"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

const orbits = [
  { inset: "8%", tilt: "rotateX(72deg) rotateY(-14deg)", duration: "16s", reverse: false, size: "3.2%" },
  { inset: "17%", tilt: "rotateX(68deg) rotateY(28deg)", duration: "22s", reverse: true, size: "2.6%" },
  { inset: "2%", tilt: "rotateX(80deg) rotateY(6deg)", duration: "30s", reverse: false, size: "2.2%" },
];

export function CodeOrb({ className }: { className?: string }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 20 });
  const sy = useSpring(my, { stiffness: 50, damping: 20 });
  const rotateX = useTransform(sy, [-1, 1], [10, -10]);
  const rotateY = useTransform(sx, [-1, 1], [-10, 10]);
  const tx = useTransform(sx, [-1, 1], [-20, 20]);
  const ty = useTransform(sy, [-1, 1], [-20, 20]);
  const gx = useTransform(sx, [-1, 1], [-14, 14]);
  const gy = useTransform(sy, [-1, 1], [-14, 14]);
  const hx = useTransform(sx, [-1, 1], ["-12%", "12%"]);
  const hy = useTransform(sy, [-1, 1], ["-10%", "10%"]);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!fine.matches) return;
    let frame = 0;
    function move(e: PointerEvent) {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        mx.set((e.clientX / window.innerWidth) * 2 - 1);
        my.set((e.clientY / window.innerHeight) * 2 - 1);
      });
    }
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
    };
  }, [mx, my]);

  return (
    <motion.div
      aria-hidden
      className={cn("@container pointer-events-none relative aspect-square [contain:layout_paint] [perspective:1200px]", className)}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div className="absolute inset-0 will-change-transform [transform-style:preserve-3d]" style={{ x: tx, y: ty, rotateX, rotateY }}>
        <div className="absolute inset-[-10%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.06),rgba(255,255,255,0.015)_40%,transparent_65%)]" />

        <div className="absolute inset-0 animate-spin-slow rounded-full bg-[conic-gradient(from_0deg,rgba(255,255,255,0.0),rgba(255,255,255,0.5),rgba(255,255,255,0.0)_30%,rgba(180,190,210,0.35)_55%,rgba(255,255,255,0)_70%,rgba(255,255,255,0.4)_90%,rgba(255,255,255,0))] will-change-transform [mask:radial-gradient(farthest-side,transparent_calc(100%-1.5px),#000_calc(100%-1px))]" />

        <div className="absolute inset-0 overflow-hidden rounded-full bg-[radial-gradient(circle_at_30%_22%,rgba(255,255,255,0.09),rgba(255,255,255,0.02)_42%,rgba(255,255,255,0)_70%),radial-gradient(circle_at_50%_115%,rgba(255,255,255,0.08),transparent_55%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.22),inset_0_0_70px_rgba(255,255,255,0.05),inset_0_-24px_60px_rgba(255,255,255,0.04)]">
          <motion.div
            className="absolute left-[8%] top-[4%] h-[58%] w-[58%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.22),rgba(255,255,255,0.05)_35%,transparent_65%)] will-change-transform"
            style={{ x: hx, y: hy }}
          />
          <div className="absolute inset-[24%] animate-[spin_40s_linear_infinite_reverse] rounded-full border border-dashed border-white/[0.08]" />
          <div className="absolute left-[16%] top-[9%] h-[16%] w-[42%] rotate-[-25deg] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.3),transparent_70%)]" />
        </div>

        {orbits.map((o) => (
          <div key={o.inset} className="absolute [transform-style:preserve-3d]" style={{ inset: o.inset, transform: o.tilt }}>
            <div className="absolute inset-0 rounded-full border border-white/[0.09]" />
            <div
              className="absolute inset-0 will-change-transform"
              style={{ animation: `spin ${o.duration} linear infinite${o.reverse ? " reverse" : ""}` }}
            >
              <span
                className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_14px_3px_rgba(255,255,255,0.55)]"
                style={{ width: o.size, height: o.size }}
              />
            </div>
          </div>
        ))}

        <motion.div className="absolute inset-0 flex items-center justify-center will-change-transform" style={{ x: gx, y: gy }}>
          <span className="select-none bg-[linear-gradient(180deg,#ffffff_0%,#e4e4e7_38%,#71717a_100%)] bg-clip-text font-mono text-[17cqw] font-bold leading-none tracking-[-0.08em] text-transparent [filter:drop-shadow(0_0_28px_rgba(255,255,255,0.22))]">
            &lt;/&gt;
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
