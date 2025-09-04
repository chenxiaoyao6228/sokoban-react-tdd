import PlayerImg from '@/assets/player.png';
import { usePlayerStore } from '@/store/playerStore';
import { useEffect } from 'react';

const STEP_SIZE = 64;

const usePlayerMove = () => {
  const {
    movePlayerToLeft,
    movePlayerToRight,
    movePlayerToDown,
    movePlayerToUp,
  } = usePlayerStore();
  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'ArrowLeft':
          movePlayerToLeft();
          break;
        case 'ArrowRight':
          movePlayerToRight();
          break;
        case 'ArrowUp':
          movePlayerToUp();
          break;
        case 'ArrowDown':
          movePlayerToDown();
          break;
      }
    };
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [movePlayerToLeft, movePlayerToRight, movePlayerToUp, movePlayerToDown]);
};

const Player = () => {
  usePlayerMove();

  const { position } = usePlayerStore();

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
