# Sokoban React TDD

A Sokoban game built with React, TypeScript, and Test-Driven Development (TDD) practices.

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Vitest** - Testing framework
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **lint-staged** - Pre-commit linting

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- pnpm (recommended) or npm

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd sokoban-react-tdd
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run preview` - Preview production build
- `pnpm run test` - Run tests in watch mode
- `pnpm run test:ui` - Run tests with UI
- `pnpm run test:run` - Run tests once
- `pnpm run test:coverage` - Run tests with coverage
- `pnpm run lint` - Run ESLint
- `pnpm run lint:fix` - Fix ESLint issues
- `pnpm run format` - Format code with Prettier
- `pnpm run format:check` - Check code formatting

## Project Structure

```
src/
├── main.tsx          # Application entry point
├── App.tsx           # Main App component
├── index.css         # Global styles with Tailwind
├── components/
│   ├── Counter.tsx              # Example component with props and callbacks
│   ├── Counter.test.tsx         # Component tests
│   ├── GameStats.tsx            # Component using Zustand store
│   └── GameStats.test.tsx       # Integration tests
├── hooks/
│   ├── useCounter.ts            # Custom hook with constraints
│   └── useCounter.test.ts       # Hook tests
├── store/
│   ├── gameStore.ts             # Zustand store with devtools
│   └── gameStore.test.ts        # Store tests
└── test/
    └── setup.ts                 # Test configuration
```

## Development Workflow

This project is set up with TDD practices:

1. Write tests first
2. Run tests to see them fail
3. Write minimal code to make tests pass
4. Refactor while keeping tests green

## Git Hooks

The project uses Husky and lint-staged to ensure code quality:

- Pre-commit hooks run ESLint and Prettier
- Only staged files are processed
- Commits are blocked if linting fails

## Testing

Tests are written using Vitest and React Testing Library:

- Unit tests for components and utilities
- Integration tests for user interactions
- Coverage reporting available

### Test Categories

#### 1. Component Testing (`Counter.test.tsx`)

**What it tests:**

- Component rendering with default and custom props
- User interactions (button clicks)
- State changes and UI updates
- Callback prop execution
- Accessibility with test IDs
- Component structure and content

**Key Testing Patterns:**

```typescript
// Render with props
render(<Counter initialValue={5} />);

// Test user interactions
fireEvent.click(screen.getByTestId('increment-btn'));

// Test callback execution
const mockCallback = vi.fn();
render(<Counter onValueChange={mockCallback} />);
expect(mockCallback).toHaveBeenCalledWith(1);
```

#### 2. Custom Hook Testing (`useCounter.test.ts`)

**What it tests:**

- Hook initialization with different options
- State updates and constraints
- Function references stability
- Edge cases (min/max values)
- Hook return values

**Key Testing Patterns:**

```typescript
// Test hook initialization
const { result } = renderHook(() => useCounter({ initialValue: 5 }));

// Test state updates
act(() => {
  result.current.increment();
});

// Test constraints
const { result } = renderHook(() => useCounter({ min: 0, max: 10 }));
act(() => {
  result.current.setValue(15); // Should be clamped to 10
});
expect(result.current.count).toBe(10);
expect(result.current.isAtMax).toBe(true);
```

#### 3. Zustand Store Testing (`gameStore.test.ts`)

**What it tests:**

- Store initialization
- Action execution and state updates
- Complex state logic
- State persistence across actions
- Method availability

**Key Testing Patterns:**

```typescript
// Reset store before each test
beforeEach(() => {
  useGameStore.setState({
    level: 1,
    score: 0,
    moves: 0,
    isGameComplete: false,
    isPaused: false,
    highScore: 0,
  });
});

// Test actions
const { incrementLevel } = useGameStore.getState();
incrementLevel();
expect(useGameStore.getState().level).toBe(2);
```

#### 4. Integration Testing (`GameStats.test.tsx`)

**What it tests:**

- Component integration with Zustand store
- Reactive updates when store changes
- State synchronization
- UI updates based on store state

**Key Testing Patterns:**

```typescript
// Test reactive updates
render(<GameStats />);
act(() => {
  useGameStore.setState({ level: 3, score: 150 });
});
expect(screen.getByTestId('level')).toHaveTextContent('3');
```

### Test Coverage

- **Component Tests**: 9 tests covering rendering, interactions, callbacks, and accessibility
- **Hook Tests**: 11 tests covering initialization, state updates, constraints, and edge cases
- **Store Tests**: 13 tests covering initialization, actions, complex logic, and state persistence
- **Integration Tests**: 8 tests covering store integration, reactive updates, and state synchronization

**Total**: 44 tests across 5 test files - All passing ✅

### Best Practices Demonstrated

1. **Test Isolation**: Each test resets state to ensure independence
2. **User-Centric Testing**: Tests focus on user behavior, not implementation
3. **Accessibility**: Using test IDs for reliable element selection
4. **Async Handling**: Proper use of `act()` for state updates
5. **Mock Functions**: Using `vi.fn()` for callback testing
6. **Edge Cases**: Testing boundary conditions and constraints
7. **Integration**: Testing how components work together with stores

## Contributing

1. Follow TDD practices
2. Ensure all tests pass
3. Follow the established code style
4. Write meaningful commit messages

## License

MIT
