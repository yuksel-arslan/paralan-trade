// @ts-nocheck
"use client";
import { Icon, icons } from "./icons";
import { Theme } from "./theme";

interface SearchBarProps {
  t: Theme; search: string; setSearch: (v:string)=>void;
  sort: string; setSort: (v:string)=>void;
  categories: string[]; filterCat: string; setFilterCat: (v:string)=>void;
}

export default function SearchBar({ t, search, setSearch, sort, setSort, categories, filterCat, setFilterCat }: SearchBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-2 mb-3 items-stretch sm:items-center">
      <div className="flex gap-2 flex-1 min-w-0">
        <div className="flex-1 min-w-0 relative">
          <input placeholder="Market ara..." value={search} onChange={e=>setSearch(e.target.value)} className="w-full py-2.5 sm:py-2 pl-9 pr-3 rounded-lg text-[13px] font-sans outline-none" style={{border:`1px solid ${t.border}`,background:t.input,color:t.text}}/>
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2"><Icon d={icons.magnify} size={15} color={t.dim}/></span>
        </div>
        <select value={sort} onChange={e=>setSort(e.target.value)} className="py-2 px-3 rounded-lg text-xs font-sans cursor-pointer outline-none shrink-0" style={{border:`1px solid ${t.border}`,background:t.card,color:t.text}}>
          <option value="risk_score">Risk Skoru</option><option value="volume24hr">24s Hacim</option><option value="liquidity">Likidite</option><option value="closing_soon">Yakında Kapanan</option><option value="spread">Dar Spread</option>
        </select>
      </div>
      <div className="flex gap-1 flex-wrap overflow-x-auto scrollbar-hide">{categories.map(c=>
        <button key={c} onClick={()=>setFilterCat(c)} className="py-1.5 sm:py-1 px-3 rounded-full text-[11px] font-semibold cursor-pointer font-sans whitespace-nowrap min-h-[36px] sm:min-h-0" style={{border:filterCat===c?"none":`1px solid ${t.border}`,background:filterCat===c?t.accent:"transparent",color:filterCat===c?"#000":t.dim}}>{c}</button>
      )}</div>
    </div>
  );
}
