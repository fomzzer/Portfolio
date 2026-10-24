import Image from "next/image";
import type { Project } from "@/i18n/content";
import { cn } from "@/lib/utils";

export function ProjectCover({ project, className, priority }: { project: Project; className?: string; priority?: boolean }) {
  return (
    <div
      className={cn("relative isolate overflow-hidden rounded-2xl bg-ink-2", className)}
      style={{ ["--accent" as string]: project.accent }}
    >
      <div className="absolute -left-1/4 -top-1/3 h-[120%] w-[90%] rounded-full bg-[radial-gradient(circle,var(--accent),transparent_60%)] opacity-[0.16] blur-3xl transition-opacity duration-700 group-hover:opacity-30" />
      <div className="grid-bg absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,#000,transparent)]" />

      <div className="absolute inset-x-[7%] bottom-0 top-[12%] overflow-hidden rounded-t-xl border border-b-0 border-white/10 bg-ink-3/80 shadow-[0_-20px_80px_-20px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl transition-transform duration-700 ease-out-expo group-hover:-translate-y-2 group-hover:scale-[1.015]">
        <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/10" />
          <span className="size-2.5 rounded-full bg-white/5" />
          <span className="ml-3 h-5 flex-1 truncate rounded-md bg-white/[0.04] px-3 font-mono text-[10px] leading-5 text-subtle">
            {project.url ? project.url.replace(/^https?:\/\//, "").replace(/\/$/, "") : `${project.slug}.app`}
          </span>
        </div>

        {project.cover ? (
          <Image
            src={project.cover}
            alt={project.title}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-top pt-11"
          />
        ) : (
          <div className="relative h-full p-6">
            <div className="mb-6 flex items-center justify-between">
              <div className="h-3 w-20 rounded-full bg-white/15" />
              <div className="flex gap-2">
                <div className="h-3 w-10 rounded-full bg-white/[0.06]" />
                <div className="h-3 w-10 rounded-full bg-white/[0.06]" />
                <div className="h-3 w-10 rounded-full bg-white/[0.06]" />
              </div>
            </div>
            <p className="max-w-[80%] text-2xl font-semibold leading-tight tracking-[-0.04em] text-fg/90 sm:text-3xl">{project.title}</p>
            <p className="mt-2 max-w-[70%] text-xs text-subtle">{project.tagline}</p>
            <div className="mt-6 h-8 w-28 rounded-full" style={{ background: project.accent, opacity: 0.85 }} />
            <div className="mt-8 grid grid-cols-3 gap-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="aspect-[4/3] rounded-lg border border-white/[0.05] bg-gradient-to-b from-white/[0.06] to-white/[0.01]" />
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]" />
    </div>
  );
}
