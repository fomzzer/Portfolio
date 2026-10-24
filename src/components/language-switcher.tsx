"use client";

import { animate, motion, useDragControls, useMotionValue, useMotionValueEvent } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { localeCookie, localeMeta, locales, type Locale } from "@/i18n/config";
import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/utils";
import { markLocaleSwitch } from "./page-fade";

export function swapLocale(pathname: string, locale: Locale) {
  const parts = pathname.split("/");
  parts[1] = locale;
  return parts.join("/") || `/${locale}`;
}

export function rememberLocale(locale: Locale) {
  document.cookie = `${localeCookie}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

export function useSwitchLocale() {
  const router = useRouter();
  const pathname = usePathname();
  const { locale } = useI18n();
  const pending = useRef(false);

  useEffect(() => {
    pending.current = false;
  }, [locale]);

  useEffect(() => {
    locales.forEach((l) => l !== locale && router.prefetch(swapLocale(pathname, l)));
  }, [router, pathname, locale]);

  return useCallback(
    (next: Locale) => {
      if (next === locale || pending.current) return;
      pending.current = true;
      rememberLocale(next);
      markLocaleSwitch();
      document.documentElement.dataset.switching = "";
      window.setTimeout(() => router.push(swapLocale(pathname, next), { scroll: false }), 200);
    },
    [locale, pathname, router],
  );
}

const sizes = {
  sm: { w: 40, h: 28, text: "text-[11px]" },
  lg: { w: 64, h: 44, text: "text-sm" },
};

const spring = { type: "spring", stiffness: 520, damping: 38 } as const;

export function LanguageSwitcher({ className, size = "sm" }: { className?: string; size?: "sm" | "lg" }) {
  const { locale, t } = useI18n();
  const switchLocale = useSwitchLocale();
  const controls = useDragControls();
  const s = sizes[size];
  const index = locales.indexOf(locale);
  const max = (locales.length - 1) * s.w;
  const x = useMotionValue(index * s.w);
  const [current, setCurrent] = useState(index);
  const dragged = useRef(false);

  useMotionValueEvent(x, "change", (v) => setCurrent(Math.min(locales.length - 1, Math.max(0, Math.round(v / s.w)))));

  useEffect(() => {
    const controlsAnim = animate(x, index * s.w, spring);
    return () => controlsAnim.stop();
  }, [index, s.w, x]);

  function select(i: number) {
    const target = Math.min(locales.length - 1, Math.max(0, i));
    animate(x, target * s.w, spring);
    switchLocale(locales[target]);
  }

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    dragged.current = false;
    controls.start(e, { snapToCursor: true });
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      select(index + 1);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      select(index - 1);
    }
  }

  return (
    <div
      role="radiogroup"
      aria-label={t.nav.language}
      onPointerDown={onPointerDown}
      onKeyDown={onKeyDown}
      className={cn("glass glass-edge relative flex w-fit shrink-0 touch-pan-y select-none rounded-full p-1", className)}
    >
      {locales.map((l, i) => (
        <button
          key={l}
          type="button"
          role="radio"
          aria-checked={l === locale}
          aria-label={localeMeta[l].name}
          lang={localeMeta[l].htmlLang}
          tabIndex={l === locale ? 0 : -1}
          onClick={() => !dragged.current && select(i)}
          style={{ width: s.w, height: s.h }}
          className={cn("relative grid place-items-center rounded-full font-mono font-medium text-muted transition-colors duration-200 hover:text-fg", s.text)}
        >
          {localeMeta[l].label}
        </button>
      ))}
      <motion.div
        aria-hidden
        drag="x"
        dragControls={controls}
        dragListener={false}
        dragConstraints={{ left: 0, right: max }}
        dragElastic={0.12}
        dragMomentum={false}
        onDragStart={() => (dragged.current = true)}
        onDragEnd={() => select(Math.round(x.get() / s.w))}
        whileDrag={{ scale: 1.08 }}
        style={{ x, width: s.w, height: s.h }}
        className={cn(
          "absolute left-1 top-1 grid cursor-grab touch-none place-items-center rounded-full bg-fg font-mono font-medium text-ink shadow-[0_0_22px_rgba(255,255,255,0.35)] will-change-transform active:cursor-grabbing",
          s.text,
        )}
      >
        {localeMeta[locales[current]].label}
      </motion.div>
    </div>
  );
}
