"use client";

import { animate, motion, useDragControls, useMotionValue, useMotionValueEvent } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState, useSyncExternalStore, type KeyboardEvent, type PointerEvent } from "react";
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
      window.setTimeout(() => router.push(swapLocale(pathname, next), { scroll: false }), 220);
    },
    [locale, pathname, router],
  );
}

const sizes = {
  sm: { w: 40, h: 28, text: "text-[11px]" },
  touch: { w: 48, h: 36, text: "text-xs" },
  lg: { w: 64, h: 44, text: "text-sm" },
};

const spring = { type: "spring", stiffness: 420, damping: 34 } as const;

const coarseQuery = "(pointer: coarse)";

function subscribeCoarse(callback: () => void) {
  const media = window.matchMedia(coarseQuery);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

export function LanguageSwitcher({ className, size = "sm" }: { className?: string; size?: "sm" | "lg" }) {
  const { locale, t } = useI18n();
  const switchLocale = useSwitchLocale();
  const id = useId();
  const controls = useDragControls();
  const coarse = useSyncExternalStore(subscribeCoarse, () => window.matchMedia(coarseQuery).matches, () => false);
  const s = sizes[size === "sm" && coarse ? "touch" : size];
  const index = locales.indexOf(locale);
  const max = (locales.length - 1) * s.w;
  const x = useMotionValue(index * s.w);
  const [current, setCurrent] = useState(index);
  const [hovered, setHovered] = useState<number | null>(null);
  const [dragging, setDragging] = useState(false);
  const lastDragEnd = useRef(0);

  function onTrackPointerDown(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType === "mouse" || (e.target as HTMLElement).closest("[data-thumb]")) return;
    controls.start(e);
  }

  useMotionValueEvent(x, "change", (v) => setCurrent(Math.min(locales.length - 1, Math.max(0, Math.round(v / s.w)))));

  useEffect(() => {
    const anim = animate(x, index * s.w, spring);
    return () => anim.stop();
  }, [index, s.w, x]);

  function select(i: number) {
    const target = Math.min(locales.length - 1, Math.max(0, i));
    animate(x, target * s.w, spring);
    switchLocale(locales[target]);
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
      onKeyDown={onKeyDown}
      onPointerDown={onTrackPointerDown}
      onPointerLeave={() => setHovered(null)}
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
          onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(i)}
          onClick={() => performance.now() - lastDragEnd.current > 300 && select(i)}
          style={{ width: s.w, height: s.h }}
          className={cn(
            "relative grid cursor-pointer place-items-center rounded-full font-mono font-medium transition-colors duration-300",
            s.text,
            hovered === i ? "text-fg" : "text-muted",
          )}
        >
          {hovered === i && i !== current && !dragging && (
            <motion.span
              layoutId={`lang-hover-${id}`}
              className="absolute inset-0 rounded-full bg-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
            />
          )}
          <span className="relative">{localeMeta[l].label}</span>
        </button>
      ))}
      <motion.div
        aria-hidden
        tabIndex={-1}
        data-thumb
        drag="x"
        dragControls={controls}
        dragConstraints={{ left: 0, right: max }}
        dragElastic={0.12}
        dragMomentum={false}
        onDragStart={() => setDragging(true)}
        onDragEnd={() => {
          setDragging(false);
          lastDragEnd.current = performance.now();
          select(Math.round(x.get() / s.w));
        }}
        whileTap={{ scale: 0.94 }}
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
