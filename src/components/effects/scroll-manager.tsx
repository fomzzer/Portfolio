"use client";

import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import { useEffect, useLayoutEffect, useRef } from "react";
import { sectionOffset } from "../anchor-link";
import { isLocaleSwitching } from "../page-fade";

export function ScrollManager() {
  const pathname = usePathname();
  const lenis = useLenis();
  const lenisRef = useRef(lenis);
  const first = useRef(true);
  const popped = useRef(false);

  useEffect(() => {
    lenisRef.current = lenis;
  }, [lenis]);

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
      const instance = lenisRef.current;
      instance?.start();
      const top = sectionOffset(id) ?? 0;
      if (instance) {
        instance.resize();
        instance.scrollTo(top, { immediate: true, force: true });
      }
      window.scrollTo(0, top);
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
