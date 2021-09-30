import React from 'react';
import { Container } from 'react-bootstrap';
import { Route } from 'react-router-dom';

function App() {
  return <div>
  <Container>
    <Route path="/" exact={true} component={''}/>
    <Route path="/login" exact={true} component={LoginPage}/>
    <Route path="/" exact={true} component={''}/>
    <Route path="/" exact={true} component={''}/>
    <Route path="/" exact={true} component={''}/>
    <Route path="/" exact={true} component={''}/>
    <Route path="/" exact={true} component={''}/>
  </Container>
  </div>;
}

export default App;
