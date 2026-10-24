export type ProjectStatus = "live" | "dev" | "archived";

export type ProjectData = {
  slug: string;
  year: string;
  status: ProjectStatus;
  url?: string;
  repo?: string;
  cover?: string;
  accent: string;
  featured: boolean;
  stack: string[];
  metrics: string[];
};

export const projectData: ProjectData[] = [
  {
    slug: "prirodni-skarby",
    year: "2026",
    status: "live",
    url: "https://www.prirodniskarby.in.ua/",
    accent: "#9ae6b4",
    featured: true,
    stack: ["Next.js 16", "React 19", "PostgreSQL", "Prisma", "NextAuth", "Tailwind CSS", "LiqPay", "Nova Poshta API", "Resend", "S3", "Vercel"],
    metrics: ["17", "30+", "100%", "24/7"],
  },
  {
    slug: "uniapp",
    year: "2025",
    status: "dev",
    accent: "#90cdf4",
    featured: true,
    stack: ["SwiftUI", "FastAPI", "Python", "Azure VM", "GitHub Actions"],
    metrics: ["2", "CI", "Azure"],
  },
  {
    slug: "next-project",
    year: "2026",
    status: "dev",
    accent: "#d6bcfa",
    featured: false,
    stack: ["Next.js", "TypeScript", "PostgreSQL"],
    metrics: ["—"],
  },
];
