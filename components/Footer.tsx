// @ts-nocheck
"use client";
import { Theme } from "./theme";
import { Icon, icons } from "./icons";
import { SOCIAL, SITE } from "./config";
import Wordmark from "./Wordmark";

interface FooterProps { t: Theme; dark: boolean; }

export default function Footer({ t, dark }: FooterProps) {
  const mono = "'JetBrains Mono',monospace";
  return (
    <div className="mt-3 p-3 sm:p-4 rounded-xl" style={{background:t.card,border:`1px solid ${t.border}`}}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Wordmark t={t} markClass="w-7 h-7" nameClass="text-[12px]" showTagline={false} gap="gap-2"/>
          <span className="text-[10px]" style={{color:t.dim}}>© {new Date().getFullYear()}</span>
        </div>
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[11px]">
          <a href={SOCIAL.telegram} target="_blank" rel="noopener noreferrer" className="no-underline flex items-center gap-1 font-semibold" style={{color:t.accent}}><Icon d={icons.paperAirplane} size={13} color={t.accent}/>Telegram</a>
          <a href="/privacy" className="no-underline" style={{color:t.dim,borderBottom:`1px solid ${t.border}`}}>Privacy Policy</a>
          <a href="/terms" className="no-underline" style={{color:t.dim,borderBottom:`1px solid ${t.border}`}}>Terms of Use</a>
          <a href="/disclaimer" className="no-underline" style={{color:t.dim,borderBottom:`1px solid ${t.border}`}}>Disclaimer</a>
          <a href={`mailto:${SITE.contactEmail}`} className="no-underline" style={{color:t.dim,borderBottom:`1px solid ${t.border}`}}>Contact</a>
        </div>
      </div>
      <div className="mt-2.5 pt-2.5 text-[10px] leading-relaxed" style={{borderTop:`1px solid ${t.border}`,color:`${t.dim}90`}}>
        Paralan.trade is not a registered broker-dealer, financial institution, exchange, or investment advisor. Market data provided by Polymarket public APIs. Not available in jurisdictions where prediction market trading is prohibited. By using this site, you agree to our Terms of Use and acknowledge the risks involved in prediction market trading.
      </div>
    </div>
  );
}
