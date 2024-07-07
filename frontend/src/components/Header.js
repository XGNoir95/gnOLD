import React, { useState } from 'react';
import logo from './img/log2.png';

const Header = ({ onNavClick, onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    const confirmed = window.confirm("Do you want to log out now?");
    if (confirmed && typeof onLogout === 'function') {
     

      onLogout();
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header style={{ backgroundColor: '#fff', color: '#fff', textAlign: 'center' }}>
      <div className="top-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 10px', backgroundColor: '#005f73' }}>
        <div className="logo-container">
          <img src={logo} alt="WanderHub Logo" className="logo" style={{ width: '80px', height: 'auto' }} />
        </div>
        <h1 style={{ fontSize: '30px', margin:'10' }}>WanderHub</h1> {}
        <div className="profile">

          
          <button onClick={handleLogout} style={{ backgroundColor: '#1496a5', color: '#fff', border: 'none', padding: '10px', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}>Logout</button>
        </div>
      </div>
      <nav className="nav-bar" style={{ backgroundColor: '#1496a5', padding: '5px 10px' }}>
        <ul className="nav-left" style={{ listStyleType: 'none', margin: 0, padding: 0, overflow: 'hidden', backgroundColor: '#1496a5' }}>
          <li><button onClick={() => onNavClick('home')} style={{ display: 'block', color: 'white', textAlign: 'center', padding: '8px 16px', textDecoration: 'none', fontSize: '16px' }}>Home</button></li>
          <li><button onClick={() => onNavClick('holiday')} style={{ display: 'block', color: 'white', textAlign: 'center', padding: '8px 16px', textDecoration: 'none', fontSize: '16px' }}>Holiday</button></li>
          <li><button onClick={() => onNavClick('hotel')} style={{ display: 'block', color: 'white', textAlign: 'center', padding: '8px 16px', textDecoration: 'none', fontSize: '16px' }}>Hotel</button></li>
          <li className="dropdown">
            <button onClick={toggleDropdown} style={{ display: 'block', color: 'white', textAlign: 'center', padding: '8px 16px', textDecoration: 'none', fontSize: '16px' }}>Others</button>
            {dropdownOpen && (
              <div className="dropdown-content" style={{ display: 'flex', flexDirection: 'column', position: 'absolute', backgroundColor: 'white', boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)', padding: '10px', borderRadius: '4px', zIndex: '1' }}>
                <div onClick={() => onNavClick('why')} style={{ padding: '8px 16px', cursor: 'pointer', color: 'black', textAlign: 'left', fontSize: '14px' }}>Why WanderHub?</div>
                <div onClick={() => onNavClick('faq')} style={{ padding: '8px 16px', cursor: 'pointer', color: 'black', textAlign: 'left', fontSize: '14px' }}>FAQ</div>
                <div onClick={() => onNavClick('about')} style={{ padding: '8px 16px', cursor: 'pointer', color: 'black', textAlign: 'left', fontSize: '14px' }}>About</div>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
