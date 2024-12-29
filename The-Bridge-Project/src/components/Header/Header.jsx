import React from 'react';
import './Header.css';
import ICON from '../../assets/ICON.jpg';

const Header = () => {
  return (
    <div className="header">
      <img src={ICON} alt="Icon" className="header-icon" />
    </div>
  );
};

export default Header;
