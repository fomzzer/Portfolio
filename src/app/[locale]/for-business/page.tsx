import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { isLocale, localeMeta } from "@/i18n/config";
import { getContent } from "@/i18n/content";
import { breadcrumbs, businessId, localeAlternates } from "@/lib/seo";
import { siteUrl } from "@/lib/utils";
import { BusinessBenefits, BusinessPackages, BusinessProblems, BusinessProcess } from "@/components/sections/business";
import { ButtonLink } from "@/components/ui/button";
import { Enter } from "@/components/ui/enter";
import { GlassCard } from "@/components/ui/glass-card";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SplitText } from "@/components/ui/split-text";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { t } = getContent(locale);
  return {
    title: t.business.seoTitle,
    description: t.business.seoDescription,
    alternates: localeAlternates(locale, "/for-business"),
    openGraph: { type: "website", siteName: "fomzzer.dev", title: t.business.seoTitle, description: t.business.seoDescription, url: `${siteUrl}/${locale}/for-business`, locale: localeMeta[locale].ogLocale },
  };
}

export default async function ForBusinessPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const content = getContent(locale);
  const { t } = content;
  const b = t.business;
  const project = content.projects[0];
  const contactHref = `/${locale}#contact`;
  const caseHref = `/${locale}/projects/${project.slug}`;
  const jsonLd = [
    breadcrumbs([
      { name: t.nav.home, path: `/${locale}` },
      { name: t.nav.business, path: `/${locale}/for-business` },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: b.seoTitle,
      description: b.seoDescription,
      url: `${siteUrl}/${locale}/for-business`,
      inLanguage: localeMeta[locale].htmlLang,
      provider: { "@id": businessId },
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="container-page pb-16 pt-32 md:pb-24 md:pt-40">
        <Enter>
          <div className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-subtle">
            <span className="h-px w-8 bg-line-strong" />
            <span>{b.eyebrow}</span>
          </div>
        </Enter>
        <h1 className="max-w-5xl text-[clamp(2.5rem,7vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-balance">
          <SplitText text={b.title} immediate delay={0.1} />
        </h1>
        <Enter delay={0.2}>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">{b.description}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={contactHref} scroll={false}>
              {b.primary}
              <ArrowRight className="size-4" />
            </ButtonLink>
            <ButtonLink href="#example" variant="glass">
              {b.secondary}
            </ButtonLink>
          </div>
        </Enter>
      </section>

      <BusinessProblems content={content} index="01" />
      <BusinessBenefits content={content} index="02" />
      <BusinessPackages content={content} index="03" />

      <section id="example" className="container-page scroll-mt-24 py-16 md:py-24">
        <SectionHeading index="04" eyebrow={b.example.eyebrow} title={b.example.title} description={b.example.description} />
        <Reveal>
          <GlassCard className="grid overflow-hidden lg:grid-cols-12">
            {project.cover && (
              <div className="relative aspect-[16/10] lg:col-span-7 lg:aspect-auto lg:min-h-[420px]">
                <Image src={project.cover.src} alt={project.title} fill sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover object-top" />
              </div>
            )}
            <div className="flex flex-col justify-between gap-8 p-6 md:p-10 lg:col-span-5">
              <ol className="space-y-5">
                {b.example.steps.map((step, i) => (
                  <li key={step} className="flex items-start gap-4">
                    <span className="glass glass-edge grid size-8 shrink-0 place-items-center rounded-full font-mono text-xs">{i + 1}</span>
                    <span className="pt-1 text-base">{step}</span>
                  </li>
                ))}
              </ol>
              <ButtonLink href={caseHref} variant="glass" className="w-full sm:w-fit">
                {b.example.open}
                <ArrowRight className="size-4" />
              </ButtonLink>
            </div>
          </GlassCard>
        </Reveal>
      </section>

      <BusinessProcess content={content} index="05" />

      <section className="container-page pt-8 md:pt-12">
        <Reveal>
          <GlassCard strong className="flex flex-col items-start justify-between gap-6 p-7 sm:p-10 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-semibold tracking-[-0.04em] md:text-4xl">{b.cta.title}</h2>
              <p className="mt-3 max-w-lg text-muted">{b.cta.text}</p>
            </div>
            <Link
              href={contactHref}
              scroll={false}
              className="group inline-flex h-14 shrink-0 items-center gap-3 rounded-full bg-fg pl-7 pr-2 text-sm font-medium text-ink shadow-[0_10px_50px_-12px_rgba(255,255,255,0.5)]"
            >
              {b.cta.button}
              <span className="grid size-10 place-items-center rounded-full bg-ink text-fg transition-transform duration-500 ease-out-expo group-hover:rotate-[-45deg]">
                <ArrowRight className="size-4" />
              </span>
            </Link>
          </GlassCard>
        </Reveal>
      </section>
    </>
  );
}
