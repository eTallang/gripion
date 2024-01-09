export const gridToPx = (
  width: number,
  noOfTiles: number,
  gridLocation: number
) => {
  return (width / noOfTiles) * gridLocation;
};
