import { useState } from 'react';

interface CounterProps {
  initialValue?: number;
  onValueChange?: (value: number) => void;
}

export function Counter({ initialValue = 0, onValueChange }: CounterProps) {
  const [count, setCount] = useState(initialValue);

  const increment = () => {
    const newValue = count + 1;
    setCount(newValue);
    onValueChange?.(newValue);
  };

  const decrement = () => {
    const newValue = count - 1;
    setCount(newValue);
    onValueChange?.(newValue);
  };

  const reset = () => {
    setCount(initialValue);
    onValueChange?.(initialValue);
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">Counter: {count}</h2>
      <div className="flex gap-2">
        <button
          onClick={decrement}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          data-testid="decrement-btn"
        >
          -
        </button>
        <button
          onClick={increment}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          data-testid="increment-btn"
        >
          +
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          data-testid="reset-btn"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
