export const serviceIcons = ["globe", "cart", "layers", "gauge"] as const;

export type ServiceIcon = (typeof serviceIcons)[number];
