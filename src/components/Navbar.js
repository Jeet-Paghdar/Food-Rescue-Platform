import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IoFastFoodOutline } from "react-icons/io5";

function Navbar() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-logo" onClick={closeMobileMenu}>
        <IoFastFoodOutline /> FoodRescue
      </NavLink>

      <div className="menu-icon" onClick={handleClick}>
        {click ? <FaTimes /> : <FaBars />}
      </div>

      <ul className={click ? 'nav-menu active' : 'nav-menu'}>
        <li className="nav-item">
          <NavLink to="/" className="nav-links" onClick={closeMobileMenu}>
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/donate" className="nav-links" onClick={closeMobileMenu}>
            Donate Food
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/available" className="nav-links" onClick={closeMobileMenu}>
            Available Food
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/contributions" className="nav-links" onClick={closeMobileMenu}>
            My Contributions
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/admin" className="nav-links" onClick={closeMobileMenu}>
            Admin
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;