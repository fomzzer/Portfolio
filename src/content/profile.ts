export const profile = {
  handle: "fomzzer.dev",
  timezone: "Europe/Kyiv",
  email: "fmzrdev@gmail.com",
  available: true,
  resume: null as string | null,
  stats: ["4+", "7", "100", "24/7"],
  socials: [
    { name: "GitHub", href: "https://github.com/fomzzer", icon: "github" },
    { name: "Telegram", href: "https://t.me/fomzzerrr", icon: "telegram" },
    { name: "TG Channel", href: "https://t.me/fomzzerdev", icon: "telegram" },
    { name: "Instagram", href: "https://instagram.com/fomzzer.dev", icon: "instagram" },
  ],
} as const;

export type SocialIcon = (typeof profile.socials)[number]["icon"];
