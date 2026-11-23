import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, CreditCard, Headphones, Search, Settings2, Smartphone, Truck } from "lucide-react";
import { isLocale, localeMeta } from "@/i18n/config";
import { getContent } from "@/i18n/content";
import { breadcrumbs, businessId, localeAlternates } from "@/lib/seo";
import { cn, siteUrl } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";
import { Enter } from "@/components/ui/enter";
import { GlassCard } from "@/components/ui/glass-card";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SplitText } from "@/components/ui/split-text";

type Props = { params: Promise<{ locale: string }> };

const benefitIcons = [Search, Smartphone, CreditCard, Truck, Settings2, Headphones];

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

      <section className="container-page py-16 md:py-24">
        <SectionHeading index="01" eyebrow={b.problems.eyebrow} title={b.problems.title} description={b.problems.description} />
        <div className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2">
          {b.problems.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06} className="h-full">
              <div className="h-full bg-ink p-6 md:p-8">
                <p className="font-mono text-xs text-subtle">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-6 text-xl font-semibold tracking-[-0.03em]">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-page py-16 md:py-24">
        <SectionHeading index="02" eyebrow={b.benefits.eyebrow} title={b.benefits.title} description={b.benefits.description} />
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {b.benefits.items.map((item, i) => {
            const Icon = benefitIcons[i];
            return (
              <Reveal key={item.title} delay={i * 0.06} className="h-full">
                <GlassCard className="group flex h-full flex-col p-6 md:p-7">
                  <span className="glass glass-edge mb-8 grid size-12 place-items-center rounded-2xl transition-transform duration-700 ease-out-expo group-hover:-rotate-6 group-hover:scale-110">
                    <Icon className="size-5" strokeWidth={1.5} />
                  </span>
                  <h3 className="text-xl font-semibold tracking-[-0.03em]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{item.text}</p>
                </GlassCard>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="container-page py-16 md:py-24">
        <SectionHeading index="03" eyebrow={b.packages.eyebrow} title={b.packages.title} description={b.packages.description} />
        <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
          {b.packages.items.map((item, i) => (
            <Reveal key={item.name} delay={i * 0.08} className="h-full">
              <GlassCard strong={i === 2} className={cn("flex h-full flex-col p-6 md:p-8", i === 2 && "ring-1 ring-white/25")}>
                <h3 className="text-xl font-semibold tracking-[-0.03em]">{item.name}</h3>
                <p className="mt-2 min-h-10 text-sm leading-relaxed text-muted">{item.text}</p>
                <p className="mt-6 text-4xl font-semibold tracking-[-0.05em]">{item.price}</p>
                <p className="mt-2 font-mono text-xs text-subtle">
                  {b.packages.timeLabel}: {item.time}
                </p>
                <ul className="mt-6 flex-1 space-y-3 border-t border-line pt-6">
                  {item.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-muted">
                      <Check className="mt-0.5 size-4 shrink-0 text-fg" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <ButtonLink href={contactHref} scroll={false} variant={i === 2 ? "primary" : "glass"} className="mt-8 w-full">
                  {b.packages.cta}
                </ButtonLink>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

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

      <section className="container-page py-16 md:py-24">
        <SectionHeading index="05" eyebrow={b.process.eyebrow} title={b.process.title} description={b.process.description} />
        <div className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {b.process.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08} className="h-full">
              <div className="h-full bg-ink p-6 md:p-7">
                <p className="font-mono text-xs text-subtle">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-6 text-lg font-semibold tracking-[-0.02em] md:mt-8">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

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
