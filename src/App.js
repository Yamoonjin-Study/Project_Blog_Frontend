import React from 'react';
import { Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

function App() {
  return (
    <div>
      <Route path='/yamoonjin.com' exact={true} component={MainPage} />
      <Route path='/yamoonjin.com/signin' exact={true} component={LoginPage} />
      <Route path='/yamoonjin.com/signup' exact={true} component={SignUpPage} />
      <Route path='/yamoonjin.com/mypage' exact={true} component={''} />
      <Route path='/yamoonjin.com/blog' exact={true} component={''} />
    </div>
  );
}

export default App;
