"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function FaqItem({ index, question, answer }: { index: number; question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div className="bg-ink transition-colors duration-500 hover:bg-ink-2">
      <h3>
        <button
          type="button"
          id={`${id}-q`}
          aria-expanded={open}
          aria-controls={`${id}-a`}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full cursor-pointer items-center justify-between gap-5 p-5 text-left sm:p-6 md:p-7"
        >
          <span className="flex min-w-0 items-baseline gap-4 md:gap-6">
            <span className="shrink-0 font-mono text-xs text-subtle">{String(index + 1).padStart(2, "0")}</span>
            <span className="text-base font-semibold tracking-[-0.02em] text-fg sm:text-lg md:text-xl">{question}</span>
          </span>
          <span
            className={cn(
              "grid size-9 shrink-0 place-items-center rounded-full border border-line-strong transition-[rotate,background-color,color] duration-500 ease-out-expo",
              open ? "rotate-45 bg-fg text-ink" : "text-muted",
            )}
          >
            <Plus className="size-4" />
          </span>
        </button>
      </h3>
      <div
        id={`${id}-a`}
        role="region"
        aria-labelledby={`${id}-q`}
        inert={!open}
        className={cn("grid transition-[grid-template-rows] duration-500 ease-out-expo", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
      >
        <div className="overflow-hidden">
          <div className={cn("px-5 pb-6 pl-[3.25rem] transition-[opacity,translate] duration-500 ease-out-expo sm:px-6 sm:pl-[3.5rem] md:px-7 md:pb-7 md:pl-[4.25rem]", open ? "opacity-100" : "-translate-y-2 opacity-0")}>
            <p className="max-w-3xl text-sm leading-relaxed text-muted sm:text-base">{answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
