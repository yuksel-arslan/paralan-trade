// @ts-nocheck
"use client";
import { Icon, icons } from "./icons";
import { Theme, mono, kellyFraction, calcEV } from "./theme";

interface CalculatorTabProps {
  t: Theme; dark: boolean;
  bankroll: number; setBankroll: (v:number)=>void;
  calcProb: number; setCalcProb: (v:number)=>void;
  calcPrice: number; setCalcPrice: (v:number)=>void;
}

export default function CalculatorTab({ t, dark, bankroll, setBankroll, calcProb, setCalcProb, calcPrice, setCalcPrice }: CalculatorTabProps) {
  const prob=calcProb/100, price=calcPrice/100, kf=kellyFraction(prob,price), ev=calcEV(prob,price), bet=bankroll*kf;
  const kellyResult={kf,ev,bet,potentialProfit:bet*((1-price)/price),potentialLoss:bet,edge:prob-price};

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
      <div className="p-4 sm:p-5 rounded-xl" style={{background:t.card,border:`1px solid ${t.border}`}}>
        <h3 className="text-[15px] font-bold m-0 mb-4 flex items-center gap-1.5"><Icon d={icons.calculator} size={18} color={t.accent}/>Kelly Criterion & EV</h3>
        {[{label:"Bakiye ($)",value:bankroll,set:setBankroll,min:10,max:100000,step:50},{label:"Senin Tahmin (%)",value:calcProb,set:setCalcProb,min:1,max:99,step:1},{label:"Market Fiyatı (¢)",value:calcPrice,set:setCalcPrice,min:1,max:99,step:1}].map(inp=>(
          <div key={inp.label} className="mb-4">
            <div className="flex justify-between mb-1.5">
              <label className="text-xs font-semibold" style={{color:t.dim}}>{inp.label}</label>
              <span className="font-mono text-[13px] font-bold">{inp.label.includes("$")?`$${inp.value}`:inp.label.includes("¢")?`${inp.value}¢`:`${inp.value}%`}</span>
            </div>
            <input type="range" min={inp.min} max={inp.max} step={inp.step} value={inp.value} onChange={e=>inp.set(Number(e.target.value))} className="w-full" style={{accentColor:t.accent}}/>
          </div>
        ))}
      </div>
      <div className="p-4 sm:p-5 rounded-xl" style={{background:t.card,border:`1px solid ${t.border}`}}>
        <h3 className="text-[15px] font-bold m-0 mb-4 flex items-center gap-1.5"><Icon d={icons.chartBar} size={18} color={t.accent}/>Sonuçlar</h3>
        <div className="p-3.5 rounded-[10px] mb-3.5" style={{background:kellyResult.edge>0?t.accentSoft:t.redSoft,border:`1px solid ${kellyResult.edge>0?t.accent:t.red}30`}}>
          <div className="text-xs font-semibold flex items-center gap-1.5" style={{color:kellyResult.edge>0?t.green:t.red}}>{kellyResult.edge>0?<Icon d={icons.check} size={16} color={t.green}/>:<Icon d={icons.xCircle} size={16} color={t.red}/>}{kellyResult.edge>0?"POZİTİF EDGE":"NEGATİF EDGE — TRADE YAPMA"}</div>
          <div className="font-mono text-xl sm:text-2xl font-extrabold mt-1" style={{color:kellyResult.edge>0?t.green:t.red}}>Edge: {(kellyResult.edge*100).toFixed(1)}%</div>
        </div>
        <div className="grid grid-cols-2 gap-2">{[{l:"Half-Kelly Bahis",v:`$${kellyResult.bet.toFixed(2)}`,d:`Bakiyenin %${(kellyResult.kf*100).toFixed(1)}'i`,c:t.accent},{l:"Beklenen Değer",v:`${(kellyResult.ev*100).toFixed(2)}%`,d:"Her $1 için",c:kellyResult.ev>0?t.green:t.red},{l:"Potansiyel Kâr",v:`$${kellyResult.potentialProfit.toFixed(2)}`,d:"Kazanırsan",c:t.green},{l:"Potansiyel Kayıp",v:`-$${kellyResult.potentialLoss.toFixed(2)}`,d:"Kaybedersen",c:t.red}].map(r=>(
          <div key={r.l} className="p-2.5 sm:p-3 rounded-lg" style={{background:dark?"rgba(255,255,255,0.03)":"rgba(0,0,0,0.02)"}}>
            <div className="text-[10px] mb-0.5" style={{color:t.dim}}>{r.l}</div>
            <div className="text-base sm:text-lg font-bold font-mono" style={{color:r.c}}>{r.v}</div>
            <div className="text-[10px]" style={{color:t.dim}}>{r.d}</div>
          </div>
        ))}</div>
      </div>
    </div>
  );
}
