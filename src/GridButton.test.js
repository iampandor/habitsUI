import { render, screen } from '@testing-library/react';
import GridButton from './GridButton';

describe('GridButton', () => {
  it('renders with the correct label and color', () => {
    render(<GridButton label="1" color="rgb(255, 0, 0)" />);

    const buttonElement = screen.getByText('1');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveStyle('background-color: rgb(255, 0, 0)');
  });

  it('disables the button when disabled prop is true', () => {
    render(<GridButton label="1" disabled={true} />);

    const buttonElement = screen.getByText('1');
    expect(buttonElement).toBeDisabled();
  });
  
});
