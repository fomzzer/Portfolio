export const serviceIcons = ["layers", "cart", "panel", "plug"] as const;

export type ServiceIcon = (typeof serviceIcons)[number];
