import { useEffect } from 'react';
import useCargoStore from '../../store/cargoStore';
import Cargo from './Cargo';
import Map from './Map';
import Player from './Player';

const Game = () => {
  const cargos = useCargoStore((state) => state.cargos);
  const createCargo = useCargoStore((state) => state.createCargo);
  const addCargo = useCargoStore((state) => state.addCargo);

  useEffect(() => {
    const cargo = createCargo({ x: 2, y: 2 });
    addCargo(cargo);
  }, []);

  return (
    <div>
      <Map />
      <Player />
      {cargos.map((cargo) => (
        <Cargo key={cargo.id} position={cargo} />
      ))}
    </div>
  );
};

export default Game;
