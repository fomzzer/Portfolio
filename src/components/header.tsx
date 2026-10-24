"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Command, Menu, X } from "lucide-react";
import { useLenis } from "lenis/react";
import type { SectionId } from "@/content/navigation";
import { profile } from "@/content/profile";
import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/utils";
import { AnchorLink } from "./anchor-link";
import { useCommandMenu } from "./command-menu";
import { LanguageSwitcher } from "./language-switcher";
import { BrandIcon } from "./ui/brand-icon";

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

export function Header() {
  const { locale, t, sections, profile: p } = useI18n();
  const pathname = usePathname();
  const [ids] = useState(() => sections.map((s) => s.id));
  const active = useActiveSection(ids, pathname === `/${locale}`);
  const { toggle } = useCommandMenu();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const lenis = useLenis();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  useEffect(() => {
    if (menuOpen) lenis?.stop();
    else lenis?.start();
  }, [menuOpen, lenis]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const close = () => media.matches && setMenuOpen(false);
    media.addEventListener("change", close);
    return () => media.removeEventListener("change", close);
  }, []);

  const highlight = hovered ?? active;

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-4 sm:pt-4"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className={cn(
            "flex w-full max-w-6xl items-center justify-between gap-3 rounded-full p-1.5 transition-all duration-700 ease-out-expo sm:p-2",
            scrolled || menuOpen ? "glass-strong glass-edge" : "bg-transparent",
          )}
        >
          <AnchorLink to="top" onClick={() => setMenuOpen(false)} className="group flex shrink-0 items-center gap-3 rounded-full pr-2" aria-label={t.nav.home}>
            <span className="glass glass-edge grid size-9 place-items-center rounded-full font-mono text-sm font-semibold">
              {p.firstName[0]}
            </span>
            <span className="hidden text-sm font-medium tracking-tight text-fg sm:block lg:hidden xl:block">{profile.handle}</span>
          </AnchorLink>

          <nav className="hidden lg:block" onPointerLeave={() => setHovered(null)}>
            <ul className="flex items-center">
              {sections.map((s) => (
                <li key={s.id}>
                  <AnchorLink
                    to={s.id}
                    onPointerEnter={() => setHovered(s.id)}
                    className={cn(
                      "relative block whitespace-nowrap rounded-full px-3 py-2 text-sm transition-colors duration-300 xl:px-4",
                      active === s.id ? "text-fg" : "text-muted hover:text-fg",
                    )}
                  >
                    {highlight === s.id && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{s.label}</span>
                  </AnchorLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitcher className="hidden sm:flex" />
            <button
              onClick={toggle}
              className="glass glass-edge hidden h-9 items-center gap-1.5 rounded-full px-3 text-xs text-muted transition-colors hover:text-fg xl:flex"
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
              className="glass glass-edge grid size-9 place-items-center rounded-full lg:hidden"
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
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            data-lenis-prevent
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-ink/85 px-6 pb-8 pt-24 backdrop-blur-2xl sm:px-10 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="flex flex-1 flex-col justify-center gap-1 py-6">
              {sections.map((s, i) => (
                <motion.li
                  key={s.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.6, delay: 0.05 * i, ease: [0.16, 1, 0.3, 1] }}
                >
                  <AnchorLink
                    to={s.id}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "flex items-baseline gap-4 py-1.5 text-[clamp(2.25rem,10vw,4rem)] font-semibold leading-tight tracking-[-0.04em] transition-colors",
                      active === s.id ? "text-fg" : "text-fg/60 hover:text-fg",
                    )}
                  >
                    <span className="font-mono text-xs text-subtle">0{i + 1}</span>
                    {s.label}
                  </AnchorLink>
                </motion.li>
              ))}
            </ul>
            <motion.div
              className="flex flex-col gap-6 border-t border-line pt-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
