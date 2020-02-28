import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import AuthProvider from './providers/authProvider';
import Auth from './screens/Auth';
import Main from './screens/Main';
import User from './screens/User';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import { AppBarUI } from './components/UI';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <AuthProvider>
          <AppBarUI position="static" />
          <Route path='/login' component={Auth} />
          <PrivateRoute path="/users" component={Main} />
          <PrivateRoute path="/user/:id?" component={User} />
          <Route path='/' component={Auth} />
          {/* <PrivateRoute path="/user" component={User} /> */}
        </AuthProvider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
