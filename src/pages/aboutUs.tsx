import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useInnerWidth } from '../hooks/useInnerWidth';
import Nav from '../components/nav';
import Footer from '../Footer';

const AboutUs: React.FC = () => {
  const navigate = useNavigate();
  const width = useInnerWidth();

  return (
    <>
      <div className="body">
        <Nav
          startedButtonText={width < 900 ? 'Transactions' : 'Get Started'}
          startedClick={() => {
            navigate(width < 900 ? '/Transactions' : '/app');
          }}
        />
<br/><br/>
{width > 900 &&<>
<br/><br/><br/>
</>}
        <div style={{ maxWidth: 900, margin: '80px auto 40px', padding: '0 20px' }}>
          <h2 style={styles.heading}>About Us</h2>
          <p style={styles.paragraph}>
            At <strong>Tapnob</strong>, we simplify spending Bitcoin across Africa. Our platform bridges the gap
            between Bitcoin and instant bank transfers, enabling you to convert and use Bitcoin effortlessly. No
            complicated exchanges, no long wait times — just fast, secure, and affordable payments for your everyday
            needs.
          </p>

          <h3 style={styles.subheading}>Our Mission</h3>
          <p style={styles.paragraph}>
            Our mission is to make Bitcoin adoption easy, practical, and accessible for everyone, one seamless bank
            transaction at a time. We believe Bitcoin is the future of money, and we’re building the tools to make that
            future a reality in Africa.
          </p>

          <h3 style={styles.subheading}>Who We Are</h3>
          <p style={styles.paragraph}>
            Tapnob is a product of <strong>Reala Innovative Solutions Ltd</strong>, a forward-thinking technology company
            focused on building tools for the modern African economy. We combine deep expertise in blockchain technology
            with a passion for financial freedom.
          </p>

          <h3 style={styles.subheading}>What We Offer</h3>
          <ul style={styles.list}>
            <li><strong>Bitcoin On-Ramp:</strong> Easily purchase Bitcoin with your local currency.</li>
            <li><strong>Bitcoin Off-Ramp:</strong> Convert Bitcoin into instant bank transfers without hassle.</li>
            <li><strong>Everyday Spending:</strong> Use Bitcoin for day-to-day expenses directly through Tapnob.</li>
            <li><strong>Fast, Secure, and Affordable Payments:</strong> Enjoy seamless transactions designed with your convenience in mind.</li>
          </ul>

          <h3 style={styles.subheading}>Why Tapnob?</h3>
          <p style={styles.paragraph}>
            We are more than just a service — we’re creating a bridge to the future of digital money in Africa. Whether
            you’re new to Bitcoin or an experienced user, Tapnob provides a simple and reliable platform to transact with
            confidence.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subheading: {
    fontSize: 22,
    fontWeight: 600,
    marginTop: 30,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 1.6,
    color: '#444',
  },
  list: {
    paddingLeft: 20,
    fontSize: 16,
    color: '#444',
    lineHeight: 1.6,
  },
};

export default AboutUs;
