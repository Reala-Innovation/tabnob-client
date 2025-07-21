import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useInnerWidth } from '../hooks/useInnerWidth';
import Nav from '../components/nav';
import Footer from '../Footer';

const ContactUs: React.FC = () => {
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
<br/><br/>
        <div style={{ maxWidth: 900, margin: '80px auto 40px', padding: '0 20px' }}>
          <h2 style={styles.heading}>Contact Us</h2>
          <p style={styles.paragraph}>
            We’d love to hear from you! Whether you have questions about <strong>Tapnob</strong>, need support, or want
            to partner with us — our team is here to help.
          </p>

          <h3 style={styles.subheading}>Customer Support</h3>
          <p style={styles.paragraph}>
            <strong>Email:</strong> <a href="mailto:gettapnob@gmail.com">gettapnob@gmail.com</a><br />
            <strong>WhatsApp:</strong> <a href="https://wa.me/2347063702228" target="_blank" rel="noopener noreferrer">+234 706 370 2228</a>,<a href="https://wa.me/2348037287834" target="_blank" rel="noopener noreferrer">+234 803 728 7834</a><br />
            <strong>Telegram:</strong> <a href="https://t.me/mubitech23" target="_blank" rel="noopener noreferrer">@mubitech23</a><br />
            <strong>Availability:</strong> 24/7
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
};

export default ContactUs;
