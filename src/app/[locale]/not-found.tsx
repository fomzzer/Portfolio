"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useI18n } from "@/i18n/provider";

export default function NotFound() {
  const { locale, t } = useI18n();

  return (
    <section className="container-page flex min-h-[80svh] flex-col items-center justify-center pt-24 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-subtle">{t.notFound.label}</p>
      <h1 className="text-gradient mt-6 text-[clamp(6rem,22vw,16rem)] font-semibold leading-[0.85] tracking-[-0.08em]">404</h1>
      <p className="mt-6 max-w-sm text-muted">{t.notFound.text}</p>
      <Link
        href={`/${locale}`}
        className="glass glass-edge group mt-10 inline-flex h-12 items-center gap-2 rounded-full px-6 text-sm font-medium transition-colors hover:bg-white/[0.08]"
      >
        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
        {t.notFound.back}
      </Link>
    </section>
  );
}
