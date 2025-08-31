import { describe, it, expect, beforeEach } from 'vitest';
import { useGameStore } from '@/store/gameStore';

describe('useGameStore', () => {
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

  it('initializes with correct default values', () => {
    const state = useGameStore.getState();

    expect(state.level).toBe(1);
    expect(state.score).toBe(0);
    expect(state.moves).toBe(0);
    expect(state.isGameComplete).toBe(false);
    expect(state.isPaused).toBe(false);
    expect(state.highScore).toBe(0);
  });

  it('increments level correctly', () => {
    const { incrementLevel } = useGameStore.getState();

    incrementLevel();

    expect(useGameStore.getState().level).toBe(2);
  });

  it('increments score correctly', () => {
    const { incrementScore } = useGameStore.getState();

    incrementScore(100);
    expect(useGameStore.getState().score).toBe(100);

    incrementScore(50);
    expect(useGameStore.getState().score).toBe(150);
  });

  it('increments moves correctly', () => {
    const { incrementMoves } = useGameStore.getState();

    incrementMoves();
    expect(useGameStore.getState().moves).toBe(1);

    incrementMoves();
    expect(useGameStore.getState().moves).toBe(2);
  });

  it('sets game complete status', () => {
    const { setGameComplete } = useGameStore.getState();

    setGameComplete(true);
    expect(useGameStore.getState().isGameComplete).toBe(true);

    setGameComplete(false);
    expect(useGameStore.getState().isGameComplete).toBe(false);
  });

  it('sets paused status', () => {
    const { setPaused } = useGameStore.getState();

    setPaused(true);
    expect(useGameStore.getState().isPaused).toBe(true);

    setPaused(false);
    expect(useGameStore.getState().isPaused).toBe(false);
  });

  it('resets game to initial state', () => {
    const {
      incrementLevel,
      incrementScore,
      incrementMoves,
      setGameComplete,
      setPaused,
      resetGame,
    } = useGameStore.getState();

    // Modify state
    incrementLevel();
    incrementScore(100);
    incrementMoves();
    setGameComplete(true);
    setPaused(true);

    // Reset
    resetGame();

    const state = useGameStore.getState();
    expect(state.level).toBe(1);
    expect(state.score).toBe(0);
    expect(state.moves).toBe(0);
    expect(state.isGameComplete).toBe(false);
    expect(state.isPaused).toBe(false);
  });

  it('updates high score when current score is higher', () => {
    const { incrementScore, updateHighScore } = useGameStore.getState();

    incrementScore(100);
    updateHighScore();

    expect(useGameStore.getState().highScore).toBe(100);
  });

  it('does not update high score when current score is lower', () => {
    const { incrementScore, updateHighScore } = useGameStore.getState();

    // Set initial high score
    incrementScore(100);
    updateHighScore();

    // Try to set lower score
    useGameStore.setState({ score: 50 });
    updateHighScore();

    expect(useGameStore.getState().highScore).toBe(100);
  });

  it('updates high score when current score equals high score', () => {
    const { incrementScore, updateHighScore } = useGameStore.getState();

    incrementScore(100);
    updateHighScore();

    // Set score to same value
    useGameStore.setState({ score: 100 });
    updateHighScore();

    expect(useGameStore.getState().highScore).toBe(100);
  });

  it('maintains high score across game resets', () => {
    const { incrementScore, updateHighScore, resetGame } =
      useGameStore.getState();

    incrementScore(200);
    updateHighScore();

    resetGame();

    expect(useGameStore.getState().highScore).toBe(200);
    expect(useGameStore.getState().score).toBe(0);
  });

  it('handles multiple state updates correctly', () => {
    const { incrementLevel, incrementScore, incrementMoves } =
      useGameStore.getState();

    incrementLevel();
    incrementScore(50);
    incrementMoves();
    incrementLevel();
    incrementScore(75);

    const state = useGameStore.getState();
    expect(state.level).toBe(3);
    expect(state.score).toBe(125);
    expect(state.moves).toBe(1);
  });

  it('provides all required methods', () => {
    const state = useGameStore.getState();

    expect(typeof state.incrementLevel).toBe('function');
    expect(typeof state.incrementScore).toBe('function');
    expect(typeof state.incrementMoves).toBe('function');
    expect(typeof state.setGameComplete).toBe('function');
    expect(typeof state.setPaused).toBe('function');
    expect(typeof state.resetGame).toBe('function');
    expect(typeof state.updateHighScore).toBe('function');
  });
});
