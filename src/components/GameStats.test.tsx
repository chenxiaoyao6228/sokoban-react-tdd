import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { GameStats } from '@/components/GameStats';
import { useGameStore } from '@/store/gameStore';

describe('GameStats', () => {
  beforeEach(() => {
    // Reset store to initial state before each test
    useGameStore.setState({
      level: 1,
      score: 0,
      moves: 0,
      isGameComplete: false,
      isPaused: false,
      highScore: 0,
    });
  });

  it('renders initial game statistics', () => {
    render(<GameStats />);

    expect(screen.getByTestId('level')).toHaveTextContent('1');
    expect(screen.getByTestId('score')).toHaveTextContent('0');
    expect(screen.getByTestId('moves')).toHaveTextContent('0');
    expect(screen.getByTestId('high-score')).toHaveTextContent('0');
    expect(screen.getByTestId('game-status')).toHaveTextContent('Playing');
  });

  it('displays updated statistics when store state changes', () => {
    render(<GameStats />);

    // Update store state
    act(() => {
      useGameStore.setState({
        level: 3,
        score: 150,
        moves: 25,
        highScore: 200,
        isGameComplete: false,
        isPaused: false,
      });
    });

    expect(screen.getByTestId('level')).toHaveTextContent('3');
    expect(screen.getByTestId('score')).toHaveTextContent('150');
    expect(screen.getByTestId('moves')).toHaveTextContent('25');
    expect(screen.getByTestId('high-score')).toHaveTextContent('200');
  });

  it('shows "Playing" status when game is active', () => {
    render(<GameStats />);

    expect(screen.getByTestId('game-status')).toHaveTextContent('Playing');
    expect(screen.getByTestId('game-status')).toHaveClass(
      'bg-blue-100',
      'text-blue-800'
    );
  });

  it('shows "Paused" status when game is paused', () => {
    render(<GameStats />);

    act(() => {
      useGameStore.setState({ isPaused: true });
    });

    expect(screen.getByTestId('game-status')).toHaveTextContent('Paused');
    expect(screen.getByTestId('game-status')).toHaveClass(
      'bg-yellow-100',
      'text-yellow-800'
    );
  });

  it('shows "Completed" status when game is complete', () => {
    render(<GameStats />);

    act(() => {
      useGameStore.setState({ isGameComplete: true });
    });

    expect(screen.getByTestId('game-status')).toHaveTextContent('Completed');
    expect(screen.getByTestId('game-status')).toHaveClass(
      'bg-green-100',
      'text-green-800'
    );
  });

  it('prioritizes completed status over paused status', () => {
    render(<GameStats />);

    act(() => {
      useGameStore.setState({ isPaused: true, isGameComplete: true });
    });

    expect(screen.getByTestId('game-status')).toHaveTextContent('Completed');
    expect(screen.getByTestId('game-status')).toHaveClass(
      'bg-green-100',
      'text-green-800'
    );
  });

  it('renders all required elements', () => {
    render(<GameStats />);

    expect(screen.getByText('Game Statistics')).toBeInTheDocument();
    expect(screen.getByText('Level')).toBeInTheDocument();
    expect(screen.getByText('Score')).toBeInTheDocument();
    expect(screen.getByText('Moves')).toBeInTheDocument();
    expect(screen.getByText('High Score')).toBeInTheDocument();
    expect(screen.getByText('Status:')).toBeInTheDocument();
  });

  it('updates reactively when store actions are called', () => {
    render(<GameStats />);

    const { incrementLevel, incrementScore, incrementMoves } =
      useGameStore.getState();

    act(() => {
      incrementLevel();
      incrementScore(100);
      incrementMoves();
    });

    expect(screen.getByTestId('level')).toHaveTextContent('2');
    expect(screen.getByTestId('score')).toHaveTextContent('100');
    expect(screen.getByTestId('moves')).toHaveTextContent('1');
  });
});
