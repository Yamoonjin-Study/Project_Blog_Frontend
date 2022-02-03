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
import MyPage from './pages/MyPage';
import CreateBlogForm from './components/Contents/Blog/CreateBlogForm';
import ArchiveMain from './components/Contents/Archive/ArchiveMain';
import Chat from './components/Contents/Chat/Chat';
import Join from './components/Contents/Chat/Join/Join';

function App(props) {
  let IsLogin;
  let header;
  let navigation;

  if (sessionStorage.getItem('user_id') === null) {
    IsLogin = false;
    header = (<IsNotLoginHeader />);
    navigation = null;
  } else {
    header = (<IsLoginHeader />);
    if (props.location.pathname.indexOf('/yamoonjin.com/blog/') === 0) {
      header = null;
    }
    navigation = (<Navigation />);

    if(sessionStorage.getItem('token') !== null){
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
        if (IsLogin !== true) {
          sessionStorage.removeItem('user_id');
          sessionStorage.removeItem('token');
          alert('로그아웃 되었습니다. 다시 로그인해주세요.');
          window.location.href='/yamoonjin.com/signin';
        }
        console.log('로그인 여부 : ' + IsLogin);
      }).catch(err=>{
        sessionStorage.removeItem('user_id');
        sessionStorage.removeItem('token');
        console.log(err);
        alert('로그아웃 되었습니다. 다시 로그인해주세요.');
        window.location.href='/yamoonjin.com/signin';
      });
    }

  }

  return (
    <div>
      {header}
      {navigation}
      <Route path='/yamoonjin.com' exact={true} component={MainPage} />
      <Route path='/yamoonjin.com/signin' exact={true} component={LoginPage} />
      <Route path='/yamoonjin.com/signup' exact={true} component={SignUpPage} />
      <Route path='/yamoonjin.com/mypage' component={MyPage} />
      <Route path='/yamoonjin.com/blog' component={BlogPage} />
      <Route path='/yamoonjin.com/blogCreate' exact={true} component={CreateBlogForm} />
      <Route path='/yamoonjin.com/archive' exact={true} component={ArchiveMain} />
      <Route path='/' component={Join} />
      <Route path='/chat' component={Chat} />

      {
        props.location.pathname.indexOf('/yamoonjin.com/blog') !== 0
        ? <Footer />
        : null
      }
    </div>
  );
}

export default withRouter(App);