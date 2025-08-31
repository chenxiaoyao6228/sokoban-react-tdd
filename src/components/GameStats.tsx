import { useGameStore } from '@/store/gameStore';

export function GameStats() {
  const { level, score, moves, isGameComplete, isPaused, highScore } =
    useGameStore();

  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h2 className="text-xl font-bold mb-4">Game Statistics</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-600">Level</p>
          <p className="text-lg font-semibold" data-testid="level">
            {level}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Score</p>
          <p className="text-lg font-semibold" data-testid="score">
            {score}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Moves</p>
          <p className="text-lg font-semibold" data-testid="moves">
            {moves}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">High Score</p>
          <p className="text-lg font-semibold" data-testid="high-score">
            {highScore}
          </p>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Status:</span>
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${
              isGameComplete
                ? 'bg-green-100 text-green-800'
                : isPaused
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-blue-100 text-blue-800'
            }`}
            data-testid="game-status"
          >
            {isGameComplete ? 'Completed' : isPaused ? 'Paused' : 'Playing'}
          </span>
        </div>
      </div>
    </div>
  );
}
