// ─────────────────────────────────────────────────────────────
// Central config — edit affiliate codes / links in ONE place.
// "Park it" model: leave codes empty until you have them; links
// stay clean. Fill a code later and every CTA updates automatically.
// ─────────────────────────────────────────────────────────────

export const SITE = {
  url: "https://www.paralan.trade",
  name: "Paralan.trade",
  tagline: "Prediction Market Intelligence",
  contactEmail: "hello@paralan.trade",
};

export const SOCIAL = {
  // Telegram bot/channel that broadcasts signals
  telegram: "https://t.me/ParalanTradeBot",
  telegramHandle: "@ParalanTradeBot",
};

export const AFFILIATE = {
  // Polymarket referral code — fill when eligible ($10k volume gate).
  // Empty string = plain links, no tracking.
  polymarketRef: "",
  // Optional crypto-exchange affiliate links (no volume gate, work in TR).
  // Leave empty to hide the partner row in the footer.
  binanceRef: "",
  bybitRef: "",
};

// Build a Polymarket event URL, appending the referral param only if set.
export function polymarketUrl(slug: string) {
  const base = `https://polymarket.com/event/${slug}`;
  return AFFILIATE.polymarketRef ? `${base}?via=${AFFILIATE.polymarketRef}` : base;
}
