import type { MetadataRoute } from "next";
import { getContent } from "@/i18n/content";

export default function manifest(): MetadataRoute.Manifest {
  const { profile } = getContent("en");
  return {
    name: `fomzzer.dev — ${profile.role}`,
    short_name: "fomzzer.dev",
    description: profile.headline,
    start_url: "/",
    display: "standalone",
    background_color: "#050505",
    theme_color: "#050505",
    icons: [{ src: "/icon", sizes: "64x64", type: "image/png" }],
  };
}
