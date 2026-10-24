import { profile } from "@/content/profile";
import { projectData } from "@/content/projects";
import { experienceData } from "@/content/experience";
import { stackItems } from "@/content/stack";
import { serviceIcons } from "@/content/services";
import { sectionIds } from "@/content/navigation";
import type { Locale } from "./config";
import { en, type Dictionary } from "./dictionaries/en";
import { bg } from "./dictionaries/bg";
import { uk } from "./dictionaries/uk";

const dictionaries: Record<Locale, Dictionary> = { en, bg, uk };

export function getContent(locale: Locale) {
  const t = dictionaries[locale];

  const projects = projectData.map((data) => {
    const text = t.projects[data.slug] ?? en.projects[data.slug];
    return {
      ...data,
      ...text,
      metrics: data.metrics.map((value, i) => ({ value, label: text.metrics[i] ?? "" })),
    };
  });

  return {
    locale,
    t,
    fullName: `${t.profile.firstName} ${t.profile.lastName}`,
    profile: {
      ...profile,
      ...t.profile,
      stats: profile.stats.map((value, i) => ({ value, label: t.profile.stats[i] })),
    },
    sections: sectionIds.map((id) => ({ id, label: t.nav[id] })),
    projects,
    experience: experienceData.map((data, i) => ({
      ...data,
      ...t.experience.items[i],
      period: `${data.from} — ${data.to ?? t.experience.now}`,
    })),
    stackGroups: t.stack.groups.map((group, i) => ({ ...group, items: stackItems[i] })),
    services: t.services.items.map((item, i) => ({ ...item, icon: serviceIcons[i] })),
    process: t.services.process.map((p, i) => ({ ...p, step: String(i + 1).padStart(2, "0") })),
  };
}

export type Content = ReturnType<typeof getContent>;

export type Project = Content["projects"][number];

export function getProject(content: Content, slug: string) {
  return content.projects.find((p) => p.slug === slug);
}

export function getNextProject(content: Content, slug: string) {
  const index = content.projects.findIndex((p) => p.slug === slug);
  return content.projects[(index + 1) % content.projects.length];
}
