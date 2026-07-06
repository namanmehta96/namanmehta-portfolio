import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name} · ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#0d1117",
        }}
      >
        <div
          style={{
            fontSize: 104,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: "#e8e6d8",
          }}
        >
          {site.name}
        </div>
        <div style={{ marginTop: 28, fontSize: 42, color: "#d4a574" }}>
          {site.tagline}
        </div>
        <div style={{ marginTop: 56, fontSize: 26, color: "#a8adb8" }}>
          {site.availability}
        </div>
      </div>
    ),
    { ...size }
  );
}
