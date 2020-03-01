import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Login from '../../../../components/forms/auth/Login';

describe('Login Form Component', () => {
  let props;
  beforeEach(() => {
    props = {
      errors: {},
      handleChange: jest.fn(),
      handleSubmit: jest.fn(),
      isSubmitting: false,
      touched: {},
      values: {},
    }
  });

  it('mounts', () => {
    const { asFragment } = render(<Login {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('calls email handle change', () => {
    const { getByPlaceholderText } = render(<Login {...props} />);
    fireEvent.change(getByPlaceholderText('email'), { target: { value: 'value' } });
    expect(props.handleChange).toHaveBeenCalledTimes(1);
    expect(getByPlaceholderText('email').value).toBe('value');
  });

  it('shows error email', () => {
    props = { ...props, errors: { email: 'Email is required!' }, touched: { email: true } }
    const { getByText } = render(<Login {...props} />)
    expect(getByText('Email is required!')).toBeInTheDocument();
  });

  it('calls password handle change', () => {
    const { getByPlaceholderText } = render(<Login {...props} />)
    fireEvent.change(getByPlaceholderText('password'), { target: { value: 'password value' } });
    expect(props.handleChange).toHaveBeenCalledTimes(1);
    expect(getByPlaceholderText('password').value).toBe('password value');
  });

  it('calls handleSubmit when click on Login', () => {
    const { getByTestId } = render(<Login {...props} />)
    fireEvent.submit(getByTestId('loginForm'));
    expect(props.handleSubmit).toHaveBeenCalledTimes(1);
  });

  it('disables submit button if is submitting', () => {
    props = { ...props, isSubmitting: true };
    const { getByTestId } = render(<Login {...props} />)
    expect(getByTestId('buttonSubmit')).toBeDisabled();
  });
});