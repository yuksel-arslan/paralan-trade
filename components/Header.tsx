// @ts-nocheck
"use client";
import { Icon, icons } from "./icons";
import { Theme, mono, timeAgo } from "./theme";

interface HeaderProps {
  t: Theme; dark: boolean; setDark: (v:boolean)=>void;
  lastUpdate: Date|null; refreshRate: number; setRefreshRate: (v:number)=>void;
  bankroll: number; setBankroll: (v:number)=>void;
  clobCount: number;
}

export default function Header({ t, dark, setDark, lastUpdate, refreshRate, setRefreshRate, bankroll, setBankroll, clobCount }: HeaderProps) {
  return (
    <div style={{position:"sticky",top:0,zIndex:50,background:t.header,backdropFilter:"blur(20px)",borderBottom:`1px solid ${t.border}`}}>
      <div className="max-w-[1280px] mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between">
        {/* Left: Brand + status */}
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          {/* Logo + brand group */}
          <div className="flex items-center gap-1.5 sm:gap-3 min-w-0">
            <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-md sm:rounded-lg font-extrabold text-[13px] sm:text-[17px] shrink-0" style={{fontFamily:mono,background:`linear-gradient(135deg,${t.accent},${t.blue})`,color:dark?"#000":"#fff",letterSpacing:"-0.04em"}}>PPI</div>
            <div className="min-w-0">
              <h1 className="gradient-text text-[14px] sm:text-[22px] font-extrabold m-0 leading-none whitespace-nowrap" style={{fontFamily:mono,background:`linear-gradient(135deg,${t.accent},${t.blue})`}}>PARALAN.TRADE</h1>
              <div className="text-[6.5px] sm:text-[10px] font-semibold leading-none mt-0.5 sm:mt-1 whitespace-nowrap" style={{color:t.dim,fontFamily:mono,letterSpacing:"0.12em"}}>PREDICTION INTELLIGENCE</div>
            </div>
          </div>
          {/* Status info — desktop only */}
          <div className="hidden lg:flex items-center gap-1.5 text-[9px] px-2 py-1 rounded-md" style={{color:t.dim,fontFamily:mono,background:t.input,border:`1px solid ${t.border}`}}>
            <Icon d={icons.signal} size={9} color={t.accent}/>{lastUpdate?`${timeAgo(lastUpdate)} önce`:"..."} · {refreshRate}s · CLOB: {clobCount}
          </div>
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Refresh rate - hidden on mobile */}
          <select value={refreshRate} onChange={e=>setRefreshRate(Number(e.target.value))} className="hidden sm:block" style={{padding:"5px 8px",borderRadius:7,border:`1px solid ${t.border}`,background:t.card,color:t.text,fontSize:10,fontFamily:mono,cursor:"pointer",outline:"none"}}>
            <option value={5}>5s</option><option value={10}>10s</option><option value={30}>30s</option><option value={60}>60s</option>
          </select>

          {/* Bankroll - hidden on mobile */}
          <div className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg" style={{background:t.input,border:`1px solid ${t.border}`}}>
            <Icon d={icons.wallet} size={13} color={t.dim}/>
            <span style={{fontSize:10,color:t.dim}}>$</span>
            <input type="number" value={bankroll} onChange={e=>setBankroll(Math.max(10,Number(e.target.value)))} style={{width:50,background:"transparent",border:"none",color:t.text,fontSize:12,fontFamily:mono,fontWeight:600,outline:"none",textAlign:"right"}}/>
          </div>

          {/* Live badge */}
          <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-semibold" style={{background:t.accentSoft,color:t.accent}}>
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{background:t.accent}}/> <span className="hidden sm:inline">CANLI</span><span className="sm:hidden">●</span>
          </div>

          {/* Theme toggle */}
          <button onClick={()=>setDark(!dark)} className="w-9 h-9 sm:w-9 sm:h-9 min-w-[36px] min-h-[36px] rounded-lg flex items-center justify-center cursor-pointer" style={{border:`1px solid ${t.border}`,background:t.surface,color:t.text}}>
            {dark?<Icon d={icons.sun} size={17}/>:<Icon d={icons.moon} size={17}/>}
          </button>
        </div>
      </div>
    </div>
  );
}
