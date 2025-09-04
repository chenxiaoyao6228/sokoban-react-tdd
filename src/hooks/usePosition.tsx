export interface Position {
  x: number;
  y: number;
}

export const usePosition = (position: Position) => {
  const STEP = 64;

  return {
    position: {
      x: position.x * STEP,
      y: position.y * STEP,
    },
  };
};
