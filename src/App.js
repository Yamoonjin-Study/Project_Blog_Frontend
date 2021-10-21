import React from 'react';
import { Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import IsLoginHeader from './components/Header/IsLoginHeader';
import IsNotLoginHeader from './components/Header/IsNotLoginHeader';
import Footer from './components/Footer/Footer';
import Navigation from './components/Navigation/Navigation';

function App() {

  let IsLogin = "";
  const token = sessionStorage.getItem('token');
  let header;
  let navigation;

  if(token === null){
    IsLogin="IsNotLogin";
    header=(<IsNotLoginHeader/>);
    navigation = null;
    console.log("로그인 여부 : "+IsLogin);
  }else{
    header=(<IsLoginHeader/>);
    navigation=(<Navigation/>);
    console.log("token : "+token);
    fetch('http://localhost:8080/log-in/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({"token" : token}),
    })
    .then(res => res.json())
    .then(res => {
      IsLogin = res.responseMessage;
      console.log("로그인 여부 : "+IsLogin);
    });
  }

  return (
    <div>
      {header}
      {navigation}
      <Route path='/yamoonjin.com' exact={true} component={MainPage} />
      <Route path='/yamoonjin.com/signin' exact={true} component={LoginPage} />
      <Route path='/yamoonjin.com/signup' exact={true} component={SignUpPage} />
      <Route path='/yamoonjin.com/mypage' exact={true} component={''} />
      <Route path='/yamoonjin.com/blog' exact={true} component={''} />
      <Footer />
    </div>
  );
}

export default App;
