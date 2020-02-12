import React, { useEffect } from 'react';
import { Box, Button, Checkbox, FormControlLabel, Grid, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import useFetch from '../../../hooks/fetch';
import env from '../../../config/config';

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
const User = ({ alertMessage }) => {
  const { data, error, isLoading, sendRequest } = useFetch();
  const formik = useFormik({
    initialValues: {
      name: '',
      lastName: '',
      email: '',
      password: '',
      isActive: false,
    },
    onSubmit: (values, helpers) => {
      createUser(values);
      helpers.setSubmitting(false);
      helpers.resetForm();
    },
    validate,
  });

  useEffect(() => {
    if (error) alertMessage(error, false);
    if (data) alertMessage('Users was created', true);
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

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box mt='20px'>
        <Grid container alignContent="center">
          <Grid xs={12} item>
            <TextField
              id="name"
              label="Name"
              fullWidth
              onChange={formik.handleChange}
              value={formik.values.name}
              error={formik.touched.name && formik.errors.name ? true : false}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          <Grid xs={12} item>
            <TextField
              id="lastName"
              label="Last Name"
              fullWidth
              onChange={formik.handleChange}
              value={formik.values.lastName}
              error={formik.touched.lastName && formik.errors.lastName ? true : false}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </Grid>
          <Grid xs={12} item>
            <TextField
              id="email"
              label="Email"
              fullWidth
              onChange={formik.handleChange}
              value={formik.values.email}
              error={formik.touched.email && formik.errors.email ? true : false}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid xs={12} item>
            <TextField
              id="password"
              label="Password"
              fullWidth
              onChange={formik.handleChange}
              value={formik.values.password}
              error={formik.touched.password && formik.errors.password ? true : false}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>
          <Grid xs={12} item>
            <FormControlLabel
              control={
                <Checkbox
                  id="isActive"
                  onChange={formik.handleChange}
                  checked={formik.values.isActive}
                  value={formik.values.isActive}
                />
              }
              label='Active User'
            />
          </Grid>
          <Grid xs={12} item>
            <Box mt='20px'>
              <Button id="create" variant="contained" color="primary" type="submit" disabled={formik.isSubmitting} fullWidth>Create</Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
}

export default User;