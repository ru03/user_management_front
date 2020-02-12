import React from 'react';
import { AppBar, Button, Toolbar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import styles from './AppBarUI.module.css';

const AppBarUI = ({ color = 'default', position = 'fixed', clickHandler }) => (
  <AppBar
    color={color}
    position={position}
  >
    <Toolbar>
      {/* <Typography variant="h6">
        User Management
      </Typography> */}
      <Button color="inherit">
        <Link to='/' className={styles.links}>Home</Link>
      </Button>
      <Button color="inherit">
        <Link to='/user' className={styles.links}>Create User</Link>
      </Button>
    </Toolbar>
  </AppBar>
);

export default AppBarUI;


