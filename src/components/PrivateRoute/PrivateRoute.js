import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthorize = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;
    const { exp } = jwtDecode(token);
    if (new Date() < new Date(exp * 1000)) {
      return true;
    } else {
      localStorage.removeItem('token');
      return false;
    }
  }

  return (
    <Route
      {...rest}
      render={props => isAuthorize() ? <Component {...props} /> : <Redirect to="/login" />}
    />
  );
}

export default PrivateRoute;