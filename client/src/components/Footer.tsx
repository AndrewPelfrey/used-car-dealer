import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      {/* Left Side: Trademark & Terms */}
      <div className="footer-left">
        <p>© 2023-2024 by Company Name</p>
        <NavLink to="/terms" className="footer-link">
          Terms & Conditions
        </NavLink>
      </div>

      {/* Center: Social Media Links */}
      <div className="footer-center">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <img src="/images/icons/instagramLogo.png" alt="Instagram" className="social-icon" />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <img src="/images/icons/facebookLogo.png" alt="Facebook" className="social-icon" />
        </a>
      </div>

      {/* Right Side: Terms & Dealer Sign-In */}
      <div className="footer-right">
        <NavLink to="/terms" className="footer-link">
          Terms & Conditions
        </NavLink>
        <NavLink to="/employee-login" className="footer-link">
          Employee Log In
        </NavLink>
      </div>
    </footer>
  );
};

export default Footer;
