import { Check, CreditCard, Headphones, Search, Settings2, Smartphone, Truck } from "lucide-react";
import type { Content } from "@/i18n/content";
import { cn } from "@/lib/utils";
import { AnchorLink } from "../anchor-link";
import { GlassCard } from "../ui/glass-card";
import { Reveal } from "../ui/reveal";
import { SectionHeading } from "../ui/section-heading";

type SectionProps = { content: Content; index: string; id: string };

const sectionClass = "container-page scroll-mt-24 py-24 md:py-32";
const benefitIcons = [Search, Smartphone, CreditCard, Truck, Settings2, Headphones];

export function BusinessServices({ content, index, id }: SectionProps) {
  const { benefits, process } = content.t.business;
  return (
    <section id={id} className={sectionClass}>
      <SectionHeading index={index} eyebrow={benefits.eyebrow} title={benefits.title} description={benefits.description} />
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {benefits.items.map((item, i) => {
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

      <Reveal className="mb-6 mt-16 md:mt-20">
        <h3 className="text-2xl font-semibold tracking-[-0.03em] md:text-3xl">{process.title}</h3>
      </Reveal>
      <div className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {process.items.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.08} className="h-full">
            <div className="h-full bg-ink p-6 md:p-7">
              <p className="font-mono text-xs text-subtle">{String(i + 1).padStart(2, "0")}</p>
              <h4 className="mt-6 text-lg font-semibold tracking-[-0.02em] md:mt-8">{item.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function BusinessPackages({ content, index, id }: SectionProps) {
  const { packages } = content.t.business;
  return (
    <section id={id} className={sectionClass}>
      <SectionHeading index={index} eyebrow={packages.eyebrow} title={packages.title} description={packages.description} />
      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {packages.items.map((item, i) => {
          const featured = i === packages.items.length - 1;
          return (
            <Reveal key={item.name} delay={i * 0.08} className="h-full">
              <GlassCard strong={featured} className={cn("flex h-full flex-col p-6 md:p-8", featured && "ring-1 ring-white/25")}>
                <h3 className="text-xl font-semibold tracking-[-0.03em]">{item.name}</h3>
                <p className="mt-2 min-h-10 text-sm leading-relaxed text-muted">{item.text}</p>
                <p className="mt-6 whitespace-nowrap text-[clamp(1.6rem,7.4vw,2.25rem)] font-semibold tracking-[-0.05em] lg:text-[clamp(1.6rem,2.45vw,2.25rem)]">{item.price}</p>
                <p className="mt-2 font-mono text-xs text-subtle">
                  {packages.timeLabel}: {item.time}
                </p>
                <ul className="mt-6 flex-1 space-y-3 border-t border-line pt-6">
                  {item.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-muted">
                      <Check className="mt-0.5 size-4 shrink-0 text-fg" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <AnchorLink
                  to="contact"
                  className={cn(
                    "mt-8 flex h-12 w-full items-center justify-center rounded-full px-6 text-sm font-medium transition-colors",
                    featured ? "bg-fg text-ink" : "glass glass-edge text-fg hover:bg-white/[0.08]",
                  )}
                >
                  {packages.cta}
                </AnchorLink>
              </GlassCard>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
