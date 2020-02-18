import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const PrivateRoute = ({ component: Component, path, ...rest }) => {
  const isAuthorize = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;
    const { exp } = jwtDecode(token);
    if (!new Date() < new Date(exp * 1000)) {
      localStorage.removeItem('token');
      return false;
    } else {
      return true;
    }
  }

  return (
    <Route
      {...rest}
      path={path}
      render={props => isAuthorize() ? <Component {...props} /> : <Redirect to="/login" />}
    />
  );
}

export default PrivateRoute;