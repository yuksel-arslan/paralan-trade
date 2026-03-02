export default function Disclaimer() {
  return (
    <div style={{maxWidth:720,margin:"0 auto",padding:"60px 24px",fontFamily:"'Outfit',sans-serif",lineHeight:1.8,color:"#e4e5ea",background:"#08090d",minHeight:"100vh"}}>
      <a href="/" style={{color:"#00d4aa",textDecoration:"none",fontSize:13}}>← Back to Paralan</a>
      <h1 style={{fontSize:28,fontWeight:800,marginTop:20}}>Disclaimer</h1>
      <p style={{color:"#6b6f82",fontSize:12}}>Last updated: {new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})}</p>

      <div style={{padding:20,borderRadius:12,background:"rgba(255,71,87,0.06)",border:"1px solid rgba(255,71,87,0.15)",marginTop:24}}>
        <h2 style={{fontSize:16,color:"#ff4757",margin:"0 0 12px"}}>⚠️ IMPORTANT: READ BEFORE USING</h2>
        <p style={{margin:0,fontSize:14,fontWeight:500}}>Paralan.trade is NOT a financial advisor, broker-dealer, exchange, or registered investment platform. The tool provides data visualization and mathematical calculations only. Nothing on this site constitutes a recommendation to trade.</p>
      </div>

      <h2 style={{fontSize:18,marginTop:32}}>No Investment Advice</h2>
      <p>All information provided by Paralan.trade — including but not limited to risk grades (A through F), Expected Value (EV) calculations, Kelly Criterion position sizing, trade verdicts ("Trade Suitable" / "Trade Not Suitable"), and arbitrage opportunity detection — are outputs of mathematical models applied to publicly available data. These outputs are not personalized to your financial situation, risk tolerance, or investment objectives and should never be treated as investment recommendations.</p>

      <h2 style={{fontSize:18,marginTop:24}}>Risk of Loss</h2>
      <p>Prediction market trading carries significant risk of financial loss. According to publicly available research, approximately 80% of prediction market participants lose money over time. The use of analytical tools, including Paralan, does not guarantee profitability or reduce the inherent risks of trading.</p>

      <h2 style={{fontSize:18,marginTop:24}}>Data Sources & Accuracy</h2>
      <p>Market data displayed on Paralan is sourced from Polymarket's Gamma API and CLOB API, both publicly accessible endpoints. Data may be delayed by seconds to minutes depending on the API source. Paralan does not guarantee the accuracy, reliability, or completeness of any data shown. Always verify prices and market conditions directly on the trading platform before executing any trade.</p>

      <h2 style={{fontSize:18,marginTop:24}}>Independent Tool</h2>
      <p>Paralan.trade operates independently and has no commercial, financial, or partnership relationship with Polymarket, Kalshi, or any other prediction market operator. Mentions of these platforms are for data attribution purposes only and do not imply endorsement in either direction.</p>

      <h2 style={{fontSize:18,marginTop:24}}>Regulatory Notice</h2>
      <p>Prediction market legality varies by jurisdiction. Some countries and U.S. states prohibit or restrict prediction market trading. It is your responsibility to comply with all applicable laws and regulations in your jurisdiction. Paralan does not facilitate trading — it only displays publicly available market data.</p>

      <h2 style={{fontSize:18,marginTop:24}}>Limitation of Liability</h2>
      <p>Under no circumstances shall Paralan.trade, its creators, contributors, or operators be held liable for any losses, damages, or costs arising from the use of this tool. This includes, without limitation, losses from trading decisions made based on information displayed on this site.</p>

      <h2 style={{fontSize:18,marginTop:24}}>Contact</h2>
      <p>For questions or concerns: <a href="mailto:hello@paralan.trade" style={{color:"#00d4aa"}}>hello@paralan.trade</a></p>
    </div>
  );
}
