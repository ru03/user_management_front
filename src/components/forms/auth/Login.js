import React from 'react';
import { Box, Button, Card, CardContent, CardActions, CardHeader, Grid, makeStyles, TextField } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  header: {
    textAlign: 'center',
    spacing: 10,
  },
  card: {
    width: '30%',
  }
}));
const Login = ({ errors, handleChange, handleSubmit, isSubmitting, touched, values }) => {
  const classes = useStyles();
  return (
    <form onSubmit={handleSubmit} data-testid="loginForm">
      <Box mt="25%">
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Card className={classes.card}>
            <CardHeader title="Login" className={classes.header} />
            <CardContent>
              <Grid lg={12} item>
                <TextField
                  id="email"
                  name="email"
                  label="Email"
                  placeholder="email"
                  fullWidth
                  onChange={handleChange}
                  value={values.email}
                  error={touched.email && errors.email ? true : false}
                  helperText={touched.email && errors.email}
                />
              </Grid>
              <Grid lg={12} item>
                <TextField
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="password"
                  fullWidth
                  onChange={handleChange}
                  value={values.password}
                  error={touched.password && errors.password ? true : false}
                  helperText={touched.password && errors.password}
                />
              </Grid>
            </CardContent>
            <CardActions>
              <Grid lg={12} item>
                <Button
                  id="login_button"
                  data-testid="buttonSubmit"
                  color="primary"
                  disabled={isSubmitting}
                  variant="contained"
                  type="submit"
                  fullWidth
                >
                  Login
                </Button>
              </Grid>
            </CardActions>
          </Card>
        </Grid>
      </Box>
    </form>
  )
}

export default Login;