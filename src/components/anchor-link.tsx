"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import type { ComponentProps, MouseEvent } from "react";
import { useI18n } from "@/i18n/provider";

type AnchorLinkProps = Omit<ComponentProps<typeof Link>, "href"> & { to: string };

export function sectionOffset(id: string) {
  if (!id || id === "top") return 0;
  const el = document.getElementById(id);
  if (!el) return null;
  const padding = Number.parseFloat(getComputedStyle(el).paddingTop) || 0;
  const header = window.innerWidth >= 640 ? 104 : 92;
  const top = el.getBoundingClientRect().top + window.scrollY + padding - header;
  return Math.max(0, Math.min(top, document.documentElement.scrollHeight - window.innerHeight));
}

export function useScrollToSection() {
  const lenis = useLenis();
  return (id: string) => {
    lenis?.start();
    const top = sectionOffset(id);
    if (top === null) return;
    if (lenis) lenis.scrollTo(top, { duration: 1.4 });
    else window.scrollTo({ top, behavior: "smooth" });
  };
}

export function AnchorLink({ to, onClick, ...props }: AnchorLinkProps) {
  const pathname = usePathname();
  const { locale } = useI18n();
  const scrollTo = useScrollToSection();
  const home = `/${locale}`;
  const href = to === "top" ? home : `${home}#${to}`;

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    onClick?.(e);
    if (pathname === home) {
      e.preventDefault();
      scrollTo(to);
      history.replaceState(history.state, "", href);
    }
  }

  return <Link href={href} onClick={handleClick} scroll={false} {...props} />;
}
