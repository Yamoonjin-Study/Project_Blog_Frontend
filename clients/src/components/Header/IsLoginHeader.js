import React from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '../../assets/images/menu.png';
import '../../assets/css/header.css';

const IsLoginHeader = () => {

  return (
    <div className='headerDiv'>
      <img src={MenuIcon} className='menuIcon showMenu' alt='logo' />
      <div className='menuList showMenu'>
        <ul className='showMenu'>
          <Link to='/yamoonjin.com' className='listLink'>
            <li>Home</li>
          </Link>
          <Link to='/yamoonjin.com/blog' className='listLink'>
            <li>Blogs</li>
          </Link>
          <Link to='/yamoonjin.com/archive' className='listLink'>
            <li>Archives</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default IsLoginHeader;