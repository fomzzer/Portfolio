import type { Content } from "@/i18n/content";
import { SectionHeading } from "../ui/section-heading";
import { Reveal } from "../ui/reveal";
import { FaqItem } from "./faq-item";

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
            <FaqItem index={i} question={item.q} answer={item.a} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
