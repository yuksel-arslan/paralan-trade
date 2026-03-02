// @ts-nocheck
"use client";
import { Icon, icons } from "./icons";
import { Theme, mono, fmt$ } from "./theme";

interface StatsGridProps {
  t: Theme; stats: {vol24:number;liq:number;count:number;clobCount:number};
  safeMode: boolean; safeCount: number; arbCount: number;
}

export default function StatsGrid({ t, stats, safeMode, safeCount, arbCount }: StatsGridProps) {
  const items = [
    {l:"24s Hacim",v:fmt$(stats.vol24),ic:icons.chartBar,col:t.blue},
    {l:"Toplam Likidite",v:fmt$(stats.liq),ic:icons.droplet,col:t.accent},
    {l:"Aktif Market",v:stats.count,ic:icons.cube,col:t.yellow},
    {l:"CLOB Gerçek Zamanlı",v:`${stats.clobCount} market`,ic:icons.bolt,col:"#ff922b"},
    {l:safeMode?"Güvenli Market":"Arbitraj Fırsatı",v:safeMode?safeCount:arbCount,ic:safeMode?icons.shield:icons.sparkles,col:safeMode?t.green:t.red},
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-2.5 mb-3">
      {items.map((s,i) => (
        <div key={s.l} className={i===4?"col-span-2 sm:col-span-1":""} style={{background:t.card,border:`1px solid ${t.border}`,borderRadius:12,padding:"10px 12px"}}>
          <div className="flex items-center gap-1.5 text-[10px] font-medium mb-1" style={{color:t.dim}}>
            <Icon d={s.ic} size={13} color={s.col}/>{s.l}
          </div>
          <div className="text-lg sm:text-xl font-bold tracking-tight" style={{fontFamily:mono}}>{s.v}</div>
        </div>
      ))}
    </div>
  );
}
