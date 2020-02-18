import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Formik } from 'formik';
import { Container } from '@material-ui/core';
import { Alert } from '../components/UI';
import { userValidation } from '../utils/validations'
import UserForm from '../components/forms/users/User';
import useFetch from '../hooks/fetch';
import env from '../config/config';

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
  const [alert, setAlert] = useState({ isSucceeded: false, message: '', isResetForm: false });
  const { id } = useParams();

  useEffect(() => {
    if (userCreatedError || userError) setAlert({ message: userCreatedError || userError, isSucceeded: false, isResetForm: false });
    if (userCreated) {
      setAlert({ message: 'Users was created', isSucceeded: true, isResetForm: true });
    }
    if (user) {
      const { users: { name, lastName, email, active, position } } = user;
      setInitValues({ name, lastName, email, isActive: active !== 0, position });
    };

    return () => {
      setAlert({ isSucceeded: false, message: '', isResetForm: false })
    }
  }, [userCreatedError, userCreated, user, userError]);

  //Update effect
  useEffect(() => {
    if (userUpdatedError) setAlert({ message: userUpdatedError, isSucceeded: false, isResetForm: false });
    if (userUpdated) {
      setAlert({ message: 'Users was updated', isSucceeded: true, isResetForm: false });
    }

    return () => {
      setAlert({ isSucceeded: false, message: '', isResetForm: false })
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
    createUser(`${env.basepath}${env.users}`, config);
  }

  const onUpdateUser = async (values) => {
    const config = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values),
    }
    updateUser(`${env.basepath}${env.users}/${id}`, config);
  }

  return (
    <Container>
      <Alert message={alert.message} isSucceeded={alert.isSucceeded} />
      <Formik
        initialValues={initValues}
        enableReinitialize
        onSubmit={onSubmit}
        validate={userValidation}
      >
        {props => <UserForm {...props} isResetForm={alert.isResetForm} />}
      </Formik>
    </Container >
  )
};

export default User;