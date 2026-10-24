import Image from "next/image";
import type { Project } from "@/i18n/content";
import { cn } from "@/lib/utils";

export function ProjectCover({ project, className, priority, sizes }: { project: Project; className?: string; priority?: boolean; sizes?: string }) {
  return (
    <div className={cn("relative isolate overflow-hidden rounded-2xl bg-ink-2", className)} style={{ ["--accent" as string]: project.accent }}>
      <div className="absolute -left-1/4 -top-1/3 h-[120%] w-[90%] rounded-full bg-[radial-gradient(circle,var(--accent),transparent_60%)] opacity-[0.14] transition-opacity duration-700 group-hover:opacity-25" />
      <div className="grid-bg absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,#000,transparent)]" />

      <div className="absolute inset-x-[6%] bottom-0 top-[10%] flex flex-col overflow-hidden rounded-t-xl border border-b-0 border-white/10 bg-ink-3 shadow-[0_-20px_80px_-20px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.08)] transition-transform duration-700 ease-out-expo will-change-transform group-hover:-translate-y-2">
        <div className="flex shrink-0 items-center gap-2 border-b border-white/[0.06] px-3 py-2.5 sm:px-4 sm:py-3">
          <span className="size-2 rounded-full bg-white/15 sm:size-2.5" />
          <span className="size-2 rounded-full bg-white/10 sm:size-2.5" />
          <span className="size-2 rounded-full bg-white/5 sm:size-2.5" />
          <span className="ml-2 h-5 flex-1 truncate rounded-md bg-white/[0.04] px-3 font-mono text-[10px] leading-5 text-subtle sm:ml-3">
            {project.url ? project.url.replace(/^https?:\/\//, "").replace(/\/$/, "") : `${project.slug}.app`}
          </span>
        </div>
        <div className="relative flex-1">
          {project.cover && (
            <Image
              src={project.cover.src}
              alt={project.title}
              fill
              priority={priority}
              sizes={sizes ?? "(min-width: 1024px) 640px, 100vw"}
              quality={80}
              className="object-cover object-top"
            />
          )}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]" />
    </div>
  );
}
