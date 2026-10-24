export type ProjectStatus = "live" | "dev" | "archived";

export type Shot = { src: string; width: number; height: number };

export type ProjectData = {
  slug: string;
  year: string;
  status: ProjectStatus;
  url?: string;
  repo?: string;
  cover?: Shot;
  accent: string;
  featured: boolean;
  stack: string[];
  metrics: string[];
  gallery: { desktop: Shot[]; mobile: Shot[] };
};

const desktop = (name: string): Shot => ({ src: `/projects/prirodni-skarby/${name}.webp`, width: 2880, height: 1800 });
const mobile = (name: string): Shot => ({ src: `/projects/prirodni-skarby/${name}.webp`, width: 1170, height: 2532 });

export const projectData: ProjectData[] = [
  {
    slug: "prirodni-skarby",
    year: "2026",
    status: "live",
    url: "https://www.prirodniskarby.in.ua/",
    cover: desktop("home"),
    accent: "#9ae6b4",
    featured: true,
    stack: ["Next.js 16", "React 19", "PostgreSQL", "Prisma", "NextAuth", "Tailwind CSS", "LiqPay", "Nova Poshta API", "Resend", "S3", "Vercel"],
    metrics: ["17", "30+", "100%", "24/7"],
    gallery: {
      desktop: [desktop("home"), desktop("shop"), desktop("product")],
      mobile: [mobile("mobile-home"), mobile("mobile-shop"), mobile("mobile-product")],
    },
  },
];
