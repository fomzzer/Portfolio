"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useId } from "react";
import { localeCookie, localeMeta, locales, type Locale } from "@/i18n/config";
import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/utils";

export function swapLocale(pathname: string, locale: Locale) {
  const parts = pathname.split("/");
  parts[1] = locale;
  return parts.join("/") || `/${locale}`;
}

export function rememberLocale(locale: Locale) {
  document.cookie = `${localeCookie}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

export function LanguageSwitcher({ className, size = "sm" }: { className?: string; size?: "sm" | "lg" }) {
  const { locale, t } = useI18n();
  const pathname = usePathname();
  const id = useId();

  return (
    <div role="group" aria-label={t.nav.language} className={cn("glass glass-edge flex items-center rounded-full p-1", className)}>
      {locales.map((l) => {
        const active = l === locale;
        return (
          <Link
            key={l}
            href={swapLocale(pathname, l)}
            scroll={false}
            hrefLang={localeMeta[l].htmlLang}
            lang={localeMeta[l].htmlLang}
            aria-current={active ? "true" : undefined}
            aria-label={localeMeta[l].name}
            onClick={(e) => {
              rememberLocale(l);
              if (active) e.preventDefault();
            }}
            className={cn(
              "relative grid place-items-center rounded-full font-mono font-medium transition-colors duration-300",
              size === "sm" ? "h-7 min-w-9 px-2 text-[11px]" : "h-11 min-w-16 px-4 text-sm",
              active ? "text-ink" : "text-muted hover:text-fg",
            )}
          >
            {active && (
              <motion.span
                layoutId={`locale-pill-${id}`}
                className="absolute inset-0 rounded-full bg-fg shadow-[0_0_20px_rgba(255,255,255,0.35)]"
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
              />
            )}
            <span className="relative">{localeMeta[l].label}</span>
          </Link>
        );
      })}
    </div>
  );
}
