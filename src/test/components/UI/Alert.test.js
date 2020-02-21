import React from 'react';
import '../../../setupTest';
import { fireEvent, render } from '@testing-library/react';
import Alert from '../../../components/UI/Alert';

describe('Alert Component', () => {
  it('shows a message error if it is passed by props', () => {
    const { getByText } = render(<Alert message='error message' />);
    expect(getByText('error message')).toHaveTextContent('error message');
  });

  it('hides alert componet if click on close', () => {
    const { container, getByTestId } = render(<Alert message='error message' />);
    const alert = getByTestId('alert');
    fireEvent.click(alert)
    expect(container.firstChild).toBeNull();
  });

  it('is disabled if not message passed', () => {
    const { container } = render(<Alert />);
    expect(container.firstChild).toBeNull();
  });
});
