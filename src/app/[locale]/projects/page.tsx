import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { isLocale, localeMeta } from "@/i18n/config";
import { breadcrumbs, localeAlternates, personId } from "@/lib/seo";
import { siteUrl } from "@/lib/utils";
import { getContent } from "@/i18n/content";
import { ProjectCard } from "@/components/project-card";
import { Enter } from "@/components/ui/enter";
import { Reveal } from "@/components/ui/reveal";
import { SplitText } from "@/components/ui/split-text";
import { GlassCard } from "@/components/ui/glass-card";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { t } = getContent(locale);
  return {
    title: t.seo.casesTitle,
    description: `${t.cases.description} ${t.cases.ctaText}`,
    alternates: localeAlternates(locale, "/projects"),
    openGraph: { type: "website", siteName: "fomzzer.dev", title: t.seo.casesTitle, description: t.cases.description, url: `${siteUrl}/${locale}/projects`, locale: localeMeta[locale].ogLocale },
  };
}

export default async function CasesPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const content = getContent(locale);
  const { t } = content;
  const projects = [...content.projects].sort((a, b) => Number(b.year) - Number(a.year));
  const jsonLd = [
    breadcrumbs([
      { name: t.nav.home, path: `/${locale}` },
      { name: t.nav.cases, path: `/${locale}/projects` },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: t.seo.casesTitle,
      description: t.cases.description,
      url: `${siteUrl}/${locale}/projects`,
      inLanguage: localeMeta[locale].htmlLang,
      author: { "@id": personId },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: projects.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: `${siteUrl}/${locale}/projects/${p.slug}`, name: p.title })),
      },
    },
  ];

  return (
    <section className="container-page pt-32 md:pt-40">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mb-14 grid gap-6 md:mb-20 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <Enter>
            <div className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-subtle">
              <span className="text-muted">{String(projects.length).padStart(2, "0")}</span>
              <span className="h-px w-8 bg-line-strong" />
              <span>{t.cases.eyebrow}</span>
            </div>
          </Enter>
          <h1 className="max-w-4xl text-[clamp(2.5rem,7vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-balance">
            <SplitText text={t.cases.title} immediate delay={0.1} />
          </h1>
        </div>
        <Enter delay={0.2} className="lg:col-span-4">
          <p className="max-w-md text-base leading-relaxed text-muted lg:ml-auto">{t.cases.description}</p>
        </Enter>
      </div>

      <div className="flex flex-col gap-6 md:gap-8">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={0.05}>
            <ProjectCard project={project} content={content} index={i} priority={i === 0} reverse={i % 2 === 1} heading="h2" />
          </Reveal>
        ))}

        <Reveal delay={0.1}>
          <GlassCard strong className="flex flex-col items-start justify-between gap-6 p-7 sm:p-10 md:flex-row md:items-center">
            <div>
              <p className="text-2xl font-semibold tracking-[-0.04em] md:text-4xl">{t.cases.ctaTitle}</p>
              <p className="mt-3 max-w-lg text-muted">{t.cases.ctaText}</p>
            </div>
            <Link
              href={`/${locale}#contact`}
              scroll={false}
              className="group inline-flex h-14 shrink-0 items-center gap-3 rounded-full bg-fg pl-7 pr-2 text-sm font-medium text-ink shadow-[0_10px_50px_-12px_rgba(255,255,255,0.5)]"
            >
              {t.cases.ctaButton}
              <span className="grid size-10 place-items-center rounded-full bg-ink text-fg transition-transform duration-500 ease-out-expo group-hover:rotate-[-45deg]">
                <ArrowRight className="size-4" />
              </span>
            </Link>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}
