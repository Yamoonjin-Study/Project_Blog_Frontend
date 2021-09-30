import React from 'react';
import { Link } from 'react-router-dom';
import LogoIcon from '../../assets/images/logo.png';

const Header = () => {
  return (
    <div>
      <Link to='/'><img src={LogoIcon} height='50px' width='50px'
                        alt='logo image' /></Link>헤더입니다.<br />
      <Link to='/'>메인페이지</Link><br />
      <Link to='/login'>로그인페이지</Link><br />
      <Link to='/signup'>회원가입페이지</Link><br />
      <Link to='/mypage'>마이페이지</Link><br />
    </div>
  );
};

export default Header;