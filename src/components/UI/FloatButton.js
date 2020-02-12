import React from 'react';
import { Fab } from '@material-ui/core';

const FloatButton = ({ children, color = 'primary', clickHandler }) => {
  return (
    <Fab color={color} onClick={() => clickHandler && clickHandler()}>
      {children}
    </Fab>
  )
}

export default FloatButton;