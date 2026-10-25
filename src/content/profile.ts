export const profile = {
  brand: "fomzzer.dev",
  handle: "fomzzer.dev",
  timezone: "Europe/Sofia",
  email: "fmzrdev@gmail.com",
  phones: [
    { country: "BG", number: "+359 88 451 0922", href: "tel:+359884510922" },
    { country: "UA", number: "+380 68 967 3175", href: "tel:+380689673175" },
  ],
  available: true,
  resume: null as string | null,
  stats: ["4+", "2", "100", "24/7"],
  socials: [
    { name: "GitHub", href: "https://github.com/fomzzer", icon: "github" },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/fomzzer", icon: "linkedin" },
    { name: "Telegram", href: "https://t.me/fomzzerrr", icon: "telegram" },
    { name: "TG Channel", href: "https://t.me/fomzzerdev", icon: "telegram" },
    { name: "Instagram", href: "https://instagram.com/fomzzer.dev", icon: "instagram" },
  ],
} as const;
