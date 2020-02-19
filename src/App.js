import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Auth from './screens/Auth';
import Main from './screens/Main';
import User from './screens/User';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import { AppBarUI } from './components/UI';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AppBarUI position="static" />
      <Switch>
        <Route path='/login' component={Auth} />
        <PrivateRoute path="/user" component={User} exact={true} />
        <PrivateRoute path="/user/:id" component={User} exact={true} />
        <PrivateRoute path="/" component={Main} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
