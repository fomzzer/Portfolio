"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

export function LiquidOrb({ className }: { className?: string }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 20 });
  const sy = useSpring(my, { stiffness: 50, damping: 20 });
  const rotateX = useTransform(sy, [-1, 1], [10, -10]);
  const rotateY = useTransform(sx, [-1, 1], [-10, 10]);
  const tx = useTransform(sx, [-1, 1], [-20, 20]);
  const ty = useTransform(sy, [-1, 1], [-20, 20]);
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
      className={cn("pointer-events-none relative aspect-square [contain:layout_paint] [perspective:1200px]", className)}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div className="absolute inset-0 will-change-transform" style={{ x: tx, y: ty, rotateX, rotateY }}>
        <div className="absolute inset-[-12%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.1),rgba(255,255,255,0.03)_35%,transparent_62%)]" />

        <div className="absolute inset-0 animate-spin-slow rounded-full bg-[conic-gradient(from_0deg,rgba(255,255,255,0.0),rgba(255,255,255,0.5),rgba(255,255,255,0.0)_30%,rgba(180,190,210,0.35)_55%,rgba(255,255,255,0)_70%,rgba(255,255,255,0.4)_90%,rgba(255,255,255,0))] will-change-transform [mask:radial-gradient(farthest-side,transparent_calc(100%-1.5px),#000_calc(100%-1px))]" />

        <div className="absolute inset-0 overflow-hidden rounded-full bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.12),transparent_60%),radial-gradient(circle_at_50%_50%,rgba(20,20,24,0.55),rgba(5,5,5,0.94)_75%)] shadow-[inset_0_0_80px_rgba(255,255,255,0.08),inset_0_-30px_60px_rgba(255,255,255,0.06),inset_0_30px_60px_rgba(0,0,0,0.6),0_40px_120px_-30px_rgba(0,0,0,1)]">
          <motion.div
            className="absolute left-[10%] top-[5%] h-[60%] w-[60%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.45),rgba(255,255,255,0.08)_35%,transparent_65%)] will-change-transform"
            style={{ x: hx, y: hy }}
          />
          <div className="absolute inset-[8%] animate-[spin_40s_linear_infinite_reverse] rounded-full border border-white/[0.06]" />
          <div className="absolute inset-[22%] animate-spin-slow rounded-full border border-dashed border-white/[0.07]" />
          <div className="absolute left-[18%] top-[10%] h-[18%] w-[45%] rotate-[-25deg] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.35),transparent_70%)]" />
          <div className="absolute bottom-[8%] left-1/2 h-[12%] w-[55%] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.12),transparent_70%)]" />
        </div>

        <div className="absolute inset-[34%] rounded-full bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.9),rgba(200,205,215,0.4)_25%,rgba(40,40,46,0.6)_60%,rgba(5,5,5,0.9))] shadow-[0_0_60px_rgba(255,255,255,0.15),inset_0_-10px_30px_rgba(0,0,0,0.6)]" />
      </motion.div>
    </motion.div>
  );
}
