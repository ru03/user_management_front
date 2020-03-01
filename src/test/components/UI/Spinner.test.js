import React from 'react';
import { render } from '@testing-library/react';
import Spinner from '../../../components/UI/Spinner';

describe('Spinner Component', () => {
  it('mounts', () => {
    const { asFragment } = render(<Spinner />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders Spinner', () => {
    const { container } = render(<Spinner />);
    expect(container).toBeEnabled();
  });
});