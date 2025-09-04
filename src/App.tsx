import Game from './components/game/Game';
import useGameStore from './store/gameStore';

function App() {
  const { isGameCompleted } = useGameStore();
  return (
    <div className="min-h-screen bg-gray-100">
      <Game />
      {isGameCompleted && (
        <div className="">
          <button className="px-6 py-3 mt-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition-colors ">
            Next Level
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
