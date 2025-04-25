import React from 'react';
import './Navbar.css';
import { assets } from "../../assets/assets";
import { UserButton, useUser, SignOutButton } from '@clerk/clerk-react';

const Navbar = () => {
  const { isSignedIn } = useUser();

  return (
    <div className='navbar'>
      <img className='logo' src={assets.logo} alt="Logo" />

      {isSignedIn ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <UserButton afterSignOutUrl="/" />
        </div>
      ) : (
        <img className='profile' src={assets.profile_image} alt="Profile" />
      )}
    </div>
  );
};

export default Navbar;
