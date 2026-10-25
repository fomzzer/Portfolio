import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projectData } from "@/content/projects";
import { isLocale, localeMeta } from "@/i18n/config";
import { breadcrumbs, localeAlternates, personId } from "@/lib/seo";
import { siteUrl } from "@/lib/utils";
import { getContent, getNextProject, getProject } from "@/i18n/content";
import { ProjectCover } from "@/components/project-cover";
import { ProjectGallery } from "@/components/project-gallery";
import { Enter } from "@/components/ui/enter";
import { Reveal } from "@/components/ui/reveal";
import { SplitText } from "@/components/ui/split-text";
import { GlassCard } from "@/components/ui/glass-card";
import { Counter } from "@/components/ui/counter";
import { BrandIcon } from "@/components/ui/brand-icon";

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projectData.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const project = getProject(getContent(locale), slug);
  if (!project) return {};
  const title = `${project.title} — ${project.tagline}`;
  return {
    title,
    description: project.summary,
    alternates: localeAlternates(locale, `/projects/${slug}`),
    openGraph: {
      title,
      description: project.summary,
      type: "article",
      url: `${siteUrl}/${locale}/projects/${slug}`,
      siteName: "fomzzer.dev",
      locale: localeMeta[locale].ogLocale,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const content = getContent(locale);
  const project = getProject(content, slug);
  if (!project) notFound();
  const next = getNextProject(content, slug);
  const { t } = content;

  const jsonLd = [
    breadcrumbs([
      { name: t.nav.home, path: `/${locale}` },
      { name: t.nav.cases, path: `/${locale}/projects` },
      { name: project.title, path: `/${locale}/projects/${project.slug}` },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: project.title,
      headline: project.tagline,
      description: project.summary,
      url: `${siteUrl}/${locale}/projects/${project.slug}`,
      inLanguage: localeMeta[locale].htmlLang,
      dateCreated: project.year,
      author: { "@id": personId },
      creator: { "@id": personId },
      keywords: project.stack.join(", "),
      ...(project.cover && { image: `${siteUrl}${project.cover.src}` }),
      ...(project.url && { about: { "@type": "WebSite", name: project.title, url: project.url } }),
    },
  ];

  const meta = [
    { label: t.caseStudy.client, value: project.client },
    { label: t.caseStudy.role, value: project.role },
    { label: t.caseStudy.year, value: project.year },
    { label: t.caseStudy.status, value: t.work.status[project.status] },
  ];

  return (
    <article className="pt-28 md:pt-40">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container-page">
        <Enter>
          <Link href={`/${locale}/projects`} className="group mb-10 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg md:mb-12">
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            {t.caseStudy.back}
          </Link>
        </Enter>

        <p className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-subtle">
          {t.caseStudy.label} · {project.year}
        </p>
        <h1 className="text-[clamp(2.5rem,9vw,7rem)] font-semibold leading-[0.95] tracking-[-0.06em] text-balance">
          <SplitText text={project.title} immediate delay={0.1} />
        </h1>
        <Enter delay={0.3}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl md:text-2xl">{project.tagline}</p>
        </Enter>

        <Enter delay={0.4}>
          <div className="mt-10 flex flex-col gap-3 sm:mt-12 sm:flex-row sm:flex-wrap">
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-12 items-center justify-between gap-3 rounded-full bg-fg pl-6 pr-1.5 text-sm font-medium text-ink"
              >
                {t.caseStudy.visit}
                <span className="grid size-9 place-items-center rounded-full bg-ink text-fg transition-transform duration-500 ease-out-expo group-hover:rotate-45">
                  <ArrowUpRight className="size-4" />
                </span>
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="glass glass-edge inline-flex h-12 items-center justify-center gap-2.5 rounded-full px-6 text-sm font-medium"
              >
                <BrandIcon name="github" className="size-4" />
                {t.caseStudy.source}
              </a>
            )}
          </div>
        </Enter>

        <Enter delay={0.5} className="mt-12 md:mt-16">
          <GlassCard className="p-2 sm:p-3 md:p-4">
            <ProjectCover project={project} priority sizes="(min-width: 1240px) 1100px, 100vw" className="aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/8]" />
          </GlassCard>
        </Enter>

        <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-4">
          {meta.map((m) => (
            <div key={m.label} className="bg-ink p-5 sm:p-6">
              <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">{m.label}</dt>
              <dd className="mt-2 text-sm text-fg">{m.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-20 grid gap-10 md:mt-28 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-subtle">{t.caseStudy.overview}</p>
            </Reveal>
          </div>
          <div className="space-y-12 md:col-span-8 md:space-y-16">
            <Reveal>
              <p className="text-xl font-medium leading-snug tracking-[-0.03em] text-fg sm:text-2xl md:text-3xl">{project.summary}</p>
            </Reveal>
            <div className="grid gap-10 sm:grid-cols-2">
              <Reveal>
                <h2 className="mb-4 text-lg font-semibold">{t.caseStudy.challenge}</h2>
                <p className="leading-relaxed text-muted">{project.challenge}</p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="mb-4 text-lg font-semibold">{t.caseStudy.solution}</h2>
                <p className="leading-relaxed text-muted">{project.solution}</p>
              </Reveal>
            </div>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-4 sm:gap-6 md:mt-28 lg:grid-cols-4">
          {project.metrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.07}>
              <GlassCard className="flex h-full flex-col p-5 sm:p-6 md:p-8">
                <Counter value={m.value} className="text-gradient block text-3xl font-semibold tabular-nums tracking-[-0.05em] sm:text-4xl md:text-5xl" />
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-subtle sm:text-[11px]">{m.label}</p>
                {m.note && (
                  <div className="mt-auto pt-4">
                    <p className="flex flex-wrap items-baseline gap-x-1.5 border-t border-line pt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-subtle sm:text-[11px]">
                      <span className="text-gradient text-sm font-semibold tabular-nums tracking-[-0.02em] sm:text-base">{m.note.value}</span>
                      {m.note.label}
                    </p>
                  </div>
                )}
              </GlassCard>
            </Reveal>
          ))}
        </div>

        <section className="mt-20 md:mt-28">
          <Reveal>
            <h2 className="mb-8 text-3xl font-semibold tracking-[-0.04em] md:mb-10 md:text-5xl">{t.caseStudy.features}</h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {project.features.map((f, i) => (
              <Reveal key={f.title} delay={(i % 3) * 0.08}>
                <GlassCard className="h-full p-6 md:p-7">
                  <span className="font-mono text-xs text-subtle">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-6 text-lg font-semibold tracking-[-0.02em] md:mt-8">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{f.text}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mt-20 md:mt-28">
          <Reveal>
            <h2 className="mb-8 text-3xl font-semibold tracking-[-0.04em] md:mb-10 md:text-5xl">{t.caseStudy.gallery}</h2>
          </Reveal>
          <ProjectGallery project={project} labels={{ desktop: t.caseStudy.desktop, mobile: t.caseStudy.mobile }} />
        </section>

        <section className="mt-20 md:mt-28">
          <Reveal>
            <h2 className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-subtle md:mb-8">{t.caseStudy.stack}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="flex flex-wrap gap-2 sm:gap-3">
              {project.stack.map((s) => (
                <li key={s} className="glass glass-edge rounded-full px-4 py-2 text-sm text-fg sm:px-5 sm:py-2.5">
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        {next && next.slug !== project.slug && (
          <Reveal className="mt-24 md:mt-32">
            <Link href={`/${locale}/projects/${next.slug}`} className="group block">
              <GlassCard strong className="flex items-center justify-between gap-6 p-6 sm:p-8 md:p-12">
                <div className="min-w-0">
                  <p className="font-mono text-xs uppercase tracking-[0.25em] text-subtle">{t.caseStudy.next}</p>
                  <p className="mt-3 text-3xl font-semibold tracking-[-0.05em] sm:text-4xl md:text-6xl">{next.title}</p>
                </div>
                <span className="grid size-12 shrink-0 place-items-center rounded-full border border-line-strong transition-all duration-700 ease-out-expo group-hover:rotate-45 group-hover:bg-fg group-hover:text-ink md:size-16">
                  <ArrowUpRight className="size-5 md:size-6" />
                </span>
              </GlassCard>
            </Link>
          </Reveal>
        )}
      </div>
    </article>
  );
}
