import { useEffect } from 'react';
import useCargoStore from '../../store/cargoStore';
import CargoComp from './Cargo';
import Map from './Map';
import Player from './Player';
import Target from './Target';
import useTargetStore from '../../store/targetStore';

const Game = () => {
  const { cargos, createCargo, addCargo } = useCargoStore();
  const { targets, addTarget, createTarget } = useTargetStore();

  useEffect(() => {
    const cargo = createCargo({ x: 2, y: 2 });
    addCargo(cargo);

    const target = createTarget({ x: 2, y: 3 });
    addTarget(target);
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
