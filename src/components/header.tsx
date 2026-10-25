"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type CSSProperties } from "react";
import { ArrowUpRight, Command, Menu, X } from "lucide-react";
import type { SectionId } from "@/content/navigation";
import { profile } from "@/content/profile";
import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/utils";
import { AnchorLink } from "./anchor-link";
import { useCommandMenu } from "./command-menu";
import { lockScroll } from "./effects/smooth-scroll";
import { LanguageSwitcher } from "./language-switcher";
import { BrandIcon } from "./ui/brand-icon";
import { BrandMark, BrandWordmark } from "./brand";

function useActiveSection(ids: readonly SectionId[], enabled: boolean) {
  const [active, setActive] = useState<SectionId | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id as SectionId);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids, enabled]);

  return enabled ? active : null;
}

let introPlayed = false;

const mobileLink = "flex items-baseline gap-4 py-1.5 text-[clamp(2.1rem,9.5vw,4rem)] font-semibold leading-tight tracking-[-0.04em] transition-colors";

export function Header() {
  const { locale, t, sections } = useI18n();
  const pathname = usePathname();
  const [ids] = useState(() => sections.map((s) => s.id));
  const active = useActiveSection(ids, pathname === `/${locale}`);
  const { toggle } = useCommandMenu();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [intro] = useState(() => !introPlayed);

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  useEffect(() => {
    lockScroll(menuOpen);
  }, [menuOpen]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1280px)");
    const close = () => media.matches && setMenuOpen(false);
    media.addEventListener("change", close);
    return () => media.removeEventListener("change", close);
  }, []);

  const casesHref = `/${locale}/projects`;
  const casesActive = pathname.startsWith(casesHref);
  const current = casesActive ? "cases" : active;
  const highlight = hovered ?? current;

  const pill = (
    <motion.span
      layoutId="nav-pill"
      className="absolute inset-0 rounded-full bg-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
      transition={{ type: "spring", stiffness: 380, damping: 32 }}
    />
  );

  const linkClass = (key: string) =>
    cn("relative block whitespace-nowrap rounded-full px-3 py-2 text-sm transition-colors duration-300 2xl:px-4", current === key ? "text-fg" : "text-muted hover:text-fg");

  return (
    <>
      <header
        className={cn("fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-4 sm:pt-4", intro && "animate-enter")}
        style={intro ? ({ "--enter-y": "-40px", animationDelay: "0.2s" } as CSSProperties) : undefined}
        onAnimationEnd={(e) => {
          if (e.target === e.currentTarget) introPlayed = true;
        }}
      >
        <div
          className={cn(
            "flex w-full max-w-7xl items-center justify-between gap-3 rounded-full p-1.5 transition-[background-color,box-shadow] duration-500 ease-out-expo sm:p-2",
            scrolled || menuOpen ? "glass-strong glass-edge" : "bg-transparent",
          )}
        >
          <AnchorLink to="top" onClick={() => setMenuOpen(false)} className="group flex shrink-0 items-center gap-2.5 rounded-full pr-2">
            <BrandMark className="transition-transform duration-500 ease-out-expo group-hover:rotate-[-8deg]" />
            <BrandWordmark className="text-[15px]" />
            <span className="sr-only"> — {t.nav.home}</span>
          </AnchorLink>

          <nav className="hidden xl:block" onPointerLeave={() => setHovered(null)}>
            <ul className="flex items-center">
              {sections.map((s) => (
                <li key={s.id}>
                  <AnchorLink to={s.id} onPointerEnter={() => setHovered(s.id)} className={linkClass(s.id)}>
                    {highlight === s.id && pill}
                    <span className="relative">{s.label}</span>
                  </AnchorLink>
                </li>
              ))}
              <li aria-hidden className="mx-1.5 h-4 w-px bg-line-strong" />
              <li>
                <Link href={casesHref} onPointerEnter={() => setHovered("cases")} className={linkClass("cases")} aria-current={casesActive ? "page" : undefined}>
                  {highlight === "cases" && pill}
                  <span className="relative inline-flex items-center gap-1">
                    {t.nav.cases}
                    <ArrowUpRight className="size-3.5 opacity-60" />
                  </span>
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitcher className="hidden sm:flex" />
            <button
              onClick={toggle}
              className="glass glass-edge hidden h-9 items-center gap-1.5 rounded-full px-3 text-xs text-muted transition-colors hover:text-fg 2xl:flex"
              aria-label={t.nav.openCommand}
            >
              <Command className="size-3.5" />
              <span className="font-mono">K</span>
            </button>
            <AnchorLink
              to="contact"
              className="hidden h-9 items-center whitespace-nowrap rounded-full bg-fg px-4 text-sm font-medium text-ink transition-transform duration-300 hover:scale-[1.03] md:flex"
            >
              {t.nav.letsTalk}
            </AnchorLink>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="glass glass-edge grid size-9 place-items-center rounded-full xl:hidden"
              aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={menuOpen ? "x" : "menu"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            data-lenis-prevent
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto overscroll-contain bg-ink/85 px-6 pb-8 pt-24 backdrop-blur-2xl will-change-[opacity] sm:px-10 xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="flex flex-1 flex-col justify-center gap-1 py-6">
              {sections.map((s, i) => (
                <li key={s.id} className="animate-enter" style={{ "--enter-y": "30px", "--enter-duration": "0.6s", animationDelay: `${0.05 * i}s` } as CSSProperties}>
                  <AnchorLink to={s.id} instant onClick={() => setMenuOpen(false)} className={cn(mobileLink, current === s.id ? "text-fg" : "text-fg/60 hover:text-fg")}>
                    <span className="font-mono text-xs text-subtle">0{i + 1}</span>
                    {s.label}
                  </AnchorLink>
                </li>
              ))}
              <li
                className="animate-enter mt-4 border-t border-line pt-4"
                style={{ "--enter-y": "30px", "--enter-duration": "0.6s", animationDelay: `${0.05 * sections.length}s` } as CSSProperties}
              >
                <Link href={casesHref} onClick={() => setMenuOpen(false)} className={cn(mobileLink, "items-center", casesActive ? "text-fg" : "text-fg/60 hover:text-fg")}>
                  {t.nav.cases}
                  <ArrowUpRight className="size-7 opacity-60 sm:size-9" />
                </Link>
              </li>
            </ul>
            <div
              className="animate-enter flex flex-col gap-6 border-t border-line pt-6"
              style={{ "--enter-y": "10px", "--enter-duration": "0.5s", animationDelay: "0.3s" } as CSSProperties}
            >
              <LanguageSwitcher size="lg" className="w-fit" />
              <div className="flex flex-wrap items-center justify-between gap-4">
                <a href={`mailto:${profile.email}`} className="text-sm text-muted">
                  {profile.email}
                </a>
                <div className="flex gap-4">
                  {profile.socials.map((s) => (
                    <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name} className="text-muted hover:text-fg">
                      <BrandIcon name={s.icon} className="size-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
