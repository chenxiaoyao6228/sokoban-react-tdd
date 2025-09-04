import { useEffect } from 'react';
import useCargoStore from '../../store/cargoStore';
import CargoComp from './Cargo';
import Map from './Map';
import Player from './Player';
import Target from './Target';
import useTargetStore from '../../store/targetStore';
import { useMapStore } from '../../store/mapStore';
import { usePlayerStore } from '../../store/playerStore';
import { levelGameData } from '../../game/gameData';

const Game = () => {
  const { cargos, createCargo, addCargo } = useCargoStore();
  const { targets, addTarget, createTarget } = useTargetStore();
  const { setGameMap } = useMapStore();
  const { setPlayerPosition } = usePlayerStore();

  useEffect(() => {
    // Set map
    setGameMap(levelGameData.gameMap);

    // Set player position
    setPlayerPosition(levelGameData.player);

    // Add cargos
    levelGameData.cargos.forEach((cargoPos) => {
      const cargo = createCargo(cargoPos);
      addCargo(cargo);
    });

    // Add targets
    levelGameData.targets.forEach((targetPos) => {
      const target = createTarget(targetPos);
      addTarget(target);
    });
  }, []);

  return (
    <div className="relative inline-flex">
      <Map />
      {targets.map((target) => (
        <Target key={target.id} position={target} />
      ))}
      <Player />

      {cargos.map((cargo) => (
        <CargoComp cargo={cargo} />
      ))}
    </div>
  );
};

export default Game;
