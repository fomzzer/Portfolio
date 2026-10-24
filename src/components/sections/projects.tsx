import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Content } from "@/i18n/content";
import { SectionHeading } from "../ui/section-heading";
import { Reveal } from "../ui/reveal";
import { GlassCard } from "../ui/glass-card";
import { ProjectCover } from "../project-cover";
import { cn } from "@/lib/utils";

export function Projects({ content }: { content: Content }) {
  const { t, locale, projects } = content;
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="work" className="container-page scroll-mt-24 py-24 md:py-32 lg:py-40">
      <SectionHeading index="01" eyebrow={t.work.eyebrow} title={t.work.title} description={t.work.description} />

      <div className="flex flex-col gap-6 md:gap-8">
        {featured.map((project, i) => (
          <Reveal key={project.slug} delay={0.05}>
            <Link href={`/${locale}/projects/${project.slug}`} className="group block">
              <GlassCard className="grid gap-6 p-3 sm:p-4 lg:grid-cols-12 lg:gap-10 lg:p-5">
                <ProjectCover
                  project={project}
                  priority={i === 0}
                  className={cn("aspect-[16/11] lg:col-span-7", i % 2 === 1 && "lg:order-2")}
                />
                <div className={cn("flex flex-col justify-between gap-8 p-2 lg:col-span-5 lg:py-4", i % 2 === 1 && "lg:order-1")}>
                  <div>
                    <div className="mb-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">
                      <span>{String(i + 1).padStart(2, "0")}</span>
                      <span className="h-px w-6 bg-line-strong" />
                      <span>{project.year}</span>
                      <span className="ml-auto flex items-center gap-1.5 whitespace-nowrap rounded-full border border-line px-2.5 py-1 normal-case tracking-normal text-muted">
                        <span className={cn("size-1.5 rounded-full", project.status === "live" ? "bg-emerald-300 animate-pulse-dot" : "bg-amber-300")} />
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
          </Reveal>
        ))}

        {rest.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            {rest.map((project, i) => (
              <Reveal key={project.slug} delay={i * 0.1}>
                <Link href={`/${locale}/projects/${project.slug}`} className="group block h-full">
                  <GlassCard className="flex h-full flex-col gap-6 p-3 sm:p-4">
                    <ProjectCover project={project} className="aspect-[16/10]" />
                    <div className="flex items-start justify-between gap-4 px-2 pb-2">
                      <div>
                        <h3 className="text-xl font-semibold tracking-[-0.03em] text-fg">{project.title}</h3>
                        <p className="mt-1 text-sm text-muted">{project.tagline}</p>
                      </div>
                      <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line-strong transition-all duration-500 ease-out-expo group-hover:rotate-45 group-hover:bg-fg group-hover:text-ink">
                        <ArrowUpRight className="size-4" />
                      </span>
                    </div>
                  </GlassCard>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
