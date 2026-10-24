import { Database, Layout, Server, Cloud } from "lucide-react";
import type { Content } from "@/i18n/content";
import { SectionHeading } from "../ui/section-heading";
import { Reveal } from "../ui/reveal";
import { GlassCard } from "../ui/glass-card";
import { Terminal } from "../terminal";

const icons = [Layout, Server, Database, Cloud];

export function Stack({ content }: { content: Content }) {
  const { t, stackGroups } = content;

  return (
    <section id="stack" className="container-page scroll-mt-24 py-24 md:py-32 lg:py-40">
      <SectionHeading index="03" eyebrow={t.stack.eyebrow} title={t.stack.title} description={t.stack.description} />

      <div className="grid gap-4 sm:gap-6 md:grid-cols-6">
        {stackGroups.map((group, i) => {
          const Icon = icons[i];
          return (
            <Reveal key={group.title} delay={i * 0.08} className={i < 2 ? "md:col-span-3" : "md:col-span-3 lg:col-span-2"}>
              <GlassCard className="flex h-full flex-col p-6 md:p-8">
                <div className="mb-8 flex items-center justify-between md:mb-10">
                  <span className="glass glass-edge grid size-11 place-items-center rounded-2xl">
                    <Icon className="size-5 text-fg" strokeWidth={1.5} />
                  </span>
                  <span className="font-mono text-[11px] text-subtle">0{i + 1}</span>
                </div>
                <h3 className="text-2xl font-semibold tracking-[-0.03em]">{group.title}</h3>
                <p className="mt-2 text-sm text-muted">{group.description}</p>
                <ul className="mt-6 flex flex-wrap gap-2 md:mt-8">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-line bg-white/[0.02] px-3 py-1.5 text-xs text-muted transition-colors duration-300 hover:border-line-strong hover:text-fg"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>
          );
        })}

        <Reveal delay={0.3} className="md:col-span-6 lg:col-span-2">
          <GlassCard className="h-full min-h-[300px] p-2">
            <Terminal />
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}
