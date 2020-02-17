import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { Box, Container } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import UserForm from '../components/forms/users/User';
import useFetch from '../hooks/fetch';
import env from '../config/config';

const validate = values => {
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
  if (!values.password) {
    errors.password = 'Password is required!'
  } else if (!(/(?=(.*[0-9]))(?=.*[!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/).test(values.password)) {
    errors.password = 'Password must have 1 lowercase letter, 1 uppercase letter, 1 number, 1 special character and be at least 8 characters long';
  }

  return errors;
}

const User = () => {
  const [alert, setAlert] = useState({ isSucceeded: false, message: '', showAlert: false });
  const { data, error, sendRequest } = useFetch();

  useEffect(() => {
    if (error) setAlert({ message: error, isSucceeded: false, showAlert: true });
    if (data) {
      setAlert({ message: 'Users was created', isSucceeded: true, showAlert: true });
    }
  }, [error, data]);

  const createUser = async (values) => {
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values),
    }
    await sendRequest(`${env.basepath}${env.users}`, config);
  }

  const closeAlert = () => {
    setAlert({ showAlert: false, isSucceeded: false, message: '' });
  }

  const onSubmit = (values, helpers) => {
    createUser(values);
    helpers.setSubmitting(false);
  };

  return (
    <Container>
      {
        alert.showAlert && (
          <Box mt='20px'>
            <Alert onClick={closeAlert} severity={alert.isSucceeded ? 'success' : 'error'}>{alert.message}</Alert>
          </Box>
        )
      }
      <Formik
        initialValues={{
          name: '',
          lastName: '',
          email: '',
          password: '',
          isActive: false,
        }}
        onSubmit={onSubmit}
        validate={validate}
      >
        {props => <UserForm {...props} isSucceeded={alert.isSucceeded} />}
      </Formik>
    </Container >
  )
};

export default User;