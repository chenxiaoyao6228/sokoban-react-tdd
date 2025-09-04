import { useEffect } from 'react';
import useCargoStore from '../../store/cargoStore';
import CargoComp from './Cargo';
import Map from './Map';
import Player from './Player';
import Target from './Target';
import useTargetStore from '../../store/targetStore';
import useGameStore from '../../store/gameStore';
import { gameData } from '../../game/gameData';

const Game = () => {
  const { isGameLevelCompleted, toNextLevel, setUpGame } = useGameStore();
  const { cargos } = useCargoStore();
  const { targets } = useTargetStore();

  useEffect(() => {
    setUpGame(gameData);
  }, []);

  return (
    <>
      <div className="relative inline-flex">
        <Map />
        {targets.map((target) => (
          <Target key={target.id} position={target} />
        ))}
        <Player />

        {cargos.map((cargo) => (
          <CargoComp key={cargo.id} cargo={cargo} />
        ))}
      </div>
      {isGameLevelCompleted && (
        <div className="">
          <button
            onClick={() => toNextLevel()}
            className="px-6 py-3 mt-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition-colors "
          >
            Next Level
          </button>
        </div>
      )}
    </>
  );
};

export default Game;
