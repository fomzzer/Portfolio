import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Content, Project } from "@/i18n/content";
import { cn } from "@/lib/utils";
import { GlassCard } from "./ui/glass-card";
import { ProjectCover } from "./project-cover";

type ProjectCardProps = {
  project: Project;
  content: Content;
  index: number;
  priority?: boolean;
  reverse?: boolean;
};

export function ProjectCard({ project, content, index, priority, reverse }: ProjectCardProps) {
  const { t, locale } = content;

  return (
    <Link href={`/${locale}/projects/${project.slug}`} className="group block">
      <GlassCard className="grid gap-6 p-3 sm:p-4 lg:grid-cols-12 lg:gap-10 lg:p-5">
        <ProjectCover project={project} priority={priority} className={cn("aspect-[16/11] lg:col-span-7", reverse && "lg:order-2")} />
        <div className={cn("flex flex-col justify-between gap-8 p-2 lg:col-span-5 lg:py-4", reverse && "lg:order-1")}>
          <div>
            <div className="mb-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <span className="h-px w-6 bg-line-strong" />
              <span>{project.year}</span>
              <span className="ml-auto flex items-center gap-2.5 whitespace-nowrap rounded-full border border-line py-1 pl-3 pr-3.5 normal-case tracking-normal text-muted">
                <span className={cn("size-1.5 shrink-0 rounded-full", project.status === "live" ? "bg-emerald-300 animate-pulse-dot" : "bg-amber-300")} />
                {t.work.status[project.status]}
              </span>
            </div>
            <h3 className="text-3xl font-semibold tracking-[-0.04em] text-fg md:text-4xl">{project.title}</h3>
            <p className="mt-3 text-base leading-relaxed text-muted">{project.tagline}</p>
            <p className="mt-5 text-sm leading-relaxed text-subtle">{project.summary}</p>
          </div>
          <div>
            <ul className="mb-8 flex flex-wrap gap-2">
              {project.stack.slice(0, 6).map((tech) => (
                <li key={tech} className="rounded-full border border-line bg-white/[0.02] px-3 py-1 text-xs text-muted">
                  {tech}
                </li>
              ))}
              {project.stack.length > 6 && <li className="rounded-full px-2 py-1 text-xs text-subtle">+{project.stack.length - 6}</li>}
            </ul>
            <span className="inline-flex items-center gap-3 text-sm font-medium text-fg">
              {t.work.readCase}
              <span className="grid size-9 place-items-center rounded-full border border-line-strong transition-all duration-500 ease-out-expo group-hover:rotate-45 group-hover:bg-fg group-hover:text-ink">
                <ArrowUpRight className="size-4" />
              </span>
            </span>
          </div>
        </div>
      </GlassCard>
    </Link>
  );
}
