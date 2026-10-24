export const budgets = ["lt300", "300to800", "800to2k", "gt2k", "unsure"] as const;

export type Budget = (typeof budgets)[number];
