// @ts-nocheck
"use client";
import { Icon, IconSolid, icons } from "./icons";
import { Theme, mono, fmt$, pct } from "./theme";

interface WatchlistTabProps {
  t: Theme; markets: any[]; watchlist: string[]; toggleWatch: (id:string)=>void;
}

export default function WatchlistTab({ t, markets, watchlist, toggleWatch }: WatchlistTabProps) {
  const watched = markets.filter(m=>watchlist.includes(m.id));

  if(watchlist.length===0) return (
    <div className="p-10 text-center rounded-xl" style={{color:t.dim,background:t.card,border:`1px solid ${t.border}`}}>
      <Icon d={icons.star} size={32} color={t.dim}/>
      <div className="text-sm font-semibold mt-2">İzleme listen boş</div>
      <div className="text-xs">Risk Tarayıcı'da ☆ ikonuna tıkla</div>
    </div>
  );

  return (
    <div className="rounded-xl overflow-hidden" style={{background:t.card,border:`1px solid ${t.border}`}}>
      {watched.map(m => {
        const rg=m.riskGrade;
        return (
          <div key={m.id}>
            {/* Desktop view */}
            <div className="hidden sm:grid items-center py-3.5 px-4 border-b" style={{gridTemplateColumns:"48px 1fr 80px 64px 80px 80px 36px",borderColor:t.border}}>
              <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-[15px] font-extrabold font-mono" style={{background:`${rg.c}15`,color:rg.c}}>{rg.g}</div>
              <div className="min-w-0"><div className="text-[13px] font-semibold overflow-hidden text-ellipsis whitespace-nowrap">{m.question}</div><div className="text-[10px] flex items-center gap-1" style={{color:t.dim}}>{m.category.icon} {m.category.label}{m.clobFresh&&<><Icon d={icons.bolt} size={9} color={t.accent}/>CLOB</>}</div></div>
              <div className="text-right font-mono text-[15px] font-bold" style={{color:m.yesPrice>=0.7?t.green:m.yesPrice<=0.3?t.red:t.blue}}>{pct(m.yesPrice)}</div>
              <div className="text-right font-mono text-[11px]" style={{color:m.clobSpread!==null?(m.clobSpread<0.02?t.green:t.yellow):t.dim}}>{m.clobSpread!==null?`${(m.clobSpread*100).toFixed(1)}¢`:"—"}</div>
              <div className="text-right font-mono text-xs">{fmt$(m.volume24h)}</div>
              <div className="text-right font-mono text-xs" style={{color:m.liquidity>100000?t.green:t.yellow}}>{fmt$(m.liquidity)}</div>
              <div onClick={()=>toggleWatch(m.id)} className="cursor-pointer text-center"><IconSolid d={icons.starSolid} size={16} color={t.yellow}/></div>
            </div>

            {/* Mobile view */}
            <div className="sm:hidden p-3 border-b" style={{borderColor:t.border}}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <div className="inline-flex items-center justify-center w-7 h-7 rounded-md text-xs font-extrabold font-mono" style={{background:`${rg.c}15`,color:rg.c}}>{rg.g}</div>
                  <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded" style={{background:`${m.category.color}18`,color:m.category.color}}>{m.category.icon} {m.category.label}</span>
                </div>
                <div onClick={()=>toggleWatch(m.id)} className="p-1 min-w-[28px] min-h-[28px] flex items-center justify-center cursor-pointer"><IconSolid d={icons.starSolid} size={16} color={t.yellow}/></div>
              </div>
              <div className="text-[13px] font-semibold mb-2 leading-snug">{m.question}</div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px]">
                <div className="flex justify-between"><span style={{color:t.dim}}>Olas:</span><span className="font-bold font-mono" style={{color:m.yesPrice>=0.7?t.green:m.yesPrice<=0.3?t.red:t.blue}}>{pct(m.yesPrice)}</span></div>
                <div className="flex justify-between"><span style={{color:t.dim}}>Spread:</span><span className="font-semibold font-mono" style={{color:m.clobSpread!==null?(m.clobSpread<0.02?t.green:t.yellow):t.dim}}>{m.clobSpread!==null?`${(m.clobSpread*100).toFixed(1)}¢`:"—"}</span></div>
                <div className="flex justify-between"><span style={{color:t.dim}}>24s:</span><span className="font-medium font-mono">{fmt$(m.volume24h)}</span></div>
                <div className="flex justify-between"><span style={{color:t.dim}}>Likidite:</span><span className="font-medium font-mono" style={{color:m.liquidity>100000?t.green:t.yellow}}>{fmt$(m.liquidity)}</span></div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
