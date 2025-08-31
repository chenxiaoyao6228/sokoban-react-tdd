import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCounter } from '@/hooks/useCounter';

describe('useCounter', () => {
  it('initializes with default value of 0', () => {
    const { result } = renderHook(() => useCounter());

    expect(result.current.count).toBe(0);
    expect(result.current.isAtMin).toBe(false);
    expect(result.current.isAtMax).toBe(false);
  });

  it('initializes with custom initial value', () => {
    const { result } = renderHook(() => useCounter({ initialValue: 5 }));

    expect(result.current.count).toBe(5);
  });

  it('increments counter', () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  it('decrements counter', () => {
    const { result } = renderHook(() => useCounter({ initialValue: 5 }));

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(4);
  });

  it('resets counter to initial value', () => {
    const { result } = renderHook(() => useCounter({ initialValue: 10 }));

    act(() => {
      result.current.increment();
      result.current.increment();
    });

    expect(result.current.count).toBe(12);

    act(() => {
      result.current.reset();
    });

    expect(result.current.count).toBe(10);
  });

  it('sets value directly', () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.setValue(15);
    });

    expect(result.current.count).toBe(15);
  });

  it('respects minimum value constraint', () => {
    const { result } = renderHook(() =>
      useCounter({ min: 0, initialValue: 2 })
    );

    act(() => {
      result.current.decrement();
      result.current.decrement();
      result.current.decrement();
    });

    expect(result.current.count).toBe(0);
    expect(result.current.isAtMin).toBe(true);
  });

  it('respects maximum value constraint', () => {
    const { result } = renderHook(() =>
      useCounter({ max: 5, initialValue: 3 })
    );

    act(() => {
      result.current.increment();
      result.current.increment();
      result.current.increment();
    });

    expect(result.current.count).toBe(5);
    expect(result.current.isAtMax).toBe(true);
  });

  it('handles both min and max constraints', () => {
    const { result } = renderHook(() =>
      useCounter({ min: 0, max: 10, initialValue: 5 })
    );

    act(() => {
      result.current.setValue(15); // Should be clamped to 10
    });

    expect(result.current.count).toBe(10);
    expect(result.current.isAtMax).toBe(true);

    act(() => {
      result.current.setValue(-5); // Should be clamped to 0
    });

    expect(result.current.count).toBe(0);
    expect(result.current.isAtMin).toBe(true);
  });

  it('updates isAtMin and isAtMax flags correctly', () => {
    const { result } = renderHook(() =>
      useCounter({ min: 0, max: 5, initialValue: 2 })
    );

    expect(result.current.isAtMin).toBe(false);
    expect(result.current.isAtMax).toBe(false);

    act(() => {
      result.current.setValue(0);
    });

    expect(result.current.isAtMin).toBe(true);
    expect(result.current.isAtMax).toBe(false);

    act(() => {
      result.current.setValue(5);
    });

    expect(result.current.isAtMin).toBe(false);
    expect(result.current.isAtMax).toBe(true);
  });

  it('maintains function references between renders', () => {
    const { result, rerender } = renderHook(() => useCounter());

    const initialIncrement = result.current.increment;
    const initialDecrement = result.current.decrement;
    const initialReset = result.current.reset;
    const initialSetValue = result.current.setValue;

    rerender();

    expect(result.current.increment).toBe(initialIncrement);
    expect(result.current.decrement).toBe(initialDecrement);
    expect(result.current.reset).toBe(initialReset);
    expect(result.current.setValue).toBe(initialSetValue);
  });
});
