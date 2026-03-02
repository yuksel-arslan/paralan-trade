// @ts-nocheck
"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { Icon, IconSolid, icons } from "./icons";
import { getTheme, mono, fmt$, pct, timeAgo, daysUntil, calcRiskScore, riskGrade, kellyFraction, calcEV, categorize, gradeRank } from "./theme";
import Header from "./Header";
import StatsGrid from "./StatsGrid";
import SafeTradePanel from "./SafeTradePanel";
import TabNav from "./TabNav";
import SearchBar from "./SearchBar";
import MarketCard from "./MarketCard";
import MarketDetail from "./MarketDetail";
import ArbitrageTab from "./ArbitrageTab";
import CalculatorTab from "./CalculatorTab";
import WatchlistTab from "./WatchlistTab";
import AdBanner from "./AdBanner";
import Disclaimer from "./Disclaimer";
import Footer from "./Footer";

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
  const [showSafePanel,setShowSafePanel]=useState(false);
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

      let clobMap={};
      try {
        const topTokens=processed.filter(m=>m.tokenId).slice(0,5);
        const ctrl2=new AbortController(); const timeout=setTimeout(()=>ctrl2.abort(),4000);
        const results=await Promise.allSettled(topTokens.flatMap(m=>[
          fetch(`/api/clob?endpoint=midpoint&token_id=${m.tokenId}`,{signal:ctrl2.signal}).then(r=>r.ok?r.json():null).then(d=>({id:m.id,type:"mid",val:d})),
          fetch(`/api/clob?endpoint=spread&token_id=${m.tokenId}`,{signal:ctrl2.signal}).then(r=>r.ok?r.json():null).then(d=>({id:m.id,type:"spread",val:d})),
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

  const t = getTheme(dark);
  const categories=useMemo(()=>["All",...new Set(markets.map(m=>m.category.label))],[markets]);
  const minGR=gradeRank[minRiskGrade]||4;

  const filtered=useMemo(()=>markets.filter(m=>filterCat==="All"||m.category.label===filterCat).filter(m=>!search||m.question.toLowerCase().includes(search.toLowerCase())).filter(m=>{if(!safeMode)return true;if((gradeRank[m.riskGrade.g]||0)<minGR)return false;if(m.liquidity<minLiquidity)return false;const est=edgeEstimates[m.id];if(est!==undefined){if(calcEV(est/100,m.yesPrice)<=0)return false;if((est-m.yesPrice*100)<minEdgePct)return false;}return true;}).sort((a,b)=>{if(sort==="risk_score")return b.riskScore-a.riskScore;if(sort==="volume24hr")return b.volume24h-a.volume24h;if(sort==="liquidity")return b.liquidity-a.liquidity;if(sort==="closing_soon")return a.daysLeft-b.daysLeft;if(sort==="spread")return(a.clobSpread||1)-(b.clobSpread||1);return 0;}),[markets,filterCat,search,sort,safeMode,minLiquidity,minGR,minEdgePct,edgeEstimates]);

  const safeCount=useMemo(()=>markets.filter(m=>(gradeRank[m.riskGrade.g]||0)>=minGR&&m.liquidity>=minLiquidity).length,[markets,minGR,minLiquidity]);
  const toggleWatch=(id)=>setWatchlist(w=>w.includes(id)?w.filter(x=>x!==id):[...w,id]);

  return (
    <div style={{background:t.bg,color:t.text,fontFamily:"'Outfit',sans-serif",minHeight:"100vh"}}>
      <Header t={t} dark={dark} setDark={setDark} lastUpdate={lastUpdate} refreshRate={refreshRate} setRefreshRate={setRefreshRate} bankroll={bankroll} setBankroll={setBankroll} clobCount={stats.clobCount}/>

      <div className="max-w-[1280px] mx-auto px-3 sm:px-6 pt-3 sm:pt-4 pb-8 sm:pb-10">
        <StatsGrid t={t} stats={stats} safeMode={safeMode} safeCount={safeCount} arbCount={arbOpps.filter(a=>a.deviation>0.02).length}/>

        <AdBanner t={t} dark={dark}/>

        <SafeTradePanel t={t} dark={dark} safeMode={safeMode} setSafeMode={setSafeMode} showSafePanel={showSafePanel} setShowSafePanel={setShowSafePanel} minRiskGrade={minRiskGrade} setMinRiskGrade={setMinRiskGrade} minLiquidity={minLiquidity} setMinLiquidity={setMinLiquidity} minEdgePct={minEdgePct} setMinEdgePct={setMinEdgePct}/>

        <TabNav t={t} tab={tab} setTab={setTab} watchlistCount={watchlist.length}/>

        {error&&<div className="p-2.5 sm:p-3 rounded-[10px] text-xs font-medium mb-3 flex items-center justify-between" style={{background:t.redSoft,color:t.red}}><span className="flex items-center gap-1.5"><Icon d={icons.exclaim} size={16} color={t.red}/>{error}</span><button onClick={fetchData} className="py-1 px-2.5 rounded-md text-[11px] cursor-pointer font-sans flex items-center gap-1 min-h-[36px]" style={{border:`1px solid ${t.red}`,background:"transparent",color:t.red}}><Icon d={icons.arrowPath} size={13} color={t.red}/>Tekrar</button></div>}

        {/* ═══ SCANNER TAB ═══ */}
        {tab==="scanner"&&(<>
          <SearchBar t={t} search={search} setSearch={setSearch} sort={sort} setSort={setSort} categories={categories} filterCat={filterCat} setFilterCat={setFilterCat}/>

          {/* Desktop: 9-column table */}
          <div className="hidden md:block rounded-xl overflow-hidden" style={{background:t.card,border:`1px solid ${t.border}`}}>
            <div style={{display:"grid",gridTemplateColumns:"32px 1fr 52px 68px 62px 76px 76px 56px 36px",padding:"10px 16px",borderBottom:`1px solid ${t.border}`,fontSize:9,fontWeight:600,color:t.dim,textTransform:"uppercase",letterSpacing:"0.06em",fontFamily:mono}}>
              <div>#</div><div>Market</div><div style={{textAlign:"center"}}>Risk</div><div style={{textAlign:"right"}}>Olas.</div><div style={{textAlign:"right"}}>Spread</div><div style={{textAlign:"right"}}>24s</div><div style={{textAlign:"right"}}>Likidite</div><div style={{textAlign:"right"}}>Kalan</div><div></div>
            </div>

            {loading?Array.from({length:6}).map((_,i)=><div key={i} style={{display:"flex",gap:12,padding:"16px",borderBottom:`1px solid ${t.border}`}}><div style={{flex:1,height:16,borderRadius:4,background:dark?"rgba(255,255,255,0.04)":"rgba(0,0,0,0.04)",animation:"pulse 1.5s infinite"}}></div></div>):
            filtered.length===0?<div className="p-10 text-center" style={{color:t.dim}}>{safeMode?<><Icon d={icons.shield} size={32} color={t.dim}/><div className="text-[13px] font-semibold mt-2">Filtrelere uyan market yok</div><div className="text-[11px]">Filtreleri gevşet veya Güvenli Modu kapat</div></>:"Sonuç bulunamadı"}</div>:
            filtered.map((m,idx)=>{
              const isOpen=selected?.id===m.id, isWatched=watchlist.includes(m.id), rg=m.riskGrade;
              return (
                <div key={m.id}>
                  <div onClick={()=>setSelected(isOpen?null:m)} style={{display:"grid",gridTemplateColumns:"32px 1fr 52px 68px 62px 76px 76px 56px 36px",padding:"12px 16px",borderBottom:`1px solid ${t.border}`,cursor:"pointer",background:isOpen?(dark?"rgba(255,255,255,0.02)":"rgba(0,0,0,0.015)"):"transparent",alignItems:"center",transition:"background 0.15s"}} onMouseEnter={e=>!isOpen&&(e.currentTarget.style.background=t.cardHover)} onMouseLeave={e=>!isOpen&&(e.currentTarget.style.background="transparent")}>
                    <div style={{fontFamily:mono,fontSize:11,color:t.dim}}>{idx+1}</div>
                    <div style={{minWidth:0}}>
                      <div style={{fontSize:13,fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",marginBottom:3}}>{m.question}</div>
                      <div className="flex gap-1.5 items-center">
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
                  {isOpen&&<MarketDetail t={t} dark={dark} m={m} edgeEstimates={edgeEstimates} setEdgeEstimates={setEdgeEstimates} bankroll={bankroll} minEdgePct={minEdgePct} minGR={minGR} minLiquidity={minLiquidity}/>}
                </div>
              );
            })}
          </div>

          {/* Mobile: Card view */}
          <div className="md:hidden rounded-xl overflow-hidden" style={{background:t.card,border:`1px solid ${t.border}`}}>
            {loading?Array.from({length:4}).map((_,i)=><div key={i} className="p-3 border-b" style={{borderColor:t.border}}><div className="h-4 rounded mb-2" style={{background:dark?"rgba(255,255,255,0.04)":"rgba(0,0,0,0.04)",animation:"pulse 1.5s infinite"}}/><div className="h-3 rounded w-3/4" style={{background:dark?"rgba(255,255,255,0.04)":"rgba(0,0,0,0.04)",animation:"pulse 1.5s infinite"}}/></div>):
            filtered.length===0?<div className="p-10 text-center" style={{color:t.dim}}>{safeMode?<><Icon d={icons.shield} size={32} color={t.dim}/><div className="text-[13px] font-semibold mt-2">Filtrelere uyan market yok</div><div className="text-[11px]">Filtreleri gevşet veya Güvenli Modu kapat</div></>:"Sonuç bulunamadı"}</div>:
            filtered.map((m,idx)=>{
              const isOpen=selected?.id===m.id, isWatched=watchlist.includes(m.id);
              return (
                <div key={m.id}>
                  <MarketCard t={t} m={m} idx={idx} isOpen={isOpen} isWatched={isWatched} onSelect={()=>setSelected(isOpen?null:m)} onToggleWatch={()=>toggleWatch(m.id)}/>
                  {isOpen&&<MarketDetail t={t} dark={dark} m={m} edgeEstimates={edgeEstimates} setEdgeEstimates={setEdgeEstimates} bankroll={bankroll} minEdgePct={minEdgePct} minGR={minGR} minLiquidity={minLiquidity}/>}
                </div>
              );
            })}
          </div>
        </>)}

        {tab==="arbitrage"&&<ArbitrageTab t={t} dark={dark} arbOpps={arbOpps}/>}
        {tab==="calculator"&&<CalculatorTab t={t} dark={dark} bankroll={bankroll} setBankroll={setBankroll} calcProb={calcProb} setCalcProb={setCalcProb} calcPrice={calcPrice} setCalcPrice={setCalcPrice}/>}
        {tab==="watchlist"&&<WatchlistTab t={t} markets={markets} watchlist={watchlist} toggleWatch={toggleWatch}/>}

        <AdBanner t={t} dark={dark}/>
        <Disclaimer t={t} dark={dark}/>
        <Footer t={t} dark={dark}/>
      </div>

      <style>{`
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
        ::selection{background:${t.accent}30}
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-thumb{background:${t.dim}30;border-radius:3px}
        input[type="range"]{height:4px;border-radius:2px}
      `}</style>
    </div>
  );
}
