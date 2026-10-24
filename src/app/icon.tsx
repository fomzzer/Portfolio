import { ImageResponse } from "next/og";
import { en } from "@/i18n/dictionaries/en";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 16,
          background: "radial-gradient(circle at 30% 25%, #3a3a40, #0a0a0b 70%)",
          border: "2px solid rgba(255,255,255,0.18)",
          color: "#fafafa",
          fontSize: 34,
          fontWeight: 700,
        }}
      >
        {en.profile.firstName[0]}
      </div>
    ),
    size,
  );
}
