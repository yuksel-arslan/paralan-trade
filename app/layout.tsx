import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Paralan — Prediction Market Intelligence",
  description: "Real-time prediction market analytics dashboard. CLOB prices, risk scoring, arbitrage scanner, Kelly criterion calculator. Free and open.",
  openGraph: {
    title: "Paralan — Prediction Market Intelligence",
    description: "Find your edge in prediction markets. Real-time data, risk analysis, arbitrage detection.",
    type: "website",
    siteName: "Paralan.trade",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
