import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import User from '../../../screens/User';

describe('User Screen', () => {
  it('render', () => {
    const { asFragment } = render(<User />, { wrapper: MemoryRouter });
    expect(asFragment()).toMatchSnapshot();
  });
});
