import React from 'react';
import { AppBar, Button, Toolbar } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import styles from './AppBarUI.module.css';
import { useAuthDataContext } from '../../providers/authProvider';

const AppBarUI = ({ color = 'default', position = 'fixed' }) => {
  const history = useHistory();
  const { isAuth, onLogout } = useAuthDataContext();

  const onSignOut = () => {
    localStorage.removeItem('token');
    onLogout();
    history.push('/login');
  }

  return (
    <AppBar
      color={color}
      position={position}
    >
      <Toolbar>
        {/* <Typography variant="h6">
        User Management
      </Typography> */}
        <Button color="inherit">
          <Link to='/users' className={styles.links}>Home</Link>
        </Button>
        {
          isAuth
            ? (
              <>
                <Button color="inherit">
                  <Link to='/user' className={styles.links}>Create User</Link>
                </Button>
                <div className={styles.signOut}>
                  <Button color="inherit" onClick={onSignOut}>Sign out</Button>
                </div>
              </>
            )
            : (
              <div className={styles.signOut}>
                <Button color="inherit">
                  <Link to='/login' className={styles.links}>Sign In</Link>
                </Button>
              </div>
            )
        }
      </Toolbar>
    </AppBar>
  );
}

export default AppBarUI;


