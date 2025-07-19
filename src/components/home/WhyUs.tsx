import { useInnerWidth } from "../../hooks/useInnerWidth";

const howItWorksSteps = [
  {
    step: "High remittance fees that drain income.",
    description:
      "Traditional money transfers often come with high fees that reduce the amount families receive. Tapnob provides a low-cost alternative using Bitcoin, keeping more money in the hands of your loved ones.",
  },
  {
    step: "Unstable exchange rates and fast devaluation",
    description:
      "In many regions, local currencies lose value quickly. Tapnob helps users hold and convert Bitcoin into spendable value, providing protection from currency devaluation.",
  },
  {
    step: "Limited access to reliable cross-border payments",
    description:
      "Banking systems aren't always accessible or efficient for international transactions. Tapnob bridges the gap with seamless cross-border Bitcoin transfers that are reliable and secure.",
  },
  {
    step: "Delays or friction when receiving funds from abroad",
    description:
      "Waiting days to receive money can disrupt everyday life. Tapnob enables near-instant Bitcoin-based payments, giving recipients faster access to their funds.",
  },
];


const WhyUs = () => {
  const width = useInnerWidth();

  return (
    <div style={{ padding: 16,marginLeft:width < 900 ? -20:0 }}>
      <h3
        data-aos="fade-in"
        data-aos-duration="500"
        className="headingFont-h3"
        style={{ padding: "0px 10px" }}
      >
        Why Us?
      </h3>

      <div
        className={`d-flex ${width > 900 ? "flex-row" : "flex-column"} align-items-center gap-3`}
        style={{ padding: "10px" }}
      >
        {howItWorksSteps.map((item, index) => (
          <div
            key={index}
            className="box"
            style={{
              width: "100%",
              maxWidth: width < 900 ? "90%" : "600px",
              marginLeft:width < 900 ? "-5%":"",
              border: "1px solid #616161",
              borderRadius: "12px",
              padding: "20px",
              backgroundColor: "#ffffff23",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.693)",
              minHeight: width > 900 ? 200 : 200,
            }}
            data-aos="fade-up"
            data-aos-delay={index * 150}
          >
            <div style={{gap:10}} className="d-flex align-items-center">
               <div className="d-flex align-items-center justify-content-center" 
                style={{width:50,minWidth:50,height:50,borderRadius:25,background:"linear-gradient(30deg,rgb(62, 63, 67),#f2f3f6)",
                fontSize:23}}>{index+1}</div>
                
            <h5 style={{ marginBottom: "8px", fontWeight: "bold" }}>
              {item.step}
            </h5>
</div>
            <p style={{ margin: 0 }}>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyUs;
