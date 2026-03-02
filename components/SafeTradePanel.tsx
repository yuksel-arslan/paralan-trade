// @ts-nocheck
"use client";
import { Icon, icons } from "./icons";
import { Theme, mono, riskGrade } from "./theme";

interface SafeTradePanelProps {
  t: Theme; dark: boolean;
  safeMode: boolean; setSafeMode: (v:boolean)=>void;
  showSafePanel: boolean; setShowSafePanel: (v:boolean)=>void;
  minRiskGrade: string; setMinRiskGrade: (v:string)=>void;
  minLiquidity: number; setMinLiquidity: (v:number)=>void;
  minEdgePct: number; setMinEdgePct: (v:number)=>void;
}

export default function SafeTradePanel({ t, dark, safeMode, setSafeMode, showSafePanel, setShowSafePanel, minRiskGrade, setMinRiskGrade, minLiquidity, setMinLiquidity, minEdgePct, setMinEdgePct }: SafeTradePanelProps) {
  return (
    <div style={{background:safeMode?(dark?"rgba(0,212,170,0.06)":"rgba(0,168,125,0.05)"):t.card,border:`1px solid ${safeMode?`${t.accent}40`:t.border}`,borderRadius:12,marginBottom:14,overflow:"hidden",transition:"all 0.3s"}}>
      <div onClick={()=>setShowSafePanel(!showSafePanel)} className="flex items-center justify-between px-3 sm:px-4 py-3 cursor-pointer">
        <div className="flex items-center gap-2.5">
          <div onClick={e=>{e.stopPropagation();setSafeMode(!safeMode);}} className="min-w-[44px] min-h-[24px]" style={{width:44,height:24,borderRadius:12,padding:2,background:safeMode?t.accent:(dark?"rgba(255,255,255,0.15)":"rgba(0,0,0,0.15)"),cursor:"pointer",transition:"background 0.2s",display:"flex",alignItems:"center"}}>
            <div style={{width:20,height:20,borderRadius:10,background:"#fff",transform:safeMode?"translateX(20px)":"translateX(0)",transition:"transform 0.2s",boxShadow:"0 1px 3px rgba(0,0,0,0.2)"}}/>
          </div>
          <div>
            <div className="text-xs sm:text-[13px] font-bold flex items-center gap-1.5" style={{color:safeMode?t.accent:t.dim}}>
              <Icon d={icons.shield} size={15} color={safeMode?t.accent:t.dim}/> Güvenli Trade Modu {safeMode?"AKTİF":"KAPALI"}
            </div>
            <div className="text-[9px] sm:text-[10px]" style={{color:t.dim}}>{safeMode?"Pozitif EV + yüksek likidite + düşük risk filtresi":"Tüm marketler — dikkatli ol"}</div>
          </div>
        </div>
        <span className="text-xs transition-transform duration-200" style={{color:t.dim,transform:showSafePanel?"rotate(180deg)":"rotate(0)",display:"inline-block"}}>▼</span>
      </div>
      {showSafePanel&&safeMode&&(
        <div className="px-3 sm:px-4 pb-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <div className="text-[10px] font-bold mb-1.5 flex items-center gap-1 tracking-wide" style={{color:t.dim,letterSpacing:"0.05em"}}><Icon d={icons.funnel} size={11} color={t.dim}/>MİN. RİSK NOTU</div>
            <div className="flex gap-1">{["A","B","C"].map(g=>{const gc=riskGrade(g==="A"?90:g==="B"?75:60);return(
              <button key={g} onClick={()=>setMinRiskGrade(g)} className="flex-1 py-2.5 sm:py-2 rounded-lg border-none cursor-pointer font-mono text-sm sm:text-base font-extrabold transition-all min-h-[44px] sm:min-h-0" style={{background:minRiskGrade===g?gc.c:(dark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.04)"),color:minRiskGrade===g?"#000":t.dim}}>{g}</button>
            );})}</div>
          </div>
          <div>
            <div className="text-[10px] font-bold mb-1.5 flex items-center gap-1 tracking-wide" style={{color:t.dim,letterSpacing:"0.05em"}}><Icon d={icons.droplet} size={11} color={t.dim}/>MİN. LİKİDİTE</div>
            <div className="flex gap-1">{[{v:50000,l:"$50K"},{v:100000,l:"$100K"},{v:500000,l:"$500K"}].map(o=>(
              <button key={o.v} onClick={()=>setMinLiquidity(o.v)} className="flex-1 py-2.5 sm:py-2 rounded-lg border-none cursor-pointer text-[11px] font-bold font-mono transition-all min-h-[44px] sm:min-h-0" style={{background:minLiquidity===o.v?t.blue:(dark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.04)"),color:minLiquidity===o.v?"#fff":t.dim}}>{o.l}</button>
            ))}</div>
          </div>
          <div>
            <div className="text-[10px] font-bold mb-1.5 flex items-center gap-1 tracking-wide" style={{color:t.dim,letterSpacing:"0.05em"}}><Icon d={icons.trendUp} size={11} color={t.dim}/>MİN. EDGE</div>
            <div className="flex gap-1">{[{v:3,l:"%3"},{v:5,l:"%5"},{v:10,l:"%10"}].map(o=>(
              <button key={o.v} onClick={()=>setMinEdgePct(o.v)} className="flex-1 py-2.5 sm:py-2 rounded-lg border-none cursor-pointer text-[11px] font-bold font-mono transition-all min-h-[44px] sm:min-h-0" style={{background:minEdgePct===o.v?t.yellow:(dark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.04)"),color:minEdgePct===o.v?"#000":t.dim}}>{o.l}</button>
            ))}</div>
          </div>
        </div>
      )}
    </div>
  );
}
