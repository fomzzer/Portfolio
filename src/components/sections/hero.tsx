"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type CSSProperties } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { profile } from "@/content/profile";
import { useI18n } from "@/i18n/provider";
import { SplitText } from "../ui/split-text";
import { Magnetic } from "../ui/magnetic";
import { AnchorLink } from "../anchor-link";
import { CodeOrb } from "../effects/code-orb";
import { PauseOffscreen } from "../ui/pause-offscreen";
import { useScrollTimeline } from "../effects/use-scroll-timeline";
import { LocalTime } from "../local-time";

export function Hero() {
  const { t, profile: p } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const orbY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const orbScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const native = useScrollTimeline();

  return (
    <section ref={ref} id="top" className="hero-timeline relative flex min-h-[100svh] flex-col overflow-hidden pt-24 sm:pt-28">
      <motion.div
        style={native ? undefined : { y: orbY, scale: orbScale }}
        className="hero-orb pointer-events-none absolute right-[-18%] top-[-7vw] w-[78vw] max-w-[720px] max-sm:hidden lg:right-[-4%] lg:top-[10%] lg:w-[56vw]"
      >
        <PauseOffscreen>
          <CodeOrb className="w-full opacity-80 lg:opacity-100" />
        </PauseOffscreen>
      </motion.div>

      <motion.div style={native ? undefined : { y, opacity }} className="hero-content container-page relative z-10 flex flex-1 flex-col justify-center">
        <div
          style={{ "--enter-y": "16px", animationDelay: "0.3s" } as CSSProperties}
          className="animate-enter glass glass-edge mb-6 inline-flex w-fit max-w-full items-center gap-3 rounded-full py-1.5 pl-2 pr-4 text-xs text-muted sm:mb-8"
        >
          <span className="flex shrink-0 items-center gap-2.5 rounded-full bg-white/[0.06] py-1 pl-3 pr-3 font-medium text-fg">
            <span className="size-1.5 rounded-full bg-emerald-300 animate-pulse-dot" />
            {profile.available ? t.hero.available : t.hero.busy}
          </span>
          <span className="truncate">{p.availability}</span>
        </div>

        <div className="relative">
          <PauseOffscreen className="pointer-events-none absolute -z-10 right-[-24vw] top-[0.4em] w-[84vw] -translate-y-1/2 text-[clamp(2.9rem,12.5vw,9.5rem)] sm:hidden">
            <CodeOrb className="w-full opacity-60" />
          </PauseOffscreen>
          <h1 className="relative max-w-5xl text-[clamp(2.9rem,12.5vw,9.5rem)] font-semibold leading-[0.9] tracking-[-0.065em] sm:text-[clamp(3.2rem,11vw,9.5rem)]">
            <span className="block text-fg">
              <SplitText text={t.hero.titleTop} immediate delay={0.4} stagger={0.08} />
            </span>
            <span className="block">
              <SplitText text={t.hero.titleBottom} immediate delay={0.55} wordClassName="text-gradient" />
            </span>
          </h1>
        </div>

        <div className="mt-8 grid gap-8 sm:mt-10 lg:mt-14 lg:grid-cols-12 lg:items-end">
          <p className="animate-enter max-w-md text-base leading-relaxed text-muted sm:text-lg lg:col-span-5 lg:text-xl" style={{ animationDelay: "0.9s" }}>
            {p.headline}
          </p>

          <div className="animate-enter flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center lg:col-span-7 lg:justify-end" style={{ animationDelay: "1.05s" }}>
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
          </div>
        </div>
      </motion.div>

      <div
        className="animate-enter-fade container-page relative z-10 flex items-center justify-between py-6 font-mono text-[11px] uppercase tracking-[0.2em] text-subtle sm:py-8"
        style={{ animationDelay: "1.3s" }}
      >
        <span className="hidden sm:block">{p.location}</span>
        <AnchorLink to="work" className="mx-auto flex items-center gap-3 transition-colors hover:text-fg sm:mx-0">
          <span className="relative grid h-9 w-6 place-items-start justify-center rounded-full border border-line-strong pt-1.5">
            <span className="animate-scroll-cue block size-1 rounded-full bg-fg" />
          </span>
          {t.hero.scroll}
          <ArrowDown className="size-3" />
        </AnchorLink>
        <LocalTime timeZone={profile.timezone} className="hidden tabular-nums sm:block" />
      </div>
    </section>
  );
}
