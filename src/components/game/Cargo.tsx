import CargoImg from '@/assets/cargo.png';
import CargoOnTargetImg from '@/assets/cargo_on_target.png';
import { usePosition } from '../../hooks/usePosition';
import { Cargo } from '../../store/cargoStore';

const CargoComp = ({ cargo }: { cargo: Cargo }) => {
  const { position: positionStyle } = usePosition({
    x: cargo.x,
    y: cargo.y,
  });

  return (
    <div
      className="w-16 h-16 absolute"
      style={{
        left: positionStyle.x + 'px',
        top: positionStyle.y + 'px',
      }}
    >
      <img
        src={cargo.onTarget ? CargoOnTargetImg : CargoImg}
        alt="Cargo"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default CargoComp;
