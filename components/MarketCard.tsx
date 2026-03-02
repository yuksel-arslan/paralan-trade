// @ts-nocheck
"use client";
import { Icon, IconSolid, icons } from "./icons";
import { Theme, mono, fmt$, pct } from "./theme";

interface MarketCardProps {
  t: Theme; m: any; idx: number;
  isOpen: boolean; isWatched: boolean;
  onSelect: ()=>void; onToggleWatch: ()=>void;
}

export default function MarketCard({ t, m, idx, isOpen, isWatched, onSelect, onToggleWatch }: MarketCardProps) {
  const rg = m.riskGrade;
  return (
    <div className="border-b" style={{borderColor:t.border}} onClick={onSelect}>
      <div className="p-3 cursor-pointer active:opacity-80 transition-opacity">
        {/* Top row: Risk badge + watchlist + days left */}
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center justify-center w-7 h-7 rounded-md text-xs font-extrabold font-mono" style={{background:`${rg.c}15`,color:rg.c}}>{rg.g}</div>
            <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded" style={{background:`${m.category.color}18`,color:m.category.color}}>{m.category.icon} {m.category.label}</span>
            {m.clobFresh&&<span className="text-[8px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5" style={{background:`${t.accent}20`,color:t.accent}}><Icon d={icons.bolt} size={8} color={t.accent}/>CLOB</span>}
          </div>
          <div className="flex items-center gap-2">
            {m.daysLeft<999&&<span className="text-[10px] font-mono flex items-center gap-1" style={{color:m.daysLeft<7?t.yellow:t.dim}}>{m.daysLeft<7&&<Icon d={icons.clock} size={10} color={t.yellow}/>}{m.daysLeft}g</span>}
            <div onClick={e=>{e.stopPropagation();onToggleWatch();}} className="p-1 min-w-[28px] min-h-[28px] flex items-center justify-center">
              {isWatched?<IconSolid d={icons.starSolid} size={16} color={t.yellow}/>:<Icon d={icons.star} size={16} color={t.dim} sw={1}/>}
            </div>
          </div>
        </div>

        {/* Question */}
        <div className="text-[13px] font-semibold mb-2 leading-snug line-clamp-2">{m.question}</div>

        {/* Stats 2x2 grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] mb-2">
          <div className="flex justify-between">
            <span style={{color:t.dim}}>Olas:</span>
            <span className="font-bold font-mono" style={{color:m.yesPrice>=0.7?t.green:m.yesPrice<=0.3?t.red:t.blue}}>{pct(m.yesPrice)}</span>
          </div>
          <div className="flex justify-between">
            <span style={{color:t.dim}}>Spread:</span>
            <span className="font-semibold font-mono" style={{color:m.clobSpread!==null?(m.clobSpread<0.01?t.green:m.clobSpread<0.03?t.yellow:t.red):t.dim}}>{m.clobSpread!==null?`${(m.clobSpread*100).toFixed(1)}¢`:"—"}</span>
          </div>
          <div className="flex justify-between">
            <span style={{color:t.dim}}>24s:</span>
            <span className="font-medium font-mono">{fmt$(m.volume24h)}</span>
          </div>
          <div className="flex justify-between">
            <span style={{color:t.dim}}>Likidite:</span>
            <span className="font-medium font-mono" style={{color:m.liquidity>100000?t.green:m.liquidity>10000?t.yellow:t.red}}>{fmt$(m.liquidity)}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 rounded-full w-full" style={{background:`${t.dim}20`}}>
          <div className="h-full rounded-full transition-all" style={{width:`${m.yesPrice*100}%`,background:m.yesPrice>=0.7?t.green:m.yesPrice<=0.3?t.red:t.blue}}/>
        </div>
      </div>
    </div>
  );
}
