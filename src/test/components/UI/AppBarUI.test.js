import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'
import AppBarUI from '../../../components/UI/AppBarUI';
import AuthProvider from '../../../providers/authProvider';
import * as isAuthorize from '../../../utils/auth/isAuth';

describe('FloatButton Component', () => {

  it('mounts', () => {
    const { asFragment } = render(<AuthProvider><AppBarUI /></AuthProvider>, { wrapper: MemoryRouter });
    expect(asFragment()).toMatchSnapshot();
  });

  describe('Is not authorize', () => {
    it('has not authorize buttons', () => {
      const { getByText } = render(<AuthProvider><AppBarUI /></AuthProvider>, { wrapper: MemoryRouter });
      expect(getByText('Home')).toHaveTextContent('Home');
      expect(getByText('Sign In')).toHaveTextContent('Sign In');
    });
  });

  describe('Is authorize', () => {
    it('has authorize buttons', () => {
      jest.spyOn(isAuthorize, 'default').mockReturnValue(true);
      const { getByText } = render(<AuthProvider><AppBarUI /></AuthProvider>, { wrapper: MemoryRouter });
      expect(getByText('Home')).toHaveTextContent('Home');
      expect(getByText('Sign out')).toHaveTextContent('Sign out');
      expect(getByText('Create User')).toHaveTextContent('Create User');
    });
  });
});
