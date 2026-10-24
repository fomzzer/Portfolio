import type { MetadataRoute } from "next";
import { getContent } from "@/i18n/content";

export default function manifest(): MetadataRoute.Manifest {
  const { fullName, profile } = getContent("en");
  return {
    name: `${fullName} — ${profile.role}`,
    short_name: profile.firstName,
    description: profile.headline,
    start_url: "/",
    display: "standalone",
    background_color: "#050505",
    theme_color: "#050505",
    icons: [{ src: "/icon", sizes: "64x64", type: "image/png" }],
  };
}
