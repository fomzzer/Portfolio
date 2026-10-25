"use client";

import Link from "next/link";
import { motion, useScroll, useSpring } from "motion/react";
import { useRef, type RefObject } from "react";
import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/i18n/provider";
import { SectionHeading } from "../ui/section-heading";
import { Reveal } from "../ui/reveal";
import { useScrollTimeline } from "../effects/use-scroll-timeline";

const fillClass = "timeline-fill absolute bottom-0 left-0 top-0 w-px origin-top bg-gradient-to-b from-white via-white/60 to-transparent lg:left-[calc(25%-0.5px)]";

function MotionFill({ target }: { target: RefObject<HTMLDivElement | null> }) {
  const { scrollYProgress } = useScroll({ target, offset: ["start 0.7", "end 0.6"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return <motion.div aria-hidden style={{ scaleY }} className={fillClass} />;
}

export function Experience() {
  const { t, locale, experience } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const native = useScrollTimeline();

  return (
    <section id="experience" className="container-page scroll-mt-24 py-24 md:py-32 lg:py-40">
      <SectionHeading index="04" eyebrow={t.experience.eyebrow} title={t.experience.title} description={t.experience.description} />

      <div ref={ref} className="timeline-track relative ml-1 lg:ml-0">
        <div aria-hidden className="absolute bottom-0 left-0 top-0 w-px bg-line lg:left-[calc(25%-0.5px)]" />
        {native ? <div aria-hidden className={fillClass} /> : <MotionFill target={ref} />}
        <ol className="relative">
          {experience.map((item, i) => (
            <li key={i} className="relative grid gap-3 pb-14 pl-7 last:pb-0 md:pb-16 md:pl-10 lg:grid-cols-4 lg:gap-12 lg:pl-0">
              <span className="absolute left-0 top-1.5 size-2.5 -translate-x-1/2 rounded-full border border-white/50 bg-ink shadow-[0_0_20px_rgba(255,255,255,0.4)] lg:left-1/4 lg:top-2" />
              <Reveal delay={i * 0.05} className="lg:pr-12 lg:text-right">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-subtle">{item.period}</p>
              </Reveal>
              <Reveal delay={i * 0.05 + 0.08} className="lg:col-span-3 lg:pl-4">
                <h3 className="text-xl font-semibold tracking-[-0.03em] sm:text-2xl md:text-3xl">
                  {item.title}
                  <span className="text-subtle"> · {item.company}</span>
                </h3>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted md:mt-4">{item.description}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <li key={tag} className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-subtle">
                      {tag}
                    </li>
                  ))}
                </ul>

                {item.project && (
                  <Link
                    href={`/${locale}/projects/${item.project.slug}`}
                    className="glass glass-edge group relative mt-8 block max-w-2xl rounded-2xl p-5 transition-colors hover:bg-white/[0.05] sm:p-6"
                  >
                    <span className="absolute -left-7 top-8 h-px w-7 bg-line-strong md:-left-10 md:w-10 lg:-left-4 lg:w-4" />
                    <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">
                      <span>{item.project.year}</span>
                      <span className="ml-auto inline-flex items-center gap-1.5 normal-case tracking-normal text-muted transition-colors group-hover:text-fg">
                        {item.project.open}
                        <ArrowUpRight className="size-3.5 transition-transform duration-500 ease-out-expo group-hover:rotate-45" />
                      </span>
                    </div>
                    <p className="mt-3 text-lg font-semibold tracking-[-0.02em] text-fg md:text-xl">{item.project.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{item.project.description}</p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {item.project.tags.map((tag) => (
                        <li key={tag} className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-subtle">
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </Link>
                )}
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
