export const budgets = ["lt1k", "1to5k", "5to15k", "gt15k", "unsure"] as const;

export type Budget = (typeof budgets)[number];
