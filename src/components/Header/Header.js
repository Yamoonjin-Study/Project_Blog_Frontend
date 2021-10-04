import React from 'react';
import { Link } from 'react-router-dom';
import LogoIcon from '../../assets/images/logo.png';
import MenuIcon from '../../assets/images/menu.png';
import '../../assets/css/header.css';

const Header = () => {
  const linkStyle = {
    textDecoration: 'none',
    color: 'black',
  };
  return (
    <div className='headerDiv'>
      <Link to='/yamoonjin.com'>
        <img src={LogoIcon} className='logoIcon' alt='logo image' />
      </Link>

      <img src={MenuIcon} className='menuIcon' alt='logo image' />

      <div className='menuDiv'>
        <ul>
          <li>
            <Link to='/yamoonjin.com' style={linkStyle}>Home</Link>
          </li>
          <li>
            <Link to='/yamoonjin.com/about' style={linkStyle}>About</Link>
          </li>
          <li>
            <Link to='/yamoonjin.com/surf' style={linkStyle}>Surf</Link>
          </li>
          <li>
            <Link to='/yamoonjin.com/signup' style={linkStyle}>Sign Up</Link>
          </li>
          <li>
            <Link to='/yamoonjin.com/signin' style={linkStyle}>Sign In</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;