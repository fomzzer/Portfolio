"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

export function LiquidOrb({ className }: { className?: string }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const rotateX = useTransform(sy, [-1, 1], [12, -12]);
  const rotateY = useTransform(sx, [-1, 1], [-12, 12]);
  const tx = useTransform(sx, [-1, 1], [-24, 24]);
  const ty = useTransform(sy, [-1, 1], [-24, 24]);
  const hx = useTransform(sx, [-1, 1], ["30%", "60%"]);
  const hy = useTransform(sy, [-1, 1], ["20%", "45%"]);
  const highlight = useTransform([hx, hy], ([x, y]) => `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,0.55), rgba(255,255,255,0.08) 22%, transparent 45%)`);

  useEffect(() => {
    function move(e: PointerEvent) {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    }
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [mx, my]);

  return (
    <motion.div
      aria-hidden
      className={cn("pointer-events-none relative aspect-square [perspective:1200px]", className)}
      initial={{ opacity: 0, scale: 0.85, filter: "blur(20px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 1.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div className="absolute inset-0" style={{ x: tx, y: ty, rotateX, rotateY }}>
        <div className="absolute inset-[-12%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.12),transparent_60%)] blur-3xl" />

        <div className="absolute inset-0 animate-spin-slow rounded-full bg-[conic-gradient(from_0deg,rgba(255,255,255,0.0),rgba(255,255,255,0.5),rgba(255,255,255,0.0)_30%,rgba(180,190,210,0.35)_55%,rgba(255,255,255,0)_70%,rgba(255,255,255,0.4)_90%,rgba(255,255,255,0))] p-px [mask:radial-gradient(farthest-side,transparent_calc(100%-1.5px),#000_calc(100%-1px))]" />

        <div className="absolute inset-0 overflow-hidden rounded-full bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.12),transparent_60%),radial-gradient(circle_at_50%_50%,rgba(20,20,24,0.4),rgba(5,5,5,0.9)_75%)] shadow-[inset_0_0_80px_rgba(255,255,255,0.08),inset_0_-30px_60px_rgba(255,255,255,0.06),inset_0_30px_60px_rgba(0,0,0,0.6),0_40px_120px_-30px_rgba(0,0,0,1)] backdrop-blur-xl">
          <motion.div className="absolute inset-0" style={{ background: highlight }} />
          <div className="absolute inset-[8%] animate-[spin_40s_linear_infinite_reverse] rounded-full border border-white/[0.06]" />
          <div className="absolute inset-[22%] animate-spin-slow rounded-full border border-dashed border-white/[0.07]" />
          <div className="absolute left-[18%] top-[10%] h-[18%] w-[45%] rotate-[-25deg] rounded-full bg-gradient-to-b from-white/40 to-transparent blur-md" />
          <div className="absolute bottom-[8%] left-1/2 h-[10%] w-[50%] -translate-x-1/2 rounded-full bg-white/10 blur-xl" />
          <div className="noise absolute inset-0 opacity-[0.07] mix-blend-overlay" />
        </div>

        <div className="absolute inset-[34%] rounded-full bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.9),rgba(200,205,215,0.4)_25%,rgba(40,40,46,0.6)_60%,rgba(5,5,5,0.9))] shadow-[0_0_60px_rgba(255,255,255,0.15),inset_0_-10px_30px_rgba(0,0,0,0.6)]" />
      </motion.div>
    </motion.div>
  );
}
