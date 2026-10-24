import { Layers, PanelsTopLeft, Plug, ShoppingBag } from "lucide-react";
import type { Content } from "@/i18n/content";
import { SectionHeading } from "../ui/section-heading";
import { Reveal } from "../ui/reveal";
import { GlassCard } from "../ui/glass-card";

const icons = { layers: Layers, cart: ShoppingBag, panel: PanelsTopLeft, plug: Plug };

export function Services({ content }: { content: Content }) {
  const { t, services, process } = content;

  return (
    <section id="services" className="container-page scroll-mt-24 py-24 md:py-32 lg:py-40">
      <SectionHeading index="05" eyebrow={t.services.eyebrow} title={t.services.title} description={t.services.description} />

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {services.map((service, i) => {
          const Icon = icons[service.icon];
          return (
            <Reveal key={service.title} delay={i * 0.08}>
              <GlassCard className="group flex h-full flex-col p-6 md:p-7">
                <span className="glass glass-edge mb-8 grid size-12 place-items-center rounded-2xl transition-transform duration-700 ease-out-expo group-hover:-rotate-6 group-hover:scale-110 md:mb-12">
                  <Icon className="size-5" strokeWidth={1.5} />
                </span>
                <h3 className="text-xl font-semibold tracking-[-0.03em]">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{service.description}</p>
              </GlassCard>
            </Reveal>
          );
        })}
      </div>

      <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 md:mt-20 lg:grid-cols-4">
        {process.map((p, i) => (
          <Reveal key={p.step} delay={i * 0.08} blur={false} className="h-full">
            <div className="group relative h-full bg-ink p-6 transition-colors duration-500 hover:bg-ink-2 md:p-7">
              <p className="font-mono text-xs text-subtle">{p.step}</p>
              <p className="mt-6 text-lg font-semibold tracking-[-0.02em] md:mt-8">{p.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.text}</p>
              <span className="absolute inset-x-7 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-white to-transparent transition-transform duration-700 ease-out-expo group-hover:scale-x-100" />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
