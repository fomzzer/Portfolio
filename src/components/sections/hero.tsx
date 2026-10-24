"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { profile } from "@/content/profile";
import { useI18n } from "@/i18n/provider";
import { SplitText } from "../ui/split-text";
import { Magnetic } from "../ui/magnetic";
import { AnchorLink } from "../anchor-link";
import { CodeOrb } from "../effects/code-orb";
import { LocalTime } from "../local-time";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const { t, profile: p } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const orbY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const orbScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  return (
    <section ref={ref} id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden pt-24 sm:pt-28">
      <motion.div
        style={{ y: orbY, scale: orbScale }}
        className="pointer-events-none absolute right-[-26%] top-[25vw] w-[90vw] max-w-[720px] sm:right-[-18%] sm:top-[-7vw] sm:w-[78vw] lg:right-[-4%] lg:top-[10%] lg:w-[56vw]"
      >
        <CodeOrb className="w-full opacity-60 sm:opacity-80 lg:opacity-100" />
      </motion.div>

      <motion.div style={{ y, opacity }} className="container-page relative z-10 flex flex-1 flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease }}
          className="glass glass-edge mb-6 inline-flex w-fit max-w-full items-center gap-3 rounded-full py-1.5 pl-2 pr-4 text-xs text-muted sm:mb-8"
        >
          <span className="flex shrink-0 items-center gap-2.5 rounded-full bg-white/[0.06] py-1 pl-3 pr-3 font-medium text-fg">
            <span className="size-1.5 rounded-full bg-emerald-300 animate-pulse-dot" />
            {profile.available ? t.hero.available : t.hero.busy}
          </span>
          <span className="truncate">{p.availability}</span>
        </motion.div>

        <h1 className="max-w-5xl text-[clamp(2.9rem,12.5vw,9.5rem)] font-semibold leading-[0.9] tracking-[-0.065em] sm:text-[clamp(3.2rem,11vw,9.5rem)]">
          <span className="block text-fg">
            <SplitText text={t.hero.titleTop} immediate delay={0.4} stagger={0.08} />
          </span>
          <span className="block">
            <SplitText text={t.hero.titleBottom} immediate delay={0.55} wordClassName="text-gradient" />
          </span>
        </h1>

        <div className="mt-8 grid gap-8 sm:mt-10 lg:mt-14 lg:grid-cols-12 lg:items-end">
          <motion.p
            className="max-w-md text-base leading-relaxed text-muted sm:text-lg lg:col-span-5 lg:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease }}
          >
            {p.headline}
          </motion.p>

          <motion.div
            className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center lg:col-span-7 lg:justify-end"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.05, ease }}
          >
            <Magnetic className="block sm:inline-block">
              <AnchorLink
                to="work"
                className="group relative flex h-14 w-full items-center justify-between gap-3 overflow-hidden rounded-full bg-fg pl-7 pr-2 text-sm font-medium text-ink shadow-[0_10px_50px_-12px_rgba(255,255,255,0.5)] sm:inline-flex sm:w-auto"
              >
                {t.hero.viewWork}
                <span className="grid size-10 place-items-center rounded-full bg-ink text-fg transition-transform duration-500 ease-out-expo group-hover:rotate-[-45deg]">
                  <ArrowRight className="size-4" />
                </span>
              </AnchorLink>
            </Magnetic>
            <Magnetic className="block sm:inline-block">
              <AnchorLink
                to="contact"
                className="glass glass-edge flex h-14 w-full items-center justify-center rounded-full px-7 text-sm font-medium text-fg transition-colors hover:bg-white/[0.08] sm:inline-flex sm:w-auto"
              >
                {t.hero.getInTouch}
              </AnchorLink>
            </Magnetic>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="container-page relative z-10 flex items-center justify-between py-6 font-mono text-[11px] uppercase tracking-[0.2em] text-subtle sm:py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.3 }}
      >
        <span className="hidden sm:block">{p.location}</span>
        <AnchorLink to="work" className="mx-auto flex items-center gap-3 transition-colors hover:text-fg sm:mx-0">
          <span className="relative grid h-9 w-6 place-items-start justify-center rounded-full border border-line-strong pt-1.5">
            <motion.span
              className="block size-1 rounded-full bg-fg"
              animate={{ y: [0, 14, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
          {t.hero.scroll}
          <ArrowDown className="size-3" />
        </AnchorLink>
        <LocalTime timeZone={profile.timezone} className="hidden tabular-nums sm:block" />
      </motion.div>
    </section>
  );
}
