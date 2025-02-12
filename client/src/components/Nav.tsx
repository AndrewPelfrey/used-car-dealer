import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../styles/nav.css";

const Nav = () => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [role, setRole] = useState<string | null>(localStorage.getItem("role"));
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
      setRole(localStorage.getItem("role"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const isLoggedIn = token && token !== "null" && token !== "undefined";
  const isManager = role === "manager";

  return (
    <nav className="nav-container">
      <ul className="nav-list">
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/car-search" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            Car Search
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact-form" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            Contact Us
          </NavLink>
        </li>
        <li>
          <NavLink to="/about-us" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            About Us
          </NavLink>
        </li>

        {/* Employee Access Dropdown */}
        {isLoggedIn && (
          <li className="dropdown">
            <button className="dropdown-toggle" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              Employee Access ▼
            </button>
            {isDropdownOpen && (
              <ul className="dropdown-menu">
                <li>
                  <NavLink to="/crud-cars" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                    Edit Cars
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/messages" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                    View Messages
                  </NavLink>
                </li>
                {isManager && (
                  <li>
                    <NavLink to="/crud-employees" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                      Edit Employees
                    </NavLink>
                  </li>
                )}
              </ul>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
