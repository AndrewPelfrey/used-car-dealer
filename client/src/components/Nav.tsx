import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <NavLink 
        to="/" 
        className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}
      >
        Home
      </NavLink>

      <NavLink 
        to="/car-search" 
        className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}
      >
        Car Search
      </NavLink>

      <NavLink 
        to="/about-us" 
        className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}
      >
        About Us
      </NavLink>
    </nav>
  );
};

export default Nav;

