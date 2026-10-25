"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";
import { SmoothScroll } from "./effects/smooth-scroll";
import { CommandProvider } from "./command-menu";
import { ScrollManager } from "./effects/scroll-manager";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll>
        <ScrollManager />
        <CommandProvider>{children}</CommandProvider>
      </SmoothScroll>
    </MotionConfig>
  );
}
