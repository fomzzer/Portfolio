import { profile } from "@/content/profile";
import { localeMeta, locales, type Locale } from "@/i18n/config";
import type { Content } from "@/i18n/content";
import { siteUrl } from "./utils";

export const personId = `${siteUrl}/#person`;
export const businessId = `${siteUrl}/#business`;
export const websiteId = `${siteUrl}/#website`;

export function localeAlternates(locale: Locale, path = "") {
  return {
    canonical: `/${locale}${path}`,
    languages: { ...Object.fromEntries(locales.map((l) => [localeMeta[l].htmlLang, `/${l}${path}`])), "x-default": `/en${path}` },
  };
}

export function verification() {
  const google = process.env.GOOGLE_SITE_VERIFICATION?.trim();
  const yandex = process.env.YANDEX_VERIFICATION?.trim();
  const bing = process.env.BING_SITE_VERIFICATION?.trim();
  return {
    ...(google && { google }),
    ...(yandex && { yandex }),
    ...(bing && { other: { "msvalidate.01": bing } }),
  };
}

const phones = profile.phones.map((p) => p.href.replace("tel:", ""));

export function siteGraph(content: Content) {
  const { locale, t, fullName, profile: p, services } = content;
  const url = `${siteUrl}/${locale}`;
  const inLanguage = localeMeta[locale].htmlLang;
  const address = { "@type": "PostalAddress", addressLocality: "Sofia", addressCountry: "BG" };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url,
        name: profile.brand,
        alternateName: [fullName, "fomzzer"],
        description: t.seo.description,
        inLanguage,
        publisher: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: fullName,
        alternateName: ["fomzzer", profile.brand],
        jobTitle: p.role,
        description: p.headline,
        url,
        image: `${siteUrl}/icon`,
        email: `mailto:${profile.email}`,
        telephone: phones,
        address,
        alumniOf: { "@type": "CollegeOrUniversity", name: "Technical University of Sofia", sameAs: "https://www.tu-sofia.bg" },
        worksFor: { "@id": businessId },
        sameAs: profile.socials.map((s) => s.href),
        knowsAbout: ["Web development", "Website development", "E-commerce development", "Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "SEO", "Web performance"],
      },
      {
        "@type": "ProfessionalService",
        "@id": businessId,
        name: profile.brand,
        alternateName: fullName,
        description: t.seo.description,
        url,
        logo: `${siteUrl}/icon`,
        image: `${url}/opengraph-image`,
        email: profile.email,
        telephone: phones[0],
        address,
        geo: { "@type": "GeoCoordinates", latitude: 42.6977, longitude: 23.3219 },
        areaServed: [
          { "@type": "Country", name: "Bulgaria" },
          { "@type": "Country", name: "Ukraine" },
          { "@type": "Place", name: "Europe" },
          { "@type": "Place", name: "Worldwide" },
        ],
        priceRange: "€€",
        currenciesAccepted: "EUR",
        founder: { "@id": personId },
        sameAs: profile.socials.map((s) => s.href),
        contactPoint: profile.phones.map((ph) => ({
          "@type": "ContactPoint",
          telephone: ph.href.replace("tel:", ""),
          contactType: "sales",
          areaServed: ph.country,
          email: profile.email,
        })),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: t.services.title,
          itemListElement: services.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s.title, description: s.description, provider: { "@id": businessId } },
          })),
        },
      },
    ],
  };
}

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, item: `${siteUrl}${item.path}` })),
  };
}
