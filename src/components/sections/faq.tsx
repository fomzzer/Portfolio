import { Plus } from "lucide-react";
import type { Content } from "@/i18n/content";
import { SectionHeading } from "../ui/section-heading";
import { Reveal } from "../ui/reveal";

export function Faq({ content }: { content: Content }) {
  const { t } = content;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: content.locale,
    mainEntity: t.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <section id="faq" className="container-page scroll-mt-24 py-24 md:py-32 lg:py-40">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SectionHeading index="06" eyebrow={t.faq.eyebrow} title={t.faq.title} description={t.faq.description} />

      <div className="divide-y divide-line overflow-hidden rounded-3xl border border-line">
        {t.faq.items.map((item, i) => (
          <Reveal key={item.q} delay={i * 0.05}>
            <details className="faq-item group bg-ink transition-colors duration-500 hover:bg-ink-2">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 p-5 sm:p-6 md:p-7 [&::-webkit-details-marker]:hidden">
                <span className="flex min-w-0 items-baseline gap-4 md:gap-6">
                  <span className="shrink-0 font-mono text-xs text-subtle">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="text-base font-semibold tracking-[-0.02em] text-fg sm:text-lg md:text-xl">{item.q}</h3>
                </span>
                <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line-strong text-muted transition-[transform,background-color,color] duration-500 ease-out-expo group-open:rotate-45 group-open:bg-fg group-open:text-ink">
                  <Plus className="size-4" />
                </span>
              </summary>
              <div className="px-5 pb-6 pl-[3.25rem] sm:px-6 sm:pl-[3.5rem] md:px-7 md:pb-7 md:pl-[4.25rem]">
                <p className="max-w-3xl text-sm leading-relaxed text-muted sm:text-base">{item.a}</p>
              </div>
            </details>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
