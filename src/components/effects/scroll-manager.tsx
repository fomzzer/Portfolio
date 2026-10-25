"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";
import { sectionOffset } from "../anchor-link";
import { isLocaleSwitching } from "../page-fade";
import { getLenis, lockScroll } from "./smooth-scroll";

export function ScrollManager() {
  const pathname = usePathname();
  const first = useRef(true);
  const popped = useRef(false);

  useEffect(() => {
    const onPop = () => (popped.current = true);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useLayoutEffect(() => {
    const initial = first.current;
    first.current = false;
    const back = popped.current;
    popped.current = false;
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (back || isLocaleSwitching() || (initial && !id)) return;

    function jump() {
      lockScroll(false);
      const top = sectionOffset(id) ?? 0;
      const lenis = getLenis();
      if (lenis) {
        lenis.resize();
        lenis.scrollTo(top, { immediate: true, force: true });
      }
      window.scrollTo({ top, behavior: "instant" });
    }

    jump();
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      jump();
      inner = requestAnimationFrame(jump);
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [pathname]);

  return null;
}
