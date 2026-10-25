export const sectionIds = ["work", "about", "stack", "experience", "services", "faq", "contact"] as const;

export type SectionId = (typeof sectionIds)[number];
