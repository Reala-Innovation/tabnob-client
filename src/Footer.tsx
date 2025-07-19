import React from 'react';
import { FaTelegram, FaTwitter, FaGithub } from 'react-icons/fa';
import { AppName } from './components/icon';
import './Footer.css'; // Import CSS

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Top Section */}
        <div className="footer-top">
          <AppName />
          <p className="footer-slogan">Spend Bitcoin. Keep Your Bitcoin.</p>
          <div className="footer-icons">
            <a href="https://t.me/tapnob" target="_blank" rel="noopener noreferrer"><FaTelegram size={24} /></a>
            <a href="https://twitter.com/tapnob" target="_blank" rel="noopener noreferrer"><FaTwitter size={24} /></a>
            <a href="https://github.com/tapnob" target="_blank" rel="noopener noreferrer"><FaGithub size={24} /></a>
          </div>
        </div>

        {/* Middle Section */}
        <div className="footer-middle">
          <div>
            <h4>Contact</h4>
            <p>Support: <a href="mailto:support@tapnob.com">support@tapnob.com</a></p>
            <p>Business: <a href="mailto:partners@tapnob.com">partners@tapnob.com</a></p>
          </div>
          <div>
            <h4>Legal</h4>
            <p>Terms • Privacy • Regulatory Disclosures • AML Statement</p>
          </div>
          <div>
            <h4>Community</h4>
            <p>X/Twitter • GitHub • Updates Newsletter</p>
          </div>
          <div>
            <h4>Initiatives</h4>
            <p>Financial Freedom Fund • Grants • Developer Bounties</p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <p>Copyright © {year}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
