import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Auth from './screens/Auth';
import Main from './screens/Main';
import User from './screens/User';
import { AppBarUI } from './components/UI';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AppBarUI position="static" />
      <Switch>
        <Route path='/' component={Main} exact />
        <Route path='/login' component={Auth} exact />
        <Route path='/user/:id' component={User} />
        <Route path='/user' component={User} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
