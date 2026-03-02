// @ts-nocheck
"use client";
import { useState, useEffect, useCallback, useRef, useMemo } from "react";

// ─── Heroicons (inline SVG, 24px outline) ───
const Icon = ({d,size=20,color="currentColor",sw=1.5,...props}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={sw} stroke={color} width={size} height={size} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d={d}/>
  </svg>
);
const IconSolid = ({d,size=20,color="currentColor",...props}) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={color} width={size} height={size} {...props}><path fillRule="evenodd" d={d} clipRule="evenodd"/></svg>
);

// Heroicon paths
const icons = {
  shield: "M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z",
  shieldCheck: "M12 2.25c-4.97 0-9.39 2.602-11.872 6.516a.75.75 0 0 0 .218 1.037 19.492 19.492 0 0 0 5.17 2.584.75.75 0 0 0 .762-.152l3.51-3.51a.75.75 0 0 1 1.06 0l3.51 3.51a.75.75 0 0 0 .762.152 19.494 19.494 0 0 0 5.17-2.584.75.75 0 0 0 .218-1.037A13.46 13.46 0 0 0 12 2.25Z",
  magnify: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z",
  chartBar: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z",
  bolt: "m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z",
  calculator: "M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z",
  star: "M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z",
  starSolid: "M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z",
  sun: "M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z",
  moon: "M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z",
  wallet: "M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3",
  signal: "M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z",
  arrowPath: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.992 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182M21.015 4.356v4.992",
  funnel: "M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z",
  fire: "M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z",
  clock: "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  droplet: "M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418",
  trendUp: "M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941",
  check: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  xCircle: "m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  exclaim: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z",
  arrowRight: "M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3",
  cube: "m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9",
  sparkles: "M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z",
  bars: "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5",
  link: "M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244",
};

// ─── Logo ───
const Logo = ({size=38,dark=true}) => {
  const g1=dark?"#00d4aa":"#00a87d", g2=dark?"#5b7fff":"#4361ee";
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="lg1" x1="0" y1="0" x2="48" y2="48"><stop stopColor={g1}/><stop offset="1" stopColor={g2}/></linearGradient>
        <linearGradient id="lg2" x1="10" y1="8" x2="38" y2="40"><stop stopColor="#fff" stopOpacity="0.95"/><stop offset="1" stopColor="#fff" stopOpacity="0.7"/></linearGradient>
        <filter id="glow"><feGaussianBlur stdDeviation="1.5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      {/* Background — chamfered rectangle */}
      <rect x="3" y="3" width="42" height="42" rx="11" fill="url(#lg1)"/>
      <rect x="3" y="3" width="42" height="42" rx="11" fill="url(#lg1)" opacity="0.35" filter="url(#glow)"/>
      <rect x="6" y="6" width="36" height="36" rx="8" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5"/>
      {/* Sharp upward blade — the "edge" */}
      <g filter="url(#glow)">
        <path d="M12 36 L24 10 L28 10 L16 36 Z" fill="url(#lg2)" opacity="0.9"/>
        <path d="M22 36 L34 14 L38 14 L26 36 Z" fill="url(#lg2)" opacity="0.7"/>
        {/* Horizontal edge line */}
        <line x1="10" y1="28" x2="38" y2="28" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" strokeDasharray="2 1.5"/>
      </g>
      {/* Accent dot at peak */}
      <circle cx="26" cy="10" r="2.2" fill="#fff" opacity="0.85"/>
      <circle cx="26" cy="10" r="4" fill="#fff" opacity="0.15"/>
    </svg>
  );
};

// ─── Helpers ───
const fmt$ = (v) => { const n=Number(v||0); if(n>=1e9) return `$${(n/1e9).toFixed(2)}B`; if(n>=1e6) return `$${(n/1e6).toFixed(2)}M`; if(n>=1e3) return `$${(n/1e3).toFixed(1)}K`; return `$${n.toFixed(0)}`; };
const pct = (p) => `${(Number(p)*100).toFixed(1)}%`;
const timeAgo = (d) => { const h=Math.floor((Date.now()-new Date(d).getTime())/3600000); if(h<1) return `${Math.floor((Date.now()-new Date(d).getTime())/60000)}dk`; if(h<24) return `${h}sa`; return `${Math.floor(h/24)}g`; };
const daysUntil = (d) => Math.max(0, Math.ceil((new Date(d).getTime()-Date.now())/86400000));

// ─── Risk & Edge ───
const calcRiskScore = (m) => {
  let s=0;
  s += m.liquidity>500000?25:m.liquidity>100000?20:m.liquidity>50000?15:m.liquidity>10000?10:5;
  s += m.volume24h>1000000?25:m.volume24h>100000?20:m.volume24h>10000?15:5;
  const p=m.yesPrice; s += (p>0.9||p<0.1)?25:(p>0.8||p<0.2)?20:(p>0.7||p<0.3)?15:8;
  const dl=m.daysLeft; s += (dl>0&&dl<7)?25:dl<30?20:dl<90?15:10;
  if(m.clobFresh) s+=3; if(m.clobSpread!==null&&m.clobSpread<0.02) s+=2;
  return Math.min(100,s);
};
const riskGrade = (s) => { if(s>=85) return {g:"A",c:"#00d4aa",l:"Düşük Risk"}; if(s>=70) return {g:"B",c:"#5b7fff",l:"Orta-Düşük"}; if(s>=55) return {g:"C",c:"#ffc312",l:"Orta"}; if(s>=40) return {g:"D",c:"#ff922b",l:"Orta-Yüksek"}; return {g:"F",c:"#ff4757",l:"Yüksek Risk"}; };
const kellyFraction = (prob,price) => { if(price<=0||price>=1||prob<=0||prob>=1) return 0; const b=(1-price)/price; const k=(prob*b-(1-prob))/b; return Math.max(0,Math.min(k*0.5,0.15)); };
const calcEV = (prob,price) => (price<=0||price>=1)?0:(prob*(1-price))-((1-prob)*price);

const categorize = (q) => {
  const l=q.toLowerCase();
  if(/trump|biden|election|president|congress|senate|democrat|republican|vote|political/.test(l)) return {label:"Politika",color:"#ff6b6b",icon:"🏛"};
  if(/bitcoin|btc|eth|crypto|token|solana|sol|xrp|doge/.test(l)) return {label:"Kripto",color:"#ffd43b",icon:"₿"};
  if(/ai\b|openai|gpt|anthropic|google|apple|microsoft|meta|nvidia|tesla/.test(l)) return {label:"Teknoloji",color:"#5b7fff",icon:"💻"};
  if(/nba|nfl|soccer|football|ufc|sport|championship|fifa|world cup/.test(l)) return {label:"Spor",color:"#51cf66",icon:"⚽"};
  if(/war|iran|china|russia|ukraine|military|nato|israel|khamenei/.test(l)) return {label:"Jeopolitik",color:"#ff922b",icon:"🌍"};
  if(/fed\b|rate|inflation|recession|gdp|stock|s&p|nasdaq|economy|interest/.test(l)) return {label:"Ekonomi",color:"#cc5de8",icon:"📈"};
  return {label:"Diğer",color:"#868e96",icon:"📋"};
};

const Spark = ({data,w=64,h=20,color}) => {
  if(!data||data.length<2) return null;
  const mn=Math.min(...data),mx=Math.max(...data),r=mx-mn||1;
  const pts=data.map((v,i)=>`${(i/(data.length-1))*w},${h-((v-mn)/r)*h}`).join(" ");
  return <svg width={w} height={h}><polyline fill="none" stroke={color} strokeWidth="1.5" points={pts}/></svg>;
};

// ─── Main ───
export default function PolymarketTrader() {
  const [dark,setDark]=useState(true);
  const [markets,setMarkets]=useState([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState(null);
  const [tab,setTab]=useState("scanner");
  const [sort,setSort]=useState("risk_score");
  const [filterCat,setFilterCat]=useState("All");
  const [search,setSearch]=useState("");
  const [selected,setSelected]=useState(null);
  const [watchlist,setWatchlist]=useState([]);
  const [lastUpdate,setLastUpdate]=useState(null);
  const [bankroll,setBankroll]=useState(500);
  const [calcProb,setCalcProb]=useState(65);
  const [calcPrice,setCalcPrice]=useState(45);
  const [stats,setStats]=useState({vol24:0,liq:0,count:0,clobCount:0});
  const [arbOpps,setArbOpps]=useState([]);
  const [safeMode,setSafeMode]=useState(true);
  const [minLiquidity,setMinLiquidity]=useState(100000);
  const [minRiskGrade,setMinRiskGrade]=useState("B");
  const [minEdgePct,setMinEdgePct]=useState(5);
  const [edgeEstimates,setEdgeEstimates]=useState({});
  const [showSafePanel,setShowSafePanel]=useState(true);
  const [refreshRate,setRefreshRate]=useState(10);

  const fetchData = useCallback(async () => {
    try {
      const ctrl=new AbortController(); const to=setTimeout(()=>ctrl.abort(),8000);
      const [mRes,eRes]=await Promise.all([
        fetch(`/api/markets?limit=100&active=true&closed=false&order=volume24hr&ascending=false`,{signal:ctrl.signal}),
        fetch(`/api/events?limit=50&active=true&closed=false&order=volume24hr&ascending=false`,{signal:ctrl.signal}),
      ]);
      clearTimeout(to);
      if(!mRes.ok||!eRes.ok) throw new Error("API hatası");
      const [mData,eData]=await Promise.all([mRes.json(),eRes.json()]);

      const processed=mData.filter(m=>m.question&&m.outcomePrices).map(m=>{
        const prices=JSON.parse(m.outcomePrices||"[]"), yP=Number(prices[0]||0), cat=categorize(m.question), dl=m.endDate?daysUntil(m.endDate):999, tokenIds=JSON.parse(m.clobTokenIds||"[]");
        const spark=Array.from({length:12},()=>Math.max(0,Math.min(1,yP+(Math.random()-0.5)*0.06)));
        spark[spark.length-1]=yP;
        const market={id:m.id,question:m.question,slug:m.slug,yesPrice:yP,noPrice:Number(prices[1]||0),volume:Number(m.volumeNum||0),volume24h:Number(m.volume24hr||0),volume1wk:Number(m.volume1wk||0),liquidity:Number(m.liquidityNum||0),category:cat,endDate:m.endDate,daysLeft:dl,updatedAt:m.updatedAt,sparkline:spark,description:m.description,eventId:m.events?.[0]?.id,tokenId:tokenIds[0]||null,clobMid:null,clobSpread:null,clobFresh:false,dataSource:"gamma"};
        market.riskScore=calcRiskScore(market); market.riskGrade=riskGrade(market.riskScore);
        return market;
      });

      // CLOB real-time for top 5
      let clobMap={};
      try {
        const topTokens=processed.filter(m=>m.tokenId).slice(0,5);
        const ctrl=new AbortController(); const timeout=setTimeout(()=>ctrl.abort(),4000);
        const results=await Promise.allSettled(topTokens.flatMap(m=>[
          fetch(`/api/clob?endpoint=midpoint&token_id=${m.tokenId}`,{signal:ctrl.signal}).then(r=>r.ok?r.json():null).then(d=>({id:m.id,type:"mid",val:d})),
          fetch(`/api/clob?endpoint=spread&token_id=${m.tokenId}`,{signal:ctrl.signal}).then(r=>r.ok?r.json():null).then(d=>({id:m.id,type:"spread",val:d})),
        ]));
        clearTimeout(timeout);
        results.forEach(r=>{if(r.status==="fulfilled"&&r.value){const{id,type,val}=r.value;if(!clobMap[id])clobMap[id]={mid:null,spread:null};if(type==="mid"&&val)clobMap[id].mid=Number(val.mid||0);if(type==="spread"&&val)clobMap[id].spread=Number(val.spread||0);}});
      } catch(e){}

      processed.forEach(m=>{const c=clobMap[m.id];if(c){if(c.mid&&c.mid>0){m.yesPrice=c.mid;m.noPrice=Math.max(0,1-c.mid);m.sparkline[m.sparkline.length-1]=c.mid;m.dataSource="clob";m.clobFresh=true;}m.clobMid=c.mid;m.clobSpread=c.spread;m.riskScore=calcRiskScore(m);m.riskGrade=riskGrade(m.riskScore);}});

      const arbs=[];
      eData.forEach(e=>{if(e.markets&&e.markets.length>1){const mkts=e.markets.map(m=>{const p=JSON.parse(m.outcomePrices||"[]");return{id:m.id,question:m.question,yesPrice:Number(p[0]||0),noPrice:Number(p[1]||0),volume24h:Number(m.volume24hr||0),liquidity:Number(m.liquidityNum||0)};});const sum=mkts.reduce((s,m)=>s+m.yesPrice,0),dev=Math.abs(1-sum);if(dev>0.01)arbs.push({id:e.id,title:e.title,markets:mkts,sumYes:sum,deviation:dev,profitPct:((dev/(sum>1?sum:1))*100).toFixed(2)});}});
      arbs.sort((a,b)=>b.deviation-a.deviation);

      setMarkets(processed);setArbOpps(arbs.slice(0,20));setLastUpdate(new Date());
      setStats({vol24:processed.reduce((s,m)=>s+m.volume24h,0),liq:processed.reduce((s,m)=>s+m.liquidity,0),count:processed.length,clobCount:Object.keys(clobMap).length});
      setError(null);
    } catch(e){
      // Fallback: demo data when API blocked (artifact sandbox)
      if(markets.length===0){
        const demo=[
          {q:"Will Trump win 2028 presidential election?",p:0.42,v24:18200000,vol:312000000,liq:4800000,dl:920,cat:"Politika",slug:"trump-2028"},
          {q:"Bitcoin above $150K by end of 2026?",p:0.31,v24:12500000,vol:198000000,liq:3200000,dl:305,cat:"Kripto",slug:"btc-150k-2026"},
          {q:"Fed rate cut before July 2026?",p:0.68,v24:9800000,vol:142000000,liq:2600000,dl:122,cat:"Ekonomi",slug:"fed-rate-cut-july"},
          {q:"OpenAI IPO in 2026?",p:0.55,v24:7400000,vol:89000000,liq:1800000,dl:305,cat:"Teknoloji",slug:"openai-ipo-2026"},
          {q:"Russia-Ukraine ceasefire by June 2026?",p:0.24,v24:6200000,vol:67000000,liq:1500000,dl:92,cat:"Jeopolitik",slug:"ukraine-ceasefire"},
          {q:"Lakers win 2026 NBA Championship?",p:0.12,v24:5800000,vol:54000000,liq:1200000,dl:122,cat:"Spor",slug:"lakers-nba-2026"},
          {q:"Ethereum above $10K in 2026?",p:0.18,v24:4900000,vol:48000000,liq:980000,dl:305,cat:"Kripto",slug:"eth-10k-2026"},
          {q:"US recession in 2026?",p:0.35,v24:4200000,vol:39000000,liq:870000,dl:305,cat:"Ekonomi",slug:"us-recession-2026"},
          {q:"GPT-5 released before September 2026?",p:0.72,v24:3800000,vol:32000000,liq:720000,dl:183,cat:"Teknoloji",slug:"gpt5-2026"},
          {q:"Iran nuclear deal by 2026?",p:0.15,v24:3100000,vol:28000000,liq:650000,dl:305,cat:"Jeopolitik",slug:"iran-nuclear-2026"},
          {q:"S&P 500 above 7000 by December 2026?",p:0.48,v24:2800000,vol:22000000,liq:580000,dl:275,cat:"Ekonomi",slug:"sp500-7000"},
          {q:"Apple Vision Pro 2 released in 2026?",p:0.62,v24:2200000,vol:18000000,liq:450000,dl:305,cat:"Teknoloji",slug:"vision-pro-2"},
          {q:"Champions League winner: Real Madrid?",p:0.28,v24:1900000,vol:15000000,liq:380000,dl:92,cat:"Spor",slug:"cl-real-madrid"},
          {q:"Solana above $500 in 2026?",p:0.22,v24:1700000,vol:12000000,liq:320000,dl:305,cat:"Kripto",slug:"sol-500"},
          {q:"China Taiwan military action by 2027?",p:0.08,v24:1500000,vol:9800000,liq:280000,dl:670,cat:"Jeopolitik",slug:"china-taiwan"},
        ];
        const processed=demo.map((d,i)=>{
          const cat=categorize(d.q), spark=Array.from({length:12},()=>Math.max(0,Math.min(1,d.p+(Math.random()-0.5)*0.08)));
          spark[spark.length-1]=d.p;
          const m={id:`demo-${i}`,question:d.q,slug:d.slug,yesPrice:d.p,noPrice:1-d.p,volume:d.vol,volume24h:d.v24,volume1wk:d.v24*5,liquidity:d.liq,category:cat,endDate:new Date(Date.now()+d.dl*86400000).toISOString(),daysLeft:d.dl,updatedAt:new Date().toISOString(),sparkline:spark,description:`Demo market data for ${d.q}`,eventId:null,tokenId:null,clobMid:null,clobSpread:i<3?0.005+Math.random()*0.02:null,clobFresh:i<3,dataSource:i<3?"clob":"gamma"};
          m.riskScore=calcRiskScore(m); m.riskGrade=riskGrade(m.riskScore);
          return m;
        });
        setMarkets(processed);setArbOpps([
          {id:"arb-1",title:"2026 NBA Champion",markets:[{id:"a1",question:"Lakers",yesPrice:0.12,noPrice:0.88,volume24h:5800000,liquidity:1200000},{id:"a2",question:"Celtics",yesPrice:0.22,noPrice:0.78,volume24h:4200000,liquidity:980000},{id:"a3",question:"Thunder",yesPrice:0.18,noPrice:0.82,volume24h:3100000,liquidity:750000},{id:"a4",question:"Nuggets",yesPrice:0.15,noPrice:0.85,volume24h:2800000,liquidity:620000},{id:"a5",question:"Others",yesPrice:0.38,noPrice:0.62,volume24h:2100000,liquidity:510000}],sumYes:1.05,deviation:0.05,profitPct:"4.76"},
        ]);
        setLastUpdate(new Date());
        setStats({vol24:processed.reduce((s,m)=>s+m.volume24h,0),liq:processed.reduce((s,m)=>s+m.liquidity,0),count:processed.length,clobCount:3});
        setError("⚡ Demo mode — API sandbox'ta bloklandı. Vercel'e deploy edildiğinde gerçek veri gelecek.");
      } else { setError(e.message); }
    } finally{setLoading(false);}
  },[]);

  useEffect(()=>{fetchData();const iv=setInterval(fetchData,refreshRate*1000);return()=>clearInterval(iv);},[fetchData,refreshRate]);

  const categories=useMemo(()=>["All",...new Set(markets.map(m=>m.category.label))],[markets]);
  const gradeRank={A:5,B:4,C:3,D:2,F:1}, minGR=gradeRank[minRiskGrade]||4;

  const filtered=useMemo(()=>markets.filter(m=>filterCat==="All"||m.category.label===filterCat).filter(m=>!search||m.question.toLowerCase().includes(search.toLowerCase())).filter(m=>{if(!safeMode)return true;if((gradeRank[m.riskGrade.g]||0)<minGR)return false;if(m.liquidity<minLiquidity)return false;const est=edgeEstimates[m.id];if(est!==undefined){if(calcEV(est/100,m.yesPrice)<=0)return false;if((est-m.yesPrice*100)<minEdgePct)return false;}return true;}).sort((a,b)=>{if(sort==="risk_score")return b.riskScore-a.riskScore;if(sort==="volume24hr")return b.volume24h-a.volume24h;if(sort==="liquidity")return b.liquidity-a.liquidity;if(sort==="closing_soon")return a.daysLeft-b.daysLeft;if(sort==="spread")return(a.clobSpread||1)-(b.clobSpread||1);return 0;}),[markets,filterCat,search,sort,safeMode,minLiquidity,minGR,minEdgePct,edgeEstimates]);

  const safeCount=useMemo(()=>markets.filter(m=>(gradeRank[m.riskGrade.g]||0)>=minGR&&m.liquidity>=minLiquidity).length,[markets,minGR,minLiquidity]);
  const toggleWatch=(id)=>setWatchlist(w=>w.includes(id)?w.filter(x=>x!==id):[...w,id]);

  const kellyResult=useMemo(()=>{const prob=calcProb/100,price=calcPrice/100,kf=kellyFraction(prob,price),ev=calcEV(prob,price),bet=bankroll*kf;return{kf,ev,bet,potentialProfit:bet*((1-price)/price),potentialLoss:bet,edge:prob-price};},[bankroll,calcProb,calcPrice]);

  const t=dark?{bg:"#08090d",surface:"#0f1117",card:"#151720",cardHover:"#1a1c2a",border:"rgba(255,255,255,0.06)",text:"#e4e5ea",dim:"#6b6f82",accent:"#00d4aa",accentSoft:"rgba(0,212,170,0.1)",red:"#ff4757",redSoft:"rgba(255,71,87,0.1)",blue:"#5b7fff",yellow:"#ffc312",green:"#00d4aa",input:"rgba(255,255,255,0.04)",header:"rgba(8,9,13,0.92)"}:{bg:"#f4f5f7",surface:"#ffffff",card:"#ffffff",cardHover:"#f8f9fb",border:"rgba(0,0,0,0.08)",text:"#1a1b2e",dim:"#6b7085",accent:"#00a87d",accentSoft:"rgba(0,168,125,0.08)",red:"#e63946",redSoft:"rgba(230,57,70,0.08)",blue:"#4361ee",yellow:"#d4a800",green:"#00a87d",input:"rgba(0,0,0,0.03)",header:"rgba(244,245,247,0.92)"};
  const mono="'JetBrains Mono',monospace";

  const tabItems=[
    {id:"scanner",label:"Risk Tarayıcı",icon:icons.shield},
    {id:"arbitrage",label:"Arbitraj",icon:icons.bolt},
    {id:"calculator",label:"Hesaplayıcı",icon:icons.calculator},
    {id:"watchlist",label:`İzleme (${watchlist.length})`,icon:icons.star},
  ];

  return (
    <div style={{background:t.bg,color:t.text,fontFamily:"'Outfit',sans-serif",minHeight:"100vh"}}>

      {/* ═══ HEADER ═══ */}
      <div style={{position:"sticky",top:0,zIndex:50,background:t.header,backdropFilter:"blur(20px)",borderBottom:`1px solid ${t.border}`}}>
        <div style={{maxWidth:1280,margin:"0 auto",padding:"10px 24px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <Logo size={38} dark={dark}/>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                <h1 style={{fontSize:18,fontWeight:800,margin:0,letterSpacing:"-0.03em",background:`linear-gradient(135deg,${t.accent},${t.blue})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Paralan</h1>
                <span style={{fontSize:11,fontWeight:500,color:t.dim,padding:"2px 7px",borderRadius:4,border:`1px solid ${t.border}`,letterSpacing:"0.04em"}}>PREDICTION INTELLIGENCE</span>
              </div>
              <div style={{fontSize:10,color:t.dim,fontFamily:mono,display:"flex",alignItems:"center",gap:6,marginTop:1}}>
                <Icon d={icons.signal} size={10} color={t.accent}/>{lastUpdate?`${timeAgo(lastUpdate)} önce`:"..."} · {refreshRate}s · CLOB: {stats.clobCount}
              </div>
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <select value={refreshRate} onChange={e=>setRefreshRate(Number(e.target.value))} style={{padding:"5px 8px",borderRadius:7,border:`1px solid ${t.border}`,background:t.card,color:t.text,fontSize:10,fontFamily:mono,cursor:"pointer",outline:"none"}}>
              <option value={5}>5s</option><option value={10}>10s</option><option value={30}>30s</option><option value={60}>60s</option>
            </select>
            <div style={{display:"flex",alignItems:"center",gap:4,padding:"5px 10px",borderRadius:8,background:t.input,border:`1px solid ${t.border}`}}>
              <Icon d={icons.wallet} size={13} color={t.dim}/>
              <span style={{fontSize:10,color:t.dim}}>$</span>
              <input type="number" value={bankroll} onChange={e=>setBankroll(Math.max(10,Number(e.target.value)))} style={{width:50,background:"transparent",border:"none",color:t.text,fontSize:12,fontFamily:mono,fontWeight:600,outline:"none",textAlign:"right"}}/>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:5,padding:"5px 12px",borderRadius:20,background:t.accentSoft,fontSize:11,fontWeight:600,color:t.accent}}>
              <div style={{width:6,height:6,borderRadius:"50%",background:t.accent,animation:"pulse 2s infinite"}}/> CANLI
            </div>
            <button onClick={()=>setDark(!dark)} style={{width:36,height:36,borderRadius:9,border:`1px solid ${t.border}`,background:t.surface,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:t.text}}>
              {dark?<Icon d={icons.sun} size={17}/>:<Icon d={icons.moon} size={17}/>}
            </button>
          </div>
        </div>
      </div>

      <div style={{maxWidth:1280,margin:"0 auto",padding:"16px 24px 40px"}}>

        {/* ═══ STATS ═══ */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:10,marginBottom:12}}>
          {[
            {l:"24s Hacim",v:fmt$(stats.vol24),ic:icons.chartBar,col:t.blue},
            {l:"Toplam Likidite",v:fmt$(stats.liq),ic:icons.droplet,col:t.accent},
            {l:"Aktif Market",v:stats.count,ic:icons.cube,col:t.yellow},
            {l:"CLOB Gerçek Zamanlı",v:`${stats.clobCount} market`,ic:icons.bolt,col:"#ff922b"},
            {l:safeMode?"Güvenli Market":"Arbitraj Fırsatı",v:safeMode?safeCount:arbOpps.filter(a=>a.deviation>0.02).length,ic:safeMode?icons.shield:icons.sparkles,col:safeMode?t.green:t.red},
          ].map(s=>(
            <div key={s.l} style={{background:t.card,border:`1px solid ${t.border}`,borderRadius:12,padding:"12px 14px"}}>
              <div style={{display:"flex",alignItems:"center",gap:5,fontSize:10,color:t.dim,marginBottom:4,fontWeight:500}}>
                <Icon d={s.ic} size={13} color={s.col}/>{s.l}
              </div>
              <div style={{fontSize:19,fontWeight:700,fontFamily:mono,letterSpacing:"-0.02em"}}>{s.v}</div>
            </div>
          ))}
        </div>

        {/* AD BANNER — Top */}
        <div style={{marginBottom:12,padding:"10px 16px",borderRadius:10,background:dark?"rgba(255,255,255,0.02)":"rgba(0,0,0,0.02)",border:`1px dashed ${t.border}`,textAlign:"center",minHeight:60,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:`${t.dim}80`,letterSpacing:"0.05em"}}>
          {/* Replace with: <ins class="adsbygoogle" ... /> or Carbon Ads */}
          AD SPACE — 728×90 LEADERBOARD
        </div>

        {/* SAFE TRADE MODE PANEL */}
        <div style={{background:safeMode?(dark?"rgba(0,212,170,0.06)":"rgba(0,168,125,0.05)"):t.card,border:`1px solid ${safeMode?`${t.accent}40`:t.border}`,borderRadius:12,marginBottom:14,overflow:"hidden",transition:"all 0.3s"}}>
          <div onClick={()=>setShowSafePanel(!showSafePanel)} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 16px",cursor:"pointer"}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div onClick={e=>{e.stopPropagation();setSafeMode(!safeMode);}} style={{width:44,height:24,borderRadius:12,padding:2,background:safeMode?t.accent:(dark?"rgba(255,255,255,0.15)":"rgba(0,0,0,0.15)"),cursor:"pointer",transition:"background 0.2s",display:"flex",alignItems:"center"}}>
                <div style={{width:20,height:20,borderRadius:10,background:"#fff",transform:safeMode?"translateX(20px)":"translateX(0)",transition:"transform 0.2s",boxShadow:"0 1px 3px rgba(0,0,0,0.2)"}}/>
              </div>
              <div>
                <div style={{fontSize:13,fontWeight:700,color:safeMode?t.accent:t.dim,display:"flex",alignItems:"center",gap:5}}>
                  <Icon d={icons.shield} size={15} color={safeMode?t.accent:t.dim}/> Güvenli Trade Modu {safeMode?"AKTİF":"KAPALI"}
                </div>
                <div style={{fontSize:10,color:t.dim}}>{safeMode?"Pozitif EV + yüksek likidite + düşük risk filtresi":"Tüm marketler — dikkatli ol"}</div>
              </div>
            </div>
            <span style={{fontSize:12,color:t.dim,transform:showSafePanel?"rotate(180deg)":"rotate(0)",transition:"transform 0.2s",display:"inline-block"}}>▼</span>
          </div>
          {showSafePanel&&safeMode&&(
            <div style={{padding:"0 16px 16px",display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12}}>
              <div>
                <div style={{fontSize:10,fontWeight:700,color:t.dim,marginBottom:6,letterSpacing:"0.05em",display:"flex",alignItems:"center",gap:4}}><Icon d={icons.funnel} size={11} color={t.dim}/>MİN. RİSK NOTU</div>
                <div style={{display:"flex",gap:4}}>{["A","B","C"].map(g=>{const gc=riskGrade(g==="A"?90:g==="B"?75:60);return(<button key={g} onClick={()=>setMinRiskGrade(g)} style={{flex:1,padding:"8px 0",borderRadius:7,border:"none",cursor:"pointer",fontFamily:mono,fontSize:14,fontWeight:800,transition:"all 0.2s",background:minRiskGrade===g?gc.c:(dark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.04)"),color:minRiskGrade===g?"#000":t.dim}}>{g}</button>);})}</div>
              </div>
              <div>
                <div style={{fontSize:10,fontWeight:700,color:t.dim,marginBottom:6,letterSpacing:"0.05em",display:"flex",alignItems:"center",gap:4}}><Icon d={icons.droplet} size={11} color={t.dim}/>MİN. LİKİDİTE</div>
                <div style={{display:"flex",gap:4}}>{[{v:50000,l:"$50K"},{v:100000,l:"$100K"},{v:500000,l:"$500K"}].map(o=>(<button key={o.v} onClick={()=>setMinLiquidity(o.v)} style={{flex:1,padding:"8px 0",borderRadius:7,border:"none",cursor:"pointer",fontSize:11,fontWeight:700,fontFamily:mono,transition:"all 0.2s",background:minLiquidity===o.v?t.blue:(dark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.04)"),color:minLiquidity===o.v?"#fff":t.dim}}>{o.l}</button>))}</div>
              </div>
              <div>
                <div style={{fontSize:10,fontWeight:700,color:t.dim,marginBottom:6,letterSpacing:"0.05em",display:"flex",alignItems:"center",gap:4}}><Icon d={icons.trendUp} size={11} color={t.dim}/>MİN. EDGE</div>
                <div style={{display:"flex",gap:4}}>{[{v:3,l:"%3"},{v:5,l:"%5"},{v:10,l:"%10"}].map(o=>(<button key={o.v} onClick={()=>setMinEdgePct(o.v)} style={{flex:1,padding:"8px 0",borderRadius:7,border:"none",cursor:"pointer",fontSize:11,fontWeight:700,fontFamily:mono,transition:"all 0.2s",background:minEdgePct===o.v?t.yellow:(dark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.04)"),color:minEdgePct===o.v?"#000":t.dim}}>{o.l}</button>))}</div>
              </div>
            </div>
          )}
        </div>

        {/* ═══ TABS ═══ */}
        <div style={{display:"flex",gap:4,marginBottom:14,background:t.surface,borderRadius:10,padding:3,border:`1px solid ${t.border}`}}>
          {tabItems.map(tb=>(
            <button key={tb.id} onClick={()=>setTab(tb.id)} style={{flex:1,padding:"10px 12px",borderRadius:8,border:"none",background:tab===tb.id?t.accent:"transparent",color:tab===tb.id?"#000":t.dim,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit",transition:"all 0.2s",display:"flex",alignItems:"center",justifyContent:"center",gap:5}}>
              <Icon d={tb.icon} size={15} color={tab===tb.id?"#000":t.dim} sw={tab===tb.id?2:1.5}/>
              {tb.label}
            </button>
          ))}
        </div>

        {error&&<div style={{padding:"10px 16px",borderRadius:10,background:t.redSoft,color:t.red,fontSize:12,fontWeight:500,marginBottom:12,display:"flex",alignItems:"center",justifyContent:"space-between"}}><span style={{display:"flex",alignItems:"center",gap:5}}><Icon d={icons.exclaim} size={16} color={t.red}/>  {error}</span><button onClick={fetchData} style={{padding:"3px 10px",borderRadius:6,border:`1px solid ${t.red}`,background:"transparent",color:t.red,fontSize:11,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:4}}><Icon d={icons.arrowPath} size={13} color={t.red}/>Tekrar</button></div>}

        {/* ═══ SCANNER ═══ */}
        {tab==="scanner"&&(<>
          <div style={{display:"flex",gap:8,marginBottom:12,flexWrap:"wrap",alignItems:"center"}}>
            <div style={{flex:1,minWidth:180,position:"relative"}}>
              <input placeholder="Market ara..." value={search} onChange={e=>setSearch(e.target.value)} style={{width:"100%",padding:"9px 12px 9px 34px",borderRadius:8,border:`1px solid ${t.border}`,background:t.input,color:t.text,fontSize:13,fontFamily:"inherit",outline:"none",boxSizing:"border-box"}}/>
              <span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)"}}><Icon d={icons.magnify} size={15} color={t.dim}/></span>
            </div>
            <select value={sort} onChange={e=>setSort(e.target.value)} style={{padding:"9px 12px",borderRadius:8,border:`1px solid ${t.border}`,background:t.card,color:t.text,fontSize:12,fontFamily:"inherit",cursor:"pointer",outline:"none"}}>
              <option value="risk_score">Risk Skoru</option><option value="volume24hr">24s Hacim</option><option value="liquidity">Likidite</option><option value="closing_soon">Yakında Kapanan</option><option value="spread">Dar Spread</option>
            </select>
            <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{categories.map(c=><button key={c} onClick={()=>setFilterCat(c)} style={{padding:"5px 12px",borderRadius:16,border:filterCat===c?"none":`1px solid ${t.border}`,background:filterCat===c?t.accent:"transparent",color:filterCat===c?"#000":t.dim,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>{c}</button>)}</div>
          </div>

          <div style={{background:t.card,border:`1px solid ${t.border}`,borderRadius:14,overflow:"hidden"}}>
            <div style={{display:"grid",gridTemplateColumns:"32px 1fr 52px 68px 62px 76px 76px 56px 36px",padding:"10px 16px",borderBottom:`1px solid ${t.border}`,fontSize:9,fontWeight:600,color:t.dim,textTransform:"uppercase",letterSpacing:"0.06em",fontFamily:mono}}>
              <div>#</div><div>Market</div><div style={{textAlign:"center"}}>Risk</div><div style={{textAlign:"right"}}>Olas.</div><div style={{textAlign:"right"}}>Spread</div><div style={{textAlign:"right"}}>24s</div><div style={{textAlign:"right"}}>Likidite</div><div style={{textAlign:"right"}}>Kalan</div><div></div>
            </div>

            {loading?Array.from({length:6}).map((_,i)=><div key={i} style={{display:"flex",gap:12,padding:"16px",borderBottom:`1px solid ${t.border}`}}><div style={{flex:1,height:16,borderRadius:4,background:dark?"rgba(255,255,255,0.04)":"rgba(0,0,0,0.04)",animation:"pulse 1.5s infinite"}}></div></div>):
            filtered.length===0?<div style={{padding:40,textAlign:"center",color:t.dim}}>{safeMode?<><Icon d={icons.shield} size={32} color={t.dim}/><div style={{fontSize:13,fontWeight:600,marginTop:8}}>Filtrelere uyan market yok</div><div style={{fontSize:11}}>Filtreleri gevşet veya Güvenli Modu kapat</div></>:"Sonuç bulunamadı"}</div>:
            filtered.map((m,idx)=>{
              const isOpen=selected?.id===m.id, isWatched=watchlist.includes(m.id), rg=m.riskGrade;
              return (
                <div key={m.id}>
                  <div onClick={()=>setSelected(isOpen?null:m)} style={{display:"grid",gridTemplateColumns:"32px 1fr 52px 68px 62px 76px 76px 56px 36px",padding:"12px 16px",borderBottom:`1px solid ${t.border}`,cursor:"pointer",background:isOpen?(dark?"rgba(255,255,255,0.02)":"rgba(0,0,0,0.015)"):"transparent",alignItems:"center",transition:"background 0.15s"}} onMouseEnter={e=>!isOpen&&(e.currentTarget.style.background=t.cardHover)} onMouseLeave={e=>!isOpen&&(e.currentTarget.style.background="transparent")}>
                    <div style={{fontFamily:mono,fontSize:11,color:t.dim}}>{idx+1}</div>
                    <div style={{minWidth:0}}>
                      <div style={{fontSize:13,fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",marginBottom:3}}>{m.question}</div>
                      <div style={{display:"flex",gap:5,alignItems:"center"}}>
                        <span style={{fontSize:9,fontWeight:600,padding:"1px 6px",borderRadius:3,background:`${m.category.color}18`,color:m.category.color}}>{m.category.icon} {m.category.label}</span>
                        {m.clobFresh&&<span style={{fontSize:8,fontWeight:700,padding:"1px 5px",borderRadius:3,background:`${t.accent}20`,color:t.accent,display:"flex",alignItems:"center",gap:2}}><Icon d={icons.bolt} size={8} color={t.accent}/>CLOB</span>}
                      </div>
                    </div>
                    <div style={{textAlign:"center"}}><div style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:28,height:28,borderRadius:7,background:`${rg.c}15`,color:rg.c,fontSize:13,fontWeight:800,fontFamily:mono}}>{rg.g}</div></div>
                    <div style={{textAlign:"right"}}><div style={{fontSize:14,fontWeight:700,fontFamily:mono,color:m.yesPrice>=0.7?t.green:m.yesPrice<=0.3?t.red:t.blue}}>{pct(m.yesPrice)}</div><div style={{height:2,borderRadius:1,background:`${t.dim}20`,marginTop:3}}><div style={{width:`${m.yesPrice*100}%`,height:"100%",borderRadius:1,background:m.yesPrice>=0.7?t.green:m.yesPrice<=0.3?t.red:t.blue}}/></div></div>
                    <div style={{textAlign:"right",fontFamily:mono,fontSize:11,fontWeight:600,color:m.clobSpread!==null?(m.clobSpread<0.01?t.green:m.clobSpread<0.03?t.yellow:t.red):t.dim}}>{m.clobSpread!==null?`${(m.clobSpread*100).toFixed(1)}¢`:"—"}</div>
                    <div style={{textAlign:"right",fontFamily:mono,fontSize:12,fontWeight:500}}>{fmt$(m.volume24h)}</div>
                    <div style={{textAlign:"right",fontFamily:mono,fontSize:12,fontWeight:500,color:m.liquidity>100000?t.green:m.liquidity>10000?t.yellow:t.red}}>{fmt$(m.liquidity)}</div>
                    <div style={{textAlign:"right",fontFamily:mono,fontSize:11,color:m.daysLeft<7?t.yellow:t.dim,display:"flex",alignItems:"center",justifyContent:"flex-end",gap:3}}>{m.daysLeft<7&&<Icon d={icons.clock} size={10} color={t.yellow}/>}{m.daysLeft<999?`${m.daysLeft}g`:"—"}</div>
                    <div onClick={e=>{e.stopPropagation();toggleWatch(m.id);}} style={{cursor:"pointer",textAlign:"center"}}>{isWatched?<IconSolid d={icons.starSolid} size={16} color={t.yellow}/>:<Icon d={icons.star} size={16} color={t.dim} sw={1}/>}</div>
                  </div>

                  {isOpen&&(<div style={{padding:"16px 16px 16px 48px",borderBottom:`1px solid ${t.border}`,background:dark?"rgba(255,255,255,0.015)":"rgba(0,0,0,0.01)"}}>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12}}>
                      <div>
                        <div style={{fontSize:10,color:t.dim,marginBottom:6,fontWeight:700,letterSpacing:"0.05em"}}>MARKET BİLGİSİ</div>
                        <p style={{fontSize:12,lineHeight:1.6,color:t.dim,margin:0,maxHeight:70,overflow:"hidden"}}>{m.description?.slice(0,220)}</p>
                        {m.clobFresh&&<div style={{marginTop:8,display:"grid",gridTemplateColumns:"1fr 1fr",gap:4}}>{[{l:"CLOB Mid",v:pct(m.clobMid),c:t.accent},{l:"Spread",v:m.clobSpread!==null?`${(m.clobSpread*100).toFixed(2)}¢`:"-",c:m.clobSpread<0.02?t.green:t.yellow}].map(s=><div key={s.l} style={{padding:"4px 6px",background:dark?"rgba(255,255,255,0.03)":"rgba(0,0,0,0.02)",borderRadius:5}}><div style={{fontSize:8,color:t.dim}}>{s.l}</div><div style={{fontSize:12,fontWeight:600,fontFamily:mono,color:s.c||t.text}}>{s.v}</div></div>)}</div>}
                      </div>
                      <div>
                        <div style={{fontSize:10,color:t.dim,marginBottom:6,fontWeight:700,letterSpacing:"0.05em"}}>İSTATİSTİKLER</div>
                        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>{[{l:"Evet",v:pct(m.yesPrice),c:t.green},{l:"Hayır",v:pct(m.noPrice),c:t.red},{l:"Likidite",v:fmt$(m.liquidity)},{l:"Kaynak",v:m.dataSource==="clob"?"CLOB":"Gamma",c:m.dataSource==="clob"?t.accent:t.dim}].map(s=><div key={s.l} style={{padding:"5px 8px",background:dark?"rgba(255,255,255,0.03)":"rgba(0,0,0,0.02)",borderRadius:6}}><div style={{fontSize:8,color:t.dim}}>{s.l}</div><div style={{fontSize:12,fontWeight:600,fontFamily:mono,color:s.c||t.text}}>{s.v}</div></div>)}</div>
                      </div>
                      <div>
                        <div style={{fontSize:10,color:t.dim,marginBottom:6,fontWeight:700,letterSpacing:"0.05em",display:"flex",alignItems:"center",gap:4}}><Icon d={icons.trendUp} size={11} color={t.dim}/>TAHMİN & KARAR</div>
                        {(()=>{
                          const myEst=edgeEstimates[m.id]??Math.round(m.yesPrice*100), myProb=myEst/100, edge=myProb-m.yesPrice, ev=calcEV(myProb,m.yesPrice), kf=kellyFraction(myProb,m.yesPrice), bet=bankroll*kf, profit=bet*((1-m.yesPrice)/m.yesPrice);
                          const isEV=ev>0&&edge>=minEdgePct/100, isGrade=(gradeRank[m.riskGrade.g]||0)>=minGR, isLiq=m.liquidity>=minLiquidity, ok=isEV&&isGrade&&isLiq;
                          return (<div style={{display:"grid",gap:6}}>
                            <div style={{padding:"8px 10px",background:dark?"rgba(255,255,255,0.03)":"rgba(0,0,0,0.02)",borderRadius:7}}>
                              <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:9,color:t.dim}}>Olasılık Tahminin</span><span style={{fontFamily:mono,fontSize:13,fontWeight:700,color:edge>0?t.green:t.red}}>%{myEst}</span></div>
                              <input type="range" min={1} max={99} value={myEst} onChange={e=>setEdgeEstimates(p=>({...p,[m.id]:Number(e.target.value)}))} style={{width:"100%",accentColor:edge>0?t.green:t.red,height:4}}/>
                              <div style={{display:"flex",justifyContent:"space-between",fontSize:9,color:t.dim,marginTop:2}}><span>Market: {pct(m.yesPrice)}</span><span>Edge: {(edge*100).toFixed(1)}%</span></div>
                            </div>
                            <div style={{padding:"10px 12px",borderRadius:7,background:ok?`${t.green}12`:`${t.red}12`,border:`1px solid ${ok?t.green:t.red}30`}}>
                              <div style={{fontSize:12,fontWeight:800,color:ok?t.green:t.red,display:"flex",alignItems:"center",gap:5}}>{ok?<Icon d={icons.check} size={16} color={t.green}/>:<Icon d={icons.xCircle} size={16} color={t.red}/>}{ok?"TRADE UYGUN":"TRADE UYGUN DEĞİL"}</div>
                              <div style={{display:"flex",gap:6,flexWrap:"wrap",marginTop:4}}>{[{ok:isEV,l:`EV:${(ev*100).toFixed(1)}%`},{ok:isGrade,l:`Risk:${m.riskGrade.g}`},{ok:isLiq,l:`Lik:${fmt$(m.liquidity)}`}].map(c=><span key={c.l} style={{fontSize:9,fontWeight:600,padding:"2px 6px",borderRadius:4,fontFamily:mono,background:c.ok?`${t.green}18`:`${t.red}18`,color:c.ok?t.green:t.red}}>{c.ok?"✓":"✗"} {c.l}</span>)}</div>
                            </div>
                            {ok&&<div style={{padding:"6px 8px",background:dark?"rgba(255,255,255,0.03)":"rgba(0,0,0,0.02)",borderRadius:6}}><div style={{fontSize:9,color:t.dim}}>Half-Kelly (${bankroll})</div><div style={{fontSize:14,fontWeight:700,fontFamily:mono,color:t.green}}>${bet.toFixed(0)} → ${profit.toFixed(0)} kâr</div></div>}
                            <a href={`https://polymarket.com/event/${m.slug}`} target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:5,padding:"7px 14px",borderRadius:7,background:ok?t.accent:(dark?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.05)"),color:ok?"#000":t.dim,fontSize:11,fontWeight:700,textDecoration:"none",fontFamily:"inherit",opacity:ok?1:0.6}}>{ok?"Open Trade":"Inspect"} <Icon d={icons.arrowRight} size={13} color={ok?"#000":t.dim}/></a>
                          </div>);
                        })()}
                      </div>
                    </div>
                  </div>)}
                </div>
              );
            })}
          </div>
        </>)}

        {/* ═══ ARBITRAGE ═══ */}
        {tab==="arbitrage"&&(<div>
          <div style={{padding:"12px 16px",borderRadius:10,background:t.accentSoft,border:`1px solid ${t.accent}30`,marginBottom:14,fontSize:12,color:t.accent,fontWeight:500,lineHeight:1.5,display:"flex",alignItems:"center",gap:8}}>
            <Icon d={icons.bolt} size={18} color={t.accent}/> Çok sonuçlu eventlerde olasılık toplamı sapmaları. Sapma büyükse → potansiyel arbitraj.
          </div>
          {arbOpps.length===0?<div style={{padding:40,textAlign:"center",color:t.dim,background:t.card,borderRadius:14,border:`1px solid ${t.border}`}}><Icon d={icons.sparkles} size={32} color={t.dim}/><div style={{marginTop:8}}>Arbitraj fırsatı bulunamadı</div></div>:(
            <div style={{display:"grid",gap:10}}>{arbOpps.map(arb=>(<div key={arb.id} style={{background:t.card,border:`1px solid ${t.border}`,borderRadius:12,padding:16}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                <div><h3 style={{fontSize:14,fontWeight:700,margin:0}}>{arb.title}</h3><div style={{fontSize:11,color:t.dim,marginTop:2}}>{arb.markets.length} market · Σ Evet: {(arb.sumYes*100).toFixed(1)}%</div></div>
                <div style={{padding:"4px 10px",borderRadius:6,fontFamily:mono,fontSize:12,fontWeight:700,background:arb.deviation>0.03?t.accentSoft:`${t.yellow}15`,color:arb.deviation>0.03?t.accent:t.yellow}}>Sapma: {(arb.deviation*100).toFixed(1)}%</div>
              </div>
              <div style={{display:"grid",gap:4}}>{arb.markets.slice(0,8).map(mk=>(<div key={mk.id} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 8px",background:dark?"rgba(255,255,255,0.02)":"rgba(0,0,0,0.015)",borderRadius:6,fontSize:12}}>
                <div style={{flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",color:t.dim}}>{mk.question}</div>
                <div style={{fontFamily:mono,fontWeight:600,minWidth:50,textAlign:"right",color:mk.yesPrice>0.5?t.green:t.blue}}>{pct(mk.yesPrice)}</div>
                <div style={{fontFamily:mono,fontSize:10,minWidth:55,textAlign:"right",color:mk.liquidity>100000?t.dim:t.red}}>{fmt$(mk.liquidity)}</div>
              </div>))}</div>
              {arb.sumYes>1.02&&<div style={{marginTop:8,padding:"8px 10px",borderRadius:6,background:t.accentSoft,fontSize:11,color:t.accent,lineHeight:1.5,display:"flex",alignItems:"start",gap:6}}><Icon d={icons.sparkles} size={14} color={t.accent} style={{flexShrink:0,marginTop:2}}/>Toplam &gt;100% → Tüm sonuçlara "Hayır" al → kâr ~{((arb.sumYes-1)*100).toFixed(1)}¢/kontrat</div>}
              {arb.sumYes<0.98&&<div style={{marginTop:8,padding:"8px 10px",borderRadius:6,background:t.accentSoft,fontSize:11,color:t.accent,lineHeight:1.5,display:"flex",alignItems:"start",gap:6}}><Icon d={icons.sparkles} size={14} color={t.accent} style={{flexShrink:0,marginTop:2}}/>Toplam &lt;100% → Tüm sonuçlara "Evet" al → kâr ~{((1-arb.sumYes)*100).toFixed(1)}¢/kontrat</div>}
            </div>))}</div>
          )}
        </div>)}

        {/* ═══ CALCULATOR ═══ */}
        {tab==="calculator"&&(<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
          <div style={{background:t.card,border:`1px solid ${t.border}`,borderRadius:14,padding:20}}>
            <h3 style={{fontSize:15,fontWeight:700,margin:"0 0 16px",display:"flex",alignItems:"center",gap:6}}><Icon d={icons.calculator} size={18} color={t.accent}/>Kelly Criterion & EV</h3>
            {[{label:"Bakiye ($)",value:bankroll,set:setBankroll,min:10,max:100000,step:50},{label:"Senin Tahmin (%)",value:calcProb,set:setCalcProb,min:1,max:99,step:1},{label:"Market Fiyatı (¢)",value:calcPrice,set:setCalcPrice,min:1,max:99,step:1}].map(inp=>(<div key={inp.label} style={{marginBottom:16}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><label style={{fontSize:12,fontWeight:600,color:t.dim}}>{inp.label}</label><span style={{fontFamily:mono,fontSize:13,fontWeight:700}}>{inp.label.includes("$")?`$${inp.value}`:inp.label.includes("¢")?`${inp.value}¢`:`${inp.value}%`}</span></div><input type="range" min={inp.min} max={inp.max} step={inp.step} value={inp.value} onChange={e=>inp.set(Number(e.target.value))} style={{width:"100%",accentColor:t.accent}}/></div>))}
          </div>
          <div style={{background:t.card,border:`1px solid ${t.border}`,borderRadius:14,padding:20}}>
            <h3 style={{fontSize:15,fontWeight:700,margin:"0 0 16px",display:"flex",alignItems:"center",gap:6}}><Icon d={icons.chartBar} size={18} color={t.accent}/>Sonuçlar</h3>
            <div style={{padding:14,borderRadius:10,marginBottom:14,background:kellyResult.edge>0?t.accentSoft:t.redSoft,border:`1px solid ${kellyResult.edge>0?t.accent:t.red}30`}}>
              <div style={{fontSize:12,fontWeight:600,color:kellyResult.edge>0?t.green:t.red,display:"flex",alignItems:"center",gap:5}}>{kellyResult.edge>0?<Icon d={icons.check} size={16} color={t.green}/>:<Icon d={icons.xCircle} size={16} color={t.red}/>}{kellyResult.edge>0?"POZİTİF EDGE":"NEGATİF EDGE — TRADE YAPMA"}</div>
              <div style={{fontFamily:mono,fontSize:24,fontWeight:800,color:kellyResult.edge>0?t.green:t.red,marginTop:4}}>Edge: {(kellyResult.edge*100).toFixed(1)}%</div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>{[{l:"Half-Kelly Bahis",v:`$${kellyResult.bet.toFixed(2)}`,d:`Bakiyenin %${(kellyResult.kf*100).toFixed(1)}'i`,c:t.accent},{l:"Beklenen Değer",v:`${(kellyResult.ev*100).toFixed(2)}%`,d:"Her $1 için",c:kellyResult.ev>0?t.green:t.red},{l:"Potansiyel Kâr",v:`$${kellyResult.potentialProfit.toFixed(2)}`,d:"Kazanırsan",c:t.green},{l:"Potansiyel Kayıp",v:`-$${kellyResult.potentialLoss.toFixed(2)}`,d:"Kaybedersen",c:t.red}].map(r=>(<div key={r.l} style={{padding:"10px 12px",background:dark?"rgba(255,255,255,0.03)":"rgba(0,0,0,0.02)",borderRadius:8}}><div style={{fontSize:10,color:t.dim,marginBottom:2}}>{r.l}</div><div style={{fontSize:18,fontWeight:700,fontFamily:mono,color:r.c}}>{r.v}</div><div style={{fontSize:10,color:t.dim}}>{r.d}</div></div>))}</div>
          </div>
        </div>)}

        {/* ═══ WATCHLIST ═══ */}
        {tab==="watchlist"&&(watchlist.length===0?<div style={{padding:40,textAlign:"center",color:t.dim,background:t.card,borderRadius:14,border:`1px solid ${t.border}`}}><Icon d={icons.star} size={32} color={t.dim}/><div style={{fontSize:14,fontWeight:600,marginTop:8}}>İzleme listen boş</div><div style={{fontSize:12}}>Risk Tarayıcı'da ☆ ikonuna tıkla</div></div>:(
          <div style={{background:t.card,border:`1px solid ${t.border}`,borderRadius:14,overflow:"hidden"}}>{markets.filter(m=>watchlist.includes(m.id)).map(m=>{const rg=m.riskGrade;return(<div key={m.id} style={{display:"grid",gridTemplateColumns:"48px 1fr 80px 64px 80px 80px 36px",padding:"14px 16px",borderBottom:`1px solid ${t.border}`,alignItems:"center"}}>
            <div style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:32,height:32,borderRadius:8,background:`${rg.c}15`,color:rg.c,fontSize:15,fontWeight:800,fontFamily:mono}}>{rg.g}</div>
            <div style={{minWidth:0}}><div style={{fontSize:13,fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{m.question}</div><div style={{fontSize:10,color:t.dim,display:"flex",alignItems:"center",gap:4}}>{m.category.icon} {m.category.label}{m.clobFresh&&<><Icon d={icons.bolt} size={9} color={t.accent}/>CLOB</>}</div></div>
            <div style={{textAlign:"right",fontFamily:mono,fontSize:15,fontWeight:700,color:m.yesPrice>=0.7?t.green:m.yesPrice<=0.3?t.red:t.blue}}>{pct(m.yesPrice)}</div>
            <div style={{textAlign:"right",fontFamily:mono,fontSize:11,color:m.clobSpread!==null?(m.clobSpread<0.02?t.green:t.yellow):t.dim}}>{m.clobSpread!==null?`${(m.clobSpread*100).toFixed(1)}¢`:"—"}</div>
            <div style={{textAlign:"right",fontFamily:mono,fontSize:12}}>{fmt$(m.volume24h)}</div>
            <div style={{textAlign:"right",fontFamily:mono,fontSize:12,color:m.liquidity>100000?t.green:t.yellow}}>{fmt$(m.liquidity)}</div>
            <div onClick={()=>toggleWatch(m.id)} style={{cursor:"pointer",textAlign:"center"}}><IconSolid d={icons.starSolid} size={16} color={t.yellow}/></div>
          </div>);})}</div>
        ))}

        {/* AD BANNER — Bottom */}
        <div style={{marginTop:20,padding:"10px 16px",borderRadius:10,background:dark?"rgba(255,255,255,0.02)":"rgba(0,0,0,0.02)",border:`1px dashed ${t.border}`,textAlign:"center",minHeight:60,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:`${t.dim}80`,letterSpacing:"0.05em"}}>
          AD SPACE — 728×90 LEADERBOARD
        </div>

        {/* ═══ DISCLAIMER ═══ */}
        <div style={{marginTop:12,padding:"16px 20px",borderRadius:12,background:dark?"rgba(255,71,87,0.04)":"rgba(230,57,70,0.03)",border:`1px solid ${dark?"rgba(255,71,87,0.12)":"rgba(230,57,70,0.1)"}`,fontSize:11,color:t.dim,lineHeight:1.7}}>
          <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8}}>
            <Icon d={icons.exclaim} size={16} color={t.red}/>
            <span style={{fontSize:12,fontWeight:700,color:t.red}}>Risk Disclaimer</span>
          </div>
          <p style={{margin:"0 0 6px"}}>Paralan.trade is an <strong>independent analytical tool</strong> and is <strong>not affiliated with, endorsed by, or sponsored by Polymarket, Kalshi, or any prediction market platform</strong>. Market data is sourced from publicly available APIs.</p>
          <p style={{margin:"0 0 6px"}}><strong>This tool does not constitute financial advice, investment advice, trading advice, or any other sort of advice.</strong> All content is for informational and educational purposes only. The "Trade Verdict" and "Kelly Calculator" features are mathematical models, not recommendations to buy or sell.</p>
          <p style={{margin:"0 0 6px"}}>Prediction markets involve <strong>substantial risk of loss</strong>. Past performance does not guarantee future results. You should not trade with money you cannot afford to lose. <strong>You are solely responsible for your own trading decisions.</strong></p>
          <p style={{margin:0}}>Data sources: Polymarket Gamma API (public) and CLOB API (public). Data may be delayed or inaccurate. Paralan makes no guarantee regarding data accuracy, completeness, or timeliness.</p>
        </div>

        {/* ═══ FOOTER ═══ */}
        <div style={{marginTop:12,padding:"16px 20px",borderRadius:12,background:t.card,border:`1px solid ${t.border}`}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <Logo size={24} dark={dark}/>
              <div>
                <span style={{fontSize:13,fontWeight:700,background:`linear-gradient(135deg,${t.accent},${t.blue})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Paralan</span>
                <span style={{fontSize:10,color:t.dim,marginLeft:6}}>© {new Date().getFullYear()}</span>
              </div>
            </div>
            <div style={{display:"flex",gap:16,fontSize:11}}>
              <a href="/privacy" style={{color:t.dim,textDecoration:"none",borderBottom:`1px solid ${t.border}`}}>Privacy Policy</a>
              <a href="/terms" style={{color:t.dim,textDecoration:"none",borderBottom:`1px solid ${t.border}`}}>Terms of Use</a>
              <a href="/disclaimer" style={{color:t.dim,textDecoration:"none",borderBottom:`1px solid ${t.border}`}}>Disclaimer</a>
              <a href="mailto:hello@paralan.trade" style={{color:t.dim,textDecoration:"none",borderBottom:`1px solid ${t.border}`}}>Contact</a>
            </div>
          </div>
          <div style={{marginTop:10,paddingTop:10,borderTop:`1px solid ${t.border}`,fontSize:10,color:`${t.dim}90`,lineHeight:1.6}}>
            Paralan.trade is not a registered broker-dealer, financial institution, exchange, or investment advisor. Market data provided by Polymarket public APIs. Not available in jurisdictions where prediction market trading is prohibited. By using this site, you agree to our Terms of Use and acknowledge the risks involved in prediction market trading.
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
        *{box-sizing:border-box}
        ::selection{background:${t.accent}30}
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-thumb{background:${t.dim}30;border-radius:3px}
        input[type="range"]{height:4px;border-radius:2px}
      `}</style>
    </div>
  );
}
