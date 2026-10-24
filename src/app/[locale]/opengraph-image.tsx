import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { isLocale, locales } from "@/i18n/config";
import { getContent } from "@/i18n/content";
import { profile } from "@/content/profile";

export const alt = "Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const fontDir = join(process.cwd(), "node_modules/geist/dist/fonts/geist-sans");

export default async function OpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { fullName, t, profile: p } = getContent(isLocale(locale) ? locale : "en");
  const [regular, semibold] = await Promise.all([
    readFile(join(fontDir, "Geist-Regular.ttf")),
    readFile(join(fontDir, "Geist-SemiBold.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#050505",
          backgroundImage:
            "radial-gradient(circle at 85% 20%, rgba(255,255,255,0.16), transparent 45%), radial-gradient(circle at 10% 100%, rgba(150,160,180,0.12), transparent 50%)",
          color: "#fafafa",
          fontFamily: "Geist",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 24, color: "#a1a1aa" }}>
          <div style={{ width: 12, height: 12, borderRadius: 999, background: "#86efac" }} />
          {p.availability}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 120, fontWeight: 600, letterSpacing: -5, lineHeight: 0.95 }}>
            <span>{t.hero.titleTop}</span>
            <span style={{ color: "#a1a1aa" }}>{t.hero.titleBottom}</span>
          </div>
          <div style={{ marginTop: 32, fontSize: 32, color: "#a1a1aa" }}>{`${fullName} · ${p.location}`}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#71717a" }}>
          <span>{profile.handle}</span>
          <span>Next.js · React · TypeScript · PostgreSQL</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: regular, weight: 400, style: "normal" },
        { name: "Geist", data: semibold, weight: 600, style: "normal" },
      ],
    },
  );
}
