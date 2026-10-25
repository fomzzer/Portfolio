export const locales = ["en", "bg", "uk", "ru"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeCookie = "NEXT_LOCALE";

export const localeMeta: Record<Locale, { label: string; name: string; htmlLang: string; ogLocale: string }> = {
  en: { label: "EN", name: "English", htmlLang: "en", ogLocale: "en_US" },
  bg: { label: "BG", name: "Български", htmlLang: "bg", ogLocale: "bg_BG" },
  uk: { label: "UA", name: "Українська", htmlLang: "uk", ogLocale: "uk_UA" },
  ru: { label: "RU", name: "Русский", htmlLang: "ru", ogLocale: "ru_RU" },
};

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

export function fill(template: string, vars: Record<string, string>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => vars[key] ?? "");
}
