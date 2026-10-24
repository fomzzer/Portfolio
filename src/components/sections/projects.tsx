import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Content } from "@/i18n/content";
import { SectionHeading } from "../ui/section-heading";
import { Reveal } from "../ui/reveal";
import { ProjectCard } from "../project-card";

export function Projects({ content }: { content: Content }) {
  const { t, locale, projects } = content;
  const latest = [...projects].sort((a, b) => Number(b.year) - Number(a.year))[0];

  return (
    <section id="work" className="container-page scroll-mt-24 py-24 md:py-32 lg:py-40">
      <SectionHeading index="01" eyebrow={t.work.eyebrow} title={t.work.title} description={t.work.description} />

      {latest && (
        <Reveal>
          <ProjectCard project={latest} content={content} index={0} priority />
        </Reveal>
      )}

      <Reveal delay={0.1} className="mt-8 flex justify-center md:mt-10">
        <Link
          href={`/${locale}/projects`}
          className="glass glass-edge group inline-flex h-12 items-center gap-3 rounded-full pl-6 pr-1.5 text-sm font-medium text-fg transition-colors hover:bg-white/[0.08]"
        >
          {t.work.allCases}
          <span className="grid size-9 place-items-center rounded-full bg-fg text-ink transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5">
            <ArrowRight className="size-4" />
          </span>
        </Link>
      </Reveal>
    </section>
  );
}
