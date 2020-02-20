import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { isAuthorize } from '../utils/auth';

const AuthDataContext = createContext(null);

const AuthProvider = props => {
  const [isAuth, setAuth] = useState(false);

  useEffect(() => {
    setAuth(isAuthorize());
  }, []);

  const onLogin = () => setAuth(true);

  const onLogout = () => setAuth(false);

  const authDataProvider = useMemo(() => ({ isAuth, onLogin, onLogout }), [isAuth]);

  return <AuthDataContext.Provider value={authDataProvider} {...props} />;
}

export const useAuthDataContext = () => useContext(AuthDataContext);

export default AuthProvider;
