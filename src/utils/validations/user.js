const userValidation = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Name is required!';
  } else if (values.name.length < 3) {
    errors.name = 'Must be 3 characters or more';
  }
  if (!values.lastName) {
    errors.lastName = 'Last names is required!';
  } else if (values.lastName.length < 3) {
    errors.lastName = 'Must be 3 characters or more';
  }
  if (!values.email) {
    errors.email = 'Email is required!'
  } else if (!(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(values.email)) {
    errors.email = 'You must introduced a valid email';
  }
  if (!values.position) {
    errors.position = 'Position is required!'
  }

  return errors;
}

export default userValidation;