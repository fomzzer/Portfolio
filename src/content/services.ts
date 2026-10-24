export const serviceIcons = ["globe", "layers", "cart", "gauge"] as const;

export type ServiceIcon = (typeof serviceIcons)[number];
