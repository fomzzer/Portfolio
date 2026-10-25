"use client";

import { Fragment } from "react";
import { RevealGroup } from "./reveal";
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
          <Fragment key={`${word}-${i}`}>
            <span className="inline-block overflow-hidden pb-[0.12em] align-bottom" aria-hidden>
              <span className={cn("animate-enter-word inline-block", wordClassName)} style={{ animationDelay: `${delay + i * stagger}s` }}>
                {word}
              </span>
            </span>
            {i < words.length - 1 && " "}
          </Fragment>
        ))}
      </span>
    );
  }

  return (
    <RevealGroup as="span" className={cn("inline", className)}>
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span className="inline-block overflow-hidden pb-[0.12em] align-bottom" aria-hidden>
            <span data-reveal-word="" className={cn("inline-block", wordClassName)} style={{ animationDelay: `${delay + i * stagger}s` }}>
              {word}
            </span>
          </span>
          {i < words.length - 1 && " "}
        </Fragment>
      ))}
    </RevealGroup>
  );
}
