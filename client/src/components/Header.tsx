import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/header.css";

const Header: React.FC = () => {
  return (
    <header className="header">
      {/* Left Side: Clickable Logo */}
      <NavLink to="/about-us" className="logo-container">
        <img src="/images/icons/autoscoutLogo.png" alt="Company Logo" className="logo" />
      </NavLink>

      {/* Center: Clickable Company Name */}
      <div className="title-container">
      <NavLink to="/" className="company-title">
        AutoScout
      </NavLink>
      </div>

      {/* Right Side: Address & Phone */}
      <div className="contact-info">
        <p className="phone">1234 Placeholder St</p>
        <p className="address">Anytown, USA 56789</p>
        <p className="address">Call: (123) 456-7890</p>
      </div>
    </header>
  );
};

export default Header;
