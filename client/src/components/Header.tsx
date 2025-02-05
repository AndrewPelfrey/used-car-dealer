import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Header.css";

const Header: React.FC = () => {
  return (
    <header className="header">
      {/* Left Side: Clickable Logo */}
      <NavLink to="/about-us" className="logo-container">
        <img src="/images/logo.png" alt="Company Logo" className="logo" />
      </NavLink>

      {/* Center: Clickable Company Name */}
      <NavLink to="/" className="company-name">
        Used Dealership Name
      </NavLink>

      {/* Right Side: Address & Phone */}
      <div className="contact-info">
        <p>1234 Car Lot Ave, City, ST 56789</p>
        <p>Call: (123) 456-7890</p>
      </div>
    </header>
  );
};

export default Header;
