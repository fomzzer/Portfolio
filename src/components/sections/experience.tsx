"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { useI18n } from "@/i18n/provider";
import { SectionHeading } from "../ui/section-heading";
import { Reveal } from "../ui/reveal";

export function Experience() {
  const { t, experience } = useI18n();
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.6"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section id="experience" className="container-page scroll-mt-24 py-24 md:py-32 lg:py-40">
      <SectionHeading index="04" eyebrow={t.experience.eyebrow} title={t.experience.title} description={t.experience.description} />

      <ol ref={ref} className="relative ml-1 lg:ml-0">
        <div className="absolute bottom-0 left-0 top-0 w-px bg-line lg:left-[calc(25%-0.5px)]" />
        <motion.div
          style={{ scaleY }}
          className="absolute bottom-0 left-0 top-0 w-px origin-top bg-gradient-to-b from-white via-white/60 to-transparent lg:left-[calc(25%-0.5px)]"
        />
        {experience.map((item, i) => (
          <li key={`${item.from}-${i}`} className="relative grid gap-3 pb-14 pl-7 last:pb-0 md:pb-16 md:pl-10 lg:grid-cols-4 lg:gap-12 lg:pl-0">
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
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
