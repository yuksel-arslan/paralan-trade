export default function Privacy() {
  return (
    <div style={{maxWidth:720,margin:"0 auto",padding:"60px 24px",fontFamily:"'Outfit',sans-serif",lineHeight:1.8,color:"#e4e5ea",background:"#08090d",minHeight:"100vh"}}>
      <a href="/" style={{color:"#00d4aa",textDecoration:"none",fontSize:13}}>← Back to Paralan</a>
      <h1 style={{fontSize:28,fontWeight:800,marginTop:20}}>Privacy Policy</h1>
      <p style={{color:"#6b6f82",fontSize:12}}>Last updated: {new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})}</p>

      <h2 style={{fontSize:18,marginTop:32}}>1. Information We Collect</h2>
      <p>Paralan.trade ("we", "our", "us") collects minimal data necessary to operate the service. We do not require account creation or login. We may collect anonymous usage analytics (page views, feature usage) through third-party analytics services and information automatically collected by your browser (IP address, browser type, device type) for analytics and ad serving purposes.</p>

      <h2 style={{fontSize:18,marginTop:24}}>2. Advertising</h2>
      <p>We display advertisements through third-party ad networks (such as Google AdSense, Carbon Ads, or similar services). These networks may use cookies and similar technologies to serve ads based on your browsing activity. You can opt out of personalized advertising through your browser settings or industry opt-out tools such as the Digital Advertising Alliance (DAA) opt-out page.</p>

      <h2 style={{fontSize:18,marginTop:24}}>3. Cookies</h2>
      <p>We use essential cookies for site functionality and third-party cookies for analytics and advertising. You can control cookie preferences through your browser settings. Disabling cookies may affect ad-supported features but will not impact core dashboard functionality.</p>

      <h2 style={{fontSize:18,marginTop:24}}>4. Data We Do NOT Collect</h2>
      <p>We do not collect personal identification information (name, email, phone), financial information (wallet addresses, trading data, balances), or any data from your prediction market accounts. All dashboard settings (bankroll, watchlist, filters) are stored locally in your browser and are never transmitted to our servers.</p>

      <h2 style={{fontSize:18,marginTop:24}}>5. Third-Party Services</h2>
      <p>Market data is sourced from Polymarket's publicly available Gamma API and CLOB API. We do not control or take responsibility for Polymarket's data practices. Please refer to Polymarket's own privacy policy for their data handling practices.</p>

      <h2 style={{fontSize:18,marginTop:24}}>6. Data Retention</h2>
      <p>Anonymous analytics data is retained for up to 26 months. We do not store any personally identifiable information.</p>

      <h2 style={{fontSize:18,marginTop:24}}>7. Your Rights (GDPR / KVKK)</h2>
      <p>If you are in the EU/EEA or Turkey, you have the right to access, rectify, or delete any personal data we hold. Since we collect minimal anonymous data, these rights primarily apply to cookie-based data. Contact us at hello@paralan.trade for any privacy-related requests.</p>

      <h2 style={{fontSize:18,marginTop:24}}>8. Changes</h2>
      <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last updated" date.</p>

      <h2 style={{fontSize:18,marginTop:24}}>9. Contact</h2>
      <p>For privacy inquiries: <a href="mailto:hello@paralan.trade" style={{color:"#00d4aa"}}>hello@paralan.trade</a></p>
    </div>
  );
}
