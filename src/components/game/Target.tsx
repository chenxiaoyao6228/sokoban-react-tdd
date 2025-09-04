import targetImg from '@/assets/target.png';
import { Position, usePosition } from '../../hooks/usePosition';

const Target = ({ position }: { position: Position }) => {
  const { position: positionStyle } = usePosition(position);
  return (
    <div
      className="w-16 h-16 absolute"
      style={{
        left: positionStyle.x + 'px',
        top: positionStyle.y + 'px',
      }}
    >
      <img
        src={targetImg}
        alt="Target"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default Target;
