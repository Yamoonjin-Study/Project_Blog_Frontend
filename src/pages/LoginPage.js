import React from 'react';
import LoginForm from '../components/LoginForm';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const LoginPage = () => {
  return (
    <div>
      <Header/>
      <LoginForm/>
      <Footer/>
    </div>
  );
};

export default LoginPage;