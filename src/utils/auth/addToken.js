const getBearerToken = () => {
  const token = localStorage.getItem('token');
  return `Bearer ${token}`;
}

export default getBearerToken;