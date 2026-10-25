"use client";

import { useSyncExternalStore } from "react";

function subscribe() {
  return () => {};
}

export function useScrollTimeline() {
  return useSyncExternalStore(subscribe, () => CSS.supports("animation-timeline: view()"), () => false);
}
