"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useScrollTimeline } from "./use-scroll-timeline";

const className = "scroll-progress fixed inset-x-0 top-0 z-[60] h-px origin-left bg-gradient-to-r from-white/0 via-white to-white/0";

function MotionProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return <motion.div aria-hidden className={className} style={{ scaleX }} />;
}

export function ScrollProgress() {
  const native = useScrollTimeline();
  return native ? <div aria-hidden className={className} /> : <MotionProgress />;
}
