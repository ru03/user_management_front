import React from 'react';
import { render } from '@testing-library/react';
import AuthProvider from '../../../providers/authProvider';
import Auth from '../../../screens/Auth';

describe('Auth', () => {
  it('renders', () => {
    const { asFragment } = render(<AuthProvider><Auth /></AuthProvider>);
    expect(asFragment()).toMatchSnapshot();
  });
});