import React, { useState, useCallback, useContext } from "react";
import { assets } from "../../assets/assets";
import './Navbar.css'
import {Link } from 'react-router-dom';
import { StoreContext } from "../../context/StoreContext";

const MENU_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "mobile-app", label: "Mobile App" },
  { id: "contact-us", label: "Contact Us" },
];

const Navbar = ({setShowLogin}) => {
  const [menu, setMenu] = useState("home");
  const {getTotalCartAmount} = useContext(StoreContext)

  return (
    <div className="navbar">
      {/* Logo */}
      <Link to={'/'}><img src={assets.logo} alt="Logo" className="logo" /></Link>

      <ul className="navbar-menu">
        <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ''}>Home</Link>
        <a href="#explore-menu" onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ''}>Menu</a>
        <a href="#app-download" onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ''}>Mobile App</a>
        <a href="#footer" onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ''}>Contact Us</a>
      </ul>

      {/* Right Section */}
      <div className="navbar-right">
        <img src={assets.search_icon} alt="Search" />
        <div className="navbar-search-icon">
          <Link to={'/cart'}><img src={assets.basket_icon} alt="Cart" /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div> 
        </div>
        <button onClick={()=> setShowLogin(true)}>
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Navbar;
