export const sectionIds = ["work", "services", "pricing", "about", "faq", "contact"] as const;

export type SectionId = (typeof sectionIds)[number];
