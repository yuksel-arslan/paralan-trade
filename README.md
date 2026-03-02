# Paralan.trade — Prediction Market Intelligence

Real-time prediction market analytics dashboard with risk scoring, arbitrage detection, and Kelly Criterion calculator.

## Features

- 🛡 **Safe Trade Mode** — Risk grade, liquidity, and edge filters
- ⚡ **CLOB Real-Time Data** — Top 5 markets via Polymarket CLOB API
- 📐 **Trade Verdict** — Per-market EV/Kelly analysis with probability slider
- 🔥 **Arbitrage Scanner** — Multi-outcome event probability deviations
- 🧮 **Kelly Calculator** — Half-Kelly position sizing
- ⭐ **Watchlist** — Track your favorite markets
- 🌓 **Dark/Light Themes** — Outfit + JetBrains Mono fonts
- 📱 **Responsive** — Works on all devices
- 🎯 **Heroicons** — 42 inline SVG icons throughout

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript + React 19
- **Styling:** Tailwind CSS v4
- **Data:** Polymarket Gamma API + CLOB API
- **Deploy:** Vercel
- **Fonts:** Outfit (UI) + JetBrains Mono (numbers)

## Quick Start

```bash
npm install
npm run dev
# Open http://localhost:3000
```

## Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Then add `paralan.trade` as custom domain in Vercel → Settings → Domains.

## DNS Setup (Cloudflare)

| Type  | Name | Target               | Proxy  |
|-------|------|----------------------|--------|
| CNAME | @    | cname.vercel-dns.com | DNS only |
| CNAME | www  | cname.vercel-dns.com | DNS only |

## Legal

- `/privacy` — Privacy Policy
- `/terms` — Terms of Use
- `/disclaimer` — Risk Disclaimer

## License

MIT

## Disclaimer

This tool is for informational purposes only and does not constitute financial advice. Prediction markets involve substantial risk of loss. Not affiliated with Polymarket.
