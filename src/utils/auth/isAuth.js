import jwtDecode from 'jwt-decode';

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

export default isAuthorize;