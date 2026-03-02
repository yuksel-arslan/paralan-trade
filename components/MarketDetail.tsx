// @ts-nocheck
"use client";
import { Icon, icons } from "./icons";
import { Theme, mono, fmt$, pct, calcEV, kellyFraction, gradeRank } from "./theme";

interface MarketDetailProps {
  t: Theme; dark: boolean; m: any;
  edgeEstimates: Record<string,number>; setEdgeEstimates: (fn:any)=>void;
  bankroll: number; minEdgePct: number; minGR: number; minLiquidity: number;
}

export default function MarketDetail({ t, dark, m, edgeEstimates, setEdgeEstimates, bankroll, minEdgePct, minGR, minLiquidity }: MarketDetailProps) {
  const myEst=edgeEstimates[m.id]??Math.round(m.yesPrice*100), myProb=myEst/100, edge=myProb-m.yesPrice, ev=calcEV(myProb,m.yesPrice), kf=kellyFraction(myProb,m.yesPrice), bet=bankroll*kf, profit=bet*((1-m.yesPrice)/m.yesPrice);
  const isEV=ev>0&&edge>=minEdgePct/100, isGrade=(gradeRank[m.riskGrade.g]||0)>=minGR, isLiq=m.liquidity>=minLiquidity, ok=isEV&&isGrade&&isLiq;

  return (
    <div className="border-b p-3 md:p-4 md:pl-12" style={{borderColor:t.border,background:dark?"rgba(255,255,255,0.015)":"rgba(0,0,0,0.01)"}}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Market Info */}
        <div>
          <div className="text-[10px] font-bold mb-1.5 tracking-wide" style={{color:t.dim,letterSpacing:"0.05em"}}>MARKET BİLGİSİ</div>
          <p className="text-xs leading-relaxed m-0 max-h-[70px] overflow-hidden" style={{color:t.dim}}>{m.description?.slice(0,220)}</p>
          {m.clobFresh&&<div className="mt-2 grid grid-cols-2 gap-1">{[{l:"CLOB Mid",v:pct(m.clobMid),c:t.accent},{l:"Spread",v:m.clobSpread!==null?`${(m.clobSpread*100).toFixed(2)}¢`:"-",c:m.clobSpread<0.02?t.green:t.yellow}].map(s=><div key={s.l} className="p-1.5 rounded-md" style={{background:dark?"rgba(255,255,255,0.03)":"rgba(0,0,0,0.02)"}}><div className="text-[8px]" style={{color:t.dim}}>{s.l}</div><div className="text-xs font-semibold font-mono" style={{color:s.c||t.text}}>{s.v}</div></div>)}</div>}
        </div>

        {/* Stats */}
        <div>
          <div className="text-[10px] font-bold mb-1.5 tracking-wide" style={{color:t.dim,letterSpacing:"0.05em"}}>İSTATİSTİKLER</div>
          <div className="grid grid-cols-2 gap-1.5">{[{l:"Evet",v:pct(m.yesPrice),c:t.green},{l:"Hayır",v:pct(m.noPrice),c:t.red},{l:"Likidite",v:fmt$(m.liquidity)},{l:"Kaynak",v:m.dataSource==="clob"?"CLOB":"Gamma",c:m.dataSource==="clob"?t.accent:t.dim}].map(s=><div key={s.l} className="p-2 rounded-md" style={{background:dark?"rgba(255,255,255,0.03)":"rgba(0,0,0,0.02)"}}><div className="text-[8px]" style={{color:t.dim}}>{s.l}</div><div className="text-xs font-semibold font-mono" style={{color:s.c||t.text}}>{s.v}</div></div>)}</div>
        </div>

        {/* Prediction & Verdict */}
        <div>
          <div className="text-[10px] font-bold mb-1.5 flex items-center gap-1 tracking-wide" style={{color:t.dim,letterSpacing:"0.05em"}}><Icon d={icons.trendUp} size={11} color={t.dim}/>TAHMİN & KARAR</div>
          <div className="grid gap-1.5">
            <div className="p-2 rounded-lg" style={{background:dark?"rgba(255,255,255,0.03)":"rgba(0,0,0,0.02)"}}>
              <div className="flex justify-between mb-1"><span className="text-[9px]" style={{color:t.dim}}>Olasılık Tahminin</span><span className="font-mono text-[13px] font-bold" style={{color:edge>0?t.green:t.red}}>%{myEst}</span></div>
              <input type="range" min={1} max={99} value={myEst} onChange={e=>setEdgeEstimates(p=>({...p,[m.id]:Number(e.target.value)}))} className="w-full" style={{accentColor:edge>0?t.green:t.red,height:4}}/>
              <div className="flex justify-between text-[9px] mt-0.5" style={{color:t.dim}}><span>Market: {pct(m.yesPrice)}</span><span>Edge: {(edge*100).toFixed(1)}%</span></div>
            </div>
            <div className="p-2.5 rounded-lg" style={{background:ok?`${t.green}12`:`${t.red}12`,border:`1px solid ${ok?t.green:t.red}30`}}>
              <div className="text-xs font-extrabold flex items-center gap-1.5" style={{color:ok?t.green:t.red}}>{ok?<Icon d={icons.check} size={16} color={t.green}/>:<Icon d={icons.xCircle} size={16} color={t.red}/>}{ok?"TRADE UYGUN":"TRADE UYGUN DEĞİL"}</div>
              <div className="flex gap-1.5 flex-wrap mt-1">{[{ok:isEV,l:`EV:${(ev*100).toFixed(1)}%`},{ok:isGrade,l:`Risk:${m.riskGrade.g}`},{ok:isLiq,l:`Lik:${fmt$(m.liquidity)}`}].map(c=><span key={c.l} className="text-[9px] font-semibold px-1.5 py-0.5 rounded font-mono" style={{background:c.ok?`${t.green}18`:`${t.red}18`,color:c.ok?t.green:t.red}}>{c.ok?"✓":"✗"} {c.l}</span>)}</div>
            </div>
            {ok&&<div className="p-1.5 rounded-md" style={{background:dark?"rgba(255,255,255,0.03)":"rgba(0,0,0,0.02)"}}><div className="text-[9px]" style={{color:t.dim}}>Half-Kelly (${bankroll})</div><div className="text-sm font-bold font-mono" style={{color:t.green}}>${bet.toFixed(0)} → ${profit.toFixed(0)} kâr</div></div>}
            <a href={`https://polymarket.com/event/${m.slug}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 py-2 px-3.5 rounded-lg text-[11px] font-bold no-underline font-sans min-h-[44px] sm:min-h-0" style={{background:ok?t.accent:(dark?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.05)"),color:ok?"#000":t.dim,opacity:ok?1:0.6}}>{ok?"Open Trade":"Inspect"} <Icon d={icons.arrowRight} size={13} color={ok?"#000":t.dim}/></a>
          </div>
        </div>
      </div>
    </div>
  );
}
