import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "glass glass-edge flex size-9 shrink-0 items-center justify-center rounded-full font-mono text-[15px] font-bold leading-none tracking-[-0.06em] text-fg",
        className,
      )}
    >
      <span>
        f<span className="text-subtle">.</span>
      </span>
    </span>
  );
}

export function BrandWordmark({ className }: { className?: string }) {
  return (
    <span className={cn("font-semibold tracking-[-0.03em] text-fg", className)}>
      fomzzer<span className="text-subtle">.dev</span>
    </span>
  );
}
