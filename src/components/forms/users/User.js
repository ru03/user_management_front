import React, { useEffect } from 'react';
import { Box, Button, Checkbox, FormControlLabel, Grid, TextField } from '@material-ui/core';

const User = ({ errors, handleChange, handleSubmit, isSubmitting, isResetForm, isUpdate, resetForm, touched, values }) => {
  useEffect(() => {
    if (isResetForm) resetForm();
  }, [isResetForm, resetForm]);
  return (
    <form onSubmit={handleSubmit}>
      <Box mt='20px'>
        <Grid container alignContent="center">
          <Grid xs={12} item>
            <TextField
              id="name"
              label="Name"
              fullWidth
              onChange={handleChange}
              value={values.name}
              error={touched.name && errors.name ? true : false}
              helperText={touched.name && errors.name}
            />
          </Grid>
          <Grid xs={12} item>
            <TextField
              id="lastName"
              label="Last Name"
              fullWidth
              onChange={handleChange}
              value={values.lastName}
              error={touched.lastName && errors.lastName ? true : false}
              helperText={touched.lastName && errors.lastName}
            />
          </Grid>
          <Grid xs={12} item>
            <TextField
              id="email"
              label="Email"
              fullWidth
              onChange={handleChange}
              value={values.email}
              error={touched.email && errors.email ? true : false}
              helperText={touched.email && errors.email}
            />
          </Grid>
          <Grid xs={12} item>
            <TextField
              id="position"
              label="Position"
              fullWidth
              onChange={handleChange}
              value={values.position}
              error={touched.position && errors.position ? true : false}
              helperText={touched.position && errors.position}
            />
          </Grid>
          <Grid xs={12} item>
            <FormControlLabel
              control={
                <Checkbox
                  id="isActive"
                  onChange={handleChange}
                  checked={values.isActive}
                  value={values.isActive}
                />
              }
              label='Active User'
            />
          </Grid>
          <Grid xs={12} item>
            <Box mt='20px'>
              <Button
                id="create"
                variant="contained"
                color="primary"
                type="submit"
                disabled={isSubmitting}
                fullWidth
              >
                {isUpdate ? 'Update' : 'Create'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
}

export default User;