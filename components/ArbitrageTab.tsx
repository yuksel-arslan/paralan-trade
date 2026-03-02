// @ts-nocheck
"use client";
import { Icon, icons } from "./icons";
import { Theme, mono, fmt$, pct } from "./theme";

interface ArbitrageTabProps {
  t: Theme; dark: boolean; arbOpps: any[];
}

export default function ArbitrageTab({ t, dark, arbOpps }: ArbitrageTabProps) {
  return (
    <div>
      <div className="p-3 sm:p-4 rounded-[10px] mb-3.5 text-xs font-medium leading-relaxed flex items-center gap-2" style={{background:t.accentSoft,border:`1px solid ${t.accent}30`,color:t.accent}}>
        <Icon d={icons.bolt} size={18} color={t.accent}/> Çok sonuçlu eventlerde olasılık toplamı sapmaları. Sapma büyükse → potansiyel arbitraj.
      </div>
      {arbOpps.length===0 ? (
        <div className="p-10 text-center" style={{color:t.dim,background:t.card,borderRadius:14,border:`1px solid ${t.border}`}}>
          <Icon d={icons.sparkles} size={32} color={t.dim}/><div className="mt-2">Arbitraj fırsatı bulunamadı</div>
        </div>
      ) : (
        <div className="grid gap-2.5">{arbOpps.map(arb=>(
          <div key={arb.id} className="p-3 sm:p-4 rounded-xl" style={{background:t.card,border:`1px solid ${t.border}`}}>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2.5">
              <div>
                <h3 className="text-sm font-bold m-0">{arb.title}</h3>
                <div className="text-[11px] mt-0.5" style={{color:t.dim}}>{arb.markets.length} market · Σ Evet: {(arb.sumYes*100).toFixed(1)}%</div>
              </div>
              <div className="self-start px-2.5 py-1 rounded-md font-mono text-xs font-bold" style={{background:arb.deviation>0.03?t.accentSoft:`${t.yellow}15`,color:arb.deviation>0.03?t.accent:t.yellow}}>Sapma: {(arb.deviation*100).toFixed(1)}%</div>
            </div>
            <div className="grid gap-1">{arb.markets.slice(0,8).map(mk=>(
              <div key={mk.id} className="flex items-center gap-2 p-1.5 sm:p-2 rounded-md text-xs" style={{background:dark?"rgba(255,255,255,0.02)":"rgba(0,0,0,0.015)"}}>
                <div className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap" style={{color:t.dim}}>{mk.question}</div>
                <div className="font-mono font-semibold min-w-[50px] text-right" style={{color:mk.yesPrice>0.5?t.green:t.blue}}>{pct(mk.yesPrice)}</div>
                <div className="font-mono text-[10px] min-w-[55px] text-right hidden sm:block" style={{color:mk.liquidity>100000?t.dim:t.red}}>{fmt$(mk.liquidity)}</div>
              </div>
            ))}</div>
            {arb.sumYes>1.02&&<div className="mt-2 p-2 rounded-md text-[11px] leading-relaxed flex items-start gap-1.5" style={{background:t.accentSoft,color:t.accent}}><Icon d={icons.sparkles} size={14} color={t.accent} style={{flexShrink:0,marginTop:2}}/>Toplam &gt;100% → Tüm sonuçlara "Hayır" al → kâr ~{((arb.sumYes-1)*100).toFixed(1)}¢/kontrat</div>}
            {arb.sumYes<0.98&&<div className="mt-2 p-2 rounded-md text-[11px] leading-relaxed flex items-start gap-1.5" style={{background:t.accentSoft,color:t.accent}}><Icon d={icons.sparkles} size={14} color={t.accent} style={{flexShrink:0,marginTop:2}}/>Toplam &lt;100% → Tüm sonuçlara "Evet" al → kâr ~{((1-arb.sumYes)*100).toFixed(1)}¢/kontrat</div>}
          </div>
        ))}</div>
      )}
    </div>
  );
}
