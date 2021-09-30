import React from 'react';
import { Container } from 'react-bootstrap';
import { Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

function App() {
  return <div>
  <Container>
    <Route path="/" exact={true} component={MainPage}/>
    <Route path="/login" exact={true} component={LoginPage}/>
    <Route path="/signup" exact={true} component={SignUpPage}/>
    <Route path="/mypage" exact={true} component={''}/>
    <Route path="/blog" exact={true} component={''}/>
  </Container>
  </div>;
}

export default App;
