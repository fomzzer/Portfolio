import type { MetadataRoute } from "next";
import { projectData } from "@/content/projects";
import { localeMeta, locales } from "@/i18n/config";
import { siteUrl } from "@/lib/utils";

function entry(path: string, priority: number, changeFrequency: "monthly" | "yearly"): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(locales.map((l) => [localeMeta[l].htmlLang, `${siteUrl}/${l}${path}`]));
  return locales.map((l) => ({
    url: `${siteUrl}/${l}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: { languages },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [...entry("", 1, "monthly"), ...projectData.flatMap((p) => entry(`/projects/${p.slug}`, 0.8, "yearly"))];
}
