import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <div className='header' id='/'>
      <div className="header-contents">
        <h2>Order Your Favourite food here</h2>
        <p>
          Choose from a doverse menu featuring a delectable array of dishes crafted with the with the finest
          ingredients and culinary experties. Our mission is to satisfy you cravings and elevate your
          dining experienc, one delicious meal at a time.
        </p>
        <button>View Menu</button>
      </div>
    </div>
  )
}

export default Header;