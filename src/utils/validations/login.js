const loginValidation = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Email is required!'
  } else if (!(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(values.email)) {
    errors.email = 'You must introduced a valid email';
  }
  if (!values.password) {
    errors.password = 'Password is required!'
  }
  return errors;
}

export default loginValidation;