// @ts-nocheck
"use client";
import { Icon, icons } from "./icons";
import { Theme } from "./theme";

interface DisclaimerProps { t: Theme; dark: boolean; }

export default function Disclaimer({ t, dark }: DisclaimerProps) {
  return (
    <div className="mt-3 p-3 sm:p-4 rounded-xl text-[11px] leading-relaxed" style={{background:dark?"rgba(255,71,87,0.04)":"rgba(230,57,70,0.03)",border:`1px solid ${dark?"rgba(255,71,87,0.12)":"rgba(230,57,70,0.1)"}`,color:t.dim}}>
      <div className="flex items-center gap-1.5 mb-2">
        <Icon d={icons.exclaim} size={16} color={t.red}/>
        <span className="text-xs font-bold" style={{color:t.red}}>Risk Disclaimer</span>
      </div>
      <p className="m-0 mb-1.5">Paralan.trade is an <strong>independent analytical tool</strong> and is <strong>not affiliated with, endorsed by, or sponsored by Polymarket, Kalshi, or any prediction market platform</strong>. Market data is sourced from publicly available APIs.</p>
      <p className="m-0 mb-1.5"><strong>This tool does not constitute financial advice, investment advice, trading advice, or any other sort of advice.</strong> All content is for informational and educational purposes only. The "Trade Verdict" and "Kelly Calculator" features are mathematical models, not recommendations to buy or sell.</p>
      <p className="m-0 mb-1.5">Prediction markets involve <strong>substantial risk of loss</strong>. Past performance does not guarantee future results. You should not trade with money you cannot afford to lose. <strong>You are solely responsible for your own trading decisions.</strong></p>
      <p className="m-0">Data sources: Polymarket Gamma API (public) and CLOB API (public). Data may be delayed or inaccurate. Paralan makes no guarantee regarding data accuracy, completeness, or timeliness.</p>
    </div>
  );
}
