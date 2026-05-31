// @ts-nocheck
"use client";
import { Theme, mono } from "./theme";

// ─── Official brand kit (public/brand/paralan-*.svg) ───
// Exact mark geometry + colors + motto from the zip, reproduced inline
// so it uses the page font and adapts "PARALAN" to the active theme.
export const BRAND = {
  gradient: ["#4F7BF7", "#24C8E6", "#2FE6A6"], // pg stops 0% / 52% / 100%
  trade: "#2FE6A6",   // ".TRADE" accent
  tagline: "#7E8B99", // motto color
  motto: "PREDICTION INTELLIGENCE",
};

export function Mark({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={`shrink-0 ${className}`} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="pg-wm" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={BRAND.gradient[0]} />
          <stop offset="52%" stopColor={BRAND.gradient[1]} />
          <stop offset="100%" stopColor={BRAND.gradient[2]} />
        </linearGradient>
      </defs>
      <rect width="100" height="100" rx="22" fill="url(#pg-wm)" />
      <g fill="none" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M38 22 L50 33 L62 22" />
        <path d="M38 22 L50 33 L62 22" transform="rotate(120 50 50)" />
        <path d="M38 22 L50 33 L62 22" transform="rotate(240 50 50)" />
      </g>
      <circle cx="50" cy="50" r="6.5" fill="#ffffff" />
    </svg>
  );
}

interface WordmarkProps {
  t: Theme;
  markClass?: string;
  nameClass?: string;
  tagClass?: string;
  showTagline?: boolean;
  gap?: string;
}

export default function Wordmark({
  t,
  markClass = "w-8 h-8 sm:w-10 sm:h-10",
  nameClass = "text-[14px] sm:text-[22px]",
  tagClass = "text-[6.5px] sm:text-[10px]",
  showTagline = true,
  gap = "gap-1.5 sm:gap-3",
}: WordmarkProps) {
  return (
    <div className={`flex items-center ${gap} min-w-0`}>
      <Mark className={markClass} />
      <div className="min-w-0 leading-none">
        <div className={`font-extrabold whitespace-nowrap ${nameClass}`} style={{ fontFamily: mono, letterSpacing: "-0.02em" }}>
          <span style={{ color: t.text }}>PARALAN</span>
          <span style={{ color: BRAND.trade }}>.TRADE</span>
        </div>
        {showTagline && (
          <div className={`font-semibold whitespace-nowrap mt-0.5 sm:mt-1 ${tagClass}`} style={{ color: BRAND.tagline, fontFamily: mono, letterSpacing: "0.12em" }}>
            {BRAND.motto}
          </div>
        )}
      </div>
    </div>
  );
}
