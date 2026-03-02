export default function Terms() {
  return (
    <div style={{maxWidth:720,margin:"0 auto",padding:"60px 24px",fontFamily:"'Outfit',sans-serif",lineHeight:1.8,color:"#e4e5ea",background:"#08090d",minHeight:"100vh"}}>
      <a href="/" style={{color:"#00d4aa",textDecoration:"none",fontSize:13}}>← Back to Paralan</a>
      <h1 style={{fontSize:28,fontWeight:800,marginTop:20}}>Terms of Use</h1>
      <p style={{color:"#6b6f82",fontSize:12}}>Last updated: {new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})}</p>

      <h2 style={{fontSize:18,marginTop:32}}>1. Acceptance of Terms</h2>
      <p>By accessing and using Paralan.trade ("the Service"), you agree to be bound by these Terms of Use. If you do not agree, do not use the Service.</p>

      <h2 style={{fontSize:18,marginTop:24}}>2. Description of Service</h2>
      <p>Paralan.trade is a free, ad-supported analytical dashboard that displays publicly available prediction market data. The Service provides market analysis tools, risk scoring, arbitrage detection, and position sizing calculations for informational purposes only.</p>

      <h2 style={{fontSize:18,marginTop:24}}>3. Not Financial Advice</h2>
      <p>The Service does not provide financial, investment, legal, or tax advice. All information, tools, calculations, risk scores, trade verdicts, and Kelly Criterion outputs are for educational and informational purposes only. They should not be construed as a recommendation to buy, sell, or hold any position in any prediction market. You are solely responsible for your own trading decisions and should consult with qualified professionals before making financial decisions.</p>

      <h2 style={{fontSize:18,marginTop:24}}>4. No Affiliation</h2>
      <p>Paralan.trade is an independent tool and is not affiliated with, endorsed by, or sponsored by Polymarket, Kalshi, or any other prediction market platform. "Polymarket" and other platform names are trademarks of their respective owners.</p>

      <h2 style={{fontSize:18,marginTop:24}}>5. Data Accuracy</h2>
      <p>Market data is sourced from third-party public APIs and may be delayed, inaccurate, or incomplete. Paralan makes no warranties regarding data accuracy, completeness, or timeliness. You should always verify data directly on the source platform before making any trading decisions.</p>

      <h2 style={{fontSize:18,marginTop:24}}>6. Risk Acknowledgment</h2>
      <p>Prediction market trading involves substantial risk of loss. You acknowledge that you may lose some or all of your invested capital, past performance of any market or analytical tool does not guarantee future results, the risk scoring and trade verdict features are mathematical models and not guarantees of outcomes, and you will not trade with money you cannot afford to lose.</p>

      <h2 style={{fontSize:18,marginTop:24}}>7. Geographic Restrictions</h2>
      <p>Prediction market trading is prohibited or restricted in certain jurisdictions. It is your sole responsibility to determine whether your use of prediction markets is legal in your jurisdiction. Paralan does not facilitate, enable, or encourage trading in restricted jurisdictions.</p>

      <h2 style={{fontSize:18,marginTop:24}}>8. Advertising</h2>
      <p>The Service is supported by third-party advertising. Ad content is provided by external ad networks and does not represent endorsement by Paralan. We are not responsible for the content or accuracy of third-party advertisements.</p>

      <h2 style={{fontSize:18,marginTop:24}}>9. Limitation of Liability</h2>
      <p>To the maximum extent permitted by law, Paralan.trade, its creators, operators, and affiliates shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of the Service, including but not limited to trading losses, data inaccuracies, or service interruptions.</p>

      <h2 style={{fontSize:18,marginTop:24}}>10. Changes to Terms</h2>
      <p>We reserve the right to modify these terms at any time. Continued use of the Service constitutes acceptance of updated terms.</p>

      <h2 style={{fontSize:18,marginTop:24}}>11. Contact</h2>
      <p>Questions about these terms: <a href="mailto:hello@paralan.trade" style={{color:"#00d4aa"}}>hello@paralan.trade</a></p>
    </div>
  );
}
