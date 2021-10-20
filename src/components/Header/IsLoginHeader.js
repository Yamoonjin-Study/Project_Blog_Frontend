import React from 'react';
import { Link } from 'react-router-dom';
import LogoIcon from '../../assets/images/logo.png';
import MenuIcon from '../../assets/images/menu.png';
import '../../assets/css/header.css';

const IsLoginHeader = () => {

  const LogOut = () =>{
    fetch("http://localhost:8080/log-out", {
      method: "GET"
    })
    .then(res=>res.json())
    .then(res=>{
      sessionStorage.removeItem("token");
      alert("로그아웃 되었습니다.");
      window.location.replace("/yamoonjin.com");
    });
  }

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
            <li>About</li>
          </Link>
          <Link to='/yamoonjin.com/surf' className='listLink'>
            <li>Surf</li>
          </Link>
          <Link to='/yamoonjin.com/mypage' className='listLink'>
            <li>My Page</li>
          </Link>
          <Link to='/yamoonjin.com' onClick={LogOut} className='listLink' >
            <li>Log Out</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default IsLoginHeader;