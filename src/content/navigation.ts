export const sectionIds = ["work", "about", "stack", "experience", "services", "contact"] as const;

export type SectionId = (typeof sectionIds)[number];
