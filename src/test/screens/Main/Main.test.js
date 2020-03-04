import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Main from '../../../screens/Main';

describe('Main Screen', () => {
  it('renders main screens', () => {
    const { asFragment } = render(<Main />, { wrapper: MemoryRouter });
    expect(asFragment()).toMatchSnapshot();
  });
});