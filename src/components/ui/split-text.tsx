"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type SplitTextProps = {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  immediate?: boolean;
};

export function SplitText({ text, className, wordClassName, delay = 0, stagger = 0.06, immediate = false }: SplitTextProps) {
  const words = text.split(" ");

  if (immediate) {
    return (
      <span className={cn("inline", className)}>
        <span className="sr-only">{text}</span>
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.12em] align-bottom" aria-hidden>
            <span className={cn("animate-enter-word inline-block", wordClassName)} style={{ animationDelay: `${delay + i * stagger}s` }}>
              {word}
            </span>
            {i < words.length - 1 && " "}
          </span>
        ))}
      </span>
    );
  }

  return (
    <motion.span
      className={cn("inline", className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.12em] align-bottom" aria-hidden>
          <motion.span
            className={cn("inline-block will-change-transform", wordClassName)}
            variants={{
              hidden: { y: "110%", rotate: 4, opacity: 0 },
              show: { y: "0%", rotate: 0, opacity: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </motion.span>
  );
}
