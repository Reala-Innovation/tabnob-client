import "../styles/about.css";

const AboutUs = () => {
  return (
    <div data-aos={"fade-up"} className="about-container">
      <div className="about-image">
        <img src={"/whyUs.jpeg"} alt="About Tabnob" />
      </div>
      <div className="about-text">
        <h3 className='headingFont-h3'>About Us</h3>
        <p>
          At tapnob, we simplify spending Bitcoin across Africa. As part of BitcoinDua, we bridge the gap
          between Bitcoin and Mobile Money (MoMo), letting you convert and use Bitcoin instantly. No complicated
          exchanges, no long wait times — just fast, secure, and affordable payments for your everyday needs.
          Our mission is to make Bitcoin adoption easy and accessible for everyone, one seamless transaction at a time.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
