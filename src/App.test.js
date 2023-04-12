import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import App from './App';

test('renders grid and switch buttons', () => {
  render(<App />);
  const gridButtons = screen.getAllByRole('button', { class: "" });
  expect(gridButtons.length).toBe(60);
});

test('switches between grids', () => {
  render(<App />);
  const switchButton1 = screen.getByText(/Habit 1/i);
  fireEvent.click(switchButton1);
  const habitTitle1 = screen.getByText("Habit 1");
  expect(habitTitle1).toBeInTheDocument();

  const switchButton2 = screen.getByText(/Habit 2/i);
  fireEvent.click(switchButton1);
  const habitTitle2 = screen.getByText("Habit 2");
  expect(habitTitle2).toBeInTheDocument();

  const switchButton3 = screen.getByText(/Third Habit/i);
  fireEvent.click(switchButton1);
  const habitTitle3 = screen.getByText("Third Habit");
  expect(habitTitle3).toBeInTheDocument();

  const switchButton4 = screen.getByText(/Summary/i);
  fireEvent.click(switchButton1);
  const habitTitle4 = screen.getByText("Summary");
  expect(habitTitle4).toBeInTheDocument();
});

test('updates grid title', () => {
  render(<App />);
  const switchButton1 = screen.getByText(/Habit 1/i);
  fireEvent.click(switchButton1);
  const titleInput1 = screen.getByDisplayValue(/Habit 1/i);
  fireEvent.change(titleInput1, { target: { value: 'New Habit 1' } });

  const switchButton2 = screen.getByText(/Habit 2/i);
  fireEvent.click(switchButton2);
  fireEvent.click(switchButton1);
  const newHabitTitle1 = screen.getByText(/New Habit 1/i);
  expect(newHabitTitle1).toBeInTheDocument();
});

test('summary grid is read-only', () => {
  const {container} = render(<App />);
  const switchButtonSummary = screen.getByText(/Summary/i)
  fireEvent.click(switchButtonSummary);
  const gridButtons = container.getElementsByClassName('grid-button ');
  Array.from(gridButtons).forEach((button) => {
    expect(button).toHaveAttribute('disabled');
  });
});
