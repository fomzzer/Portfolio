"use client";

import { useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

const lines = [
  { prompt: true, text: "npx create-next-app@latest your-product" },
  { prompt: false, text: "✓ App Router · TypeScript · Tailwind" },
  { prompt: true, text: "npx prisma migrate deploy" },
  { prompt: false, text: "✓ 17 migrations applied to PostgreSQL" },
  { prompt: true, text: "vercel --prod" },
  { prompt: false, text: "✓ Production: https://your-product.com  [32s]" },
];

export function Terminal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [line, setLine] = useState(0);
  const [char, setChar] = useState(0);

  useEffect(() => {
    if (!inView || line >= lines.length) return;
    const current = lines[line];
    if (!current.prompt) {
      const t = setTimeout(() => {
        setLine((l) => l + 1);
        setChar(0);
      }, 380);
      return () => clearTimeout(t);
    }
    if (char < current.text.length) {
      const t = setTimeout(() => setChar((c) => c + 1), 28 + Math.random() * 40);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setLine((l) => l + 1);
      setChar(0);
    }, 420);
    return () => clearTimeout(t);
  }, [inView, line, char]);

  return (
    <div ref={ref} className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-black/50">
      <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/10" />
        <span className="size-2.5 rounded-full bg-white/5" />
        <span className="ml-3 font-mono text-[11px] text-subtle">~/projects — zsh</span>
      </div>
      <div className="flex-1 space-y-2 p-5 font-mono text-[12.5px] leading-relaxed">
        {lines.slice(0, line + 1).map((l, i) => {
          const isCurrent = i === line;
          const text = isCurrent && l.prompt ? l.text.slice(0, char) : l.text;
          if (isCurrent && !l.prompt && line < lines.length) return null;
          return (
            <div key={i} className={l.prompt ? "text-fg" : "text-emerald-300/80"}>
              {l.prompt && <span className="mr-2 text-subtle">❯</span>}
              {text}
              {isCurrent && l.prompt && <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-fg/80" />}
            </div>
          );
        })}
        {line >= lines.length && (
          <div className="text-fg">
            <span className="mr-2 text-subtle">❯</span>
            <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-fg/80" />
          </div>
        )}
      </div>
    </div>
  );
}
