import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '@/App';

describe('App', () => {
  it('renders the title', () => {
    render(<App />);
    expect(screen.getByText('Sokoban React TDD')).toBeInTheDocument();
  });

  it('renders the welcome message', () => {
    render(<App />);
    expect(
      screen.getByText('Welcome to your Sokoban game development with TDD!')
    ).toBeInTheDocument();
  });

  it('shows initial count of 0', () => {
    render(<App />);
    expect(screen.getByText('Count is 0')).toBeInTheDocument();
  });
});
