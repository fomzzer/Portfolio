import { Download, MapPin } from "lucide-react";
import type { Content } from "@/i18n/content";
import { Reveal } from "../ui/reveal";
import { ScrollText } from "../ui/scroll-text";
import { GlassCard } from "../ui/glass-card";
import { Counter } from "../ui/counter";
import { BrandWordmark } from "../brand";

export function About({ content }: { content: Content }) {
  const { t, fullName, profile } = content;

  return (
    <section id="about" className="container-page scroll-mt-24 py-24 md:py-32 lg:py-40">
      <Reveal>
        <div className="mb-10 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-subtle md:mb-12">
          <span className="text-muted">02</span>
          <span className="h-px w-8 bg-line-strong" />
          <span>{t.about.eyebrow}</span>
        </div>
      </Reveal>

      <ScrollText
        text={t.about.statement}
        className="max-w-5xl text-[1.75rem] font-medium leading-[1.15] tracking-[-0.035em] text-fg sm:text-4xl md:text-5xl lg:text-6xl"
      />

      <div className="mt-16 grid gap-6 md:mt-24 lg:mt-28 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <GlassCard strong className="relative flex aspect-[4/3] flex-col justify-end overflow-hidden p-6 sm:aspect-[2/1] lg:aspect-[4/5]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.14),transparent_55%)]" />
            <div className="absolute left-1/2 top-[40%] flex size-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] font-mono text-5xl font-bold tracking-[-0.06em] text-white/85 shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_0_80px_rgba(255,255,255,0.08)] sm:size-36 sm:text-6xl lg:top-[32%] lg:size-40 lg:text-7xl">
              <span>
                f<span className="text-subtle">.</span>
              </span>
            </div>
            <div className="noise absolute inset-0 opacity-[0.05]" />
            <div className="relative">
              <BrandWordmark className="text-2xl" />
              <p className="mt-1 text-sm text-muted">{fullName}</p>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-subtle">
                <MapPin className="size-3.5" />
                {profile.location}
              </p>
            </div>
          </GlassCard>
        </Reveal>

        <div className="flex flex-col gap-6 lg:col-span-7">
          <Reveal delay={0.1}>
            <GlassCard className="p-6 sm:p-8 md:p-10">
              <div className="space-y-5 text-base leading-relaxed text-muted md:text-lg">
                {profile.bio.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              {profile.resume && (
                <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="group mt-8 inline-flex items-center gap-3 text-sm font-medium text-fg">
                  <span className="grid size-10 place-items-center rounded-full border border-line-strong transition-all duration-500 ease-out-expo group-hover:bg-fg group-hover:text-ink">
                    <Download className="size-4" />
                  </span>
                  {t.about.downloadCv}
                </a>
              )}
            </GlassCard>
          </Reveal>

          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {profile.stats.map((stat, i) => (
              <Reveal key={stat.label} delay={0.15 + i * 0.07}>
                <GlassCard className="h-full p-5 sm:p-6 md:p-8">
                  <Counter value={stat.value} className="text-gradient block text-3xl font-semibold tabular-nums tracking-[-0.05em] sm:text-4xl md:text-5xl" />
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-subtle sm:text-[11px]">{stat.label}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
