import React, { useEffect } from 'react';
import { Formik } from 'formik';
import { Redirect } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { loginValidation } from '../utils/validations'
import { useAuthDataContext } from '../providers/authProvider';
import useFetch from '../hooks/fetch';
import env from '../config/config';
import { Alert } from '../components/UI';
import Login from '../components/forms/auth/Login';

const Auth = () => {
  const { data, error, sendRequest } = useFetch();
  const { onLogin } = useAuthDataContext();
  useEffect(() => {
    if (data) {
      localStorage.setItem('token', data.token);
      onLogin();
    }
  }, [data, onLogin]);

  const onSubmit = (values, helpers) => {
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values),
    }
    sendRequest(`${env.REACT_APP_BASEPATH}${env.REACT_APP_AUTH}`, config);
    helpers.setSubmitting(false);
  }
  return (
    <Container>
      <Alert message={error} />
      {
        data
          ? <Redirect to="/users" />
          : <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validate={loginValidation}
            onSubmit={onSubmit}
          >
            {props => <Login {...props} />}
          </Formik>
      }
    </Container>
  )
};

export default Auth;