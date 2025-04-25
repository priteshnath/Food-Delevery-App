import React, { useState, useCallback, useContext, useEffect } from "react";
import { assets } from "../../assets/assets";
import './Navbar.css'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { StoreContext } from "../../context/StoreContext";
import { FaChevronDown } from 'react-icons/fa';



const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [isSearching, setIsSearching] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { getTotalCartAmount, token, setToken, setSearchQueryAndResults, searchQuery } = useContext(StoreContext)
  const navigate = useNavigate();
  const location = useLocation();

  const hideMenuItems = ['/search', '/cart', '/myorders'].includes(location.pathname);

  const logout = () => {
    localStorage.removeItem('token');
    setToken("");
    navigate('/');
  }

  const handleSearch = () => {
    if (searchValue.trim() !== "") {
      setSearchQueryAndResults(searchValue);
      navigate('/search');
    }
  };


  const handleCancelSearch = () => {
    setIsSearching(false);
    setSearchValue("");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };


  useEffect(() => {
    setSearchValue(searchQuery);
  }, [searchQuery])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".navbar-profile")) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="navbar">
      {/* Logo */}
      {/* <Link to={'/'}><img src={assets.logo} alt="Logo" className="logo" /></Link> */}
      <Link to={'/'}><h1 className="logo">FoodZy.</h1></Link>


      <ul className="navbar-menu">
        {/* <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ''}>Home</Link> */}
        {!hideMenuItems && (
          <>
            <Link
              to='/'
              onClick={() => {
                setMenu("home");
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={menu === "home" ? "active" : ''}
            >
              Home
            </Link>
            <a href="#explore-menu" onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ''}>Menu</a>
            <a href="#About" onClick={() => setMenu("About")} className={menu === "About" ? "active" : ''}>About FoodZy</a>
            <a href="#footer" onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ''}>Contact Us</a>
          </>
        )}
      </ul>

      {/* Right Section */}
      <div className="navbar-right">
        {isSearching ? (
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for food item..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
            <button onClick={handleSearch}>Search</button>
            <button onClick={handleCancelSearch} className="search-cancel">Cancel</button>
          </div>
        ) : (
          <img
            src={assets.search_icon}
            alt="Search"
            onClick={() => setIsSearching(true)}
            className="search-icon"
          />
        )}
        <div className="navbar-cart-icon">
          <Link to={'/cart'}><img src={assets.basket_icon} alt="Cart" /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token
          ?
          <button onClick={() => setShowLogin(true)}>
            Sign In
          </button>
          :
          <div className="navbar-profile" onClick={toggleDropdown}>
            <div className="nav-profile-icon">
              <img src={assets.profile_icon} alt="Profile" />
              <FaChevronDown className={`dropdown-icon ${dropdownOpen ? "rotate" : ""}`} />
            </div>
            {dropdownOpen && (
              <ul className="nav-profile-dropdown">
                <li onClick={() => navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                <hr />
                <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
              </ul>
            )}
          </div>

        }

      </div>
    </div>
  );
};

export default Navbar;
