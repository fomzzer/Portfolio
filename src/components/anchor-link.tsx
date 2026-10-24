"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import type { ComponentProps, MouseEvent } from "react";
import { useI18n } from "@/i18n/provider";

type AnchorLinkProps = Omit<ComponentProps<typeof Link>, "href"> & { to: string };

export function useScrollToSection() {
  const lenis = useLenis();
  return (id: string) => {
    const target = id === "top" ? 0 : `#${id}`;
    if (lenis) lenis.scrollTo(target, { offset: -80, duration: 1.4 });
    else if (id === "top") window.scrollTo({ top: 0, behavior: "smooth" });
    else document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
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
      history.replaceState(null, "", href);
    }
  }

  return <Link href={href} onClick={handleClick} scroll={false} {...props} />;
}
