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
import { Providers } from "@/components/providers";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
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
  const { fullName, profile: p } = getContent(locale);
  const title = `${fullName} — ${p.role}`;

  return {
    metadataBase: new URL(siteUrl),
    title: { default: title, template: `%s · ${fullName}` },
    description: p.headline,
    applicationName: fullName,
    authors: [{ name: fullName, url: siteUrl }],
    creator: fullName,
    keywords: ["Full-Stack Developer", "Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Web Developer", "Odesa", "Ukraine", "Portfolio"],
    alternates: {
      canonical: `/${locale}`,
      languages: { ...Object.fromEntries(locales.map((l) => [localeMeta[l].htmlLang, `/${l}`])), "x-default": "/en" },
    },
    openGraph: {
      type: "website",
      url: `${siteUrl}/${locale}`,
      siteName: fullName,
      title,
      description: p.headline,
      locale: localeMeta[locale].ogLocale,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => localeMeta[l].ogLocale),
    },
    twitter: { card: "summary_large_image", title, description: p.headline },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: content.fullName,
    jobTitle: content.profile.role,
    url: `${siteUrl}/${locale}`,
    email: `mailto:${profile.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Odesa", addressCountry: "UA" },
    sameAs: profile.socials.map((s) => s.href),
    knowsAbout: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "Python", "FastAPI"],
  };

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
              {children}
            </main>
            <Footer />
          </Providers>
        </I18nProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
