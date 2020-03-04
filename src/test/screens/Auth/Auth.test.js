import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AuthProvider from '../../../providers/authProvider';
import Auth from '../../../screens/Auth';
import useFetch from '../../../hooks/fetch';
jest.mock('../../../hooks/fetch');
jest.mock('../../../utils/auth');

describe('Auth', () => {

  beforeEach(() => {
    useFetch.mockReturnValue({ isLoading: false, sendRequest: jest.fn(), data: null });
  });

  it('renders', () => {
    const { asFragment } = render(<AuthProvider><Auth /></AuthProvider>, { wrapper: MemoryRouter });
    expect(asFragment()).toMatchSnapshot();
  });

  describe('Fills up email and password fields', () => {
    it('fills email field', async () => {
      const { getByPlaceholderText } = render(<AuthProvider><Auth /></AuthProvider>);
      await wait(() => {
        fireEvent.change(getByPlaceholderText('email'), { target: { value: 'test@test.com' } });
      });
      expect(getByPlaceholderText('email')).toHaveValue('test@test.com');
    });
    it('fills password field', async () => {
      const { getByPlaceholderText } = render(<AuthProvider><Auth /></AuthProvider>);
      await wait(() => {
        fireEvent.change(getByPlaceholderText('password'), { target: { value: '12345' } });
      })
      expect(getByPlaceholderText('password')).toHaveValue('12345');
    });
  });

  describe('Submit form without data', () => {
    it('shows fields required errors', async () => {
      const { getByTestId, getByText } = render(<AuthProvider><Auth /></AuthProvider>);
      await wait(() => {
        fireEvent.click(getByTestId('buttonSubmit'));
      });
      expect(getByText('Email is required!')).toBeInTheDocument();
      expect(getByText('Password is required!')).toBeInTheDocument();
    });
  });

  describe('Submit form with incorrect data', () => {
    it('shows validation errors', async () => {
      const { getByTestId, getByText, getByPlaceholderText } = render(<AuthProvider><Auth /></AuthProvider>);
      await wait(() => {
        fireEvent.change(getByPlaceholderText('email'), { target: { value: 'qweqeqe' } });
        fireEvent.click(getByTestId('buttonSubmit'));
      });
      expect(getByText('You must introduced a valid email')).toBeInTheDocument();
    });
  });
});