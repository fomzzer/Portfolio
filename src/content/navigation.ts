export const sectionIds = ["work", "services", "pricing", "process", "about", "faq", "contact"] as const;

export type SectionId = (typeof sectionIds)[number];
