import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
  if (!values.position) {
    errors.position = 'Position is required!'
  }

  return errors;
}

const User = () => {
  const { data: userCreated, error: userCreatedError, sendRequest: createUser } = useFetch();
  const { clear: clearUpdated, data: userUpdated, error: userUpdatedError, sendRequest: updateUser } = useFetch();
  const { clear, data: user, error: userError, sendRequest: sendUserReq } = useFetch();
  const [initValues, setInitValues] = useState({
    name: '',
    lastName: '',
    email: '',
    position: '',
    isActive: false,
  });
  const [alert, setAlert] = useState({ isSucceeded: false, message: '', showAlert: false, isResetForm: false });
  const { id } = useParams();

  useEffect(() => {
    if (userCreatedError || userError) setAlert({ message: userCreatedError || userError, isSucceeded: false, showAlert: true, isResetForm: false });
    if (userCreated) {
      setAlert({ message: 'Users was created', isSucceeded: true, showAlert: true, isResetForm: true });
    }
    if (user) {
      const { users: { name, lastName, email, active, position } } = user;
      setInitValues({ name, lastName, email, isActive: active !== 0, position });
    };

    return () => {
      setAlert({ isSucceeded: false, message: '', showAlert: false, isResetForm: false })
    }
  }, [userCreatedError, userCreated, user, userError]);

  //Update effect
  useEffect(() => {
    if (userUpdatedError) setAlert({ message: userUpdatedError, isSucceeded: false, showAlert: true, isResetForm: false });
    if (userUpdated) {
      setAlert({ message: 'Users was updated', isSucceeded: true, showAlert: true, isResetForm: false });
    }

    return () => {
      setAlert({ isSucceeded: false, message: '', showAlert: false, isResetForm: false })
    }
  }, [clearUpdated, userUpdatedError, userUpdated])

  //Fetch user if exist
  useEffect(() => {
    if (id) {
      const config = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      }
      sendUserReq(`${env.basepath}${env.users}/${id}`, config);
    };
    if (id === undefined) setInitValues({ name: '', lastName: '', email: '', isActive: false, position: '' });

    return () => {
      clear();
    }
  }, [id, sendUserReq, clear]);

  const closeAlert = () => setAlert({ showAlert: false, isSucceeded: false, message: '' });

  const onSubmit = (values, helpers) => {
    id ? onUpdateUser(values) : onCreateUser(values);
    helpers.setSubmitting(false);
  };

  const onCreateUser = async (values) => {
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values),
    }
    await createUser(`${env.basepath}${env.users}`, config);
  }

  const onUpdateUser = async (values) => {
    const config = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values),
    }
    await updateUser(`${env.basepath}${env.users}/${id}`, config);
  }

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
        initialValues={initValues}
        enableReinitialize
        onSubmit={onSubmit}
        validate={validate}
      >
        {props => <UserForm {...props} isResetForm={alert.isResetForm} />}
      </Formik>
    </Container >
  )
};

export default User;