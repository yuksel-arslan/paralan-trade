import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const SITE_URL = "https://www.paralan.trade";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Paralan — Prediction Market Intelligence",
    template: "%s · Paralan.trade",
  },
  description:
    "Tahmin piyasaları için gerçek zamanlı analiz panosu. Risk skoru, arbitraj tarayıcı, Kelly Criterion hesaplayıcı ve canlı CLOB fiyatları. Polymarket verisiyle edge'ini hesapla. Ücretsiz.",
  keywords: [
    "prediction market",
    "tahmin piyasası",
    "polymarket",
    "polymarket analiz",
    "arbitraj",
    "kelly criterion",
    "expected value",
    "risk skoru",
    "CLOB",
    "paralan",
    "trade intelligence",
  ],
  authors: [{ name: "Paralan.trade" }],
  creator: "Paralan.trade",
  applicationName: "Paralan.trade",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Paralan — Prediction Market Intelligence",
    description:
      "Tahmin piyasalarında edge'ini hesapla. Gerçek zamanlı veri, risk analizi, arbitraj tespiti, Kelly hesaplayıcı.",
    url: SITE_URL,
    type: "website",
    siteName: "Paralan.trade",
    locale: "tr_TR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Paralan — Prediction Market Intelligence",
    description:
      "Tahmin piyasalarında edge'ini hesapla. Risk skoru, arbitraj, Kelly criterion — canlı.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "finance",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#08090d",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Paralan.trade",
  url: SITE_URL,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  description:
    "Tahmin piyasaları için gerçek zamanlı analiz panosu: risk skoru, arbitraj tarayıcı, Kelly criterion hesaplayıcı ve canlı CLOB fiyatları.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  inLanguage: "tr",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body>
        {children}
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
