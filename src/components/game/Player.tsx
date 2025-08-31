import PlayerImg from '@/assets/player.png';
import { usePlayerStore } from '@/store/playerStore';

const Player = () => {
  const { position } = usePlayerStore();
  const STEP_SIZE = 64;

  return (
    <div
      className="w-16 h-16 absolute"
      style={{
        left: position.x * STEP_SIZE + 'px',
        top: position.y * STEP_SIZE + 'px',
      }}
    >
      <img
        src={PlayerImg}
        alt="Player"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default Player;
