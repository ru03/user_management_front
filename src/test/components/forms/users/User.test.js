import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import User from '../../../../components/forms/users/User';

describe('Login Form Component', () => {
  let props;
  beforeEach(() => {
    props = {
      errors: {},
      handleChange: jest.fn(),
      handleSubmit: jest.fn(),
      isResetForm: false,
      isSubmitting: false,
      isUpdate: false,
      resetForm: jest.fn(),
      touched: {},
      values: {},
    }
  });

  it('mounts', () => {
    const { asFragment } = render(<User {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('calls handle change on each field', () => {
    const { container, getByPlaceholderText } = render(<User {...props} />)
    fireEvent.change(getByPlaceholderText('Name'), { target: { value: 'value' } });
    fireEvent.change(getByPlaceholderText('Last Name'), { target: { value: 'value' } });
    fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'value' } });
    fireEvent.change(getByPlaceholderText('Position'), { target: { value: 'value' } });
    fireEvent.click(container.querySelector('#isActive'));
    expect(props.handleChange).toHaveBeenCalledTimes(5);
    expect(getByPlaceholderText('Name').value).toBe('value');
    expect(getByPlaceholderText('Last Name').value).toBe('value');
    expect(getByPlaceholderText('Email').value).toBe('value');
    expect(getByPlaceholderText('Position').value).toBe('value');
    expect(container.querySelector('#isActive').checked).toBeTruthy();
  });

  it('shows error name, last name, email and position', () => {
    props = {
      ...props, errors: {
        name: 'Name is required!',
        lastName: 'Last name is required!',
        email: 'Email is required!',
        position: 'Position is required!',
      },
      touched: { name: true, lastName: true, email: true, position: true, }
    }
    const { getByText } = render(<User {...props} />)
    expect(getByText('Name is required!')).toBeInTheDocument();
    expect(getByText('Last name is required!')).toBeInTheDocument();
    expect(getByText('Email is required!')).toBeInTheDocument();
    expect(getByText('Position is required!')).toBeInTheDocument();
  });

  it('calls handleSubmit when click on Login', () => {
    const { getByTestId } = render(<User {...props} />)
    fireEvent.submit(getByTestId('userForm'));
    expect(props.handleSubmit).toHaveBeenCalledTimes(1);
  });

  it('disables create button', () => {
    props = { ...props, isSubmitting: true };
    const { getByTestId } = render(<User {...props} />)
    expect(getByTestId('buttonCreate')).toBeDisabled();
  });

  it('has create button if isUpdate = false', () => {
    const { getByText } = render(<User {...props} />)
    expect(getByText('Create')).toBeInTheDocument();
  });

  it('has update button if isUpdate = true', () => {
    props = { ...props, isUpdate: true };
    const { getByText } = render(<User {...props} />)
    expect(getByText('Update')).toBeInTheDocument();
  });

  it('calls resetForm if isResetForm = true', () => {
    props = { ...props, isResetForm: true };
    render(<User {...props} />);
    expect(props.resetForm).toHaveBeenCalledTimes(1);
  });
});