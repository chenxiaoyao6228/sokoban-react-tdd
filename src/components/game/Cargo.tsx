import CargoImg from '@/assets/cargo.png';
import { Position, usePosition } from '../../hooks/usePosition';

const Cargo = ({ position }: { position: Position }) => {
  const { position: positionStyle } = usePosition(position);
  return (
    <div
      className="w-16 h-16 absolute"
      style={{
        left: positionStyle.x + 'px',
        top: positionStyle.y + 'px',
      }}
    >
      <img src={CargoImg} alt="Cargo" className="w-full h-full object-cover" />
    </div>
  );
};

export default Cargo;
