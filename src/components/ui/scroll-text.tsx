"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef, type CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { useScrollTimeline } from "../effects/use-scroll-timeline";

const base = "scroll-text flex select-none flex-wrap gap-x-[0.25em]";

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {children}
    </motion.span>
  );
}

function MotionScrollText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "start 220px"] });
  const words = text.split(" ");

  return (
    <p ref={ref} className={cn(base, className)}>
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} aria-hidden>
          <Word progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
            {word}
          </Word>
        </span>
      ))}
    </p>
  );
}

export function ScrollText({ text, className }: { text: string; className?: string }) {
  const native = useScrollTimeline();
  if (!native) return <MotionScrollText text={text} className={className} />;
  const words = text.split(" ");

  return (
    <p className={cn(base, className)}>
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} aria-hidden>
          <span className="scroll-word inline-block" style={{ "--i": i, "--n": words.length } as CSSProperties}>
            {word}
          </span>
        </span>
      ))}
    </p>
  );
}
