// @ts-nocheck
"use client";
import { Theme } from "./theme";

interface AdBannerProps { t: Theme; dark: boolean; }

export default function AdBanner({ t, dark }: AdBannerProps) {
  return (
    <div className="mb-3 py-2.5 px-4 rounded-[10px] text-center flex items-center justify-center text-[10px] tracking-wide min-h-[50px] sm:min-h-[60px]" style={{background:dark?"rgba(255,255,255,0.02)":"rgba(0,0,0,0.02)",border:`1px dashed ${t.border}`,color:`${t.dim}80`,letterSpacing:"0.05em"}}>
      <span className="hidden sm:inline">AD SPACE — 728×90 LEADERBOARD</span>
      <span className="sm:hidden">AD SPACE — 320×50</span>
    </div>
  );
}
