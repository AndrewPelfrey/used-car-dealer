//import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Nav.css";

const NavBar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-link">
        Home
      </NavLink>
      <NavLink to="/car-search" className="nav-link">
        Car Search
      </NavLink>
      <NavLink to="/about-us" className="nav-link">
        About Us
      </NavLink>
    </nav>
  );
};

export default NavBar;
