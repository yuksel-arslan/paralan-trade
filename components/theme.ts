export const getTheme = (dark: boolean) => dark ? {
  bg:"#08090d", surface:"#0f1117", card:"#151720", cardHover:"#1a1c2a",
  border:"rgba(255,255,255,0.06)", text:"#e4e5ea", dim:"#6b6f82",
  accent:"#00d4aa", accentSoft:"rgba(0,212,170,0.1)",
  red:"#ff4757", redSoft:"rgba(255,71,87,0.1)",
  blue:"#5b7fff", yellow:"#ffc312", green:"#00d4aa", orange:"#ff922b",
  input:"rgba(255,255,255,0.04)", header:"rgba(8,9,13,0.92)",
} : {
  bg:"#f4f5f7", surface:"#ffffff", card:"#ffffff", cardHover:"#f8f9fb",
  border:"rgba(0,0,0,0.08)", text:"#1a1b2e", dim:"#6b7085",
  accent:"#00a87d", accentSoft:"rgba(0,168,125,0.08)",
  red:"#e63946", redSoft:"rgba(230,57,70,0.08)",
  blue:"#4361ee", yellow:"#d4a800", green:"#00a87d", orange:"#ff922b",
  input:"rgba(0,0,0,0.03)", header:"rgba(244,245,247,0.92)",
};

export type Theme = ReturnType<typeof getTheme>;

export const mono = "'JetBrains Mono',monospace";

// ─── Helpers ───
export const fmt$ = (v: any) => { const n=Number(v||0); if(n>=1e9) return `$${(n/1e9).toFixed(2)}B`; if(n>=1e6) return `$${(n/1e6).toFixed(2)}M`; if(n>=1e3) return `$${(n/1e3).toFixed(1)}K`; return `$${n.toFixed(0)}`; };
export const pct = (p: any) => `${(Number(p)*100).toFixed(1)}%`;
export const timeAgo = (d: any) => { const h=Math.floor((Date.now()-new Date(d).getTime())/3600000); if(h<1) return `${Math.floor((Date.now()-new Date(d).getTime())/60000)}dk`; if(h<24) return `${h}sa`; return `${Math.floor(h/24)}g`; };
export const daysUntil = (d: any) => Math.max(0, Math.ceil((new Date(d).getTime()-Date.now())/86400000));

export const calcRiskScore = (m: any) => {
  let s=0;
  s += m.liquidity>500000?25:m.liquidity>100000?20:m.liquidity>50000?15:m.liquidity>10000?10:5;
  s += m.volume24h>1000000?25:m.volume24h>100000?20:m.volume24h>10000?15:5;
  const p=m.yesPrice; s += (p>0.9||p<0.1)?25:(p>0.8||p<0.2)?20:(p>0.7||p<0.3)?15:8;
  const dl=m.daysLeft; s += (dl>0&&dl<7)?25:dl<30?20:dl<90?15:10;
  if(m.clobFresh) s+=3; if(m.clobSpread!==null&&m.clobSpread<0.02) s+=2;
  return Math.min(100,s);
};

export const riskGrade = (s: number) => {
  if(s>=85) return {g:"A",c:"#00d4aa",l:"Düşük Risk"};
  if(s>=70) return {g:"B",c:"#5b7fff",l:"Orta-Düşük"};
  if(s>=55) return {g:"C",c:"#ffc312",l:"Orta"};
  if(s>=40) return {g:"D",c:"#ff922b",l:"Orta-Yüksek"};
  return {g:"F",c:"#ff4757",l:"Yüksek Risk"};
};

export const kellyFraction = (prob: number, price: number) => {
  if(price<=0||price>=1||prob<=0||prob>=1) return 0;
  const b=(1-price)/price;
  const k=(prob*b-(1-prob))/b;
  return Math.max(0,Math.min(k*0.5,0.15));
};

export const calcEV = (prob: number, price: number) =>
  (price<=0||price>=1)?0:(prob*(1-price))-((1-prob)*price);

export const categorize = (q: string) => {
  const l=q.toLowerCase();
  if(/trump|biden|election|president|congress|senate|democrat|republican|vote|political/.test(l)) return {label:"Politika",color:"#ff6b6b",icon:"🏛"};
  if(/bitcoin|btc|eth|crypto|token|solana|sol|xrp|doge/.test(l)) return {label:"Kripto",color:"#ffd43b",icon:"₿"};
  if(/ai\b|openai|gpt|anthropic|google|apple|microsoft|meta|nvidia|tesla/.test(l)) return {label:"Teknoloji",color:"#5b7fff",icon:"💻"};
  if(/nba|nfl|soccer|football|ufc|sport|championship|fifa|world cup/.test(l)) return {label:"Spor",color:"#51cf66",icon:"⚽"};
  if(/war|iran|china|russia|ukraine|military|nato|israel|khamenei/.test(l)) return {label:"Jeopolitik",color:"#ff922b",icon:"🌍"};
  if(/fed\b|rate|inflation|recession|gdp|stock|s&p|nasdaq|economy|interest/.test(l)) return {label:"Ekonomi",color:"#cc5de8",icon:"📈"};
  return {label:"Diğer",color:"#868e96",icon:"📋"};
};

export const gradeRank: Record<string,number> = {A:5,B:4,C:3,D:2,F:1};
