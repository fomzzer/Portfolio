import { profile } from "@/content/profile";
import { projectData } from "@/content/projects";
import { localeMeta, locales } from "@/i18n/config";
import { getContent } from "@/i18n/content";
import { siteUrl } from "@/lib/utils";

export const dynamic = "force-static";

export function GET() {
  const { t, fullName, profile: p, services } = getContent("en");
  const lines = [
    `# ${profile.brand} — ${fullName}, ${p.role}`,
    "",
    `> ${t.seo.description}`,
    "",
    `${fullName} is a full-stack web developer based in Sofia, Bulgaria, building websites, online stores and web applications end to end for clients in Bulgaria, Ukraine, Europe and worldwide.`,
    "",
    "## Services",
    ...services.map((s) => `- ${s.title}: ${s.description}`),
    "",
    "## Contact",
    `- Email: ${profile.email}`,
    ...profile.phones.map((ph) => `- Phone (${ph.country}): ${ph.number}`),
    ...profile.socials.map((s) => `- ${s.name}: ${s.href}`),
    "",
    "## Pages",
    ...locales.map((l) => `- [${localeMeta[l].name}](${siteUrl}/${l})`),
    ...locales.map((l) => `- [Case studies — ${localeMeta[l].name}](${siteUrl}/${l}/projects)`),
    ...projectData.flatMap((proj) => locales.map((l) => `- [${getContent(l).projects.find((x) => x.slug === proj.slug)?.title} — ${localeMeta[l].name}](${siteUrl}/${l}/projects/${proj.slug})`)),
    "",
    "## FAQ",
    ...t.faq.items.flatMap((item) => [`### ${item.q}`, item.a, ""]),
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
