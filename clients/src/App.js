import React, { useEffect, useState } from 'react';
import { Route, withRouter } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import IsNotLoginHeader from './components/Header/IsNotLoginHeader';
import Footer from './components/Footer/Footer';
import Navigation from './components/Navigation/Navigation';
import BlogPage from './pages/BlogPage';
import MyPage from './pages/MyPage';
import CreateBlogForm from './components/Contents/Blog/CreateBlogForm';
import ArchiveMain from './components/Contents/Archive/ArchiveMain';
import Chat from './components/Contents/Chat/Chat';
import Join from './components/Contents/Chat/Join/Join';
import ChatPage from './pages/ChatPage';
import IsLoginHeader from './components/Header/IsLoginHeader';
import socket from './config/socket';

function App() {
  const [isLogin, setIsLogin] = useState();
  const nickName = sessionStorage.getItem('user_nickName');
  const token = sessionStorage.getItem('token');
  const userId = parseInt(sessionStorage.getItem('user_id'));

  useEffect(() => {
    if (token && userId && nickName) {
      fetch('http://localhost:8080/log-in/check', {
        method: 'POST',
        headers: {
          'X-AUTH-TOKEN': sessionStorage.getItem('token'),
        },
        body: token,
      })
      .then(res => res.json())
      .then(res => {
        setIsLogin(res.isLogin);
        if (!socket.connected) {
          socket.connect();
          socket.emit('reconnection', { userId, nickName },
            ({ error, user }) => {
              if (error) {
                alert(error);
              }
            });
        }
      });
    } else {
      setIsLogin(false);
    }
  }, [socket, token, userId, nickName]);

  // useEffect(() => {
  //   socket.emit('getUsers', (callback) => {
  //     console.log(callback.users);
  //   });
  // });

  return (
    <div>
      {
        isLogin === false
          ? <IsNotLoginHeader />
          : <IsLoginHeader />
      }
      {
        isLogin === true &&
        <Navigation />
      }
      <Route path='/yamoonjin.com' exact={true} component={MainPage} />
      <Route path='/yamoonjin.com/signin' exact={true} component={LoginPage} />
      <Route path='/yamoonjin.com/signup' exact={true} component={SignUpPage} />
      <Route path='/yamoonjin.com/mypage' component={MyPage} />
      <Route path='/yamoonjin.com/blog' component={BlogPage} />
      <Route path='/yamoonjin.com/blogCreate' exact={true}
             component={CreateBlogForm} />
      <Route path='/yamoonjin.com/archive' exact={true}
             component={ArchiveMain} />
      <Route path='/yamoonjin.com/chat' component={ChatPage} />
      <Route path='/chat' component={Chat} />
      <Route path='/join' component={Join} />

      {
        window.location.pathname.indexOf('/yamoonjin.com/blog') === 0
        || window.location.pathname.indexOf('/yamoonjin.com/chat') === 0
          ? null
          : <Footer />
      }
    </div>
  );
}

export default withRouter(App);
