import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import IsLoginHeader from './components/Header/IsLoginHeader';
import IsNotLoginHeader from './components/Header/IsNotLoginHeader';
import Footer from './components/Footer/Footer';
import Navigation from './components/Navigation/Navigation';
import BlogPage from './pages/BlogPage';
import BlogHeader from './components/Header/BlogHeader';
import ArchivePage from './pages/ArchivePage';
import MyPage from './pages/MyPage';

function App(props) {
  console.log(
    sessionStorage.getItem('user_id') + '/' + sessionStorage.getItem('token'));
  let IsLogin;
  let header;
  let navigation;

  if (sessionStorage.getItem('user_id') === null) {
    IsLogin = false;
    header = (<IsNotLoginHeader />);
    navigation = null;
  } else {
    header = (<IsLoginHeader />);
    if (props.location.pathname === '/yamoonjin.com/blog') {
      header = (<BlogHeader />);
    }
    if (props.location.pathname === '/yamoonjin.com/archive') {
      header = (<BlogHeader />);
    }
    navigation = (<Navigation />);

    fetch('http://localhost:8080/log-in/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'X-AUTH-TOKEN': sessionStorage.getItem('token'),
      },
      body: JSON.stringify({ 'token': sessionStorage.getItem('token') }),
    })
    .then(res => res.json())
    .then(res => {
      IsLogin = res.isLogin;
      if (IsLogin === false) {
        sessionStorage.removeItem('user_id');
        sessionStorage.removeItem('token');
      }
      console.log('로그인 여부 : ' + IsLogin);
    });
  }

  return (
    <div>
      {header}
      {navigation}
      <Route path='/yamoonjin.com' exact={true} component={MainPage} />
      <Route path='/yamoonjin.com/signin' exact={true} component={LoginPage} />
      <Route path='/yamoonjin.com/signup' exact={true} component={SignUpPage} />
      <Route path='/yamoonjin.com/mypage' exact={true} component={MyPage} />
      <Route path='/yamoonjin.com/blog' exact={true} component={BlogPage} />
      <Route path='/yamoonjin.com/archive' exact={true}
             component={ArchivePage} />
      <Footer />
    </div>
  );
}

export default withRouter(App);
