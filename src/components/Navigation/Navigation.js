import React from 'react';
import Bell from '../../assets/images/bell.png';
import Blog from '../../assets/images/blog.png';
import Chat from '../../assets/images/chat.png';
import Logo from '../../assets/images/logo.png';
import Portfolio from '../../assets/images/portfolio.png';
import User from '../../assets/images/user.png';
import { Link } from 'react-router-dom';
import '../../assets/css/navigation.css'

const Navigation = () => {

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
    <div className='mainNavi'>
      <Link to='/yamoonjin.com' className='linkStyle'>
        HOME<img src={Logo} className='homeIcon' alt='home'/>
      </Link>
      <Link to='/yamoonjin.com/alarm' className='linkStyle'>
        ALARM<img src={Bell} className='naviIcon' alt='alarm'/>
      </Link>
      <Link to='/yamoonjin.com/chat' className='linkStyle'>
        CHAT<img src={Chat} className='naviIcon' alt='chat'/>
      </Link>
      <Link to='/yamoonjin.com/blog' className='linkStyle'>
        BLOG<img src={Blog} className='naviIcon' alt='blog'/>
      </Link>
      <Link to='/yamoonjin.com/portfolio' className='linkStyle'>
        PORTFOLIO<img src={Portfolio} className='naviIcon' alt='portfolio'/>
      </Link>
      <button className='naviBtn' onClick={()=>(window.location.href='/yamoonjin.com/mypage')}>
        MYPAGE
      </button>
      &nbsp;&nbsp;&nbsp;
      <button className='naviBtn'onClick={LogOut}>
        LOGOUT
      </button>
      <img src={User} className='userIcon' alt='user'/>
    </div>
  );
};

export default Navigation;