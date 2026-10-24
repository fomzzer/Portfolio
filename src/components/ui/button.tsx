import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "glass" | "ghost";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full text-sm font-medium tracking-tight transition-all duration-500 ease-out-expo active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "h-12 px-6 bg-fg text-ink shadow-[0_0_0_1px_rgba(255,255,255,0.4),0_10px_40px_-10px_rgba(255,255,255,0.45)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.6),0_10px_50px_-6px_rgba(255,255,255,0.6)]",
  glass: "glass glass-edge h-12 px-6 text-fg hover:bg-white/[0.08]",
  ghost: "h-10 px-4 text-muted hover:text-fg",
};

function Inner({ children, variant }: { children: ReactNode; variant: Variant }) {
  return (
    <>
      {variant === "primary" && (
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-black/10 to-transparent transition-transform duration-700 ease-out-expo group-hover/btn:translate-x-full" />
      )}
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </>
  );
}

type ButtonLinkProps = ComponentProps<typeof Link> & { variant?: Variant; external?: boolean };

export function ButtonLink({ variant = "primary", className, children, external, ...props }: ButtonLinkProps) {
  const ext = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <Link className={cn(base, variants[variant], className)} {...ext} {...props}>
      <Inner variant={variant}>{children}</Inner>
    </Link>
  );
}

type ButtonProps = ComponentProps<"button"> & { variant?: Variant };

export function Button({ variant = "primary", className, children, ...props }: ButtonProps) {
  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      <Inner variant={variant}>{children}</Inner>
    </button>
  );
}
