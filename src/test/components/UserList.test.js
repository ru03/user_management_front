import React from 'react';
import '../../setupTest';
import { render } from '@testing-library/react';
import UserList from '../../components/UserList';
import { MemoryRouter } from 'react-router-dom';
import * as useFetch from '../../hooks/fetch';

describe('UserList Component', () => {

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('renders Spinner when isLoading true', () => {
    jest.spyOn(useFetch, 'default').mockReturnValue({ error: null, isLoading: true, data: null, sendRequest: jest.fn() });
    const { getByRole } = render(<MemoryRouter><UserList /></MemoryRouter>);
    expect(getByRole('progressbar')).toBeTruthy();
  });

  it('renders UserList with an active user', () => {
    jest.spyOn(useFetch, 'default')
      .mockReturnValue({
        error: null,
        isLoading: false,
        data: {
          users: [{ id: 1, name: 'name', lastName: 'last', updateAt: new Date().getTime(), active: true, email: 'a@a.com' }],
          count: 1,
        },
        sendRequest: () => true
      });
    const { getByText, getByTestId } = render(<MemoryRouter><UserList /></MemoryRouter>);
    expect(getByText('name')).toBeTruthy();
    expect(getByText('last')).toBeTruthy();
    expect(getByText('a@a.com')).toBeTruthy();
    expect(getByTestId('active')).toBeTruthy();
  });

  it('renders UserList with an inactive user', () => {
    jest.spyOn(useFetch, 'default')
      .mockReturnValue({
        error: null,
        isLoading: false,
        data: {
          users: [{ id: 1, name: 'name', lastName: 'last', updateAt: new Date().getTime(), active: false, email: 'a@a.com' }],
          count: 1,
        },
        sendRequest: () => true
      });
    const { getByTestId } = render(<MemoryRouter><UserList /></MemoryRouter>);
    expect(getByTestId('inactive')).toBeTruthy();
  });
});