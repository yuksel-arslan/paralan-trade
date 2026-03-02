// @ts-nocheck
export const Logo = ({size=38,dark=true}) => {
  const g1=dark?"#00d4aa":"#00a87d", g2=dark?"#5b7fff":"#4361ee";
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="lg1" x1="0" y1="0" x2="48" y2="48"><stop stopColor={g1}/><stop offset="1" stopColor={g2}/></linearGradient>
        <linearGradient id="lg2" x1="10" y1="8" x2="38" y2="40"><stop stopColor="#fff" stopOpacity="0.95"/><stop offset="1" stopColor="#fff" stopOpacity="0.7"/></linearGradient>
        <filter id="glow"><feGaussianBlur stdDeviation="1.5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <rect x="3" y="3" width="42" height="42" rx="11" fill="url(#lg1)"/>
      <rect x="3" y="3" width="42" height="42" rx="11" fill="url(#lg1)" opacity="0.35" filter="url(#glow)"/>
      <rect x="6" y="6" width="36" height="36" rx="8" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5"/>
      <g filter="url(#glow)">
        <path d="M12 36 L24 10 L28 10 L16 36 Z" fill="url(#lg2)" opacity="0.9"/>
        <path d="M22 36 L34 14 L38 14 L26 36 Z" fill="url(#lg2)" opacity="0.7"/>
        <line x1="10" y1="28" x2="38" y2="28" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" strokeDasharray="2 1.5"/>
      </g>
      <circle cx="26" cy="10" r="2.2" fill="#fff" opacity="0.85"/>
      <circle cx="26" cy="10" r="4" fill="#fff" opacity="0.15"/>
    </svg>
  );
};
