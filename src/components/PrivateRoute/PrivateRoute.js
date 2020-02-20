import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuthDataContext } from '../../providers/authProvider';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuth } = useAuthDataContext();
  return (
    <Route
      {...rest}
      render={props => isAuth ? <Component {...props} /> : <Redirect to="/login" />}
    />
  );
}

export default PrivateRoute;