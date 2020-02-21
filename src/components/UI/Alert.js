import React, { useState, useEffect } from 'react';
import { Box } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const AlertUI = ({ message, isSucceeded = false }) => {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (message) setShowAlert(true);
  }, [message]);

  const closeAlert = () => setShowAlert(false);

  return (
    showAlert && (
      <Box mt='20px'>
        <Alert
          data-testid="alert"
          onClick={closeAlert}
          severity={isSucceeded ? 'success' : 'error'}
        >
          {message}
        </Alert>
      </Box>
    )
  );
}

export default AlertUI;