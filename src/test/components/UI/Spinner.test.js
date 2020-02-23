import React from 'react';
import '../../../setupTest';
import { render } from '@testing-library/react';
import Spinner from '../../../components/UI/Spinner';

describe('Spinner Component', () => {
  it('renders Spinner', () => {
    const { container } = render(<Spinner />);
    expect(container).toBeEnabled();
  });
});