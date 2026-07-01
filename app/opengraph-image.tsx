import { ImageResponse } from "next/og"
import { siteConfig } from "@/lib/site"

export const runtime = "nodejs"
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(135deg, #0a2342 0%, #0e3a5f 55%, #0891b2 140%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "22px",
              height: "22px",
              borderRadius: "9999px",
              background: "#38bdf8",
              boxShadow: "0 0 40px 8px rgba(56,189,248,0.7)",
            }}
          />
          <div style={{ fontSize: "30px", letterSpacing: "0.35em", color: "#7dd3fc", textTransform: "uppercase" }}>
            Pulsar ICT
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: "76px", fontWeight: 700, lineHeight: 1.05, maxWidth: "980px" }}>
            {siteConfig.tagline}
          </div>
          <div style={{ marginTop: "28px", fontSize: "34px", color: "#cbd5e1", maxWidth: "900px" }}>
            {`Votre partenaire informatique de proximité depuis ${siteConfig.founded}.`}
          </div>
        </div>

        <div style={{ display: "flex", fontSize: "28px", color: "#94a3b8", gap: "28px" }}>
          <span>Genève &amp; Suisse romande</span>
          <span>·</span>
          <span>{siteConfig.url.replace(/^https?:\/\//, "")}</span>
        </div>
      </div>
    ),
    { ...size },
  )
}
