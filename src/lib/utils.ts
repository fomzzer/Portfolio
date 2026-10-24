import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function toOrigin(value: string | undefined) {
  const clean = value?.replace(/^﻿/, "").trim();
  if (!clean) return undefined;
  try {
    return new URL(clean.startsWith("http") ? clean : `https://${clean}`).origin;
  } catch {
    return undefined;
  }
}

export const siteUrl =
  toOrigin(process.env.NEXT_PUBLIC_SITE_URL) ?? toOrigin(process.env.VERCEL_PROJECT_PRODUCTION_URL) ?? "http://localhost:3000";
