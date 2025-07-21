import { useInnerWidth } from "../../hooks/useInnerWidth";

const howItWorksSteps = [
  {
    step: "Enter Amount & Recipient",
    description: "Choose the payout currency and enter the bank account or mobile money details.",
  },
  {
    step: "Review the Rate",
    description: "We show the exact amount of Bitcoin required and the amount that will land in local currency. No hidden charges.",
  },
  {
    step: "Send Bitcoin",
    description: "Send the displayed BTC amount to the Tapnob address (or scan QR). We lock the rate for a short window.",
  },
  {
    step: "Instant Payout",
    description: "As soon as the Bitcoin payment confirms (usually seconds with Lightning or soon after with on-chain fast-confirm settings), Tapnob triggers a payout to the recipient’s bank.*",
  },
]

const HowItWorks:React.FC = () => {
    const width=useInnerWidth()
  return (
    <div style={{padding:16}}>
      <h3
        data-aos="fade-in"
        data-aos-duration="500"
        className="headingFont-h3"
        style={{ padding: "0px 10px" }}
      >
        How it works?
      </h3>

      <div className={`d-flex ${width > 900? "flex-row":"flex-column"} align-items-center  gap-3`} style={{ padding: "10px",marginTop:-15 }}>
        {howItWorksSteps.map((item, index) => (
          <div
            key={index}
            className="box"
            style={{
              width: "100%",
              maxWidth: width < 900 ? "100%":"600px",
              border: "1px solid #e9e9ee",
              borderRadius: "12px",
              padding: "20px",
              backgroundColor: "#f9f9f9",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              minHeight:width > 900  ? 200:100
            }}
            data-aos="fade-up"
            data-aos-delay={index * 150}
          >
            <div className="d-flex align-items-center" style={{gap:10}}>
            <div className="d-flex align-items-center justify-content-center" 
                style={{width:50,height:50,borderRadius:25,background:"linear-gradient(30deg,rgb(198, 208, 243),white)",
                fontSize:23}}>{index+1}</div>
           
            <h5 style={{ marginBottom: "8px", fontWeight: "bold" }}>
                

                {item.step}</h5>
                </div>
                <div style={{height:5}}/>
            <p style={{ margin: 0 }}>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
