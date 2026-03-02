// @ts-nocheck
"use client";
import { Icon, icons } from "./icons";
import { Theme } from "./theme";

interface TabNavProps {
  t: Theme; tab: string; setTab: (v:string)=>void; watchlistCount: number;
}

export default function TabNav({ t, tab, setTab, watchlistCount }: TabNavProps) {
  const tabItems = [
    {id:"scanner",label:"Risk Tarayıcı",shortLabel:"Tarayıcı",icon:icons.shield},
    {id:"arbitrage",label:"Arbitraj",shortLabel:"Arbitraj",icon:icons.bolt},
    {id:"calculator",label:"Hesaplayıcı",shortLabel:"Hesap",icon:icons.calculator},
    {id:"watchlist",label:`İzleme (${watchlistCount})`,shortLabel:`İzle (${watchlistCount})`,icon:icons.star},
  ];

  return (
    <div className="flex gap-1 mb-3.5 overflow-x-auto scrollbar-hide rounded-[10px] p-0.5 sm:p-1" style={{background:t.surface,border:`1px solid ${t.border}`}}>
      {tabItems.map(tb=>(
        <button key={tb.id} onClick={()=>setTab(tb.id)} className="flex-1 min-w-[70px] sm:min-w-0 py-2.5 sm:py-2.5 px-2 sm:px-3 rounded-lg border-none cursor-pointer font-sans transition-all flex items-center justify-center gap-1 sm:gap-1.5 min-h-[44px]" style={{background:tab===tb.id?t.accent:"transparent",color:tab===tb.id?"#000":t.dim,fontSize:11,fontWeight:600}}>
          <Icon d={tb.icon} size={15} color={tab===tb.id?"#000":t.dim} sw={tab===tb.id?2:1.5}/>
          <span className="hidden sm:inline">{tb.label}</span>
          <span className="sm:hidden text-[10px]">{tb.shortLabel}</span>
        </button>
      ))}
    </div>
  );
}
