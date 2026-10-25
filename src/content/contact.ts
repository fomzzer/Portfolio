export const budgets = ["50to100", "100to200", "200to300", "300to500", "gt500", "unsure"] as const;

export type Budget = (typeof budgets)[number];
