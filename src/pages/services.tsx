import React from 'react';
import './services.css'; // import the styles
import Nav from '../components/nav';
import { useInnerWidth } from '../hooks/useInnerWidth';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer';

const services = [
  {
    title: 'Bitcoin On-Ramp',
    description: [
      'Easily purchase Bitcoin using your local currency.',
      'Instant and transparent transactions.',
      'Competitive rates with no hidden fees.',
      'Perfect for both beginners and experienced users.',
    ],
  },
  {
    title: 'Bitcoin Off-Ramp',
    description: [
      'Convert your Bitcoin to local bank transfers in seconds.',
      'Direct, instant cash-outs to your bank account.',
      'No need for complicated exchanges or intermediaries.',
      'Safe, affordable, and hassle-free.',
    ],
  },
  {
    title: 'Everyday Spending',
    description: [
      'Spend your Bitcoin seamlessly for daily needs.',
      'Pay bills, send money, or shop, all powered by Bitcoin.',
      'Tapnob makes Bitcoin as easy to use as cash.',
    ],
  },
  {
    title: 'Cross-Border Payments',
    description: [
      'Send and receive money across Africa without high fees.',
      'Leverage Bitcoin for fast, low-cost international payments.',
      'Avoid the delays and limitations of traditional remittances.',
    ],
  },
  {
    title: 'Secure Transactions',
    description: [
      'Your security is our priority.',
      'We use bank-level encryption and blockchain security.',
      'Reliable systems built to protect your funds at all times.',
    ],
  },
];

const OurServices: React.FC = () => {
    const width=useInnerWidth();
    const navigate=useNavigate();
  return (
     <>
    <div className='body'>
        <Nav startedButtonText={width <  900 ?"Transactions": 'Get Started'} startedClick={()=>{
    navigate(width < 900 ? "/Transactions":"/app")
  }}/>
<br/>
<br/>

{width > 900 &&<>
<br/><br/><br/>
</>}

<br/>
    <div className="services-container">
      <h2 className="services-heading">Our Services</h2>
      <p className="services-intro">
        At <strong>Tapnob</strong>, we provide simple, secure, and reliable Bitcoin services tailored for the African market. Whether you’re buying, selling, or spending Bitcoin, we make it fast and effortless.
      </p>
      <div className="services-grid">
        {services.map((service, index) => (
          <div  data-aos={`fade-up`} key={index} className="service-card">
            <h3>{service.title}</h3>
            <ul>
              {service.description.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
<br/><br/>
        <h3>Why Choose Tapnob?</h3>

        <ul>
          <li><strong>Speed:</strong> Instant processing for all transactions.</li>
          <li><strong>Simplicity:</strong> No complicated exchanges or long waiting periods.</li>
          <li><strong>Accessibility:</strong> Built for the African market with local currency support.</li>
        </ul>
    </div>
    </div>
      <Footer />

    </>
  );
};

export default OurServices;
