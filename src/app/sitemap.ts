import type { MetadataRoute } from "next";
import { projectData } from "@/content/projects";
import { localeMeta, locales } from "@/i18n/config";
import { siteUrl } from "@/lib/utils";

const lastModified = new Date();

function entry(path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly", images: string[] = []): MetadataRoute.Sitemap {
  const languages = { ...Object.fromEntries(locales.map((l) => [localeMeta[l].htmlLang, `${siteUrl}/${l}${path}`])), "x-default": `${siteUrl}/en${path}` };
  return locales.map((l) => ({
    url: `${siteUrl}/${l}${path}`,
    lastModified,
    changeFrequency,
    priority,
    alternates: { languages },
    ...(images.length > 0 && { images: images.map((src) => `${siteUrl}${src}`) }),
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const covers = projectData.flatMap((p) => (p.cover ? [p.cover.src] : []));
  return [
    ...entry("", 1, "weekly", covers),
    ...entry("/projects", 0.9, "monthly", covers),
    ...projectData.flatMap((p) => entry(`/projects/${p.slug}`, 0.8, "monthly", [...p.gallery.desktop, ...p.gallery.mobile].map((s) => s.src))),
  ];
}
