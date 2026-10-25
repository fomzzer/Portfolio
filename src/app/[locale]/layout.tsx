import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { profile } from "@/content/profile";
import { isLocale, localeMeta, locales } from "@/i18n/config";
import { getContent } from "@/i18n/content";
import { I18nProvider } from "@/i18n/provider";
import { siteUrl } from "@/lib/utils";
import { localeAlternates, siteGraph, verification } from "@/lib/seo";
import { Providers } from "@/components/providers";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PageFade } from "@/components/page-fade";
import { Background } from "@/components/effects/background";
import { CursorGlow } from "@/components/effects/cursor-glow";
import { ScrollProgress } from "@/components/effects/scroll-progress";
import "../globals.css";

type Props = { children: ReactNode; params: Promise<{ locale: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { fullName, t } = getContent(locale);
  const { title, description } = t.seo;

  return {
    metadataBase: new URL(siteUrl),
    title: { default: title, template: `%s · ${profile.brand}` },
    description,
    applicationName: profile.brand,
    authors: [{ name: fullName, url: `${siteUrl}/${locale}` }],
    creator: fullName,
    publisher: fullName,
    category: "technology",
    keywords: [...t.seo.keywords, profile.brand, fullName],
    alternates: localeAlternates(locale),
    openGraph: {
      type: "website",
      url: `${siteUrl}/${locale}`,
      siteName: profile.brand,
      title,
      description,
      locale: localeMeta[locale].ogLocale,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => localeMeta[l].ogLocale),
    },
    twitter: { card: "summary_large_image", title, description },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
    verification: verification(),
  };
}

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const content = getContent(locale);

  const jsonLd = siteGraph(content);

  return (
    <html lang={localeMeta[locale].htmlLang} className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-ink">
          {content.t.nav.skip}
        </a>
        <I18nProvider content={content}>
          <Providers>
            <Background />
            <CursorGlow />
            <ScrollProgress />
            <Header />
            <main id="main" className="relative">
              <PageFade>{children}</PageFade>
            </main>
            <PageFade>
              <Footer />
            </PageFade>
          </Providers>
        </I18nProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
