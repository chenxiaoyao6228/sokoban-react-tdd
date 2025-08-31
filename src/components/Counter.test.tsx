import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Counter } from '@/components/Counter';

describe('Counter', () => {
  it('renders with default initial value of 0', () => {
    render(<Counter />);
    expect(screen.getByText('Counter: 0')).toBeInTheDocument();
  });

  it('renders with custom initial value', () => {
    render(<Counter initialValue={5} />);
    expect(screen.getByText('Counter: 5')).toBeInTheDocument();
  });

  it('increments counter when + button is clicked', () => {
    render(<Counter />);
    const incrementBtn = screen.getByTestId('increment-btn');

    fireEvent.click(incrementBtn);
    expect(screen.getByText('Counter: 1')).toBeInTheDocument();

    fireEvent.click(incrementBtn);
    expect(screen.getByText('Counter: 2')).toBeInTheDocument();
  });

  it('decrements counter when - button is clicked', () => {
    render(<Counter initialValue={5} />);
    const decrementBtn = screen.getByTestId('decrement-btn');

    fireEvent.click(decrementBtn);
    expect(screen.getByText('Counter: 4')).toBeInTheDocument();

    fireEvent.click(decrementBtn);
    expect(screen.getByText('Counter: 3')).toBeInTheDocument();
  });

  it('resets counter to initial value when reset button is clicked', () => {
    render(<Counter initialValue={10} />);
    const incrementBtn = screen.getByTestId('increment-btn');
    const resetBtn = screen.getByTestId('reset-btn');

    // Increment a few times
    fireEvent.click(incrementBtn);
    fireEvent.click(incrementBtn);
    expect(screen.getByText('Counter: 12')).toBeInTheDocument();

    // Reset
    fireEvent.click(resetBtn);
    expect(screen.getByText('Counter: 10')).toBeInTheDocument();
  });

  it('calls onValueChange callback when counter changes', () => {
    const mockCallback = vi.fn();
    render(<Counter onValueChange={mockCallback} />);

    const incrementBtn = screen.getByTestId('increment-btn');
    fireEvent.click(incrementBtn);

    expect(mockCallback).toHaveBeenCalledWith(1);
  });

  it('calls onValueChange callback multiple times', () => {
    const mockCallback = vi.fn();
    render(<Counter onValueChange={mockCallback} />);

    const incrementBtn = screen.getByTestId('increment-btn');
    const decrementBtn = screen.getByTestId('decrement-btn');

    fireEvent.click(incrementBtn);
    fireEvent.click(incrementBtn);
    fireEvent.click(decrementBtn);

    expect(mockCallback).toHaveBeenCalledTimes(3);
    expect(mockCallback).toHaveBeenNthCalledWith(1, 1);
    expect(mockCallback).toHaveBeenNthCalledWith(2, 2);
    expect(mockCallback).toHaveBeenNthCalledWith(3, 1);
  });

  it('renders all buttons with correct test IDs', () => {
    render(<Counter />);

    expect(screen.getByTestId('increment-btn')).toBeInTheDocument();
    expect(screen.getByTestId('decrement-btn')).toBeInTheDocument();
    expect(screen.getByTestId('reset-btn')).toBeInTheDocument();
  });

  it('renders buttons with correct text content', () => {
    render(<Counter />);

    expect(screen.getByTestId('increment-btn')).toHaveTextContent('+');
    expect(screen.getByTestId('decrement-btn')).toHaveTextContent('-');
    expect(screen.getByTestId('reset-btn')).toHaveTextContent('Reset');
  });
});
