"use client";

import { ArrowUp, ArrowUpRight } from "lucide-react";
import { profile } from "@/content/profile";
import { useI18n } from "@/i18n/provider";
import { AnchorLink } from "./anchor-link";
import { LocalTime } from "./local-time";
import { LanguageSwitcher } from "./language-switcher";
import { BrandIcon } from "./ui/brand-icon";

export function Footer() {
  const { t, fullName, sections, profile: p } = useI18n();

  return (
    <footer className="relative mt-24 overflow-hidden border-t border-line md:mt-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <div className="container-page grid gap-12 py-16 sm:grid-cols-2 md:grid-cols-12">
        <div className="sm:col-span-2 md:col-span-5">
          <p className="text-2xl font-semibold tracking-[-0.03em] text-fg">{fullName}</p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">
            {p.role}. {t.footer.tagline}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-2 font-mono text-xs text-subtle">
            <span className="size-1.5 rounded-full bg-emerald-300 animate-pulse-dot" />
            <span>{p.location}</span>
            <span className="text-dim">·</span>
            <LocalTime timeZone={profile.timezone} className="tabular-nums text-muted" />
          </div>
          <LanguageSwitcher className="mt-8 w-fit" />
        </div>

        <div className="md:col-span-3">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">{t.footer.sitemap}</p>
          <ul className="space-y-2.5">
            {sections.map((s) => (
              <li key={s.id}>
                <AnchorLink to={s.id} className="text-sm text-muted transition-colors hover:text-fg">
                  {s.label}
                </AnchorLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">{t.footer.elsewhere}</p>
          <ul className="space-y-2.5">
            {profile.socials.map((s) => (
              <li key={s.name}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 text-sm text-muted transition-colors hover:text-fg"
                >
                  <BrandIcon name={s.icon} className="size-4" />
                  {s.name}
                  <ArrowUpRight className="size-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container-page relative">
        <p
          aria-hidden
          className="text-gradient pointer-events-none select-none truncate text-center text-[17vw] font-semibold leading-[0.85] tracking-[-0.07em] opacity-[0.14] md:text-[14vw]"
        >
          {p.firstName}
        </p>
      </div>

      <div className="container-page flex flex-col items-center justify-between gap-4 border-t border-line py-6 text-center font-mono text-[11px] uppercase tracking-[0.15em] text-subtle sm:flex-row sm:text-left">
        <span suppressHydrationWarning>
          © {new Date().getFullYear()} {fullName}
        </span>
        <span>Next.js · Tailwind · Vercel</span>
        <AnchorLink to="top" className="group inline-flex items-center gap-2 transition-colors hover:text-fg">
          {t.footer.backToTop}
          <ArrowUp className="size-3.5 transition-transform group-hover:-translate-y-0.5" />
        </AnchorLink>
      </div>
    </footer>
  );
}
