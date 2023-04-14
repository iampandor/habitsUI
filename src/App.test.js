import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import App from './App';

const switchToGrid = (gridTitle) => {
  const switchButton = screen.getByText(gridTitle);
  fireEvent.click(switchButton);
};

test('renders grid and switch buttons', () => {
  render(<App />);
  const gridButtons = screen.getAllByRole('button', { class: "" });
  expect(gridButtons.length).toBe(62);
});

test('switches between grids', () => {
  render(<App />);
  const gridTitles = ['Habit 1', 'Habit 2', 'Third Habit', 'Summary'];

  gridTitles.forEach((title) => {
    switchToGrid(title);
    const habitTitle = screen.getByText(title);
    expect(habitTitle).toBeInTheDocument();
  });
});

test('updates grid title', () => {
  render(<App />);
  switchToGrid('Habit 1');
  const titleInput1 = screen.getByDisplayValue(/Habit 1/i);
  fireEvent.change(titleInput1, { target: { value: 'New Habit 1' } });

  switchToGrid('Habit 2');
  switchToGrid('New Habit 1');
  const newHabitTitle1 = screen.getByText(/New Habit 1/i);
  expect(newHabitTitle1).toBeInTheDocument();
});

test('summary grid is read-only', () => {
  const {container} = render(<App />);
  switchToGrid('Summary');
  const gridButtons = container.getElementsByClassName('grid-button ');
  Array.from(gridButtons).forEach((button) => {
    expect(button).toHaveAttribute('disabled');
  });
});
