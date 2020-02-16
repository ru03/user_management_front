import React, { useState } from 'react';
import { Box, Container } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import UserForm from '../components/forms/users/User';

const User = () => {
  const [alert, setAlert] = useState({ isSucceeded: false, message: '', showAlert: false });

  const closeAlert = () => {
    setAlert({ showAlert: false, isSucceeded: false, message: '' });
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
      <UserForm alertMessage={(message, isSucceeded) => setAlert({ message, isSucceeded, showAlert: true })} />
    </Container >
  )
};

export default User;