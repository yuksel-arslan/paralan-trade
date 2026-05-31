import { ImageResponse } from "next/og";

export const alt = "Paralan — Prediction Market Intelligence";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const MARK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="120" height="120"><defs><linearGradient id="pg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#4F7BF7"/><stop offset="52%" stop-color="#24C8E6"/><stop offset="100%" stop-color="#2FE6A6"/></linearGradient></defs><rect width="100" height="100" rx="22" fill="url(#pg)"/><g fill="none" stroke="#ffffff" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"><path d="M38 22 L50 33 L62 22"/><path d="M38 22 L50 33 L62 22" transform="rotate(120 50 50)"/><path d="M38 22 L50 33 L62 22" transform="rotate(240 50 50)"/></g><circle cx="50" cy="50" r="6.5" fill="#ffffff"/></svg>`;
const MARK_URL = `data:image/svg+xml;base64,${Buffer.from(MARK_SVG).toString("base64")}`;

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#08090d",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* top: brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={MARK_URL} width={104} height={104} alt="" style={{ borderRadius: 24 }} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 64, fontWeight: 800, letterSpacing: -2, lineHeight: 1 }}>
              <div style={{ color: "#e4e5ea" }}>PARALAN</div>
              <div style={{ color: "#2FE6A6" }}>.TRADE</div>
            </div>
            <div
              style={{
                fontSize: 24,
                fontWeight: 600,
                color: "#7E8B99",
                letterSpacing: 6,
                marginTop: 10,
              }}
            >
              PREDICTION INTELLIGENCE
            </div>
          </div>
        </div>

        {/* middle: headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 56, fontWeight: 800, color: "#ffffff", lineHeight: 1.1 }}>
            Tahmin piyasalarında
          </div>
          <div
            style={{
              fontSize: 56,
              fontWeight: 800,
              lineHeight: 1.1,
              color: "#00d4aa",
            }}
          >
            edge'ini bul.
          </div>
        </div>

        {/* bottom: feature chips */}
        <div style={{ display: "flex", gap: 16 }}>
          {["Risk Skoru", "Arbitraj Tarayıcı", "Kelly Hesaplayıcı", "Canlı CLOB"].map(
            (f) => (
              <div
                key={f}
                style={{
                  display: "flex",
                  fontSize: 26,
                  fontWeight: 600,
                  color: "#9da1b3",
                  padding: "14px 26px",
                  borderRadius: 14,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {f}
              </div>
            )
          )}
        </div>
      </div>
    ),
    { ...size }
  );
}
