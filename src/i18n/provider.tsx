"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Content } from "./content";

const I18nContext = createContext<Content | null>(null);

export function I18nProvider({ content, children }: { content: Content; children: ReactNode }) {
  return <I18nContext.Provider value={content}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
