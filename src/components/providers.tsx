"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";
import { SmoothScroll } from "./effects/smooth-scroll";
import { CommandProvider } from "./command-menu";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll>
        <CommandProvider>{children}</CommandProvider>
      </SmoothScroll>
    </MotionConfig>
  );
}
