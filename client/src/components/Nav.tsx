import { NavLink } from "react-router-dom";
import "../styles/nav.css";

const Nav = () => {
  return (
    <nav className="nav-container">
      <ul className="nav-list">
        <li><NavLink 
          to="/" 
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
        >
          Home
        </NavLink></li>

        <li><NavLink 
        to="/car-search" 
        className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
      >
        Car Search
      </NavLink></li>

      <li><NavLink 
        to="/about-us" 
        className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
      >
        About Us
      </NavLink></li>

      </ul>
    </nav>
  );
};

export default Nav;

