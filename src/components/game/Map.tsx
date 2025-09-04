import floorImg from '@/assets/floor.png';
import WallImg from '@/assets/wall.png';
import { MapTile, useMapStore } from '@/store/mapStore';

const Map = () => {
  const { gameMap } = useMapStore();

  return (
    <div className="grid gap-0">
      {gameMap.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((cell, cellIndex) => (
            <div key={cellIndex} className="w-16 h-16">
              {cell === MapTile.WALL ? (
                <img
                  src={WallImg}
                  alt="Wall"
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={floorImg}
                  alt="Floor"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Map;
