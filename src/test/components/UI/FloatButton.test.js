import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FloatButton from '../../../components/UI/FloatButton';

describe('FloatButton Component', () => {
  it('mounts', () => {
    const { asFragment } = render(<FloatButton children='Submit' />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('has a title', () => {
    const { getByText } = render(<FloatButton children='Submit' />);
    expect(getByText('Submit')).toHaveTextContent('Submit');
  });

  it('has called on click handler', () => {
    const onClickHandler = jest.fn();
    const { container } = render(<FloatButton children='Submit' clickHandler={onClickHandler} />);
    fireEvent.click(container.firstChild);
    expect(onClickHandler).toHaveBeenCalledTimes(1);
  });
});
