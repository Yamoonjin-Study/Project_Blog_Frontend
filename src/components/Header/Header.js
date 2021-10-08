import React from 'react';
import { Link } from 'react-router-dom';
import LogoIcon from '../../assets/images/logo.png';
import MenuIcon from '../../assets/images/menu.png';
import '../../assets/css/header.css';

const Header = () => {
  return (
    <div className='headerDiv'>
      <Link to='/yamoonjin.com'>
        <img src={LogoIcon} className='logoIcon' alt='logo image' />
      </Link>

      <img src={MenuIcon} className='menuIcon showMenu' alt='logo image' />
      <div className='menuList showMenu'>
        <ul className='showMenu'>
          <Link to='/yamoonjin.com' className='listLink'>
            <li>Home</li>
          </Link>
          <Link to='/yamoonjin.com/about' className='listLink'>
            <li>About</li><
           /Link>
          <Link to='/yamoonjin.com/surf' className='listLink'>
            <li>Surf</li>
          </Link>
          <Link to='/yamoonjin.com/signup' className='listLink'>
            <li>Sign Up</li>
          </Link>
          <Link to='/yamoonjin.com/signin' className='listLink'><
            li>Sign In</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;